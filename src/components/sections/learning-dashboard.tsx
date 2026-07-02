"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteData } from "@/data/site-data";

gsap.registerPlugin(ScrollTrigger);

export default function LearningDashboard() {
  const sectionRef = useRef<HTMLElement>(null);
  const widgetRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      widgetRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            delay: i * 0.08,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const { learning } = siteData;

  return (
    <section ref={sectionRef} id="learning" className="section">
      <div className="container">
        {/* Section label */}
        <div className="section-label">
          <span className="section-label__index">04</span>
          <div className="section-label__line" />
          <span className="section-label__text">Learning</span>
        </div>

        <h2
          className="display-xl"
          style={{
            marginBottom: "clamp(48px, 6vh, 80px)",
            maxWidth: "800px",
          }}
        >
          ALWAYS
          <br />
          <span style={{ color: "var(--text-secondary)" }}>LEARNING.</span>
        </h2>

        {/* Dashboard grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            background: "var(--border)",
          }}
        >
          {/* Current Focus */}
          <div
            ref={(el) => { widgetRefs.current[0] = el; }}
            style={{
              background: "var(--surface)",
              padding: "clamp(24px, 3vw, 40px)",
              opacity: 0,
            }}
          >
            <div
              className="label label--accent"
              style={{ marginBottom: "32px" }}
            >
              Current Focus
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0",
              }}
            >
              {learning.currentFocus.map((item) => (
                <div
                  key={item.name}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px 0",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.875rem",
                      color: "var(--text)",
                      fontWeight: 500,
                    }}
                  >
                    {item.name}
                  </span>
                  <span className="meta">{item.level}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Books */}
          <div
            ref={(el) => { widgetRefs.current[1] = el; }}
            style={{
              background: "var(--surface)",
              padding: "clamp(24px, 3vw, 40px)",
              opacity: 0,
            }}
          >
            <div
              className="label label--accent"
              style={{ marginBottom: "32px" }}
            >
              Reading List
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0",
              }}
            >
              {learning.books.map((book, i) => (
                <div
                  key={book}
                  style={{
                    display: "flex",
                    gap: "16px",
                    alignItems: "baseline",
                    padding: "12px 0",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <span className="meta" style={{ width: "20px" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.8125rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.5,
                    }}
                  >
                    {book}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column: Courses + Experiments */}
          <div
            ref={(el) => { widgetRefs.current[2] = el; }}
            style={{
              background: "var(--surface)",
              padding: "clamp(24px, 3vw, 40px)",
              display: "flex",
              flexDirection: "column",
              opacity: 0,
            }}
          >
            {/* Courses */}
            <div style={{ marginBottom: "40px" }}>
              <div
                className="label label--accent"
                style={{ marginBottom: "24px" }}
              >
                Courses & Certs
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0",
                }}
              >
                {learning.courses.map((course) => (
                  <div
                    key={course}
                    style={{
                      padding: "12px 0",
                      borderBottom: "1px solid var(--border)",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.8125rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {course}
                  </div>
                ))}
              </div>
            </div>

            {/* Experiments */}
            <div>
              <div
                className="label label--accent"
                style={{ marginBottom: "24px" }}
              >
                Experiments
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0",
                }}
              >
                {learning.experiments.map((exp) => (
                  <div
                    key={exp}
                    style={{
                      padding: "12px 0",
                      borderBottom: "1px solid var(--border)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      color: "var(--text-tertiary)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    → {exp}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
