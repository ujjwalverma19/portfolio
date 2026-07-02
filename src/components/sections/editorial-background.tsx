"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const abs = (extra: React.CSSProperties): React.CSSProperties => ({
  position: "absolute" as const,
  pointerEvents: "none" as const,
  userSelect: "none" as const,
  ...extra,
});

const mono: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.45rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  lineHeight: 1.4,
  color: "white",
};

export default function EditorialBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".eb-p");
      items.forEach((el) => {
        const speed = parseFloat(el.dataset.speed || "0.05");
        gsap.to(el, {
          yPercent: -speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        backgroundColor: "#0A0A0A",
      }}
    >
      {/* L1 — Dark matte paper texture with fibers */}
      <div style={abs({
        inset: 0, opacity: 0.035, mixBlendMode: "screen",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='5' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23p)'/%3E%3C/svg%3E")`,
        backgroundSize: "400px",
      })} />

      {/* L2 — Ink density / halftone with varying density */}
      <div style={abs({
        inset: 0, opacity: 0.025,
        backgroundImage: "radial-gradient(rgba(255,255,255,0.1) 0.5px, transparent 0.5px)",
        backgroundSize: "3px 3px",
        maskImage: "linear-gradient(160deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.4) 100%)",
        WebkitMaskImage: "linear-gradient(160deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.4) 100%)",
      })} />

      {/* L3 — Page fold shadows */}
      <div style={abs({ top: 0, bottom: 0, left: "47%", width: "6%",
        background: "linear-gradient(to right, transparent, rgba(0,0,0,0.08) 35%, rgba(0,0,0,0.12) 50%, rgba(0,0,0,0.08) 65%, transparent)",
      })} />
      <div style={abs({ top: 0, bottom: 0, left: 0, width: "12%",
        background: "linear-gradient(to right, rgba(0,0,0,0.1), transparent)",
      })} />
      <div style={abs({ top: 0, bottom: 0, right: 0, width: "10%",
        background: "linear-gradient(to left, rgba(0,0,0,0.08), transparent)",
      })} />

      {/* L4 — Newspaper fragments (barely visible collage) */}
      <div style={abs({ inset: 0 })}>
        <div className="eb-p" data-speed="0.03" style={abs({ top: "75vh", right: "14%", width: 180, opacity: 0.015, filter: "blur(3px)", transform: "rotate(-1.5deg)" })}>
          <div style={{ height: 16, background: "white", marginBottom: 5, width: "50%" }} />
          <div style={{ height: 5, background: "white", marginBottom: 3 }} />
          <div style={{ height: 5, background: "white", marginBottom: 3, width: "90%" }} />
          <div style={{ height: 5, background: "white", marginBottom: 3, width: "75%" }} />
          <div style={{ height: 5, background: "white", width: "40%" }} />
        </div>
        <div className="eb-p" data-speed="0.05" style={abs({ top: "210vh", left: "7%", width: 220, opacity: 0.012, filter: "blur(4px)", transform: "rotate(1deg)" })}>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ width: 65, height: 80, background: "white", flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ height: 10, background: "white", marginBottom: 4, width: "65%" }} />
              <div style={{ height: 4, background: "white", marginBottom: 3 }} />
              <div style={{ height: 4, background: "white", marginBottom: 3 }} />
              <div style={{ height: 4, background: "white", width: "55%" }} />
            </div>
          </div>
        </div>
        <div className="eb-p" data-speed="0.04" style={abs({ top: "360vh", right: "5%", width: 200, opacity: 0.016, filter: "blur(3px)", transform: "rotate(-0.8deg)" })}>
          <div style={{ height: 20, background: "white", marginBottom: 8 }} />
          <div style={{ display: "flex", gap: 6 }}>
            <div style={{ flex: 1 }}><div style={{ height: 4, background: "white", marginBottom: 3 }} /><div style={{ height: 4, background: "white", marginBottom: 3 }} /><div style={{ height: 4, background: "white" }} /></div>
            <div style={{ flex: 1 }}><div style={{ height: 4, background: "white", marginBottom: 3 }} /><div style={{ height: 4, background: "white", marginBottom: 3, width: "60%" }} /></div>
          </div>
        </div>
        <div className="eb-p" data-speed="0.06" style={abs({ top: "520vh", left: "20%", width: 160, opacity: 0.013, filter: "blur(5px)", transform: "rotate(2deg)" })}>
          <div style={{ height: 14, background: "white", marginBottom: 6, width: "55%" }} />
          <div style={{ height: 4, background: "white", marginBottom: 3 }} />
          <div style={{ height: 4, background: "white", width: "80%" }} />
        </div>
        <div className="eb-p" data-speed="0.03" style={abs({ top: "680vh", right: "18%", width: 200, opacity: 0.014, filter: "blur(4px)", transform: "rotate(-1deg)" })}>
          <div style={{ height: 22, background: "white", marginBottom: 6, width: "75%" }} />
          <div style={{ display: "flex", gap: 5 }}>
            <div style={{ flex: 1, height: 40, background: "white" }} />
            <div style={{ flex: 1, height: 40, background: "white" }} />
          </div>
        </div>
      </div>

      {/* L5 — Magazine spread composition guides */}
      <div className="eb-p" data-speed="0.02" style={abs({ inset: 0 })}>
        <svg width="100%" height="100%" preserveAspectRatio="none" style={abs({ inset: 0 })}>
          <line x1="8%" y1="0" x2="8%" y2="100%" stroke="white" strokeWidth="0.5" opacity="0.02" />
          <line x1="25%" y1="0" x2="25%" y2="60%" stroke="white" strokeWidth="0.5" opacity="0.015" />
          <line x1="25%" y1="68%" x2="25%" y2="100%" stroke="white" strokeWidth="0.5" opacity="0.012" />
          <line x1="42%" y1="4%" x2="42%" y2="100%" stroke="white" strokeWidth="0.5" opacity="0.018" />
          <line x1="58%" y1="0" x2="58%" y2="85%" stroke="white" strokeWidth="0.5" opacity="0.015" />
          <line x1="75%" y1="0" x2="75%" y2="100%" stroke="white" strokeWidth="0.5" opacity="0.02" />
          <line x1="92%" y1="6%" x2="92%" y2="94%" stroke="white" strokeWidth="0.5" opacity="0.012" />
          <line x1="4%" y1="12%" x2="96%" y2="12%" stroke="white" strokeWidth="0.5" opacity="0.012" />
          <line x1="0" y1="33%" x2="55%" y2="33%" stroke="white" strokeWidth="0.5" opacity="0.015" />
          <line x1="8%" y1="50%" x2="92%" y2="50%" stroke="white" strokeWidth="0.5" opacity="0.01" strokeDasharray="3 6" />
          <line x1="45%" y1="67%" x2="100%" y2="67%" stroke="white" strokeWidth="0.5" opacity="0.012" />
          <line x1="3%" y1="88%" x2="97%" y2="88%" stroke="white" strokeWidth="0.5" opacity="0.015" />
        </svg>
      </div>

      {/* L6 — Blueprint / technical annotations */}
      <div style={abs({ inset: 0 })}>
        <div className="eb-p" data-speed="0.04" style={abs({ top: "42vh", left: "44%", opacity: 0.08 })}>
          <div style={{ ...mono, fontSize: "6px" }}>1440PX · VIEWPORT</div>
          <div style={{ width: 60, height: 1, background: "rgba(255,255,255,0.1)", marginTop: 2 }} />
        </div>
        <div className="eb-p" data-speed="0.05" style={abs({ top: "155vh", right: "20%", opacity: 0.06 })}>
          <div style={{ ...mono, fontSize: "6px", lineHeight: 1.6 }}>
            SCALE: 1:1.618<br />GRID: 12-COL<br />GUTTER: 24PX
          </div>
        </div>
        <div className="eb-p" data-speed="0.04" style={abs({ top: "410vh", right: "28%", opacity: 0.05 })}>
          <div style={{ ...mono, fontSize: "5px" }}>[ FIG. 03 ]</div>
          <svg width="40" height="20" viewBox="0 0 40 20" style={{ marginTop: 3 }}>
            <circle cx="4" cy="10" r="1.2" fill="white" opacity="0.2" />
            <circle cx="20" cy="3" r="1.2" fill="white" opacity="0.2" />
            <circle cx="20" cy="17" r="1.2" fill="white" opacity="0.2" />
            <circle cx="36" cy="10" r="1.2" fill="white" opacity="0.2" />
            <line x1="4" y1="10" x2="20" y2="3" stroke="white" strokeWidth="0.3" opacity="0.15" />
            <line x1="4" y1="10" x2="20" y2="17" stroke="white" strokeWidth="0.3" opacity="0.15" />
            <line x1="20" y1="3" x2="36" y2="10" stroke="white" strokeWidth="0.3" opacity="0.15" />
            <line x1="20" y1="17" x2="36" y2="10" stroke="white" strokeWidth="0.3" opacity="0.15" />
          </svg>
        </div>
        <div className="eb-p" data-speed="0.03" style={abs({ top: "580vh", left: "38%", opacity: 0.06 })}>
          <div style={{ ...mono, fontSize: "5px" }}>28.6139°N 77.2090°E · T±0.005</div>
        </div>
      </div>

      {/* L7 — Editorial production metadata (scattered naturally) */}
      <div style={abs({ inset: 0 })}>
        <div className="eb-p" data-speed="0.03" style={abs({ top: 26, right: 30, ...mono, opacity: 0.12 })}>ISSN 2026-9832-X</div>
        <div className="eb-p" data-speed="0.05" style={abs({ top: "28vh", left: 16, ...mono, opacity: 0.1, writingMode: "vertical-rl" })}>VOL. 01 — ARCHIVE OF HUMAN JOURNEYS</div>
        <div className="eb-p" data-speed="0.02" style={abs({ bottom: 26, left: 30, ...mono, opacity: 0.09 })}>LAYOUT: 12-COL SWISS · PROOF 04</div>
        <div className="eb-p" data-speed="0.04" style={abs({ top: "52vh", right: 14, ...mono, opacity: 0.08, writingMode: "vertical-rl" })}>φ 1.618 · GRID-A</div>
        <div className="eb-p" data-speed="0.06" style={abs({ top: "135vh", left: "5%", ...mono, opacity: 0.08 })}>SECTION 02 · PRINT REF</div>
        <div className="eb-p" data-speed="0.03" style={abs({ top: "270vh", right: "4%", ...mono, opacity: 0.07 })}>PG. 003 · OFFSET PRINT · 120GSM</div>
        <div className="eb-p" data-speed="0.05" style={abs({ top: "400vh", left: "6%", ...mono, opacity: 0.09, writingMode: "vertical-rl" })}>TYPE SCALE · COLUMN LOCKED</div>
        <div className="eb-p" data-speed="0.02" style={abs({ top: "510vh", right: "3%", ...mono, opacity: 0.07 })}>PRESS READY · ARCHIVE</div>
        <div className="eb-p" data-speed="0.04" style={abs({ top: "640vh", left: "10%", ...mono, opacity: 0.08 })}>EDITORIAL GRID · PRINT PASS</div>
        <div className="eb-p" data-speed="0.03" style={abs({ top: "740vh", right: "6%", ...mono, opacity: 0.09 })}>PROPERTY OF UV · SECTION 05</div>
      </div>

      {/* L8 — Crop marks & registration */}
      <div className="eb-p" data-speed="0.02" style={abs({ inset: 0 })}>
        <div style={abs({ top: 24, left: 24, width: 14, height: 14, borderLeft: "1px solid rgba(255,255,255,0.06)", borderTop: "1px solid rgba(255,255,255,0.06)" })} />
        <div style={abs({ top: 24, right: 24, width: 14, height: 14, borderRight: "1px solid rgba(255,255,255,0.06)", borderTop: "1px solid rgba(255,255,255,0.06)" })} />
        <div style={abs({ bottom: 24, left: 24, width: 14, height: 14, borderLeft: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" })} />
        <div style={abs({ bottom: 24, right: 24, width: 14, height: 14, borderRight: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" })} />
        <svg width="16" height="16" viewBox="0 0 16 16" style={abs({ top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.04 })}>
          <circle cx="8" cy="8" r="5" stroke="white" strokeWidth="0.4" fill="none" />
          <line x1="8" y1="0" x2="8" y2="16" stroke="white" strokeWidth="0.3" />
          <line x1="0" y1="8" x2="16" y2="8" stroke="white" strokeWidth="0.3" />
        </svg>
      </div>

      {/* L9 — Ghost typography (2-4% opacity, huge, cut by viewport) */}
      <div style={abs({ inset: 0 })}>
        {[
          { w: "PRODUCT",   t: "2vh",    l: "-5vw",  s: "20vw", sp: "0.05" },
          { w: "HUMAN",     t: "90vh",   r: "-4vw",  s: "17vw", sp: "0.07" },
          { w: "THINKING",  t: "180vh",  l: "3vw",   s: "19vw", sp: "0.04" },
          { w: "ARCHIVE",   t: "280vh",  r: "1vw",   s: "16vw", sp: "0.06" },
          { w: "FEATURE",   t: "370vh",  l: "-3vw",  s: "22vw", sp: "0.03" },
          { w: "EDITORIAL", t: "460vh",  r: "-2vw",  s: "15vw", sp: "0.05" },
          { w: "DESIGN",    t: "540vh",  l: "8vw",   s: "18vw", sp: "0.04" },
          { w: "LEARNING",  t: "620vh",  r: "5vw",   s: "14vw", sp: "0.06" },
          { w: "BUILDING",  t: "700vh",  l: "-6vw",  s: "21vw", sp: "0.03" },
          { w: "JOURNEY",   t: "780vh",  r: "-3vw",  s: "16vw", sp: "0.05" },
        ].map((g) => (
          <div
            key={g.w}
            className="eb-p"
            data-speed={g.sp}
            style={abs({
              top: g.t,
              left: g.l,
              right: g.r,
              fontFamily: "var(--font-display)",
              fontSize: g.s,
              fontWeight: 900,
              color: "white",
              opacity: 0.025,
              lineHeight: 0.85,
              whiteSpace: "nowrap",
            })}
          >
            {g.w}
          </div>
        ))}
      </div>

      {/* L10 — Paper aging vignette */}
      <div style={abs({
        inset: 0,
        background: "radial-gradient(ellipse 65% 55% at 48% 50%, transparent 25%, rgba(0,0,0,0.14) 100%)",
      })} />
      <div style={abs({
        top: 0, left: 0, right: 0, height: "12%",
        background: "linear-gradient(to bottom, rgba(0,0,0,0.09), transparent)",
      })} />
      <div style={abs({
        bottom: 0, left: 0, width: "30%", height: "20%",
        background: "radial-gradient(ellipse at bottom left, rgba(0,0,0,0.07), transparent 65%)",
      })} />

      {/* L11 — Printing imperfections (tiny dust/scratches) */}
      <div style={abs({
        inset: 0, opacity: 0.03, mixBlendMode: "color-dodge",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 600 600' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60,90 L63,94 M350,230 C352,234 350,238 348,240 M90,450 C120,448 140,454 150,458 M460,120 L464,122 M540,510 L538,513' stroke='rgba(255,255,255,0.3)' stroke-width='0.4' fill='none'/%3E%3Ccircle cx='220' cy='140' r='0.7' fill='rgba(255,255,255,0.25)'/%3E%3Ccircle cx='470' cy='390' r='0.5' fill='rgba(255,255,255,0.3)'/%3E%3C/svg%3E")`,
        backgroundSize: "600px",
      })} />
    </div>
  );
}
