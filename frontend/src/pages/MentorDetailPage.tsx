// ---------- src/pages/MentorDetailPage.tsx ----------
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import client from '../api/client';
import useAuth from '../hooks/useAuth';

interface Session {
  id: string;
  date: string;
  time: string;
}

interface MentorDetails {
  id: string;
  name: string;
  bio: string;
  rating: number;
  certifications: string[];
  sessions: Session[];
}

const MentorDetailPage: React.FC = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [mentor, setMentor] = useState<MentorDetails | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const { data } = await client.get<MentorDetails>(`/mentors/${id}`);
        setMentor(data);
      } catch (_) {
        setError('Mentor not found');
      }
    })();
  }, [id]);

  const requestBooking = async (sessionId: string) => {
    if (!user) return alert('Please log in to book');
    try {
      await client.post('/bookings', { mentorId: id, sessionId });
      alert('Booking requested!');
    } catch {
      alert('Booking failed');
    }
  };

  if (error) return <p>{error}</p>;
  if (!mentor) return <p>Loading…</p>;

  return (
    <div className="mentor-detail">
      <h1>{mentor.name}</h1>
      <p>{mentor.bio}</p>
      <p>{'★'.repeat(Math.round(mentor.rating))}</p>
      <h2>Certifications</h2>
      <ul>
        {mentor.certifications.map(c => <li key={c}>{c}</li>)}
      </ul>
      <h2>Available sessions</h2>
      {mentor.sessions.length ? (
        <ul>
          {mentor.sessions.map(s => (
            <li key={s.id}>
              {s.date} – {s.time}{' '}
              <button onClick={() => requestBooking(s.id)}>Request</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No sessions open.</p>
      )}
    </div>
  );
};

export default MentorDetailPage;