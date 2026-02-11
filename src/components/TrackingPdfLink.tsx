"use client";

import { trackEvent } from "@/lib/analytics";

type TrackingPdfLinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
  placement: string;
};

export default function TrackingPdfLink({
  href,
  className,
  children,
  placement,
}: TrackingPdfLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={className}
      onClick={() => {
        const fileName = href.split("/").pop() || "unknown";
        trackEvent("pdf_open", {
          file_name: fileName,
          placement,
        });
      }}
    >
      {children}
    </a>
  );
}
