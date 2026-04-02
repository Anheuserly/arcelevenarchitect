"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import ProjectRequestForm from "@/components/ProjectRequestForm";

type StartProjectModalContextValue = {
  closeModal: () => void;
  isOpen: boolean;
  openModal: () => void;
};

const StartProjectModalContext = createContext<StartProjectModalContextValue | null>(null);

function StartProjectModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="start-project-modal-backdrop"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="start-project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="start-project-modal-title"
        aria-describedby="start-project-modal-description"
      >
        <button
          type="button"
          className="start-project-modal-close"
          onClick={onClose}
          aria-label="Close start project form"
          autoFocus
        >
          Close
        </button>

        <div className="start-project-modal-grid">
          <div className="start-project-modal-sidebar subtle-card p-7 sm:p-8">
            <p className="kicker">Start a Project</p>
            <h2 id="start-project-modal-title" className="mt-4 text-3xl sm:text-4xl">
              Share the brief while staying in the flow.
            </h2>
            <p id="start-project-modal-description" className="mt-4 max-w-md text-sm">
              Use this popup when you already know you want to work with the studio. We only need
              the essentials to frame the next conversation properly.
            </p>

            <div className="mt-7 space-y-4">
              <div className="rounded-[22px] border border-[var(--line)] bg-white/72 p-4">
                <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted-2)]">
                  Best For
                </p>
                <p className="mt-3 text-sm">
                  Residences, builder floors, hospitality, commercial interiors, institutional
                  projects, and turnkey design-delivery work.
                </p>
              </div>

              <div className="rounded-[22px] border border-[var(--line)] bg-white/72 p-4">
                <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted-2)]">
                  Helpful To Include
                </p>
                <p className="mt-3 text-sm">
                  Site location, project type, budget comfort zone, intended timeline, and your
                  current project stage.
                </p>
              </div>

              <div className="rounded-[22px] border border-[var(--line)] bg-white/72 p-4">
                <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted-2)]">
                  Need More Space?
                </p>
                <p className="mt-3 text-sm">
                  You can still use the full intake page if you want to review the process first.
                </p>
                <Link href="/start-project" className="mt-4 inline-flex text-xs uppercase tracking-[0.28em] text-[var(--foreground)]">
                  Open full project page
                </Link>
              </div>
            </div>
          </div>

          <div className="card p-7 sm:p-8">
            <p className="kicker">Project Brief</p>
            <h3 className="mt-4 text-3xl">Tell us what you are building.</h3>
            <p className="mt-4 max-w-xl text-sm">
              The more specific the brief, the better we can suggest fit, timing, and the next
              step for the engagement.
            </p>
            <div className="mt-8">
              <ProjectRequestForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StartProjectModalProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);
  const previousPathnameRef = useRef(pathname);

  const openModal = useCallback(() => {
    if (typeof document !== "undefined" && document.activeElement instanceof HTMLElement) {
      lastFocusedElementRef.current = document.activeElement;
    }

    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    window.setTimeout(() => {
      lastFocusedElementRef.current?.focus();
    }, 0);
  }, []);

  useEffect(() => {
    if (previousPathnameRef.current === pathname) {
      return;
    }

    previousPathnameRef.current = pathname;

    if (!isOpen) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      setIsOpen(false);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isOpen, pathname]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal, isOpen]);

  const value = {
    closeModal,
    isOpen,
    openModal,
  };

  return (
    <StartProjectModalContext.Provider value={value}>
      {children}
      <StartProjectModal isOpen={isOpen} onClose={closeModal} />
    </StartProjectModalContext.Provider>
  );
}

export function useStartProjectModal() {
  const context = useContext(StartProjectModalContext);

  if (!context) {
    throw new Error("useStartProjectModal must be used within StartProjectModalProvider.");
  }

  return context;
}
