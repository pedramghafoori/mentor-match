import { Pool, PoolClient, QueryResult, QueryResultRow } from 'pg';
import { config } from '../config/config';

const pool = new Pool({
  host:     config.database.host,
  port:     config.database.port,
  user:     config.database.username,
  password: config.database.password,
  database: config.database.database,
});

/** -------------------------------------------------------
 *  Simple helper for one-off queries
 * ------------------------------------------------------ */
export const query = <T extends QueryResultRow = any>(
  text: string,
  params?: any[]
): Promise<QueryResult<T>> => {
  const start = Date.now();
  return pool.query<T>(text, params).then((res) => {
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  });
};

/** -------------------------------------------------------
 *  Borrow a client and track its last query (leak detector)
 * ------------------------------------------------------ */
interface DebugClient extends PoolClient {
  lastQuery?: any[];
}

export const getClient = async (): Promise<DebugClient> => {
  const client = (await pool.connect()) as DebugClient;

  const originalQuery   = client.query.bind(client);
  const originalRelease = client.release.bind(client);

  // warn if client is held >5 s
  const timeout = setTimeout(() => {
    console.error(
      'A client has been checked out for more than 5 seconds!',
      '\nLast query:', client.lastQuery
    );
  }, 5_000);

  // monkey‑patch query so we remember the last call but keep types happy
  client.query = ((...args: any[]) => {
    client.lastQuery = args;
    // run the original query
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore – dynamic arg list matches one of the overloads at runtime
    return originalQuery(...args);
  }) as unknown as PoolClient['query'];

  // patch release so we clean up
  client.release = (err?: Error) => {
    clearTimeout(timeout);
    client.query   = originalQuery as any;
    client.release = originalRelease;
    return originalRelease(err);
  };

  return client;
};