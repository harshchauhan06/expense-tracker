import "./footer.css";

import {
  FaReact,
  FaNodeJs,
  FaChartPie,
  FaGithub,
} from "react-icons/fa";

import {
  SiMui,
  SiExpress,
  SiPostgresql,
} from "react-icons/si";

function Footer() {
  return (
    <footer className="footer">

      <h2 className="footer-title">Expense Tracker</h2>

      <p className="footer-tagline">
        Track smarter. Spend wiser.
      </p>

      <h3 className="footer-heading">
        Built With
      </h3>

      <div className="tech-stack">

        <span>
          <FaReact />
          React
        </span>

        <span>
          <SiMui />
          Material UI
        </span>

        <span>
          <FaChartPie />
          Recharts
        </span>

        <span>
          <FaNodeJs />
          Node.js
        </span>

        <span>
          <SiExpress />
          Express
        </span>

        <span>
          <SiPostgresql />
          PostgreSQL
        </span>

      </div>

      <p className="footer-copy">
        Full Stack Expense Management Application
      </p>

      <p className="footer-credit">
        Designed & Developed by <strong>Harsh Chauhan</strong>
      </p>

      <p className="footer-rights">
        © {new Date().getFullYear()} All Rights Reserved.
      </p>

    </footer>
  );
}

export default Footer;