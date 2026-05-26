"use client";

import { useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProblemSection from "@/components/sections/ProblemSection";
import SolutionSection from "@/components/sections/SolutionSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import PhilosophySection from "@/components/sections/PhilosophySection";
import FinalCTASection from "@/components/sections/FinalCTASection";
import ServiceModal from "@/components/ui/ServiceModal";
import { useModal } from "@/hooks/useModal";
import { SECTION_RANGES, SCROLL_HEIGHT } from "@/lib/constants";
import { APP_STORE_IOS_URL } from "@/lib/external-urls";


export default function Home() {
  const modal = useModal();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const [fixedVisible, setFixedVisible] = useState(true);

  // 스크롤 끝에서 fixed 레이어 숨김 → CTA가 보임
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setFixedVisible(v < 0.99);
  });

  // iOS 는 App Store 로 직접 이동, Android 는 아직 미출시이므로 ServiceModal 안내
  const handleCTAClick = (platform: "ios" | "android") => {
    if (platform === "ios") {
      window.open(APP_STORE_IOS_URL, "_blank", "noopener,noreferrer");
      return;
    }
    modal.open(platform);
  };

  return (
    <>
      <Header onCTAClick={() => handleCTAClick("ios")} />

      {/* 데스크톱: fixed 레이어 + 스크롤 컨테이너 */}
      <div className="hidden lg:block">
        <div ref={scrollRef} style={{ height: SCROLL_HEIGHT }}>
          <div className={`fixed inset-0 z-10 pointer-events-none ${fixedVisible ? "" : "invisible"}`}>
            <HeroSection
              scrollYProgress={scrollYProgress}
              range={SECTION_RANGES.hero}
              onCTAClick={handleCTAClick}
            />
            <AboutSection
              scrollYProgress={scrollYProgress}
              range={SECTION_RANGES.about}
            />
            <ProblemSection
              scrollYProgress={scrollYProgress}
              range={SECTION_RANGES.problem}
            />
            <SolutionSection
              scrollYProgress={scrollYProgress}
              range={SECTION_RANGES.solution}
            />
            <HowItWorksSection
              scrollYProgress={scrollYProgress}
              range={SECTION_RANGES.howItWorks}
            />
            <PhilosophySection
              scrollYProgress={scrollYProgress}
              range={SECTION_RANGES.philosophy}
            />
          </div>
        </div>
        {/* CTA + Footer: 일반 스크롤 */}
        <FinalCTASection onCTAClick={handleCTAClick} />
        <Footer />
      </div>

      {/* 모바일: 일반 스크롤 */}
      <div className="lg:hidden">
        <main>
          <HeroSection onCTAClick={handleCTAClick} />
          <AboutSection />
          <ProblemSection />
          <SolutionSection />
          <HowItWorksSection />
          <PhilosophySection />
          <FinalCTASection onCTAClick={handleCTAClick} />
        </main>
        <Footer />
      </div>

      <ServiceModal
        isOpen={modal.isOpen}
        platform={modal.platform}
        onClose={modal.close}
      />
    </>
  );
}
