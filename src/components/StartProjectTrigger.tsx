"use client";

import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";
import { useStartProjectModal } from "@/components/StartProjectModalProvider";

type StartProjectTriggerProps = {
  children: ReactNode;
  className?: string;
  onOpen?: () => void;
  source?: string;
};

export default function StartProjectTrigger({
  children,
  className = "",
  onOpen,
  source = "unknown",
}: StartProjectTriggerProps) {
  const { openModal } = useStartProjectModal();

  return (
    <button
      type="button"
      className={`cursor-pointer appearance-none border-0 bg-transparent p-0 text-inherit ${className}`.trim()}
      aria-haspopup="dialog"
      onClick={() => {
        onOpen?.();
        trackEvent("start_project_modal_open", { source });
        openModal();
      }}
    >
      {children}
    </button>
  );
}
