"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteData } from "@/data/site-data";
import { Mail, Terminal, FileText, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Custom SVG Brand Icons to bypass Lucide v0.400+ brand icon deprecation
const GithubIcon = ({ size = 22, strokeWidth = 1.5 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: "block" }}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = ({ size = 22, strokeWidth = 1.5 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: "block" }}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const XIcon = ({ size = 22, strokeWidth = 1.5 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: "block" }}
  >
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

const links = [
  { label: "Email", href: `mailto:${siteData.social.email}`, Icon: Mail },
  { label: "GitHub", href: siteData.social.github, Icon: GithubIcon },
  { label: "LinkedIn", href: siteData.social.linkedin, Icon: LinkedinIcon },
  { label: "X", href: siteData.social.twitter, Icon: XIcon },
  { label: "LeetCode", href: siteData.social.leetcode, Icon: Terminal },
  { label: "Resume", href: siteData.social.resume, Icon: FileText },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [showCopiedToast, setShowCopiedToast] = useState(false);

  const modalOverlayRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const copyBtnRef = useRef<HTMLButtonElement>(null);
  const openBtnRef = useRef<HTMLAnchorElement>(null);

  // Esc key listener and focus trap
  useEffect(() => {
    if (!isEmailModalOpen) return;

    const previousActiveElement = document.activeElement as HTMLElement;

    // Focus the close button initially
    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsEmailModalOpen(false);
        return;
      }

      if (e.key === "Tab") {
        const focusableElements = [
          closeBtnRef.current,
          copyBtnRef.current,
          openBtnRef.current,
        ].filter(Boolean) as HTMLElement[];

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Disable body scroll when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      if (previousActiveElement) {
        previousActiveElement.focus();
      }
    };
  }, [isEmailModalOpen]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteData.social.email).then(() => {
      setShowCopiedToast(true);
      setTimeout(() => setShowCopiedToast(false), 2000);
    });
  };

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
              start: "top 95%",
              toggleActions: "play none none none",
            },
            delay: i * 0.06,
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
          <span className="section-label__index">06</span>
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
            width: "100%",
          }}
        >
          {links.map((link, i) => {
            const Icon = link.Icon;
            const isMail = link.href.startsWith("mailto:");
            return (
              <div
                key={link.label}
                ref={(el) => {
                  linkRefs.current[i] = el;
                }}
                style={{ opacity: 0 }}
              >
                <a
                  href={link.href}
                  target={isMail ? undefined : "_blank"}
                  rel={isMail ? undefined : "noopener noreferrer"}
                  className="contact-row"
                  onClick={(e) => {
                    if (link.label === "Email") {
                      e.preventDefault();
                      setIsEmailModalOpen(true);
                    }
                  }}
                >
                  <div className="contact-row-icon">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <span className="contact-row-label">{link.label}</span>
                  <span
                    className="contact-row-arrow"
                    aria-hidden="true"
                    style={{ fontFamily: "var(--font-mono)", fontSize: "0.875rem" }}
                  >
                    ↗
                  </span>
                </a>
              </div>
            );
          })}
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

      {/* Email Centered Modal Overlay */}
      <div
        ref={modalOverlayRef}
        className={`email-modal-overlay ${isEmailModalOpen ? "is-open" : ""}`}
        onClick={(e) => {
          if (e.target === modalOverlayRef.current) {
            setIsEmailModalOpen(false);
          }
        }}
      >
        <div
          className="email-modal-container"
          role="dialog"
          aria-modal="true"
          aria-labelledby="email-modal-title-id"
        >
          <button
            ref={closeBtnRef}
            className="email-modal-close-btn"
            onClick={() => setIsEmailModalOpen(false)}
            aria-label="Close modal"
          >
            <X size={18} strokeWidth={1.5} />
          </button>

          <div className="email-modal-title" id="email-modal-title-id">
            Ujjwal Verma
          </div>

          <div className="email-modal-meta">Email Address</div>
          <div className="email-modal-email-val">
            <span>{siteData.social.email}</span>
          </div>

          <div className="email-modal-actions">
            <button
              ref={copyBtnRef}
              className="email-modal-btn"
              onClick={handleCopyEmail}
            >
              Copy Email
            </button>
            <a
              ref={openBtnRef}
              href={`mailto:${siteData.social.email}`}
              className="email-modal-btn primary"
              onClick={() => setIsEmailModalOpen(false)}
            >
              Open Mail
            </a>
          </div>

          <div className={`email-modal-toast ${showCopiedToast ? "show" : ""}`}>
            Copied!
          </div>
        </div>
      </div>
    </section>
  );
}
