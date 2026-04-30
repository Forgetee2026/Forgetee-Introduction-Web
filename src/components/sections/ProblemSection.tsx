"use client";

import { useState } from "react";
import { motion, useTransform, useMotionValueEvent, type MotionValue } from "framer-motion";
import { SECTION_IDS, ANIMATION, SECTION_TRANSITION } from "@/lib/constants";
import { useScrollTrigger } from "@/hooks/useScrollTrigger";
import { useLanguage } from "@/lib/i18n";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const PROBLEM_KEYS = [
  { number: "01", key: "a" },
  { number: "02", key: "b" },
  { number: "03", key: "c" },
] as const;

function ProblemFixed({ scrollYProgress, range }: { scrollYProgress: MotionValue<number>; range: [number, number] }) {
  const { t } = useLanguage();
  const [start, end] = range;
  const [entered, setEntered] = useState(false);
  const progress = useTransform(scrollYProgress, [start, end], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => setEntered(v >= start - 0.01));

  const tr = SECTION_TRANSITION.duration;
  const contentOpacity = useTransform(scrollYProgress, [start, start + tr, end - tr, end], [0, 1, 1, 0]);
  const contentScale = useTransform(scrollYProgress, [start, start + tr, end - tr, end], [SECTION_TRANSITION.scaleIn, 1, 1, SECTION_TRANSITION.scaleOut]);
  const contentY = useTransform(scrollYProgress, [start, start + tr], ["3%", "0%"]);

  const labelTriggered = useScrollTrigger(progress, 0.05);
  const titleTriggered = useScrollTrigger(progress, 0.05);
  const row1Triggered = useScrollTrigger(progress, 0.20);
  const row2Triggered = useScrollTrigger(progress, 0.35);
  const row3Triggered = useScrollTrigger(progress, 0.50);
  const rowTriggered = [row1Triggered, row2Triggered, row3Triggered];

  return (
    <div className={`absolute inset-0 z-[2] bg-gray-50 pointer-events-auto ${entered ? "" : "invisible"}`}>
      <motion.div style={{ opacity: contentOpacity, scale: contentScale, y: contentY }} className="flex h-full items-center">
        <div className="mx-auto w-full max-w-5xl px-8">
          <motion.span
            initial={{ opacity: 0 }}
            animate={labelTriggered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            className="text-xs font-medium uppercase tracking-widest text-gray-400"
          >{t("problem.eyebrow")}</motion.span>
          <div className="mt-4 overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              animate={titleTriggered ? { y: "0%" } : { y: "100%" }}
              transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
              className="whitespace-pre-line text-[48px] font-semibold leading-tight tracking-tight text-gray-950"
            >{t("problem.titleDesktop")}</motion.h2>
          </div>
          <div className="mt-16">
            {PROBLEM_KEYS.map((p, i) => (
              <motion.div
                key={p.number}
                initial={{ opacity: 0, y: 30 }}
                animate={rowTriggered[i] ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
                className="border-t border-gray-300 py-8"
              >
                <div className="flex items-baseline gap-10">
                  <span className="text-sm font-medium tabular-nums text-gray-300">{p.number}</span>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-950">{t(`problem.items.${p.key}.title`)}</h3>
                    <p className="mt-2 text-base leading-relaxed text-gray-500">{t(`problem.items.${p.key}.body`)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ProblemMobile() {
  const { t } = useLanguage();
  return (
    <section id={SECTION_IDS.problem} className="bg-gray-50 py-32 md:py-40">
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <motion.span variants={ANIMATION.fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="text-xs font-medium uppercase tracking-widest text-gray-400">{t("problem.eyebrow")}</motion.span>
        <motion.h2 variants={ANIMATION.fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="mt-4 whitespace-pre-line text-[32px] font-semibold leading-tight tracking-tight text-gray-950">{t("problem.titleMobile")}</motion.h2>
        <motion.div
          variants={ANIMATION.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14"
        >
          {PROBLEM_KEYS.map((p) => (
            <motion.div
              key={p.number}
              variants={ANIMATION.fadeInUp}
              className="border-t border-gray-300 py-7"
            >
              <div className="flex items-baseline gap-6">
                <span className="text-sm font-medium tabular-nums text-gray-300">{p.number}</span>
                <div>
                  <h3 className="text-xl font-semibold text-gray-950">{t(`problem.items.${p.key}.title`)}</h3>
                  <p className="mt-2 text-base leading-relaxed text-gray-500">{t(`problem.items.${p.key}.body`)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface Props { scrollYProgress?: MotionValue<number>; range?: [number, number] }
export default function ProblemSection({ scrollYProgress, range }: Props) {
  if (scrollYProgress && range) return <ProblemFixed scrollYProgress={scrollYProgress} range={range} />;
  return <ProblemMobile />;
}
