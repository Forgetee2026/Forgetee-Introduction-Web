"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import CTAButton from "@/components/ui/CTAButton";
import { SECTION_IDS } from "@/lib/constants";

function AnimatedText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.03, delayChildren: delay } } }} className={className}>
      {text.split("\n").map((line, li) => (
        <span key={li} className="block overflow-hidden">
          {line.split("").map((char, ci) => (
            <motion.span key={`${li}-${ci}`} variants={{ hidden: { y: "100%", opacity: 0 }, visible: { y: "0%", opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }} className="inline-block">
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.div>
  );
}

function HeroFixed({ scrollYProgress, range, onCTAClick }: { scrollYProgress: MotionValue<number>; range: [number, number]; onCTAClick: (p: "ios" | "android") => void }) {
  const [, end] = range;
  const contentOpacity = useTransform(scrollYProgress, [0, end - 0.015, end], [1, 1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, end - 0.015, end], [1, 1, 0.96]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.02, 0.04], [1, 1, 0]);

  return (
    <div className="absolute inset-0 z-[1] bg-white pointer-events-auto">
      <motion.div style={{ opacity: contentOpacity, scale: contentScale }} className="flex h-full items-center justify-center px-6">
        <div className="flex flex-col items-center text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="mb-8 inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-xs font-medium text-gray-600">
            AI 일정 리마인더
          </motion.div>
          <AnimatedText text={"일정은 잊으세요.\n기억은 제가 할게요."} className="text-[56px] font-bold leading-[1.1] tracking-tight text-gray-950 lg:text-[72px]" delay={0.3} />
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="mt-8 max-w-md text-lg leading-relaxed text-gray-500">
            캘린더 들여다보는 시간도 아깝잖아요.<br />ForGet이 필요한 순간에 알려드립니다.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="mt-10 flex gap-4">
            <CTAButton platform="ios" onClick={() => onCTAClick("ios")} size="large" />
            <CTAButton platform="android" onClick={() => onCTAClick("android")} size="large" />
          </motion.div>
        </div>
      </motion.div>
      <motion.div style={{ opacity: indicatorOpacity }} className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} className="flex flex-col items-center gap-2">
          <span className="text-xs text-gray-400">Scroll</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-400"><path d="M8 3v10m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </motion.div>
      </motion.div>
    </div>
  );
}

function HeroMobile({ onCTAClick }: { onCTAClick: (p: "ios" | "android") => void }) {
  return (
    <section id={SECTION_IDS.hero} className="flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20">
      <div className="flex flex-col items-center text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8 inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-xs font-medium text-gray-600">AI 일정 리마인더</motion.div>
        <AnimatedText text={"일정은 잊으세요.\n기억은 제가 할게요."} className="text-[40px] font-bold leading-[1.1] tracking-tight text-gray-950" delay={0.3} />
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.8 }} className="mt-6 max-w-md text-base leading-relaxed text-gray-500">캘린더 들여다보는 시간도 아깝잖아요.<br />ForGet이 필요한 순간에 알려드립니다.</motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8, duration: 0.8 }} className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <CTAButton platform="ios" onClick={() => onCTAClick("ios")} size="large" />
          <CTAButton platform="android" onClick={() => onCTAClick("android")} size="large" />
        </motion.div>
      </div>
    </section>
  );
}

interface Props { scrollYProgress?: MotionValue<number>; range?: [number, number]; onCTAClick: (p: "ios" | "android") => void }
export default function HeroSection({ scrollYProgress, range, onCTAClick }: Props) {
  if (scrollYProgress && range) return <HeroFixed scrollYProgress={scrollYProgress} range={range} onCTAClick={onCTAClick} />;
  return <HeroMobile onCTAClick={onCTAClick} />;
}
