import React, { useState } from 'react';
import MentorCard from '../components/MentorCard';
import client from '../api/client';

interface Mentor {
  id: string;
  name: string;
  location: string;
  rating: number;
  avatar?: string;
}

const SearchMentorsPage: React.FC = () => {
  const [location, setLocation] = useState('');
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchInitiated, setSearchInitiated] = useState(false);

  // Use browser geolocation
  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const { data } = await client.get<Mentor[]>('/mentors', {
            params: { lat: latitude, lng: longitude }
          });
          setMentors(data);
          setSearchInitiated(true);
        } catch {
          setError('Failed to fetch mentors for your location.');
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError('Unable to retrieve your location.');
        setLoading(false);
      }
    );
  };

  // Manual search by city/area
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await client.get<Mentor[]>('/mentors', {
        params: { city: location }
      });
      setMentors(data);
      setSearchInitiated(true);
    } catch {
      setError('Failed to fetch mentors for this area.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-mentors-page">
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Where are you looking for a mentor?"
          value={location}
          onChange={e => setLocation(e.target.value)}
        />
        <button type="submit">Search</button>
        <button type="button" onClick={handleUseMyLocation} style={{ marginLeft: 8 }}>
          Use my location
        </button>
      </form>
      {loading && <p>Loading mentors…</p>}
      {error && <p className="error">{error}</p>}
      {searchInitiated && !loading && (
        <div className="mentor-cards">
          {mentors.length === 0 ? (
            <p>No mentors found in this area.</p>
          ) : (
            mentors.map(m => <MentorCard key={m.id} mentor={m} />)
          )}
        </div>
      )}
    </div>
  );
};

export default SearchMentorsPage; 