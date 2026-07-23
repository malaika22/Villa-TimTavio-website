import { NAV_LINKS } from '../data/slides';

const darkLogo = '/lookbook/dark-logo.svg';

export default function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <a className="footer-logo" href="#slide-0">
          <img src={darkLogo} alt="Villa TimTavio" className="footer-logo-img" />
        </a>
        <ul className="footer-links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="footer-bottom">
        <div className="footer-copy">© 2026 Casa TimTavio. All rights reserved.</div>
        <div className="footer-location">Puerto Escondido, Oaxaca · Mexico</div>
      </div>
    </footer>
  );
}
