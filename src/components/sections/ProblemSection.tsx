"use client";

import { useState } from "react";
import { motion, useTransform, useMotionValueEvent, type MotionValue } from "framer-motion";
import { SECTION_IDS, ANIMATION } from "@/lib/constants";

const problems = [
  { title: "등록은 했는데", description: "일정을 넣어놓고도 깜빡하는 건 여전합니다.",
    icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-gray-400"><rect x="6" y="4" width="20" height="24" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M11 4V2m10 2V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M6 10h20" stroke="currentColor" strokeWidth="1.5" /><path d="M12 16l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg> },
  { title: "알림은 울렸는데", description: "무심코 넘긴 알림, 결국 놓친 약속.",
    icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-gray-400"><path d="M16 4a8 8 0 00-8 8v6l-2 3h20l-2-3v-6a8 8 0 00-8-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M13 25a3 3 0 006 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M20 8l4-4M12 8L8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg> },
  { title: "확인하려면", description: "앱 열고, 날짜 찾고, 스크롤하고... 귀찮죠.",
    icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-gray-400"><rect x="9" y="4" width="14" height="24" rx="3" stroke="currentColor" strokeWidth="1.5" /><path d="M14 6h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="16" cy="24" r="1" fill="currentColor" /><path d="M13 13h6m-6 3h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg> },
];

function ProblemFixed({ scrollYProgress, range }: { scrollYProgress: MotionValue<number>; range: [number, number] }) {
  const [start, end] = range;
  const [entered, setEntered] = useState(false);
  const progress = useTransform(scrollYProgress, [start, end], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => setEntered(v >= start - 0.005));

  const contentOpacity = useTransform(scrollYProgress, [start, start + 0.015], [0, 1]);
  const contentScale = useTransform(scrollYProgress, [start, start + 0.015], [1.03, 1]);

  const titleY = useTransform(progress, [0.05, 0.2], ["100%", "0%"]);
  const labelOpacity = useTransform(progress, [0.05, 0.15], [0, 1]);
  const card1Clip = useTransform(progress, [0.2, 0.35], ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]);
  const card2Clip = useTransform(progress, [0.35, 0.5], ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]);
  const card3Clip = useTransform(progress, [0.5, 0.65], ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]);
  const cardClips = [card1Clip, card2Clip, card3Clip];

  return (
    <div className={`absolute inset-0 z-[2] bg-gray-50 pointer-events-auto ${entered ? "" : "invisible"}`}>
      <motion.div style={{ opacity: contentOpacity, scale: contentScale }} className="flex h-full items-center">
        <div className="mx-auto w-full max-w-6xl px-8">
          <motion.span style={{ opacity: labelOpacity }} className="text-xs font-medium uppercase tracking-widest text-gray-400">Problem</motion.span>
          <div className="mt-4 overflow-hidden">
            <motion.h2 style={{ y: titleY }} className="text-[48px] font-semibold leading-tight tracking-tight text-gray-950">캘린더, 등록만 하고<br />확인은 안 하죠?</motion.h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {problems.map((p, i) => (
              <motion.div key={p.title} style={{ clipPath: cardClips[i] }} className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                <div className="mb-5">{p.icon}</div>
                <h3 className="text-lg font-semibold text-gray-950">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{p.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ProblemMobile() {
  return (
    <section id={SECTION_IDS.problem} className="bg-gray-50 py-32 md:py-40">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <motion.span variants={ANIMATION.fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="text-xs font-medium uppercase tracking-widest text-gray-400">Problem</motion.span>
        <motion.h2 variants={ANIMATION.fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="mt-4 text-[32px] font-semibold leading-tight tracking-tight text-gray-950">캘린더, 등록만 하고<br />확인은 안 하죠?</motion.h2>
        <motion.div variants={ANIMATION.staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="mt-14 grid gap-6">
          {problems.map((p) => (
            <motion.div key={p.title} variants={ANIMATION.clipRevealUp} className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <div className="mb-5">{p.icon}</div>
              <h3 className="text-lg font-semibold text-gray-950">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">{p.description}</p>
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
