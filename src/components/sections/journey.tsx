"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteData } from "@/data/site-data";

gsap.registerPlugin(ScrollTrigger);

export default function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Animate the vertical timeline line */
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "bottom 50%",
              scrub: 1,
            },
          }
        );
      }

      /* Stagger timeline items */
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const { journey } = siteData;

  return (
    <section ref={sectionRef} id="journey" className="section">
      <div className="container">
        {/* Section label */}
        <div className="section-label">
          <span className="section-label__index">01</span>
          <div className="section-label__line" />
          <span className="section-label__text">The Journey</span>
        </div>

        {/* Headline */}
        <h2
          className="display-xl"
          style={{ marginBottom: "16px", maxWidth: "800px" }}
        >
          NOT A RESUME.
        </h2>
        <h2
          className="display-xl"
          style={{
            marginBottom: "clamp(48px, 6vh, 80px)",
            maxWidth: "800px",
            color: "var(--text-secondary)",
          }}
        >
          A STORY.
        </h2>

        {/* Timeline */}
        <div
          style={{
            position: "relative",
            maxWidth: "900px",
          }}
        >
          {/* Vertical line */}
          <div
            ref={lineRef}
            style={{
              position: "absolute",
              left: "100px",
              top: 0,
              bottom: 0,
              width: "1px",
              background: "var(--border-strong)",
              transformOrigin: "top",
            }}
          />

          {journey.map((item, i) => (
            <div
              key={item.year}
              ref={(el) => { itemRefs.current[i] = el; }}
              style={{
                display: "grid",
                gridTemplateColumns: "100px 1fr",
                gap: "clamp(24px, 4vw, 64px)",
                paddingBottom: i < journey.length - 1 ? "clamp(48px, 6vh, 80px)" : 0,
                position: "relative",
                opacity: 0,
              }}
            >
              {/* Year */}
              <div
                style={{
                  position: "relative",
                  textAlign: "right",
                  paddingRight: "clamp(16px, 2vw, 32px)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                    fontWeight: 700,
                    color: item.current
                      ? "var(--text)"
                      : item.future
                      ? "var(--text-tertiary)"
                      : "var(--text-secondary)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  {item.year}
                </span>

                {/* Node dot */}
                <div
                  style={{
                    position: "absolute",
                    right: "-6px",
                    top: "8px",
                    width: item.current ? "12px" : "8px",
                    height: item.current ? "12px" : "8px",
                    borderRadius: "50%",
                    background: item.current
                      ? "var(--text)"
                      : item.future
                      ? "var(--text-tertiary)"
                      : "var(--text-secondary)",
                    border: item.current
                      ? "none"
                      : "1px solid var(--border)",
                  }}
                />
              </div>

              {/* Content */}
              <div>
                <h3
                  className="display-md hover-distort"
                  style={{
                    marginBottom: "12px",
                    color: item.future ? "var(--text-tertiary)" : "var(--text)",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="body"
                  style={{
                    maxWidth: "500px",
                    marginBottom: "20px",
                  }}
                >
                  {item.description}
                </p>

                {/* Tags */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  {item.items.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.625rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--text-tertiary)",
                        padding: "6px 12px",
                        border: "1px solid var(--border)",
                        background: "transparent",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {item.current && (
                  <div
                    className="meta"
                    style={{
                      marginTop: "16px",
                      color: "var(--text-secondary)",
                    }}
                  >
                    ● CURRENT
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
