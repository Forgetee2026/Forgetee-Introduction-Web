"use client";

import { useState } from "react";
import { motion, useTransform, useMotionValueEvent, type MotionValue } from "framer-motion";
import { SECTION_IDS, SECTION_TRANSITION } from "@/lib/constants";
import { useScrollTrigger } from "@/hooks/useScrollTrigger";
import { useLanguage } from "@/lib/i18n";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

function PhilosophyFixed({ scrollYProgress, range }: { scrollYProgress: MotionValue<number>; range: [number, number] }) {
  const { t } = useLanguage();
  const lines = [t("philosophy.lineOne"), t("philosophy.lineTwo")];
  const [start, end] = range;
  const [entered, setEntered] = useState(false);
  const progress = useTransform(scrollYProgress, [start, end], [0, 1]);

  const tr = SECTION_TRANSITION.duration;
  const contentOpacity = useTransform(scrollYProgress, [start, start + tr], [0, 1]);
  const contentScale = useTransform(scrollYProgress, [start, start + tr], [SECTION_TRANSITION.scaleIn, 1]);
  const contentY = useTransform(scrollYProgress, [start, start + tr], ["3%", "0%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => setEntered(v >= start - 0.01));

  const quoteTriggered = useScrollTrigger(progress, 0.05);
  const linesTriggered = useScrollTrigger(progress, 0.10);
  const dividerTriggered = useScrollTrigger(progress, 0.40);
  const taglineTriggered = useScrollTrigger(progress, 0.50);
  const subTriggered = useScrollTrigger(progress, 0.60);

  return (
    <div className={`absolute inset-0 z-[5] bg-white pointer-events-auto ${entered ? "" : "invisible"}`}>
      <motion.div style={{ opacity: contentOpacity, scale: contentScale, y: contentY }} className="flex h-full items-center">
        <div className="mx-auto max-w-5xl px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={quoteTriggered ? { opacity: 0.08, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 1.0, ease: EASE_OUT_EXPO }}
            className="mb-8 select-none text-[160px] font-serif leading-none text-gray-950"
          >&ldquo;</motion.div>
          <div className="-mt-20">
            {lines.map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.p
                  initial={{ y: "100%" }}
                  animate={linesTriggered ? { y: "0%" } : { y: "100%" }}
                  transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: i * 0.3 }}
                  className="text-[48px] font-semibold leading-[1.15] tracking-tight text-gray-950 lg:text-[64px]"
                >{line}</motion.p>
              </div>
            ))}
          </div>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={dividerTriggered ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
            transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
            className="mx-auto mt-10 h-px w-12 origin-center bg-gray-300"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={taglineTriggered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
            className="mt-8 text-xl tracking-wide text-gray-400"
          >
            <span className="font-semibold text-gray-950">For</span> you, <span className="font-semibold text-gray-950">Get</span> everything done.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={subTriggered ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
            className="mt-3 text-sm text-gray-400"
          >{t("philosophy.taglineSub")}</motion.p>
        </div>
      </motion.div>
    </div>
  );
}

function PhilosophyMobile() {
  const { t } = useLanguage();
  const lines = [t("philosophy.lineOne"), t("philosophy.lineTwo")];
  return (
    <section id={SECTION_IDS.philosophy} className="flex min-h-[80vh] items-center py-32 md:py-40">
      <div className="mx-auto max-w-5xl px-6 text-center md:px-8">
        <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 0.08, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="mb-8 select-none text-[120px] font-serif leading-none text-gray-950">&ldquo;</motion.div>
        <motion.div variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.3, delayChildren: 0.2 } } }} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="-mt-20">
          {lines.map((line, i) => (<div key={i} className="overflow-hidden"><motion.p variants={{ hidden: { y: "100%" }, visible: { y: "0%", transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } } }} className="text-[32px] font-semibold leading-[1.15] tracking-tight text-gray-950">{line}</motion.p></div>))}
        </motion.div>
        <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="mx-auto mt-10 h-px w-12 origin-center bg-gray-300" />
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 1.2, duration: 0.8 }} className="mt-8 text-lg tracking-wide text-gray-400"><span className="font-semibold text-gray-950">For</span> you, <span className="font-semibold text-gray-950">Get</span> everything done.</motion.p>
        <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 1.5, duration: 0.8 }} className="mt-3 text-sm text-gray-400">{t("philosophy.taglineSub")}</motion.p>
      </div>
    </section>
  );
}

interface Props { scrollYProgress?: MotionValue<number>; range?: [number, number] }
export default function PhilosophySection({ scrollYProgress, range }: Props) {
  if (scrollYProgress && range) return <PhilosophyFixed scrollYProgress={scrollYProgress} range={range} />;
  return <PhilosophyMobile />;
}
