"use client";

import { useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import { NAV_ITEMS, SECTION_RANGES, NAV_SCROLL_OFFSET } from "@/lib/constants";

// 섹션 ID → 스크롤 범위 매핑
const SECTION_START: Record<string, number> = {
  problem: SECTION_RANGES.problem[0] + NAV_SCROLL_OFFSET,
  solution: SECTION_RANGES.solution[0] + NAV_SCROLL_OFFSET,
  "how-it-works": SECTION_RANGES.howItWorks[0] + NAV_SCROLL_OFFSET,
  philosophy: SECTION_RANGES.philosophy[0] + NAV_SCROLL_OFFSET,
};

export default function Header({
  onCTAClick,
}: {
  onCTAClick: () => void;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const { scrollY, scrollYProgress } = useScroll();

  // 데스크톱: scrollYProgress 기반 활성 섹션 판별
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < SECTION_RANGES.problem[0]) setActiveId(null);
    else if (v < SECTION_RANGES.solution[0]) setActiveId("problem");
    else if (v < SECTION_RANGES.howItWorks[0]) setActiveId("solution");
    else if (v < SECTION_RANGES.philosophy[0]) setActiveId("how-it-works");
    else if (v < SECTION_RANGES.cta[0]) setActiveId("philosophy");
    else setActiveId(null);
  });

  const headerBg = useTransform(
    scrollY,
    [0, 50],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.8)"]
  );
  const headerBorder = useTransform(
    scrollY,
    [0, 50],
    ["rgba(229,229,229,0)", "rgba(229,229,229,1)"]
  );
  const headerBlur = useTransform(scrollY, [0, 50], ["blur(0px)", "blur(20px)"]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);

    // 데스크톱: 스크롤 위치 계산
    if (window.innerWidth >= 1024) {
      const start = SECTION_START[id];
      if (start !== undefined) {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo({ top: start * maxScroll, behavior: "instant" });
      }
      return;
    }

    // 모바일: 기존 방식
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        style={{
          backgroundColor: headerBg,
          borderBottomColor: headerBorder,
          backdropFilter: headerBlur,
          WebkitBackdropFilter: headerBlur,
        }}
        className="fixed top-0 left-0 right-0 z-50 border-b"
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-8">
          {/* 로고 */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2.5"
          >
            <Image
              src="/images/main_logo_size_up.png"
              alt="ForGet 로고"
              width={32}
              height={32}
              className="h-8 w-auto"
            />
            <span className="text-xl font-semibold tracking-tight text-gray-950">
              For<span className="font-bold">G</span>et
            </span>
          </a>

          {/* 데스크톱 네비게이션 */}
          <div className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative text-sm font-medium transition-colors ${
                  activeId === item.id
                    ? "text-gray-950"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {item.label}
                {activeId === item.id && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gray-950"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
            <button
              onClick={onCTAClick}
              className="rounded-full bg-gray-950 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-gray-800 hover:scale-[1.02] active:scale-[0.98]"
            >
              시작하기
            </button>
          </div>

          {/* 모바일 햄버거 */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center md:hidden"
            aria-label="메뉴 열기"
          >
            <div className="flex flex-col gap-1.5">
              <motion.span
                animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-5 bg-gray-950"
              />
              <motion.span
                animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block h-0.5 w-5 bg-gray-950"
              />
              <motion.span
                animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-5 bg-gray-950"
              />
            </div>
          </button>
        </nav>
      </motion.header>

      {/* 모바일 메뉴 오버레이 */}
      <motion.div
        initial={false}
        animate={mobileMenuOpen ? { opacity: 1, pointerEvents: "auto" as const } : { opacity: 0, pointerEvents: "none" as const }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl md:hidden"
      >
        <div className="flex h-full flex-col items-center justify-center gap-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-2xl font-semibold text-gray-950 transition-colors hover:text-gray-600"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onCTAClick();
            }}
            className="mt-4 rounded-full bg-gray-950 px-8 py-3 text-lg font-medium text-white"
          >
            시작하기
          </button>
        </div>
      </motion.div>
    </>
  );
}
