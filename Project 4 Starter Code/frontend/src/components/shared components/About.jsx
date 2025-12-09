const About = () => {
  return (
    <div className="container">
      {/* Section 1: Who We Are */}
      <section className="card" style={{ marginBottom: "20px" }}>
        <h1 style={{ marginBottom: "15px" }}>Who We Are</h1>
        <p style={{ color: "#666", lineHeight: "1.6" }}>
          We are an online platform dedicated to simplifying the donation 
          process and ensuring support reaches those in need across various 
          sectors. We believe that giving starts with a single step, and 
          we strive to make that step easier and more transparent.
        </p>
      </section>

      {/* Section 2: Our Vision */}
      <section className="card" style={{ marginBottom: "20px" }}>
        <h2 style={{ marginBottom: "15px" }}>Our Vision</h2>
        <p style={{ color: "#666", lineHeight: "1.6" }}>
          We aspire to be the bridge connecting generous hearts with those 
          in need, building a compassionate community that contributes to 
          improving the lives of others.
        </p>
      </section>

      {/* Section 3: Our Focus Areas */}
      <section className="card" style={{ marginBottom: "20px" }}>
        <h2 style={{ marginBottom: "15px" }}>Our Focus Areas</h2>
        <ul style={{ 
          color: "#666", 
          lineHeight: "1.8",
          paddingLeft: "20px"
        }}>
          <li>Healthcare - Supporting patients and charity clinics</li>
          <li>Education - Providing learning opportunities for all</li>
          <li>Orphans - Caring for and supporting children in need</li>
          <li>Empowerment - Helping families achieve financial independence</li>
          <li>Emergency Response - Quick action during crises</li>
        </ul>
      </section>

      {/* Section 4: How We Work */}
      <section className="card" style={{ marginBottom: "20px" }}>
        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>How We Work</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          <div style={{ textAlign: "center", padding: "20px" }}>
            <span style={{ fontSize: "48px", display: "block", marginBottom: "10px" }}>
              1️⃣
            </span>
            <h3 style={{ marginBottom: "10px" }}>Choose a Cause</h3>
            <p style={{ color: "#666", fontSize: "14px" }}>
              Browse available campaigns and categories
            </p>
          </div>
          <div style={{ textAlign: "center", padding: "20px" }}>
            <span style={{ fontSize: "48px", display: "block", marginBottom: "10px" }}>
              2️⃣
            </span>
            <h3 style={{ marginBottom: "10px" }}>Make a Donation</h3>
            <p style={{ color: "#666", fontSize: "14px" }}>
              Select the amount you wish to contribute
            </p>
          </div>
          <div style={{ textAlign: "center", padding: "20px" }}>
            <span style={{ fontSize: "48px", display: "block", marginBottom: "10px" }}>
              3️⃣
            </span>
            <h3 style={{ marginBottom: "10px" }}>Verification & Transparency</h3>
            <p style={{ color: "#666", fontSize: "14px" }}>
              We review every donation to ensure it reaches the right people
            </p>
          </div>
          <div style={{ textAlign: "center", padding: "20px" }}>
            <span style={{ fontSize: "48px", display: "block", marginBottom: "10px" }}>
              4️⃣
            </span>
            <h3 style={{ marginBottom: "10px" }}>Make an Impact</h3>
            <p style={{ color: "#666", fontSize: "14px" }}>
              Your donation makes a real difference in people's lives
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Transparency */}
      <section className="card" style={{ marginBottom: "20px" }}>
        <h2 style={{ marginBottom: "15px" }}>Our Commitment to Transparency</h2>
        <p style={{ color: "#666", lineHeight: "1.6" }}>
          We ensure your donations reach those who need them directly and 
          transparently. Every donation goes through our verification process, 
          and we provide regular reports on total donations and how they're used.
        </p>
      </section>

      {/* Section 6: Statistics */}
      <section className="card" style={{ marginBottom: "20px" }}>
        <h2 style={{ marginBottom: "30px", textAlign: "center" }}>Our Achievements</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "30px",
            textAlign: "center",
          }}
        >
          <div>
            <h3 style={{ fontSize: "36px", color: "#4a90e2", marginBottom: "10px" }}>
              500+
            </h3>
            <p style={{ color: "#666" }}>Donors</p>
          </div>
          <div>
            <h3 style={{ fontSize: "36px", color: "#4a90e2", marginBottom: "10px" }}>
              10+
            </h3>
            <p style={{ color: "#666" }}>Active Campaigns</p>
          </div>
          <div>
            <h3 style={{ fontSize: "36px", color: "#4a90e2", marginBottom: "10px" }}>
              $10,000+
            </h3>
            <p style={{ color: "#666" }}>Total Donations</p>
          </div>
        </div>
      </section>

      {/* Section 7: Contact Us */}
      <section className="card" style={{ textAlign: "center" }}>
        <h2 style={{ marginBottom: "20px" }}>Contact Us</h2>
        <p style={{ color: "#666", marginBottom: "10px" }}>
          📧 Email: info@onehand.com
        </p>
        <p style={{ color: "#666", marginBottom: "10px" }}>
          📞 Phone: +962 779397090
        </p>
        <p style={{ color: "#666" }}>
          📍 Location: Amman, Jordan
        </p>
      </section>
    </div>
  );
};

export default About;