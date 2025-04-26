// ---------- src/pages/MentorsPage.tsx ----------
import React, { useEffect, useState } from 'react';
import client from '../api/client';
import MentorCard from '../components/MentorCard';

export interface Mentor {
  id: string;
  name: string;
  location: string;
  rating: number;
  avatar?: string;
}

const MentorsPage: React.FC = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const { data } = await client.get<Mentor[]>('/mentors');
        setMentors(data);
      } catch (_) {
        setError('Failed to load mentors');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Loading mentors…</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="featured">
      <h2>Find your mentor</h2>
      <div className="mentor-cards">
        {mentors.map(m => <MentorCard key={m.id} mentor={m} />)}
      </div>
    </section>
  );
};

export default MentorsPage;