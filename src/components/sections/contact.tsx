"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteData } from "@/data/site-data";
import EditorialLink from "../editorial-link";
import MagneticButton from "../magnetic-button";

gsap.registerPlugin(ScrollTrigger);

const links = [
  { label: "Email", href: `mailto:${siteData.social.email}` },
  { label: "GitHub", href: siteData.social.github },
  { label: "LinkedIn", href: siteData.social.linkedin },
  { label: "LeetCode", href: siteData.social.leetcode },
  { label: "Resume", href: siteData.social.resume },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      linkRefs.current.forEach((el, i) => {
        if (!el) return;

        gsap.fromTo(
          el,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
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
    <section ref={sectionRef} id="contact" className="section">
      <div className="container">
        {/* Section label */}
        <div className="section-label">
          <span className="section-label__index">05</span>
          <div className="section-label__line" />
          <span className="section-label__text">Contact</span>
        </div>

        {/* Big headline */}
        <h2
          ref={headlineRef}
          className="display-hero"
          style={{
            marginBottom: "clamp(48px, 8vh, 100px)",
            maxWidth: "900px",
            opacity: 0,
          }}
        >
          LET&apos;S
          <br />
          TALK.
        </h2>

        {/* Links — editorial list */}
        <div
          style={{
            maxWidth: "600px",
          }}
        >
          {links.map((link, i) => (
            <div
              key={link.label}
              ref={(el) => { linkRefs.current[i] = el; }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 0",
                borderBottom: "1px solid var(--border)",
                opacity: 0,
              }}
            >
              <MagneticButton range={40} strength={0.3}>
                <EditorialLink href={link.href}>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.125rem, 2.5vw, 1.75rem)",
                      fontWeight: 500,
                      letterSpacing: "-0.01em",
                      textTransform: "none",
                    }}
                  >
                    {link.label}
                  </span>
                </EditorialLink>
              </MagneticButton>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer
          style={{
            marginTop: "clamp(80px, 12vh, 160px)",
            paddingTop: "24px",
            borderTop: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <div
              className="meta"
              style={{ marginBottom: "8px" }}
            >
              © UJJWAL VERMA · ALL RIGHTS RESERVED
            </div>
            <div className="meta">
              DESIGNED & BUILT WITH INTENTION
            </div>
          </div>

          <div className="meta" style={{ textAlign: "right" }}>
            <div style={{ marginBottom: "8px" }}>
              B.TECH INFORMATION TECHNOLOGY
            </div>
            <div>NIET · CGPA {siteData.education.cgpa}</div>
          </div>
        </footer>
      </div>
    </section>
  );
}
