"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import FeedbackForm from "@/components/FeedbackForm";

const OPEN_DELAY_MS = 3000;
const FOOTER_ENTRY_OFFSET_PX = 32;
const PAGE_END_THRESHOLD_PX = 220;

function getViewportHeight() {
  return window.visualViewport?.height ?? window.innerHeight;
}

export default function HomeFeedbackPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef<number | null>(null);
  const hasTriggeredRef = useRef(false);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const closePopup = useCallback(() => {
    clearTimer();
    setIsOpen(false);
  }, [clearTimer]);

  const handleSuccess = useCallback(() => {
    window.setTimeout(() => {
      setIsOpen(false);
    }, 1200);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const footer = document.getElementById("site-footer");

    if (!footer) {
      return;
    }

    const schedulePopup = () => {
      if (hasTriggeredRef.current || timerRef.current !== null) {
        return;
      }

      timerRef.current = window.setTimeout(() => {
        hasTriggeredRef.current = true;
        timerRef.current = null;
        setIsOpen(true);
      }, OPEN_DELAY_MS);
    };

    const checkFooterVisibility = () => {
      if (hasTriggeredRef.current) {
        clearTimer();
        return;
      }

      const viewportHeight = getViewportHeight();
      const rect = footer.getBoundingClientRect();
      const footerHasEnteredView = rect.top <= viewportHeight - FOOTER_ENTRY_OFFSET_PX;
      const footerStillVisible = rect.bottom >= 64;
      const distanceToPageEnd =
        document.documentElement.scrollHeight - (window.scrollY + viewportHeight);
      const isNearPageEnd = distanceToPageEnd <= PAGE_END_THRESHOLD_PX;
      const isFooterVisibleEnough =
        (footerHasEnteredView && footerStillVisible) || isNearPageEnd;

      if (isFooterVisibleEnough) {
        schedulePopup();
        return;
      }

      clearTimer();
    };

    checkFooterVisibility();
    window.addEventListener("scroll", checkFooterVisibility, { passive: true });
    window.addEventListener("resize", checkFooterVisibility);
    window.addEventListener("orientationchange", checkFooterVisibility);
    window.visualViewport?.addEventListener("resize", checkFooterVisibility);
    window.visualViewport?.addEventListener("scroll", checkFooterVisibility);

    return () => {
      window.removeEventListener("scroll", checkFooterVisibility);
      window.removeEventListener("resize", checkFooterVisibility);
      window.removeEventListener("orientationchange", checkFooterVisibility);
      window.visualViewport?.removeEventListener("resize", checkFooterVisibility);
      window.visualViewport?.removeEventListener("scroll", checkFooterVisibility);
      clearTimer();
    };
  }, [clearTimer]);

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
        closePopup();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closePopup, isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="feedback-popup-backdrop"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          closePopup();
        }
      }}
    >
      <div
        className="feedback-popup"
        role="dialog"
        aria-modal="true"
        aria-labelledby="feedback-popup-title"
        aria-describedby="feedback-popup-description"
      >
        <button
          type="button"
          className="feedback-popup-close"
          onClick={closePopup}
          aria-label="Close feedback form"
          autoFocus
        >
          Close
        </button>

        <div className="feedback-popup-panel subtle-card p-6 sm:p-7">
          <p className="kicker">Client Feedback</p>
          <h2 id="feedback-popup-title" className="mt-4 text-3xl sm:text-[2.2rem]">
            Before you leave, tell us how the experience felt.
          </h2>
          <p id="feedback-popup-description" className="mt-4 max-w-xl text-sm">
            A short note helps us refine clarity, communication, and the overall studio journey.
            It only appears once you reach the contact details below.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[22px] border border-[var(--line)] bg-white/76 p-4">
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted-2)]">
                Best For
              </p>
              <p className="mt-3 text-sm">
                Clients, collaborators, consultants, and anyone who has interacted with the studio
                process.
              </p>
            </div>

            <div className="rounded-[22px] border border-[var(--line)] bg-white/76 p-4">
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted-2)]">
                Helpful Notes
              </p>
              <p className="mt-3 text-sm">
                You can mention responsiveness, design clarity, documentation quality, or overall
                experience.
              </p>
            </div>
          </div>
        </div>

        <div className="feedback-popup-form card p-6 sm:p-7">
          <p className="kicker">Feedback Form</p>
          <h3 className="mt-4 text-2xl sm:text-3xl">Share your experience</h3>
          <p className="mt-3 max-w-xl text-sm">
            It takes less than a minute and helps improve future client interactions.
          </p>
          <div className="mt-7">
            <FeedbackForm page="home_footer_popup" onSuccess={handleSuccess} />
          </div>
        </div>
      </div>
    </div>
  );
}
