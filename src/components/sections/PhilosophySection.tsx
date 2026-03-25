"use client";

import { useState } from "react";
import { motion, useTransform, useMotionValueEvent, type MotionValue } from "framer-motion";
import { SECTION_IDS } from "@/lib/constants";

const lines = ["AI가 대신 기억하는 세상에서,", "당신은 그냥 살면 됩니다."];

function PhilosophyFixed({ scrollYProgress, range }: { scrollYProgress: MotionValue<number>; range: [number, number] }) {
  const [start, end] = range;
  const [entered, setEntered] = useState(false);
  const progress = useTransform(scrollYProgress, [start, end], [0, 1]);
  const contentOpacity = useTransform(scrollYProgress, [start, start + 0.015], [0, 1]);
  const contentScale = useTransform(scrollYProgress, [start, start + 0.015], [1.03, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => setEntered(v >= start - 0.005));

  const quoteOpacity = useTransform(progress, [0.05, 0.18], [0, 0.08]);
  const quoteScale = useTransform(progress, [0.05, 0.18], [0.5, 1]);
  const line1Y = useTransform(progress, [0.1, 0.35], ["100%", "0%"]);
  const line2Y = useTransform(progress, [0.35, 0.6], ["100%", "0%"]);
  const dividerScaleX = useTransform(progress, [0.55, 0.7], [0, 1]);
  const dividerOpacity = useTransform(progress, [0.55, 0.7], [0, 1]);
  const taglineOpacity = useTransform(progress, [0.7, 0.85], [0, 1]);
  const taglineY = useTransform(progress, [0.7, 0.85], [20, 0]);
  const subOpacity = useTransform(progress, [0.8, 0.92], [0, 1]);
  const subY = useTransform(progress, [0.8, 0.92], [16, 0]);

  return (
    <div className={`absolute inset-0 z-[5] bg-white pointer-events-auto ${entered ? "" : "invisible"}`}>
      <motion.div style={{ opacity: contentOpacity, scale: contentScale }} className="flex h-full items-center">
        <div className="mx-auto max-w-5xl px-8 text-center">
          <motion.div style={{ opacity: quoteOpacity, scale: quoteScale }} className="mb-8 select-none text-[160px] font-serif leading-none text-gray-950">&ldquo;</motion.div>
          <div className="-mt-20">
            {lines.map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.p style={{ y: i === 0 ? line1Y : line2Y }} className="text-[48px] font-semibold leading-[1.15] tracking-tight text-gray-950 lg:text-[64px]">{line}</motion.p>
              </div>
            ))}
          </div>
          <motion.div style={{ scaleX: dividerScaleX, opacity: dividerOpacity }} className="mx-auto mt-10 h-px w-12 origin-center bg-gray-300" />
          <motion.p style={{ opacity: taglineOpacity, y: taglineY }} className="mt-8 text-xl tracking-wide text-gray-400">
            <span className="font-semibold text-gray-950">For</span> you, <span className="font-semibold text-gray-950">Get</span> everything done.
          </motion.p>
          <motion.p style={{ opacity: subOpacity, y: subY }} className="mt-3 text-sm text-gray-400">당신을 위해, 모든 것을 챙기겠습니다.</motion.p>
        </div>
      </motion.div>
    </div>
  );
}

function PhilosophyMobile() {
  return (
    <section id={SECTION_IDS.philosophy} className="flex min-h-[80vh] items-center py-32 md:py-40">
      <div className="mx-auto max-w-5xl px-6 text-center md:px-8">
        <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 0.08, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="mb-8 select-none text-[120px] font-serif leading-none text-gray-950">&ldquo;</motion.div>
        <motion.div variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.3, delayChildren: 0.2 } } }} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="-mt-20">
          {lines.map((line, i) => (<div key={i} className="overflow-hidden"><motion.p variants={{ hidden: { y: "100%" }, visible: { y: "0%", transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } } }} className="text-[32px] font-semibold leading-[1.15] tracking-tight text-gray-950">{line}</motion.p></div>))}
        </motion.div>
        <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="mx-auto mt-10 h-px w-12 origin-center bg-gray-300" />
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 1.2, duration: 0.8 }} className="mt-8 text-lg tracking-wide text-gray-400"><span className="font-semibold text-gray-950">For</span> you, <span className="font-semibold text-gray-950">Get</span> everything done.</motion.p>
        <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 1.5, duration: 0.8 }} className="mt-3 text-sm text-gray-400">당신을 위해, 모든 것을 챙기겠습니다.</motion.p>
      </div>
    </section>
  );
}

interface Props { scrollYProgress?: MotionValue<number>; range?: [number, number] }
export default function PhilosophySection({ scrollYProgress, range }: Props) {
  if (scrollYProgress && range) return <PhilosophyFixed scrollYProgress={scrollYProgress} range={range} />;
  return <PhilosophyMobile />;
}
