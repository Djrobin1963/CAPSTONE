import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Movie Reviews. All rights reserved.</p>
    </footer>
  );
}
