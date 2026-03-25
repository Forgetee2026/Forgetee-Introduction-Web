"use client";

import { useRef, useState } from "react";
import { motion, useTransform, useMotionValueEvent, useScroll, type MotionValue } from "framer-motion";
import { SECTION_IDS, ANIMATION } from "@/lib/constants";

const steps = [
  { number: "01", title: "일정을 말하세요", description: "자연어로 입력하면 끝. 복잡한 양식은 없습니다." },
  { number: "02", title: "잊으세요", description: "AI가 최적의 타이밍을 계산합니다. 당신은 신경 끄세요." },
  { number: "03", title: "알림을 받으세요", description: "필요한 순간에, 가장 적절한 방식으로 알려드립니다." },
];

function HowItWorksFixed({ scrollYProgress, range }: { scrollYProgress: MotionValue<number>; range: [number, number] }) {
  const [start, end] = range;
  const [entered, setEntered] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const progress = useTransform(scrollYProgress, [start, end], [0, 1]);
  const contentOpacity = useTransform(scrollYProgress, [start, start + 0.015], [0, 1]);
  const contentScale = useTransform(scrollYProgress, [start, start + 0.015], [1.03, 1]);
  const titleY = useTransform(progress, [0.05, 0.15], ["100%", "0%"]);
  const labelOpacity = useTransform(progress, [0.05, 0.12], [0, 1]);
  const lineProgress = useTransform(progress, [0.15, 0.9], [0, 100]);

  useMotionValueEvent(scrollYProgress, "change", (v) => setEntered(v >= start - 0.005));
  useMotionValueEvent(progress, "change", (v) => {
    if (v < 0.15) setActiveStep(-1); else if (v < 0.4) setActiveStep(0); else if (v < 0.65) setActiveStep(1); else setActiveStep(2);
  });

  return (
    <div className={`absolute inset-0 z-[4] bg-gray-50 pointer-events-auto ${entered ? "" : "invisible"}`}>
      <motion.div style={{ opacity: contentOpacity, scale: contentScale }} className="flex h-full items-center">
        <div className="mx-auto w-full max-w-6xl px-8">
          <motion.span style={{ opacity: labelOpacity }} className="text-xs font-medium uppercase tracking-widest text-gray-400">How it works</motion.span>
          <div className="mt-4 overflow-hidden"><motion.h2 style={{ y: titleY }} className="text-[48px] font-semibold leading-tight tracking-tight text-gray-950">3단계면 충분합니다</motion.h2></div>
          <div className="relative mt-16">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-200" />
            <motion.div style={{ height: useTransform(lineProgress, (v) => `${v}%`) }} className="absolute left-8 top-0 w-px bg-gray-950" />
            <div className="space-y-20">
              {steps.map((step, i) => (
                <motion.div key={step.number} animate={{ opacity: activeStep >= i ? 1 : 0, x: activeStep >= i ? 0 : 40 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="relative pl-24">
                  <div className="absolute left-6 top-1">
                    <motion.div animate={{ scale: activeStep >= i ? 1 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="relative flex h-5 w-5 items-center justify-center rounded-full bg-gray-950"><div className="h-2 w-2 rounded-full bg-white" /></motion.div>
                    {activeStep === i && <motion.div animate={{ scale: [0.8, 1.8], opacity: [0.4, 0] }} transition={{ duration: 1, repeat: Infinity, ease: "easeOut" }} className="absolute inset-0 rounded-full bg-gray-950" />}
                  </div>
                  <span className="absolute -top-6 left-24 text-[100px] font-bold leading-none text-gray-200/60 select-none">{step.number}</span>
                  <div className="relative"><h3 className="text-2xl font-semibold text-gray-950">{step.title}</h3><p className="mt-2 text-base leading-relaxed text-gray-500">{step.description}</p></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function HowItWorksMobile() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 0.7", "end 0.7"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <section id={SECTION_IDS.howItWorks} ref={containerRef} className="bg-gray-50 py-32 md:py-40">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <motion.span variants={ANIMATION.fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-xs font-medium uppercase tracking-widest text-gray-400">How it works</motion.span>
        <motion.h2 variants={ANIMATION.fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-4 text-[32px] font-semibold leading-tight tracking-tight text-gray-950">3단계면 충분합니다</motion.h2>
        <div className="relative mt-16 ml-4">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200" />
          <motion.div style={{ height: lineHeight }} className="absolute left-4 top-0 w-px bg-gray-950" />
          <div className="space-y-16">
            {steps.map((step, i) => (
              <motion.div key={step.number} initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }} className="relative pl-14">
                <div className="absolute left-2 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-950"><div className="h-2 w-2 rounded-full bg-white" /></div>
                <span className="absolute -top-6 left-14 text-[80px] font-bold leading-none text-gray-200/60 select-none">{step.number}</span>
                <div className="relative"><h3 className="text-xl font-semibold text-gray-950">{step.title}</h3><p className="mt-2 text-base leading-relaxed text-gray-500">{step.description}</p></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface Props { scrollYProgress?: MotionValue<number>; range?: [number, number] }
export default function HowItWorksSection({ scrollYProgress, range }: Props) {
  if (scrollYProgress && range) return <HowItWorksFixed scrollYProgress={scrollYProgress} range={range} />;
  return <HowItWorksMobile />;
}
