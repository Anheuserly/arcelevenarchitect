"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const EASING = 0.12;
const MAX_STEP = 168;
const SNAP_DISTANCE = 0.4;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function isInteractiveElement(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return Boolean(
    target.closest(
      'input, textarea, select, option, button, [contenteditable="true"], [data-native-scroll]'
    )
  );
}

function findScrollableParent(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return null;
  }

  let node: HTMLElement | null = target;

  while (node && node !== document.body) {
    const styles = window.getComputedStyle(node);
    const canScrollY =
      /(auto|scroll|overlay)/.test(styles.overflowY) && node.scrollHeight > node.clientHeight + 2;

    if (canScrollY) {
      return node;
    }

    node = node.parentElement;
  }

  return document.scrollingElement;
}

export default function SmoothScrollController() {
  const pathname = usePathname();
  const frameRef = useRef<number | null>(null);
  const targetRef = useRef(0);
  const currentRef = useRef(0);

  useEffect(() => {
    const stop = () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };

    if (pathname.startsWith("/admin")) {
      stop();
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");

    if (reducedMotion.matches || coarsePointer.matches) {
      stop();
      return;
    }

    const getMaxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const step = () => {
      const difference = targetRef.current - currentRef.current;

      if (Math.abs(difference) <= SNAP_DISTANCE) {
        currentRef.current = targetRef.current;
        window.scrollTo({ top: currentRef.current, behavior: "auto" });
        frameRef.current = null;
        return;
      }

      currentRef.current += difference * EASING;
      window.scrollTo({ top: currentRef.current, behavior: "auto" });
      frameRef.current = window.requestAnimationFrame(step);
    };

    const start = () => {
      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(step);
      }
    };

    const syncFromNativeScroll = () => {
      if (frameRef.current !== null) {
        return;
      }

      currentRef.current = window.scrollY;
      targetRef.current = window.scrollY;
    };

    const applyDelta = (delta: number) => {
      const direction = Math.sign(delta);
      const magnitude = Math.min(Math.abs(delta), MAX_STEP);
      const tunedMagnitude = magnitude < 28 ? magnitude * 1.22 : magnitude * 0.94;

      targetRef.current = clamp(
        targetRef.current + direction * tunedMagnitude,
        0,
        getMaxScroll()
      );
      start();
    };

    const onWheel = (event: WheelEvent) => {
      if (
        event.defaultPrevented ||
        event.ctrlKey ||
        event.metaKey ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY) ||
        isInteractiveElement(event.target)
      ) {
        return;
      }

      const scrollableParent = findScrollableParent(event.target);

      if (
        scrollableParent &&
        scrollableParent !== document.body &&
        scrollableParent !== document.documentElement &&
        scrollableParent !== document.scrollingElement
      ) {
        return;
      }

      event.preventDefault();
      applyDelta(event.deltaY);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || isInteractiveElement(event.target)) {
        return;
      }

      const viewportJump = window.innerHeight * 0.9;

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          applyDelta(72);
          break;
        case "ArrowUp":
          event.preventDefault();
          applyDelta(-72);
          break;
        case "PageDown":
          event.preventDefault();
          applyDelta(viewportJump);
          break;
        case "PageUp":
          event.preventDefault();
          applyDelta(-viewportJump);
          break;
        case " ":
          event.preventDefault();
          applyDelta(event.shiftKey ? -viewportJump : viewportJump);
          break;
        case "Home":
          event.preventDefault();
          targetRef.current = 0;
          start();
          break;
        case "End":
          event.preventDefault();
          targetRef.current = getMaxScroll();
          start();
          break;
        default:
          break;
      }
    };

    const onResize = () => {
      targetRef.current = clamp(targetRef.current, 0, getMaxScroll());
      currentRef.current = clamp(window.scrollY, 0, getMaxScroll());
    };

    currentRef.current = window.scrollY;
    targetRef.current = window.scrollY;

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", syncFromNativeScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", syncFromNativeScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [pathname]);

  return null;
}
