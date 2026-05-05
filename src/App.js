// export default App;
import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";

const people = [
  {
    id: 1,
    name: "Ayokunle Ogunfododo",
    title: "Software Engineer",
    linkedinUrl: "https://www.linkedin.com/in/ayokunle-ogunfidodo/",
    imagePath: "/ayo.jpeg",
  },
  {
    id: 2,
    name: "Mai Ali Atwa",
    title: "Data Scientist",
    linkedinUrl: "https://www.linkedin.com/in/mai-ali-atwa/",
    imagePath: "/mai.jpeg",
  },
  {
    id: 3,
    name: "Brenda Onglaine",
    title: "UX Designer",
    linkedinUrl: "https://www.linkedin.com/in/brendaonglaine/",
    imagePath: "/brenda.jpeg",
  },
  {
    id: 4,
    name: "Ville Kankainen",
    title: "CTO",
    linkedinUrl: "https://www.linkedin.com/in/villekankainen/",
    imagePath: "/ville.jpeg",
  },
  {
    id: 5,
    name: "Evgenia Shepeneva",
    title: "Marketing Director",
    linkedinUrl: "https://www.linkedin.com/in/evgenia-shepeneva/",
    imagePath: "/evgenia.jpeg",
  },
];

const ProfileCard = ({ person, isHovered, onHover, onLeave, isMobile }) => {
  return (
    <div
      style={{
        ...styles.card,
        ...(isHovered && !isMobile ? styles.cardHovered : {}),
        ...(isMobile && styles.cardMobile),
      }}
      onMouseEnter={() => !isMobile && onHover(person.id)}
      onMouseLeave={() => !isMobile && onLeave()}
      onClick={() => isMobile && onHover(isHovered ? null : person.id)}
    >
      <img
        src={person.imagePath}
        alt={person.name}
        style={{
          ...styles.avatar,
          ...(isHovered ? styles.avatarHovered : {}),
          ...(isMobile && styles.avatarMobile),
        }}
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/80?text=No+Image";
        }}
      />
      <h3
        style={{
          ...styles.name,
          ...(isHovered ? styles.nameHovered : {}),
          ...(isMobile && styles.nameMobile),
        }}
      >
        {isHovered
          ? person.name
          : isMobile
            ? person.name.split(" ")[0]
            : person.name.split(" ")[0]}
      </h3>
      <p
        style={{
          ...styles.title,
          ...(isHovered ? styles.titleHovered : {}),
          ...(isMobile && styles.titleMobile),
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
          ...(isMobile && styles.linkedinLinkMobile),
        }}
      >
        🔗 {isHovered ? "View LinkedIn Profile" : "LinkedIn"}
      </a>

      <div style={styles.qrContainer}>
        <QRCodeCanvas
          value={person.linkedinUrl}
          size={isHovered ? (isMobile ? 80 : 90) : isMobile ? 60 : 70}
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
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getGridStyles = () => {
    if (isMobile) {
      return styles.gridMobile;
    }
    if (isTablet) {
      return styles.gridTablet;
    }
    return styles.grid;
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.h1}>🌿 Meet the Team</h1>
        <p style={styles.subtitle}>
          {isMobile ? "Tap any profile to expand" : "Hover over any profile"}
        </p>
      </header>
      <div
        style={{
          ...getGridStyles(),
          ...(hoveredId && !isMobile && styles.gridWithHover),
        }}
      >
        {people.map((person) => (
          <ProfileCard
            key={person.id}
            person={person}
            isHovered={hoveredId === person.id}
            onHover={setHoveredId}
            onLeave={() => setHoveredId(null)}
            isMobile={isMobile}
          />
        ))}
      </div>
    </div>
  );
};

// 🎨 Fully responsive styles
const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
    fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
    padding: "1rem",
    margin: 0,
    boxSizing: "border-box",
  },
  header: {
    textAlign: "center",
    marginBottom: "1.5rem",
  },
  h1: {
    fontSize: "clamp(1.5rem, 6vw, 2rem)",
    margin: "0 0 0.5rem 0",
    color: "#14532d",
  },
  subtitle: {
    fontSize: "clamp(0.7rem, 3vw, 0.85rem)",
    color: "#166534",
    margin: 0,
  },
  // Desktop grid (5 columns)
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "1.5rem",
    maxWidth: "1400px",
    margin: "0 auto",
    width: "100%",
    transition: "all 0.3s ease",
    alignItems: "center",
  },
  // Tablet grid (2-3 columns)
  gridTablet: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1.5rem",
    maxWidth: "900px",
    margin: "0 auto",
    width: "100%",
  },
  // Mobile grid (1 column)
  gridMobile: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    maxWidth: "400px",
    margin: "0 auto",
    width: "100%",
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
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    border: "1px solid #86efac",
    cursor: "pointer",
    position: "relative",
    zIndex: 1,
  },
  cardMobile: {
    padding: "0.8rem",
    cursor: "pointer",
    marginBottom: "0",
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
  avatarMobile: {
    width: "70px",
    height: "70px",
    marginBottom: "0.5rem",
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
  nameMobile: {
    fontSize: "0.9rem",
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
  titleMobile: {
    fontSize: "0.7rem",
    marginBottom: "0.6rem",
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
  linkedinLinkMobile: {
    padding: "0.35rem 0.8rem",
    fontSize: "0.7rem",
    marginBottom: "0.6rem",
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

export default App;
