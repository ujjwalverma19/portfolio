"use client";

import Link from "next/link";
import { type ReactNode } from "react";

interface EditorialLinkProps {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}

export default function EditorialLink({
  href,
  children,
  external,
  className = "",
}: EditorialLinkProps) {
  const isExternal = external || href.startsWith("http") || href.startsWith("mailto:");

  const linkContent = (
    <>
      <span className="link-text">{children}</span>
      <span className="link-arrow" aria-hidden="true">↗</span>
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`editorial-link ${className}`}
      >
        {linkContent}
      </a>
    );
  }

  return (
    <Link href={href} className={`editorial-link ${className}`}>
      {linkContent}
    </Link>
  );
}
