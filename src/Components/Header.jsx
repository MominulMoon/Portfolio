/**
 * Header
 * Displays the main top navigation bar. Includes a hamburger menu for mobile devices
 * and maps through an array of navigation links. The component subscribes to the current
 * active section to highly the active link. It also intercepts clicks on the CTA button
 * to execute the inherited ripple animation.
 */
function Header({
  activeSection,
  isMenuOpen,
  toggleMenu,
  closeMenu,
  buttonAction,
  onHeaderHoverChange,
}) {
  const navItems = [
    { id: "#home", label: "Home" },
    { id: "#about", label: "About" },
    { id: "#skills", label: "Skills" },
    { id: "#stats", label: "Stats" },
    { id: "#service", label: "Services" },
    { id: "#project", label: "Projects" },
    { id: "#contact", label: "Contact" },
  ];

  return (
    <header
      onMouseEnter={() => onHeaderHoverChange?.(true)}
      onMouseLeave={() => onHeaderHoverChange?.(false)}
    >
      <nav className="navbar">
        <div className="nav-brand">
          Portfolio<span className="brand-dot">.</span>
        </div>
        <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={item.id}
                className={`nav-link ${activeSection === item.id ? "active" : ""}`}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-cta">
          <a
            href="#contact"
            className="cta-btn"
            onClick={(e) => {
              closeMenu();
              buttonAction(e);
            }}
          >
            Let's Talk
          </a>
        </div>
        <div
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </header>
  );
}

export default Header;
