// export default App;
import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const people = [
  {
    id: 1,
    name: "Ayokunle Ogunfododo",
    title: "Software Engineer / frontend focused full stack developer",
    linkedinUrl: "https://www.linkedin.com/in/ayokunle-ogunfidodo/",
    imagePath: "/ayo.jpeg",
  },
  {
    id: 2,
    name: "Mai Ali Atwa",
    title:
      "System and network administrator with interest in IoT and antenna design",
    linkedinUrl: "https://www.linkedin.com/in/mai-ali-atwa/",
    imagePath: "/mai.jpeg",
  },
  {
    id: 3,
    name: "Brenda Onglaine",
    title: "Human centered Finance Specialist",
    linkedinUrl: "https://www.linkedin.com/in/brendaonglaine/",
    imagePath: "/brenda.jpeg",
  },
  {
    id: 4,
    name: "Ville Kankainen",
    title: "Games and Hybrid Media experiences",
    linkedinUrl: "https://www.linkedin.com/in/villekankainen/",
    imagePath: "/ville.jpeg",
  },
  {
    id: 5,
    name: "Evgenia Shepeneva",
    title: "BIM specialist and design coordinator",
    linkedinUrl: "https://www.linkedin.com/in/evgenia-shepeneva/",
    imagePath: "/evgenia.jpeg",
  },
];

const ProfileCard = ({ person, isHovered, onHover, onLeave }) => {
  return (
    <div
      style={{
        ...styles.card,
        ...(isHovered ? styles.cardHovered : {}),
      }}
      onMouseEnter={() => onHover(person.id)}
      onMouseLeave={onLeave}
    >
      <img
        src={person.imagePath}
        alt={person.name}
        style={{
          ...styles.avatar,
          ...(isHovered ? styles.avatarHovered : {}),
        }}
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/80?text=No+Image";
        }}
      />
      <h3
        style={{
          ...styles.name,
          ...(isHovered ? styles.nameHovered : {}),
        }}
      >
        {isHovered ? person.name : person.name.split(" ")[0]}
      </h3>
      <p
        style={{
          ...styles.title,
          ...(isHovered ? styles.titleHovered : {}),
        }}
      >
        {person.title}
      </p>

      <a
        href={person.linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          ...styles.linkedinLink,
          ...(isHovered ? styles.linkedinLinkHovered : {}),
        }}
      >
        🔗 {isHovered ? "View LinkedIn Profile" : "LinkedIn"}
      </a>

      <div style={styles.qrContainer}>
        <QRCodeCanvas
          value={person.linkedinUrl}
          size={isHovered ? 90 : 70}
          bgColor="#ffffff"
          fgColor="#14532d"
        />
        <p style={styles.qrLabel}>Scan QR</p>
      </div>
    </div>
  );
};

const App = () => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.h1}>🌿 Meet the Team</h1>
        <p style={styles.subtitle}>
          Connect on LinkedIn - Hover over any profile
        </p>
      </header>
      <div
        style={{
          ...styles.grid,
          ...(hoveredId && styles.gridWithHover),
        }}
      >
        {people.map((person) => (
          <ProfileCard
            key={person.id}
            person={person}
            isHovered={hoveredId === person.id}
            onHover={setHoveredId}
            onLeave={() => setHoveredId(null)}
          />
        ))}
      </div>
    </div>
  );
};

// 🎨 Enhanced styles with hover effects
const styles = {
  container: {
    minHeight: "100vh",
    height: "100vh",
    background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
    fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    overflow: "auto",
    margin: 0,
    boxSizing: "border-box",
  },
  header: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  h1: {
    fontSize: "clamp(1.5rem, 4vw, 2rem)",
    margin: "0 0 0.5rem 0",
    color: "#14532d",
  },
  subtitle: {
    fontSize: "clamp(0.75rem, 2vw, 0.9rem)",
    color: "#166534",
    margin: 0,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "1.5rem",
    maxWidth: "1400px",
    margin: "0 auto",
    width: "100%",
    transition: "all 0.3s ease",
    alignItems: "center",
  },
  gridWithHover: {
    gap: "2rem",
    "& > div:not(:hover)": {
      opacity: 0.5,
      transform: "scale(0.9)",
    },
  },
  card: {
    background: "white",
    borderRadius: "1.2rem",
    padding: "1rem 0.8rem 1rem",
    boxShadow: "0 8px 20px -6px rgba(0, 64, 0, 0.15)",
    textAlign: "center",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    border: "1px solid #86efac",
    cursor: "pointer",
    position: "relative",
    zIndex: 1,
  },
  cardHovered: {
    transform: "scale(1.3)",
    boxShadow: "0 20px 40px -12px rgba(0, 64, 0, 0.4)",
    zIndex: 10,
    background: "white",
    border: "2px solid #22c55e",
    position: "relative",
    margin: "0.5rem",
  },
  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "0.75rem",
    border: "2px solid #22c55e",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
  },
  avatarHovered: {
    width: "110px",
    height: "110px",
    border: "3px solid #15803d",
    boxShadow: "0 6px 12px rgba(0, 64, 0, 0.2)",
    marginBottom: "1rem",
  },
  name: {
    fontSize: "1rem",
    fontWeight: "600",
    margin: "0.5rem 0 0.2rem",
    color: "#166534",
    transition: "all 0.3s ease",
  },
  nameHovered: {
    fontSize: "1.3rem",
    margin: "0.75rem 0 0.3rem",
    color: "#0a3d1e",
  },
  title: {
    color: "#4b5563",
    fontSize: "0.75rem",
    marginBottom: "0.8rem",
    fontWeight: "500",
    transition: "all 0.3s ease",
  },
  titleHovered: {
    fontSize: "0.9rem",
    marginBottom: "1rem",
    color: "#1f2937",
  },
  linkedinLink: {
    display: "inline-block",
    backgroundColor: "#0a6640",
    color: "white",
    textDecoration: "none",
    padding: "0.4rem 1rem",
    borderRadius: "999px",
    fontSize: "0.75rem",
    fontWeight: "500",
    marginBottom: "0.8rem",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  linkedinLinkHovered: {
    backgroundColor: "#0d9488",
    padding: "0.5rem 1.2rem",
    fontSize: "0.85rem",
    marginBottom: "1rem",
    transform: "scale(1.05)",
  },
  qrContainer: {
    marginTop: "0.5rem",
    paddingTop: "0.6rem",
    borderTop: "1px solid #bbf7d0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "all 0.3s ease",
  },
  qrLabel: {
    fontSize: "0.6rem",
    color: "#4d7c0f",
    marginTop: "0.4rem",
    letterSpacing: "0.3px",
  },
};

// Add responsive CSS for different screen sizes
const responsiveStyles = `
  @media (max-width: 1024px) {
    .card-hovered {
      transform: scale(1.2) !important;
    }
  }

  @media (max-width: 768px) {
    .card-hovered {
      transform: scale(1.15) !important;
    }
  }

  @media (max-width: 640px) {
    .card-hovered {
      transform: scale(1.1) !important;
    }
  }
`;

// Inject responsive styles
const styleSheet = document.createElement("style");
styleSheet.textContent = responsiveStyles;
document.head.appendChild(styleSheet);

export default App;
