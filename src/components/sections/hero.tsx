"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { siteData } from "@/data/site-data";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const portraitRef = useRef<HTMLDivElement>(null);
  const metaRefs = useRef<(HTMLDivElement | null)[]>([]);
  const overlayLinesRef = useRef<(HTMLDivElement | null)[]>([]);
  const descRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      /* Portrait reveal — scale from slightly zoomed */
      if (portraitRef.current) {
        tl.fromTo(
          portraitRef.current,
          { clipPath: "inset(100% 0 0 0)", scale: 1.1 },
          {
            clipPath: "inset(0% 0 0 0)",
            scale: 1,
            duration: 1.6,
            ease: "power3.inOut",
          },
          0.3
        );
      }

      /* Headline lines — staggered reveal */
      headlineRefs.current.forEach((el, i) => {
        if (!el) return;
        const inner = el.querySelector(".hero-line__inner");
        if (inner) {
          tl.fromTo(
            inner,
            { y: "110%" },
            { y: "0%", duration: 1.2, ease: "power4.out" },
            0.6 + i * 0.08
          );
        }
      });

      /* Subtitle */
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          1.4
        );
      }

      /* Description */
      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          1.6
        );
      }

      /* Overlay geometric lines */
      overlayLinesRef.current.forEach((el, i) => {
        if (!el) return;
        tl.fromTo(
          el,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 1, ease: "power2.out" },
          0.8 + i * 0.15
        );
      });

      /* Metadata labels */
      metaRefs.current.forEach((el, i) => {
        if (!el) return;
        tl.fromTo(
          el,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          1.2 + i * 0.1
        );
      });

      /* Scroll parallax */
      if (portraitRef.current) {
        gsap.to(portraitRef.current, {
          y: -80,
          scale: 0.95,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      headlineRefs.current.forEach((el) => {
        if (!el) return;
        gsap.to(el, {
          y: -30,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 2,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const { hero } = siteData;

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "stretch",
        overflow: "hidden",
        paddingTop: "80px",
      }}
    >
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 5,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(24px, 4vw, 80px)",
          alignItems: "center",
          minHeight: "calc(100vh - 80px)",
        }}
      >
        {/* Left: Typography */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Headline */}
          <div style={{ marginBottom: "clamp(32px, 4vh, 56px)" }}>
            {hero.lines.map((line, i) => (
              <div
                key={i}
                ref={(el) => { headlineRefs.current[i] = el; }}
                className="hero-line"
                style={{
                  overflow: "hidden",
                  lineHeight: 1,
                }}
              >
                <div
                  className="hero-line__inner display-hero"
                  style={{
                    transform: "translateY(110%)",
                  }}
                >
                  {line}
                </div>
              </div>
            ))}
          </div>

          {/* Subtitle info */}
          <div
            ref={subtitleRef}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              marginBottom: "24px",
              opacity: 0,
            }}
          >
            <span className="label label--accent">Ujjwal Verma</span>
            <span className="label">
              Product Builder · AI · Human Learning Systems
            </span>
          </div>

          {/* Description */}
          <p
            ref={descRef}
            className="body-lg"
            style={{
              maxWidth: "440px",
              opacity: 0,
              marginBottom: "40px",
            }}
          >
            {hero.description}
          </p>

        </div>

        {/* Right: Portrait */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          {/* Portrait layout wrapper (breathing room, crop marks, registration lines, layout labels) */}
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "460px",
              padding: "24px 0", // Breathing room
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 2, // Layered above the grid lines so they continue underneath
            }}
          >
            {/* Crop Marks & Printing Details */}
            <div style={{ position: "absolute", inset: "-12px", pointerEvents: "none" }}>
              {/* Top-Left Crop Mark */}
              <div style={{ position: "absolute", top: 0, left: 0, width: "16px", height: "16px" }}>
                <div style={{ position: "absolute", top: "8px", left: 0, width: "16px", height: "0.5px", background: "rgba(255,255,255,0.12)" }} />
                <div style={{ position: "absolute", top: 0, left: "8px", width: "0.5px", height: "16px", background: "rgba(255,255,255,0.12)" }} />
              </div>
              {/* Top-Right Crop Mark */}
              <div style={{ position: "absolute", top: 0, right: 0, width: "16px", height: "16px" }}>
                <div style={{ position: "absolute", top: "8px", left: 0, width: "16px", height: "0.5px", background: "rgba(255,255,255,0.12)" }} />
                <div style={{ position: "absolute", top: 0, left: "8px", width: "0.5px", height: "16px", background: "rgba(255,255,255,0.12)" }} />
              </div>
              {/* Bottom-Left Crop Mark */}
              <div style={{ position: "absolute", bottom: 0, left: 0, width: "16px", height: "16px" }}>
                <div style={{ position: "absolute", top: "8px", left: 0, width: "16px", height: "0.5px", background: "rgba(255,255,255,0.12)" }} />
                <div style={{ position: "absolute", top: 0, left: "8px", width: "0.5px", height: "16px", background: "rgba(255,255,255,0.12)" }} />
              </div>
              {/* Bottom-Right Crop Mark */}
              <div style={{ position: "absolute", bottom: 0, right: 0, width: "16px", height: "16px" }}>
                <div style={{ position: "absolute", top: "8px", left: 0, width: "16px", height: "0.5px", background: "rgba(255,255,255,0.12)" }} />
                <div style={{ position: "absolute", top: 0, left: "8px", width: "0.5px", height: "16px", background: "rgba(255,255,255,0.12)" }} />
              </div>

              {/* Registration Target Top Center */}
              <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", width: "12px", height: "12px", opacity: 0.6 }}>
                <div style={{ position: "absolute", top: "3px", left: "3px", width: "6px", height: "6px", border: "0.5px solid rgba(255,255,255,0.12)", borderRadius: "50%" }} />
                <div style={{ position: "absolute", top: "6px", left: 0, width: "12px", height: "0.5px", background: "rgba(255,255,255,0.12)" }} />
                <div style={{ position: "absolute", top: 0, left: "6px", width: "0.5px", height: "12px", background: "rgba(255,255,255,0.12)" }} />
              </div>

              {/* Registration Target Bottom Center */}
              <div style={{ position: "absolute", bottom: "-12px", left: "50%", transform: "translateX(-50%)", width: "12px", height: "12px", opacity: 0.6 }}>
                <div style={{ position: "absolute", top: "3px", left: "3px", width: "6px", height: "6px", border: "0.5px solid rgba(255,255,255,0.12)", borderRadius: "50%" }} />
                <div style={{ position: "absolute", top: "6px", left: 0, width: "12px", height: "0.5px", background: "rgba(255,255,255,0.12)" }} />
                <div style={{ position: "absolute", top: 0, left: "6px", width: "0.5px", height: "12px", background: "rgba(255,255,255,0.12)" }} />
              </div>

              {/* Technical Print Spec Labels */}
              <div style={{ position: "absolute", top: "-10px", left: "16px", fontFamily: "var(--font-mono)", fontSize: "0.4375rem", color: "rgba(255,255,255,0.15)", letterSpacing: "0.08em" }}>
                LAYOUT: HERO_PORTRAIT_FLMSPEC_V0.9
              </div>
              <div style={{ position: "absolute", bottom: "-10px", left: "16px", fontFamily: "var(--font-mono)", fontSize: "0.4375rem", color: "rgba(255,255,255,0.15)", letterSpacing: "0.08em" }}>
                COLOR_BAR: [■][■][■][■]
              </div>
              <div style={{ position: "absolute", bottom: "-10px", right: "16px", fontFamily: "var(--font-mono)", fontSize: "0.4375rem", color: "rgba(255,255,255,0.15)", letterSpacing: "0.08em" }}>
                PLATE: MAG_CYAN_02
              </div>
            </div>

            {/* Custom Editorial Photo Frame */}
            <div
              ref={portraitRef}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "3 / 4",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                background: "#0c0c0c",
                padding: "clamp(24px, 5.5vw, 40px)",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                clipPath: "inset(100% 0 0 0)",
                transition: "border-color 0.6s var(--ease-out-expo)",
              }}
            >
              {/* Museum Matte - Inner Secondary border */}
              <div
                style={{
                  position: "absolute",
                  inset: "12px",
                  border: "1px solid rgba(255, 255, 255, 0.04)",
                  pointerEvents: "none",
                  zIndex: 3,
                }}
              />

              {/* Magazine Corner Captions (Inside Matte Borders) */}
              {/* Top-Left Caption */}
              <div style={{ position: "absolute", top: "18px", left: "20px", fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.15em", color: "var(--text-tertiary)", textTransform: "uppercase", lineHeight: 1, zIndex: 3 }}>
                UJJWAL VERMA
              </div>
              {/* Top-Right Caption */}
              <div style={{ position: "absolute", top: "18px", right: "20px", fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.15em", color: "var(--text-tertiary)", textTransform: "uppercase", lineHeight: 1, zIndex: 3 }}>
                2026 EDITION
              </div>
              {/* Bottom-Left Caption */}
              <div style={{ position: "absolute", bottom: "18px", left: "20px", fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.15em", color: "var(--text-tertiary)", textTransform: "uppercase", lineHeight: 1, zIndex: 3 }}>
                FIG. 01 — PORTRAIT
              </div>
              {/* Bottom-Right Caption */}
              <div style={{ position: "absolute", bottom: "18px", right: "20px", fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.15em", color: "var(--text-tertiary)", textTransform: "uppercase", lineHeight: 1, zIndex: 3 }}>
                PRODUCT BUILDER
              </div>

              {/* Inner Mounted Photo Wrapper */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                  border: "1px solid rgba(255, 255, 255, 0.04)",
                  transform: isHovered ? "scale(1.005)" : "scale(1)",
                  transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {/* Photo Image */}
                <Image
                  src="/portrait.png"
                  alt={siteData.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 420px"
                  style={{
                    objectFit: "cover",
                    filter: isHovered
                      ? "grayscale(100%) contrast(1.03) brightness(0.96)"
                      : "grayscale(100%) contrast(1.01) brightness(0.92)",
                    transform: isHovered ? "scale(1.02) translate(-1px, -1px)" : "scale(1) translate(0px, 0px)",
                    transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />

                {/* Soft photographic lighting & matte finish shift overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.05) 0%, transparent 80%)",
                    mixBlendMode: "screen",
                    pointerEvents: "none",
                    opacity: isHovered ? 0.6 : 0.3,
                    transform: isHovered ? "scale(1.05) translate(2px, 2px)" : "scale(1) translate(0px, 0px)",
                    transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Overlay: thin geometric lines */}
          <div
            ref={(el) => { overlayLinesRef.current[0] = el; }}
            style={{
              position: "absolute",
              top: "10%",
              left: "-5%",
              width: "110%",
              height: "1px",
              background: "var(--border)",
              transformOrigin: "left",
              opacity: 0,
            }}
          />
          <div
            ref={(el) => { overlayLinesRef.current[1] = el; }}
            style={{
              position: "absolute",
              bottom: "15%",
              left: "-5%",
              width: "110%",
              height: "1px",
              background: "var(--border)",
              transformOrigin: "left",
              opacity: 0,
            }}
          />
          <div
            ref={(el) => { overlayLinesRef.current[2] = el; }}
            style={{
              position: "absolute",
              top: "-5%",
              right: "20%",
              width: "1px",
              height: "110%",
              background: "var(--border)",
              transformOrigin: "top",
              opacity: 0,
            }}
          />

          {/* Small metadata labels */}
          <div
            ref={(el) => { metaRefs.current[0] = el; }}
            className="meta"
            style={{
              position: "absolute",
              top: "8%",
              right: "5%",
              opacity: 0,
            }}
          >
            {hero.metadata.coordinates}
          </div>
          <div
            ref={(el) => { metaRefs.current[1] = el; }}
            className="meta"
            style={{
              position: "absolute",
              bottom: "12%",
              right: "5%",
              opacity: 0,
            }}
          >
            {hero.metadata.id}
          </div>
          <div
            ref={(el) => { metaRefs.current[2] = el; }}
            className="meta"
            style={{
              position: "absolute",
              top: "8%",
              left: "-3%",
              opacity: 0,
              writingMode: "vertical-rl",
              textOrientation: "mixed",
            }}
          >
            {hero.metadata.status}
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "var(--border)",
        }}
      />
    </section>
  );
}
