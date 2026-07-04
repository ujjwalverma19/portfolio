"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    title: "PRODUCT",
    items: [
      "Product Strategy",
      "Product Thinking",
      "User Research",
      "PRDs",
      "Roadmapping",
      "Feature Prioritization",
    ],
  },
  {
    title: "AI",
    items: [
      "Prompt Engineering",
      "LLM Applications",
      "Semantic Search",
      "AI Product Design",
      "Retrieval Systems",
    ],
  },
  {
    title: "ENGINEERING",
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Tailwind CSS",
    ],
  },
  {
    title: "TOOLS",
    items: [
      "Git",
      "GitHub",
      "Figma",
      "Vercel",
      "Postman",
      "VS Code",
    ],
  },
];

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro fade in
      if (introRef.current) {
        gsap.fromTo(
          introRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: introRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Grid columns stagger
      columnRefs.current.forEach((col, i) => {
        if (!col) return;
        gsap.fromTo(
          col,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: col,
              start: "top 90%",
              toggleActions: "play none none none",
            },
            delay: i * 0.08,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="capabilities" className="section">
      <div className="container">
        {/* Section label */}
        <div className="section-label">
          <span className="section-label__index">04</span>
          <div className="section-label__line" />
          <span className="section-label__text">Capabilities</span>
        </div>

        {/* Intro Layout */}
        <div
          ref={introRef}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "32px",
            marginBottom: "clamp(64px, 10vh, 120px)",
            opacity: 0,
          }}
        >
          <h2 className="display-xl" style={{ margin: 0 }}>
            CORE
            <br />
            <span style={{ color: "var(--text-secondary)" }}>EXPERTISE.</span>
          </h2>
          <p
            className="body"
            style={{
              maxWidth: "640px",
              fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
              lineHeight: 1.5,
              color: "var(--text-secondary)",
              margin: 0,
              fontWeight: 400,
              letterSpacing: "-0.01em",
            }}
          >
            Technology is only part of building products. My focus is understanding people, designing experiences, and turning ideas into products that solve meaningful problems.
          </p>
        </div>

        {/* Categories Columns Grid */}
        <div
          ref={gridRef}
          className="capabilities-grid"
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "40px",
          }}
        >
          {categories.map((cat, i) => (
            <div
              key={cat.title}
              ref={(el) => {
                columnRefs.current[i] = el;
              }}
              className="capabilities-column"
              style={{ opacity: 0 }}
            >
              {/* Category Header */}
              <div
                className="label label--accent"
                style={{
                  marginBottom: "24px",
                  fontSize: "0.6875rem",
                  letterSpacing: "0.15em",
                  color: "var(--text)",
                }}
              >
                {cat.title}
              </div>

              {/* Category Items */}
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {cat.items.map((item) => (
                  <li
                    key={item}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.875rem",
                      color: "var(--text-secondary)",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      transition: "color 0.2s ease, transform 0.2s ease",
                    }}
                    className="capability-item"
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.5rem",
                        opacity: 0.4,
                      }}
                    >
                      ●
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
