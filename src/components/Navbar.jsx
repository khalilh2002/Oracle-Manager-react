import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <h1 style={styles.logo}>Management System</h1>
      <ul style={styles.navLinks}>
        <li><Link to="/users" style={styles.link}>Users</Link></li>
        <li><Link to="/roles" style={styles.link}>Roles</Link></li>
        <li><Link to="/quotas" style={styles.link}>Quotas</Link></li>
        <li><Link to="/password-policies" style={styles.link}>Password Policies</Link></li>
        <li><Link to="/security-policies" style={styles.link}>Security Policies</Link></li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#333",
    color: "#fff",
    padding: "10px 20px",
  },
  logo: {
    fontSize: "1.5em",
    fontWeight: "bold",
  },
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "15px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
  },
};

export default Navbar;
