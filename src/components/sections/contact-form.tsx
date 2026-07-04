"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { siteData } from "@/data/site-data";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FormFields {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot: string;
}

export default function ContactForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  const [fields, setFields] = useState<FormFields>({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "",
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: "success" | "error" }>({
    show: false,
    message: "",
    type: "success",
  });

  const [errors, setErrors] = useState<Partial<FormFields>>({});

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: subtitleRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
            delay: 0.1,
          }
        );
      }

      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
            delay: 0.2,
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormFields]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const tempErrors: Partial<FormFields> = {};

    const nameVal = fields.name.trim();
    const emailVal = fields.email.trim();
    const subjectVal = fields.subject.trim();
    const messageVal = fields.message.trim();

    if (!nameVal) {
      tempErrors.name = "Full Name is required.";
    } else if (nameVal.length > 100) {
      tempErrors.name = "Name must be less than 100 characters.";
    }

    if (!emailVal) {
      tempErrors.email = "Email Address is required.";
    } else if (emailVal.length > 100) {
      tempErrors.email = "Email must be less than 100 characters.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      tempErrors.email = "Please enter a valid email address.";
    }

    if (!subjectVal) {
      tempErrors.subject = "Subject is required.";
    } else if (subjectVal.length > 200) {
      tempErrors.subject = "Subject must be less than 200 characters.";
    }

    if (!messageVal) {
      tempErrors.message = "Message is required.";
    } else if (messageVal.length > 5000) {
      tempErrors.message = "Message cannot exceed 5000 characters.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Honeypot spam check - silent success simulation
    if (fields.honeypot.trim() !== "") {
      setLoading(true);
      setTimeout(() => {
        setToast({
          show: true,
          message: "Thanks for reaching out. Your message has been sent successfully. I'll get back to you as soon as possible.",
          type: "success",
        });
        setFields({ name: "", email: "", subject: "", message: "", honeypot: "" });
        setLoading(false);
      }, 1000);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.name.trim(),
          email: fields.email.trim(),
          subject: fields.subject.trim(),
          message: fields.message.trim(),
          honeypot: fields.honeypot,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setToast({
          show: true,
          message: "Thanks for reaching out. Your message has been sent successfully. I'll get back to you as soon as possible.",
          type: "success",
        });
        setFields({ name: "", email: "", subject: "", message: "", honeypot: "" });
      } else {
        throw new Error(data.error || "Something went wrong.");
      }
    } catch (err: unknown) {
      console.error(err);
      setToast({
        show: true,
        message: "Something went wrong. Please try again in a few moments.",
        type: "error",
      });
    } finally {
      setLoading(false);
      setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }));
      }, 5000);
    }
  };

  return (
    <section ref={sectionRef} id="contact-form-section" className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        {/* Section Title */}
        <div style={{ marginBottom: "clamp(32px, 6vh, 64px)" }}>
          <h2
            ref={headlineRef}
            className="display-xl"
            style={{ margin: "0 0 16px 0", opacity: 0 }}
          >
            CONTACT ME.
          </h2>
          <p
            ref={subtitleRef}
            className="body"
            style={{
              maxWidth: "600px",
              color: "var(--text-secondary)",
              fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
              lineHeight: 1.5,
              margin: 0,
              opacity: 0,
            }}
          >
            Have an opportunity, collaboration idea, startup, internship, or simply want to connect? Send me a message.
          </p>
        </div>

        {/* Contact Form Container */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          noValidate
          style={{
            maxWidth: "600px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "28px",
            opacity: 0,
          }}
        >
          {/* Honeypot field (hidden from screen readers and normal users) */}
          <div style={{ display: "none" }} aria-hidden="true">
            <input
              type="text"
              name="honeypot"
              value={fields.honeypot}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Full Name */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label htmlFor="form-name" className="contact-form-label">
              Full Name
            </label>
            <input
              type="text"
              id="form-name"
              name="name"
              value={fields.name}
              onChange={handleChange}
              disabled={loading}
              className={`contact-form-input ${errors.name ? "error" : ""}`}
              placeholder="e.g. Jane Doe"
            />
            {errors.name && <span className="contact-form-err-msg">{errors.name}</span>}
          </div>

          {/* Email Address */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label htmlFor="form-email" className="contact-form-label">
              Email Address
            </label>
            <input
              type="email"
              id="form-email"
              name="email"
              value={fields.email}
              onChange={handleChange}
              disabled={loading}
              className={`contact-form-input ${errors.email ? "error" : ""}`}
              placeholder="e.g. jane@example.com"
            />
            {errors.email && <span className="contact-form-err-msg">{errors.email}</span>}
          </div>

          {/* Subject */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label htmlFor="form-subject" className="contact-form-label">
              Subject
            </label>
            <input
              type="text"
              id="form-subject"
              name="subject"
              value={fields.subject}
              onChange={handleChange}
              disabled={loading}
              className={`contact-form-input ${errors.subject ? "error" : ""}`}
              placeholder="e.g. Collaboration Opportunity"
            />
            {errors.subject && <span className="contact-form-err-msg">{errors.subject}</span>}
          </div>

          {/* Message */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label htmlFor="form-message" className="contact-form-label">
              Message
            </label>
            <textarea
              id="form-message"
              name="message"
              rows={6}
              value={fields.message}
              onChange={handleChange}
              disabled={loading}
              className={`contact-form-input ${errors.message ? "error" : ""}`}
              placeholder="Your message details..."
              style={{ resize: "vertical" }}
            />
            {errors.message && <span className="contact-form-err-msg">{errors.message}</span>}
          </div>

          {/* Submit Button */}
          <div style={{ marginTop: "12px" }}>
            <button
              type="submit"
              disabled={loading}
              className="contact-form-submit-btn"
            >
              {loading ? "Sending..." : "Send Message →"}
            </button>
          </div>
        </form>

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
            width: "100%",
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

      {/* Floating Status Toast */}
      <div className={`contact-form-toast ${toast.show ? "show" : ""} ${toast.type}`}>
        <span>{toast.message}</span>
      </div>
    </section>
  );
}
