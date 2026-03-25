import React, { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

const Header = ({ isDark, setIsDark }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { id: "home", label: "Home", href: "#home" },
    { id: "about", label: "About Me", href: "#about" },
    { id: "timeline", label: "Timeline", href: "#timeline" },
    { id: "skills", label: "Skills", href: "#skills" },
    { id: "projects", label: "Projects", href: "#projects" },
    { id: "contact", label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (id) => {
    setActiveSection(id);
    setIsMenuOpen(false);
    // Scroll to section
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.id);
      let current = "home";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-[var(--border-color)]"
      style={{
        backgroundColor: isDark
          ? "rgba(15, 23, 42, 0.9)"
          : "rgba(245, 247, 250, 0.9)",
      }}
    >
      <div className="px-4 md:px-8 lg:px-12 h-[70px] flex items-center justify-between">
        {/* Logo / Portfolio Text */}
        <div className="flex items-center">
          <h2
            className="text-2xl font-bold tracking-tight"
            style={{ color: "var(--accent-primary)" }}
          >
            Portfolio
          </h2>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="text-sm font-medium transition-all duration-300 relative group"
              style={{
                color:
                  activeSection === item.id
                    ? "var(--accent-primary)"
                    : "var(--text-secondary)",
              }}
            >
              {item.label}
              <span
                className="absolute bottom-0 left-0 h-0.5 bg-[var(--accent-primary)] transition-all duration-300"
                style={{
                  width: activeSection === item.id ? "100%" : "0%",
                }}
              ></span>
            </button>
          ))}
        </nav>

        {/* Dark Mode Toggle + Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-lg transition-all duration-300"
            style={{
              backgroundColor: "var(--accent-light)",
              color: "var(--accent-primary)",
            }}
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg transition-all duration-300"
            style={{
              backgroundColor: "var(--border-color)",
              color: "var(--text-primary)",
            }}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div
          className="md:hidden border-t border-[var(--border-color)] animate-fade-in"
          style={{ backgroundColor: "var(--bg-secondary)" }}
        >
          <nav className="px-4 py-4 flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300"
                style={{
                  backgroundColor:
                    activeSection === item.id
                      ? "var(--accent-light)"
                      : "transparent",
                  color:
                    activeSection === item.id
                      ? "var(--accent-primary)"
                      : "var(--text-secondary)",
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
