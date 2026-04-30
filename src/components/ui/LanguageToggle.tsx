"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import type { Language } from "@/lib/i18n";

const OPTIONS: { value: Language; label: string }[] = [
  { value: "ko", label: "KO" },
  { value: "en", label: "EN" },
];

interface LanguageToggleProps {
  /** 라디오 버튼 그룹 식별자 — 두 컴포넌트 인스턴스가 같은 페이지에 있어도 layoutId 충돌 방지 */
  layoutGroupId?: string;
  /** 작게 / 크게 */
  size?: "sm" | "md";
}

/**
 * KO / EN 슬라이딩 segmented 토글.
 * 활성 쪽이 검은 pill 로 강조되고, framer-motion layoutId 로 좌/우 슬라이딩.
 */
export default function LanguageToggle({
  layoutGroupId = "lang-toggle",
  size = "sm",
}: LanguageToggleProps) {
  const { lang, setLang } = useLanguage();

  const sizeClass =
    size === "sm"
      ? "h-8 text-xs"
      : "h-10 text-sm";
  const cellWidth = size === "sm" ? "w-9" : "w-12";

  return (
    <div
      role="radiogroup"
      aria-label="Language"
      className={`relative inline-flex items-center rounded-full border border-gray-200 bg-gray-50 p-0.5 ${sizeClass}`}
    >
      {OPTIONS.map((opt) => {
        const active = lang === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setLang(opt.value)}
            className={`relative ${cellWidth} flex h-full items-center justify-center rounded-full font-semibold tracking-wide transition-colors ${
              active ? "text-white" : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {active && (
              <motion.span
                layoutId={layoutGroupId}
                transition={{ type: "spring", stiffness: 500, damping: 32 }}
                className="absolute inset-0 rounded-full bg-gray-950"
              />
            )}
            <span className="relative z-10">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
