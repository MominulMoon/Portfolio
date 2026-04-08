function Header() {
  return (
    <header>
      <nav className="navbar">
        <div className="nav-brand">
          Portfolio<span className="brand-dot">.</span>
        </div>
        <ul className="nav-menu">
          <li>
            <a href="#home" className="nav-link active">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="nav-link">
              About
            </a>
          </li>
          <li>
            <a href="#skills" className="nav-link">
              Skills
            </a>
          </li>
          <li>
            <a href="#service" className="nav-link">
              Services
            </a>
          </li>
          <li>
            <a href="#project" className="nav-link">
              Projects
            </a>
          </li>
          <li>
            <a href="#contact" className="nav-link">
              Contact
            </a>
          </li>
        </ul>
        <div className="nav-cta">
          <a href="#contact" className="cta-btn">
            Let's Talk
          </a>
        </div>
        <div className="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </header>
  );
}

export default Header;
