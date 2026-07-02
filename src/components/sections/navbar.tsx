"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import MagneticButton from "../magnetic-button";

const navItems = [
  { label: "Journey", href: "#journey" },
  { label: "Products", href: "#products" },
  { label: "Thinking", href: "#thinking" },
  { label: "Learning", href: "#learning" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    /* Animate in */
    gsap.fromTo(
      nav,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    );

    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      ref={navRef}
      id="nav"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 var(--container-pad)",
        opacity: 0,
      }}
    >
      <nav
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 0",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          background: scrolled ? "rgba(10, 10, 10, 0.9)" : "transparent",
          backdropFilter: scrolled ? "blur(8px)" : "none",
          transition: "border-color 0.6s ease, background 0.6s ease, backdrop-filter 0.6s ease",
        }}
      >
        {/* Logo — Monogram */}
        <a
          href="#"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "var(--text)",
            textDecoration: "none",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          UJJWAL VERMA
        </a>

        {/* Nav Links */}
        <div className="nav-desktop" style={{ display: "flex", gap: "8px" }}>
          {navItems.map((item) => (
            <MagneticButton key={item.label} range={20} strength={0.25}>
              <a
                href={item.href}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.625rem",
                  fontWeight: 400,
                  color: "var(--text-tertiary)",
                  textDecoration: "none",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  transition: "color 0.3s ease",
                  padding: "10px 16px",
                  display: "block",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--text)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--text-tertiary)")
                }
              >
                {item.label}
              </a>
            </MagneticButton>
          ))}
        </div>
      </nav>
    </header>
  );
}
