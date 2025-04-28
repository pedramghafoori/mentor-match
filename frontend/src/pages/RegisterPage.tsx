// ---------- src/pages/RegisterPage.tsx ----------
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import '../css/RegisterPage.css';

const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [lssId, setLssId] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [heardAbout, setHeardAbout] = useState<string[]>([]);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // Password strength: at least 8 chars, 1 uppercase, 1 lowercase, 1 number
  const isStrongPassword = (pw: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(pw);

  const toggleHeardAbout = (option: string) => {
    setHeardAbout(prev =>
      prev.includes(option)
        ? prev.filter(o => o !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!isStrongPassword(password)) {
      setError('Password must be at least 8 characters and include uppercase, lowercase, and a number.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      await register({
        lssId,
        firstName,
        lastName,
        email,
        password,
        phone,
        heardAbout: heardAbout.join(','),
      });
      navigate('/search');
    } catch (err) {
      setError('Unable to register');
    }
  };

  return (
    <div className="auth-form">
      <h1>Create account</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          required
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          required
        />
        <label htmlFor="lssId">LSS ID</label>
        <input id="lssId" type="text" value={lssId} onChange={e => setLssId(e.target.value)} required />
        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <label htmlFor="phone">Phone Number</label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input id="confirmPassword" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
        <label>How did you hear about MentorConnect? (optional)</label>
        <div className="radio-pills">
          {['Word of mouth', 'My area chair', 'Lifesaving Society', 'My instructor']
            .map(option => (
              <label key={option} className="radio-pill">
                <input
                  type="checkbox"
                  value={option}
                  checked={heardAbout.includes(option)}
                  onChange={() => toggleHeardAbout(option)}
                />
                <span>{option}</span>
              </label>
            ))}
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;