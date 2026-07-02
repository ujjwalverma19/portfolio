"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { siteData } from "@/data/site-data";
import EditorialLink from "../editorial-link";
import MagneticButton from "../magnetic-button";

gsap.registerPlugin(ScrollTrigger);

import { createPortal } from "react-dom";

function ProductFeature({
  product,
  reversed,
}: {
  product: (typeof siteData.products)[0];
  reversed?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isTransitioningRef = useRef(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const [activeView, setActiveView] = useState<
    "overview" | "problem" | "vision" | "architecture" | "roadmap"
  >("overview");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  // Preload all screenshots on component mount
  useEffect(() => {
    if (product.images && product.images.length > 0) {
      product.images.forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
    }
  }, [product.images]);

  // Check if image is already complete (cached) when source changes
  useEffect(() => {
    if (isLightboxOpen && imgRef.current) {
      if (imgRef.current.complete) {
        setIsImageLoading(false);
        gsap.fromTo(
          ".lightbox-image-content-wrapper",
          { opacity: 0, scale: 0.98 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.25,
            ease: "power2.out",
            onComplete: () => {
              isTransitioningRef.current = false;
            },
          }
        );
      }
    }
  }, [lightboxIndex, isLightboxOpen]);

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const openLightbox = () => {
    if (isLightboxOpen) return;
    isTransitioningRef.current = false;
    setLightboxIndex(currentImageIndex);
    setIsImageLoading(true);
    setImageError(false);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    // Force close is always allowed, bypass isTransitioning check
    isTransitioningRef.current = true;

    gsap.to(".lightbox-image-content-wrapper", {
      scale: 0.96,
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
    });
    gsap.to(".lightbox-overlay", {
      opacity: 0,
      duration: 0.3,
      ease: "power2.inOut",
      onComplete: () => {
        setIsLightboxOpen(false);
        isTransitioningRef.current = false;
      },
    });
  };

  const navigateLightbox = (direction: "next" | "prev") => {
    if (!product.images || product.images.length <= 1) return;
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    const newIndex = direction === "next"
      ? (lightboxIndex + 1) % product.images.length
      : (lightboxIndex - 1 + product.images.length) % product.images.length;

    // Fade out current content wrapper
    gsap.to(".lightbox-image-content-wrapper", {
      opacity: 0,
      scale: 0.98,
      duration: 0.15,
      ease: "power2.inOut",
      onComplete: () => {
        setLightboxIndex(newIndex);
        setCurrentImageIndex(newIndex); // Sync main page thumbnail
        setIsImageLoading(true);
        setImageError(false);
      },
    });
  };

  // Keyboard navigation & ESC close
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden";

      gsap.fromTo(
        ".lightbox-overlay",
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: "power2.out" }
      );

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          closeLightbox();
        } else if (e.key === "ArrowRight") {
          navigateLightbox("next");
        } else if (e.key === "ArrowLeft") {
          navigateLightbox("prev");
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLightboxOpen, lightboxIndex, product.images]);

  // Clean up body overflow style when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const views = [
    { key: "overview" as const, label: "Overview" },
    { key: "problem" as const, label: "Problem" },
    { key: "vision" as const, label: "Vision" },
    { key: "architecture" as const, label: "Architecture" },
    { key: "roadmap" as const, label: "Roadmap" },
  ];

  const statusLabels: Record<string, string> = {
    done: "COMPLETE",
    current: "IN PROGRESS",
    planned: "PLANNED",
    future: "FUTURE",
  };

  return (
    <div
      ref={cardRef}
      style={{
        display: "grid",
        gridTemplateColumns: reversed ? "1fr 1fr" : "1fr 1fr",
        gap: "clamp(32px, 5vw, 80px)",
        paddingBottom: "clamp(64px, 10vh, 120px)",
        opacity: 0,
      }}
    >
      {/* Image / Visual side */}
      <div
        style={{
          order: reversed ? 2 : 1,
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {/* Editorial Frame */}
        <div
          style={{
            position: "relative",
            aspectRatio: "16 / 10",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "clamp(24px, 6vw, 64px)",
            overflow: "hidden",
          }}
        >
          {/* Project label inside frame */}
          <div
            style={{
              position: "absolute",
              top: "16px",
              left: "16px",
              fontFamily: "var(--font-mono)",
              fontSize: "0.5625rem",
              letterSpacing: "0.12em",
              color: "var(--text-tertiary)",
              textTransform: "uppercase",
              zIndex: 3,
            }}
          >
            PROJECT {product.number}
          </div>

          {product.images && product.images.length > 0 ? (
            /* Screenshot Wrapper */
            <div
              onClick={openLightbox}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight" && product.images.length > 1) {
                  setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
                } else if (e.key === "ArrowLeft" && product.images.length > 1) {
                  setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
                } else if (e.key === "Enter" || e.key === " ") {
                  openLightbox();
                }
              }}
              style={{
                position: "relative",
                width: "100%",
                height: "auto",
                aspectRatio: "16 / 9",
                maxWidth: "100%",
                maxHeight: "100%",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
                cursor: "pointer",
                outline: "none",
                transition: "transform 0.4s var(--ease-out-expo), border-color 0.4s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.01)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
              }}
            >
              <Image
                src={product.images[currentImageIndex]}
                alt={`${product.name} Screenshot ${currentImageIndex + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                loading="lazy"
                style={{
                  objectFit: "contain",
                }}
              />
            </div>
          ) : (
            /* Premium Swiss Placeholder */
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(3rem, 8vw, 6rem)",
                  fontWeight: 900,
                  color: "rgba(255, 255, 255, 0.02)",
                  letterSpacing: "-0.04em",
                  textTransform: "uppercase",
                  userSelect: "none",
                }}
              >
                {product.name}
              </div>

              {/* Thin cross lines */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "10%",
                  right: "10%",
                  height: "1px",
                  background: "rgba(255, 255, 255, 0.05)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "10%",
                  bottom: "10%",
                  width: "1px",
                  background: "rgba(255, 255, 255, 0.05)",
                }}
              />

              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.625rem",
                  letterSpacing: "0.12em",
                  color: "var(--text-tertiary)",
                  textTransform: "uppercase",
                  marginTop: "16px",
                  zIndex: 2,
                }}
              >
                INTERFACE COMING SOON
              </div>
            </div>
          )}
        </div>

        {/* Editorial Metadata & Manual Controls Bar */}
        {product.images && product.images.length > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 16px",
              border: "1px solid var(--border)",
              borderTop: "none",
              background: "var(--surface)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.625rem",
              letterSpacing: "0.15em",
              color: "var(--text-secondary)",
            }}
          >
            <div style={{ textTransform: "uppercase" }}>
              SCREENSHOT {String(currentImageIndex + 1).padStart(2, "0")} / {String(product.images.length).padStart(2, "0")}
            </div>

            {product.images.length > 1 && (
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <button
                  onClick={() =>
                    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
                  }
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--text-secondary)",
                    cursor: "pointer",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.625rem",
                    padding: "4px 8px",
                    transition: "color 0.2s",
                    outline: "none",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                >
                  PREV
                </button>
                <span style={{ color: "var(--border)" }}>/</span>
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev + 1) % product.images.length)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--text-secondary)",
                    cursor: "pointer",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.625rem",
                    padding: "4px 8px",
                    transition: "color 0.2s",
                    outline: "none",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                >
                  NEXT
                </button>
              </div>
            )}

            <div style={{ opacity: 0.6, textTransform: "uppercase" }}>
              FIG. {product.number} — SYSTEM DETAIL
            </div>
          </div>
        )}
      </div>      {/* Fullscreen Lightbox Portal */}
      {isLightboxOpen &&
        product.images &&
        product.images.length > 0 &&
        typeof window !== "undefined" &&
        createPortal(
          <div
            className="lightbox-overlay"
            onClick={closeLightbox}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(8, 8, 8, 0.98)",
              backdropFilter: "blur(12px)",
              zIndex: 9990, // Keeps below grain-overlay (10000) so grain texturing remains on top
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              style={{
                position: "absolute",
                top: "24px",
                right: "24px",
                background: "none",
                border: "none",
                color: "var(--text-secondary)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.6875rem",
                letterSpacing: "0.15em",
                cursor: "pointer",
                padding: "8px 16px",
                transition: "color 0.2s",
                zIndex: 10,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              CLOSE [ ESC ]
            </button>

            {/* Left Control */}
            {product.images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateLightbox("prev");
                }}
                style={{
                  position: "absolute",
                  left: "clamp(16px, 4vw, 40px)",
                  background: "none",
                  border: "none",
                  color: "var(--text-secondary)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "1.25rem",
                  cursor: "pointer",
                  padding: "16px",
                  transition: "color 0.2s, transform 0.2s",
                  zIndex: 10,
                  userSelect: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--text)";
                  e.currentTarget.style.transform = "translateX(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-secondary)";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                [ ← ]
              </button>
            )}

            {/* Loading Spinner */}
            {isImageLoading && (
              <div
                style={{
                  position: "absolute",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.625rem",
                  letterSpacing: "0.2em",
                  color: "var(--text-tertiary)",
                  textTransform: "uppercase",
                  zIndex: 1,
                }}
              >
                LOADING...
              </div>
            )}

            {/* Main Lightbox Image Content Wrapper */}
            <div
              className="lightbox-image-content-wrapper"
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                width: "85vw",
                height: "75vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                opacity: 0,
              }}
            >
              {imageError ? (
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.15em",
                    color: "var(--text-secondary)",
                    textTransform: "uppercase",
                    border: "1px solid var(--border)",
                    padding: "24px 48px",
                    background: "var(--surface)",
                  }}
                >
                  Unable to load screenshot
                </div>
              ) : (
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    aspectRatio: "16 / 9",
                    boxShadow: "0 30px 60px rgba(0, 0, 0, 0.6)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    ref={imgRef}
                    key={lightboxIndex}
                    src={product.images[lightboxIndex]}
                    alt={`${product.name} Screenshot Detail`}
                    onLoad={() => {
                      setIsImageLoading(false);
                      gsap.fromTo(
                        ".lightbox-image-content-wrapper",
                        { opacity: 0, scale: 0.98 },
                        {
                          opacity: 1,
                          scale: 1,
                          duration: 0.25,
                          ease: "power2.out",
                          onComplete: () => {
                            isTransitioningRef.current = false;
                          },
                        }
                      );
                    }}
                    onError={() => {
                      setIsImageLoading(false);
                      setImageError(true);
                      gsap.fromTo(
                        ".lightbox-image-content-wrapper",
                        { opacity: 0 },
                        {
                          opacity: 1,
                          duration: 0.25,
                          onComplete: () => {
                            isTransitioningRef.current = false;
                          },
                        }
                      );
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </div>
              )}
            </div>

            {/* Right Control */}
            {product.images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateLightbox("next");
                }}
                style={{
                  position: "absolute",
                  right: "clamp(16px, 4vw, 40px)",
                  background: "none",
                  border: "none",
                  color: "var(--text-secondary)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "1.25rem",
                  cursor: "pointer",
                  padding: "16px",
                  transition: "color 0.2s, transform 0.2s",
                  zIndex: 10,
                  userSelect: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--text)";
                  e.currentTarget.style.transform = "translateX(4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-secondary)";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                [ → ]
              </button>
            )}

            {/* Bottom Caption */}
            <div
              style={{
                position: "absolute",
                bottom: "24px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.6875rem",
                letterSpacing: "0.15em",
                color: "var(--text-tertiary)",
                textTransform: "uppercase",
              }}
            >
              UJJWAL VERMA — {product.name} — SCREENSHOT {lightboxIndex + 1} / {product.images.length}
            </div>
          </div>,
          document.body
        )}

      {/* Content side */}
      <div
        style={{
          order: reversed ? 1 : 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* Product name label */}
        <div className="label label--accent" style={{ marginBottom: "16px" }}>
          {product.name}
        </div>

        {/* Large tagline */}
        <h3
          className="display-lg"
          style={{
            marginBottom: "24px",
            maxWidth: "500px",
          }}
        >
          {product.tagline}
        </h3>

        {/* View switcher */}
        <div
          style={{
            display: "flex",
            gap: "0",
            borderBottom: "1px solid var(--border)",
            marginBottom: "32px",
          }}
        >
          {views.map((view) => (
            <button
              key={view.key}
              onClick={() => setActiveView(view.key)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.5625rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color:
                  activeView === view.key
                    ? "var(--text)"
                    : "var(--text-tertiary)",
                background: "none",
                border: "none",
                borderBottom:
                  activeView === view.key
                    ? "1px solid var(--text)"
                    : "1px solid transparent",
                padding: "12px 16px",
                cursor: "pointer",
                transition: "color 0.3s ease",
                marginBottom: "-1px",
              }}
            >
              {view.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ minHeight: "200px" }}>
          {activeView === "overview" && (
            <div>
              <p className="body-lg" style={{ marginBottom: "24px", maxWidth: "440px" }}>
                {product.description}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {product.features.map((f) => (
                  <span
                    key={f}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.5625rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--text-tertiary)",
                      padding: "6px 12px",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {f}
                  </span>
                ))}
              </div>
              {"url" in product && product.url && (
                <div style={{ marginTop: "32px" }}>
                  <MagneticButton range={30} strength={0.25}>
                    <EditorialLink href={`https://${product.url}`} external>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.6875rem",
                          letterSpacing: "0.1em",
                          fontWeight: 600,
                          textTransform: "uppercase",
                        }}
                      >
                        Launch Project
                      </span>
                    </EditorialLink>
                  </MagneticButton>
                </div>
              )}
            </div>
          )}

          {activeView === "problem" && (
            <p className="body-lg" style={{ maxWidth: "440px", lineHeight: 1.8 }}>
              {product.problem}
            </p>
          )}

          {activeView === "vision" && (
            <p className="body-lg" style={{ maxWidth: "440px", lineHeight: 1.8 }}>
              {product.vision}
            </p>
          )}

          {activeView === "architecture" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0",
              }}
            >
              {product.architecture.map((item, i) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    padding: "16px 0",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <span
                    className="meta"
                    style={{ width: "24px", textAlign: "right" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="body"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeView === "roadmap" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0",
              }}
            >
              {product.roadmap.map((phase) => (
                <div
                  key={phase.phase}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "20px",
                    padding: "16px 0",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <span
                    className="meta"
                    style={{
                      width: "80px",
                      flexShrink: 0,
                      color:
                        phase.status === "current"
                          ? "var(--text)"
                          : "var(--text-tertiary)",
                    }}
                  >
                    {statusLabels[phase.status]}
                  </span>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "0.9375rem",
                        fontWeight: 600,
                        color: "var(--text)",
                        marginBottom: "4px",
                      }}
                    >
                      {phase.phase}
                    </div>
                    <span className="meta">
                      {phase.items.join(" · ")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} id="products" className="section">
      <div className="container">
        {/* Section label */}
        <div className="section-label">
          <span className="section-label__index">02</span>
          <div className="section-label__line" />
          <span className="section-label__text">Products</span>
        </div>

        <h2
          className="display-xl"
          style={{
            marginBottom: "clamp(64px, 8vh, 120px)",
            maxWidth: "900px",
          }}
        >
          MAGAZINE
          <br />
          <span style={{ color: "var(--text-secondary)" }}>FEATURES.</span>
        </h2>

        {siteData.products.map((product, i) => (
          <ProductFeature
            key={product.id}
            product={product}
            reversed={i % 2 !== 0}
          />
        ))}
      </div>
    </section>
  );
}
