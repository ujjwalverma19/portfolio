"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteData } from "@/data/site-data";

gsap.registerPlugin(ScrollTrigger);

export default function ProductThinking() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((el, i) => {
        if (!el) return;

        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            delay: i * 0.05,
          }
        );

        /* Subtle hover effect via GSAP */
        const handleEnter = () => {
          gsap.to(el, {
            borderColor: "rgba(255,255,255,0.15)",
            duration: 0.4,
            ease: "power2.out",
          });
          const title = el.querySelector(".thinking-title");
          if (title) {
            gsap.to(title, {
              letterSpacing: "0.01em",
              duration: 0.6,
              ease: "power2.out",
            });
          }
        };

        const handleLeave = () => {
          gsap.to(el, {
            borderColor: "rgba(255,255,255,0.08)",
            duration: 0.4,
            ease: "power2.out",
          });
          const title = el.querySelector(".thinking-title");
          if (title) {
            gsap.to(title, {
              letterSpacing: "-0.02em",
              duration: 0.6,
              ease: "power2.out",
            });
          }
        };

        el.addEventListener("mouseenter", handleEnter);
        el.addEventListener("mouseleave", handleLeave);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const { productThinking } = siteData;

  return (
    <section ref={sectionRef} id="thinking" className="section">
      <div className="container">
        {/* Section label */}
        <div className="section-label">
          <span className="section-label__index">03</span>
          <div className="section-label__line" />
          <span className="section-label__text">Product Thinking</span>
        </div>

        <h2
          className="display-xl"
          style={{
            marginBottom: "clamp(48px, 6vh, 80px)",
            maxWidth: "800px",
          }}
        >
          THOUGHTS.
          <br />
          <span style={{ color: "var(--text-secondary)" }}>
            FRAMEWORKS.
          </span>
        </h2>

        {/* Editorial card grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
            gap: "1px",
            background: "var(--border)",
          }}
        >
          {productThinking.map((thought, i) => (
            <div
              key={thought.title}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="editorial-card"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "280px",
                cursor: "default",
                opacity: 0,
              }}
            >
              {/* Top row: index + category */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "32px",
                }}
              >
                <span className="meta">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="label"
                  style={{
                    padding: "4px 0",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  {thought.category}
                </span>
              </div>

              {/* Title */}
              <h3
                className="thinking-title"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
                  fontWeight: 600,
                  color: "var(--text)",
                  lineHeight: 1.25,
                  letterSpacing: "-0.02em",
                  marginBottom: "16px",
                }}
              >
                {thought.title}
              </h3>

              {/* Insight */}
              <p
                className="body"
                style={{
                  flex: 1,
                  marginBottom: "24px",
                }}
              >
                {thought.insight}
              </p>

              {/* Bottom accent — thin line */}
              <div
                style={{
                  width: "32px",
                  height: "1px",
                  background: "var(--text-tertiary)",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
