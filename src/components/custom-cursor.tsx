"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Center the cursor
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3.out" });

    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onMouseEnterInteractive = () => {
      gsap.to(cursor, { scale: 2.5, duration: 0.2, ease: "power2.out" });
    };

    const onMouseLeaveInteractive = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2, ease: "power2.out" });
    };

    window.addEventListener("mousemove", onMouseMove);

    // Dynamic listeners for interactive elements
    const addInteractiveListeners = () => {
      const interactives = document.querySelectorAll("a, button, input, textarea, [data-magnetic]");
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterInteractive);
        el.addEventListener("mouseleave", onMouseLeaveInteractive);
      });
    };

    addInteractiveListeners();

    // Re-bind when DOM changes (helpful for dynamic routes / transitions)
    const observer = new MutationObserver(addInteractiveListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
      const interactives = document.querySelectorAll("a, button, input, textarea, [data-magnetic]");
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        .custom-cursor {
          width: 16px;
          height: 16px;
          background-color: #ffffff;
          border-radius: 50%;
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: difference;
          will-change: transform;
        }
        @media (hover: none) and (pointer: coarse) {
          .custom-cursor {
            display: none !important;
          }
        }
      `}</style>
      <div ref={cursorRef} className="custom-cursor" />
    </>
  );
}
