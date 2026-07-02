"use client";

import { useRef, useEffect, type ReactNode } from "react";
import gsap from "gsap";

interface MagneticButtonProps {
  children: ReactNode;
  range?: number; // How far away the magnetic field starts
  strength?: number; // Intensity of the pull (0.1 to 0.5 recommended)
}

export default function MagneticButton({
  children,
  range = 40,
  strength = 0.35,
}: MagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.hypot(distanceX, distanceY);

      if (distance < range + Math.max(rect.width, rect.height) / 2) {
        // Move towards the cursor
        gsap.to(inner, {
          x: distanceX * strength,
          y: distanceY * strength,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        // Outside range, reset
        gsap.to(inner, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.3)",
        });
      }
    };

    const onMouseLeave = () => {
      gsap.to(inner, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)",
      });
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);

    return () => {
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [range, strength]);

  return (
    <div
      ref={containerRef}
      data-magnetic
      style={{
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
      }}
    >
      <div ref={innerRef} style={{ display: "inline-block", willChange: "transform" }}>
        {children}
      </div>
    </div>
  );
}
