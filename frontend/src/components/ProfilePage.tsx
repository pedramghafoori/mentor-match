import React from "react";

const ProfilePage = () => {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem", fontFamily: "sans-serif" }}>
      
      {/* Profile Header */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "2rem" }}>
        <img
          src="/assets/default-profile.png"
          alt="Profile"
          style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: "50%", border: "2px solid #ccc" }}
        />
        <div style={{ marginLeft: "1.5rem" }}>
          <h1 style={{ margin: 0, fontSize: "1.8rem" }}>John Doe</h1>
          <p style={{ margin: "0.5rem 0 0", color: "gray" }}>Toronto, Canada</p>
          <div style={{ marginTop: "0.5rem" }}>
            <span style={{ fontSize: "1.2rem", color: "gold" }}>★★★★☆</span>
            <span style={{ color: "gray", marginLeft: "0.5rem" }}>4.0 / 5 (12 reviews)</span>
          </div>
        </div>
      </div>

      {/* Certifications Section */}
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>Certifications</h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <li style={{ marginBottom: "0.5rem" }}>Examiner-Mentor Certification</li>
          <li style={{ marginBottom: "0.5rem" }}>Bronze Examiner</li>
          <li style={{ marginBottom: "0.5rem" }}>First Aid Examiner</li>
        </ul>
      </div>

      {/* Reviews Section */}
      <div>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>Reviews</h2>

        <div style={{ borderTop: "1px solid #eee", paddingTop: "1rem", marginBottom: "1rem" }}>
          <p style={{ margin: 0, fontWeight: "bold" }}>Sarah M.</p>
          <div style={{ fontSize: "1rem", color: "gold" }}>★★★★★</div>
          <p style={{ marginTop: "0.5rem" }}>
            John was an amazing mentor. Very supportive and clear. Highly recommend!
          </p>
        </div>

        <div style={{ borderTop: "1px solid #eee", paddingTop: "1rem", marginBottom: "1rem" }}>
          <p style={{ margin: 0, fontWeight: "bold" }}>Alex T.</p>
          <div style={{ fontSize: "1rem", color: "gold" }}>★★★★☆</div>
          <p style={{ marginTop: "0.5rem" }}>
            Great experience overall. Very knowledgeable.
          </p>
        </div>
      </div>

    </div>
  );
};

export default ProfilePage; 