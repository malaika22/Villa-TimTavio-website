import { NAV_LINKS } from '../data/slides';

const darkLogo = '/lookbook/dark-logo.svg';

export default function Nav() {
  return (
    <nav>
      <a className="nav-logo" href="#slide-0">
        <img src={darkLogo} alt="Villa TimTavio" className="nav-logo-img" />
      </a>
      <ul className="nav-links">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
