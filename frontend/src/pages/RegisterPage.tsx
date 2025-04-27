// ---------- src/pages/RegisterPage.tsx ----------
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [lssId, setLssId] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [heardAbout, setHeardAbout] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // Password strength: at least 8 chars, 1 uppercase, 1 lowercase, 1 number
  const isStrongPassword = (pw: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(pw);

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
        heardAbout,
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
        <div className="form-row">
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="firstName">First Name</label>
            <input id="firstName" type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="lastName">Last Name</label>
            <input id="lastName" type="text" value={lastName} onChange={e => setLastName(e.target.value)} required />
          </div>
        </div>
        <label htmlFor="lssId">LSS ID</label>
        <input id="lssId" type="text" value={lssId} onChange={e => setLssId(e.target.value)} required />
        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <label htmlFor="phone">Phone Number</label>
        <input id="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} required style={{ appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'textfield' }} />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input id="confirmPassword" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
        <label>How did you hear about MentorConnect? (optional)</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', marginBottom: '0.5rem' }}>
          <label><input type="radio" name="heardAbout" value="word of mouth" checked={heardAbout === 'word of mouth'} onChange={e => setHeardAbout(e.target.value)} /> Word of mouth</label>
          <label><input type="radio" name="heardAbout" value="My area chair" checked={heardAbout === 'My area chair'} onChange={e => setHeardAbout(e.target.value)} /> My area chair</label>
          <label><input type="radio" name="heardAbout" value="Lifesaving Society" checked={heardAbout === 'Lifesaving Society'} onChange={e => setHeardAbout(e.target.value)} /> Lifesaving Society</label>
          <label><input type="radio" name="heardAbout" value="My instructor" checked={heardAbout === 'My instructor'} onChange={e => setHeardAbout(e.target.value)} /> My instructor</label>
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;