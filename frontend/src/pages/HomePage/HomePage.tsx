import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage: React.FC = () => {
  return (
    <div>
      <header className="navbar">
        <div className="logo">MentorConnect</div>
        <nav>
          <Link to="/profile">Profile</Link>
          <a href="#">Connect</a>
          <a href="#">Bookings</a>
        </nav>
      </header>
      <main>
        <section className="hero">
          <h1>Connecting Passion with Experience</h1>
          <p>Join a community where certified mentors inspire and guide passionate learners.</p>
          <button className="cta-btn">Join for Free</button>
        </section>
        <section className="featured">
          <h2>Featured Connections</h2>
          <div className="mentor-cards">
            <div className="mentor-card">
              <img src="https://via.placeholder.com/150" alt="Mentor" />
              <h3>Jane Smith</h3>
              <p>Toronto, Canada</p>
              <div>★ ★ ★ ★ ★</div>
            </div>
            <div className="mentor-card">
              <img src="https://via.placeholder.com/150" alt="Mentor" />
              <h3>Mike Johnson</h3>
              <p>Vancouver, Canada</p>
              <div>★ ★ ★ ★ ☆</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;