"use client";

import { useState, useCallback, useEffect } from "react";

export type Platform = "ios" | "android" | null;

export function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [platform, setPlatform] = useState<Platform>(null);

  const open = useCallback((p: Platform) => {
    setPlatform(p);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setPlatform(null);
  }, []);

  // ESC 키로 닫기
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    // 스크롤 방지
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, close]);

  return { isOpen, platform, open, close };
}
