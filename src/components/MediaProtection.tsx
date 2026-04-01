"use client";

import { useEffect } from "react";

function isProtectedMediaTarget(target: EventTarget | null) {
  return target instanceof HTMLElement && Boolean(target.closest("img, [data-protect-media]"));
}

export default function MediaProtection() {
  useEffect(() => {
    const preventContextMenu = (event: MouseEvent) => {
      if (isProtectedMediaTarget(event.target)) {
        event.preventDefault();
      }
    };

    const preventDragStart = (event: DragEvent) => {
      if (isProtectedMediaTarget(event.target)) {
        event.preventDefault();
      }
    };

    const preventKeyboardSave = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", preventContextMenu);
    document.addEventListener("dragstart", preventDragStart);
    document.addEventListener("keydown", preventKeyboardSave);

    return () => {
      document.removeEventListener("contextmenu", preventContextMenu);
      document.removeEventListener("dragstart", preventDragStart);
      document.removeEventListener("keydown", preventKeyboardSave);
    };
  }, []);

  return null;
}
