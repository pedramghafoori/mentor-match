import React, { useState } from "react";
import "../css/HomePage.css";
import mentorHero from "../assets/mentor-hero.png"; // new image

const HomePage: React.FC = () => {
  const [streams, setStreams] = useState<string[]>([]);
  const [city, setCity] = useState("Toronto");
  const [locating, setLocating] = useState(false);

  const toggleStream = (option: string) => {
    setStreams(prev =>
      prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
    );
  };

  const handleLocate = () => {
    setLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          // You can use pos.coords.latitude and pos.coords.longitude here
          setLocating(false);
          // Optionally, set city based on reverse geocoding
        },
        () => setLocating(false)
      );
    } else {
      setLocating(false);
    }
  };

  return (
    <main className="home-hero-wrapper">
      {/* left search card */}
      <div className="search-card">
        <h1 style={{ marginBottom: '0.5rem' }}>Find Mentors Near You</h1>
        <p style={{ marginBottom: '1.1rem', marginTop: 0 }}>
          Whether you're seeking guidance on a subject, career advice, or skill
          development—find your mentor here.
        </p>

        <form className="search-form-vertical">
          {/* Streams multi‑select */}
          <fieldset>
            <legend className="search-section-header">Streams</legend>
            <div className="radio-pills">
              {["Bronze", "First Aid", "NL", "Instructor Trainer"].map(opt => (
                <label key={opt} className="radio-pill">
                  <input
                    type="checkbox"
                    value={opt}
                    checked={streams.includes(opt)}
                    onChange={() => toggleStream(opt)}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Location dropdown with locator icon */}
          <div className="location-label">
            <div className="search-section-header">Location</div>
            <div style={{ height: '0.5rem' }} />
            <div className="location-row">
              <button
                type="button"
                className="locate-btn"
                onClick={handleLocate}
                aria-label="Use my location"
                disabled={locating}
              >
                <span className="target-icon" />
              </button>
              <select
                value={city}
                onChange={e => setCity(e.target.value)}
                className="city-select"
              >
                <option>Toronto</option>
                <option>Ottawa</option>
                <option>Vancouver</option>
                <option>Calgary</option>
              </select>
            </div>
          </div>

          <button type="submit" className="cta-btn">
            Search
          </button>
        </form>
      </div>

      {/* right hero image */}
      <div className="hero-image">
        <img src={mentorHero} alt="Mentor guiding student beside pool" />
      </div>
    </main>
  );
};

export default HomePage;