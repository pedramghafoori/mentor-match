// ---------- src/components/MentorCard.tsx ----------
import React from 'react';
import { Link } from 'react-router-dom';
import { Mentor } from '../pages/MentorPage';
import './MentorCard.css';

const MentorCard: React.FC<{ mentor: Mentor }> = ({ mentor }) => (
  <Link to={`/mentors/${mentor.id}`} className="mentor-card">
    <img src={mentor.avatar || 'https://via.placeholder.com/150'} alt={mentor.name} />
    <h3>{mentor.name}</h3>
    <p>{mentor.location}</p>
    <div>{'★'.repeat(Math.round(mentor.rating))}</div>
  </Link>
);

export default MentorCard;