"use client";

import { useState } from "react";
import { motion, useTransform, useMotionValueEvent, type MotionValue } from "framer-motion";
import { SECTION_IDS, ANIMATION } from "@/lib/constants";

function CTALightButton({ platform, onClick }: { platform: "ios" | "android"; onClick: () => void }) {
  const isIOS = platform === "ios";
  return (
    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onClick}
      className={`inline-flex items-center justify-center gap-3 rounded-xl px-7 py-3.5 text-base font-medium transition-colors ${isIOS ? "bg-white text-gray-950 hover:bg-gray-100" : "border border-gray-600 bg-transparent text-white hover:bg-gray-800"}`}>
      {isIOS ? <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg>
        : <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 010 1.38l-2.302 2.302L15.395 12l2.303-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302-8.635-8.635z" /></svg>}
      <span>{isIOS ? "App Store" : "Google Play"}</span>
    </motion.button>
  );
}

function FinalCTAFixed({ scrollYProgress, range, onCTAClick }: { scrollYProgress: MotionValue<number>; range: [number, number]; onCTAClick: (p: "ios" | "android") => void }) {
  const [start, end] = range;
  const [entered, setEntered] = useState(false);
  const progress = useTransform(scrollYProgress, [start, end], [0, 1]);
  const contentOpacity = useTransform(scrollYProgress, [start, start + 0.015], [0, 1]);
  const contentScale = useTransform(scrollYProgress, [start, start + 0.015], [1.03, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => setEntered(v >= start - 0.005));

  const titleY = useTransform(progress, [0.05, 0.3], ["100%", "0%"]);
  const subOpacity = useTransform(progress, [0.3, 0.5], [0, 1]);
  const subY = useTransform(progress, [0.3, 0.5], [20, 0]);
  const lineScaleX = useTransform(progress, [0.4, 0.6], [0, 1]);
  const lineOpacity = useTransform(progress, [0.4, 0.6], [0, 1]);
  const ctaOpacity = useTransform(progress, [0.55, 0.75], [0, 1]);
  const ctaScale = useTransform(progress, [0.55, 0.75], [1.04, 1]);

  return (
    <div className={`absolute inset-0 z-[6] bg-gray-950 pointer-events-auto ${entered ? "" : "invisible"}`}>
      <motion.div style={{ opacity: contentOpacity, scale: contentScale }} className="flex h-full items-center">
        <div className="mx-auto w-full max-w-6xl px-8">
          <div className="flex flex-col items-center text-center">
            <div className="overflow-hidden"><motion.h2 style={{ y: titleY }} className="text-[48px] font-semibold leading-tight tracking-tight text-white">일정은 맡기고,<br />순간을 챙기세요.</motion.h2></div>
            <motion.p style={{ opacity: subOpacity, y: subY }} className="mt-5 text-lg text-gray-400">ForGet과 함께 여유로운 하루를 시작하세요.</motion.p>
            <motion.div style={{ scaleX: lineScaleX, opacity: lineOpacity }} className="mt-8 h-px w-12 origin-center bg-gray-700" />
            <motion.div style={{ opacity: ctaOpacity, scale: ctaScale }} className="mt-10 flex gap-4">
              <CTALightButton platform="ios" onClick={() => onCTAClick("ios")} />
              <CTALightButton platform="android" onClick={() => onCTAClick("android")} />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function FinalCTAMobile({ onCTAClick }: { onCTAClick: (p: "ios" | "android") => void }) {
  return (
    <section id={SECTION_IDS.cta} className="bg-gray-950 py-32 md:py-40">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <motion.div variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } } }} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="flex flex-col items-center text-center">
          <motion.h2 variants={ANIMATION.fadeInUp} className="text-[32px] font-semibold leading-tight tracking-tight text-white">일정은 맡기고,<br />순간을 챙기세요.</motion.h2>
          <motion.p variants={ANIMATION.fadeInUp} className="mt-5 text-base text-gray-400">ForGet과 함께 여유로운 하루를 시작하세요.</motion.p>
          <motion.div variants={ANIMATION.drawLine} className="mt-8 h-px w-12 origin-center bg-gray-700" />
          <motion.div variants={ANIMATION.scaleSettle} className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <CTALightButton platform="ios" onClick={() => onCTAClick("ios")} />
            <CTALightButton platform="android" onClick={() => onCTAClick("android")} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

interface Props { scrollYProgress?: MotionValue<number>; range?: [number, number]; onCTAClick?: (p: "ios" | "android") => void }
export default function FinalCTASection({ scrollYProgress, range, onCTAClick }: Props) {
  const handleClick = onCTAClick || (() => {});
  if (scrollYProgress && range) return <FinalCTAFixed scrollYProgress={scrollYProgress} range={range} onCTAClick={handleClick} />;
  return <FinalCTAMobile onCTAClick={handleClick} />;
}
