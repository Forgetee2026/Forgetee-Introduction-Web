"use client";

import { useState } from "react";
import { motion, useTransform, useMotionValueEvent, type MotionValue } from "framer-motion";
import { SECTION_IDS, ANIMATION, SECTION_TRANSITION } from "@/lib/constants";
import { useScrollTrigger } from "@/hooks/useScrollTrigger";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const problems = [
  { number: "01", title: "등록은 했는데", description: "일정을 넣어놓고도 깜빡하는 건 여전합니다." },
  { number: "02", title: "알림은 울렸는데", description: "무심코 넘긴 알림, 결국 놓친 약속." },
  { number: "03", title: "확인하려면", description: "앱 열고, 날짜 찾고, 스크롤하고... 귀찮죠." },
];

function ProblemFixed({ scrollYProgress, range }: { scrollYProgress: MotionValue<number>; range: [number, number] }) {
  const [start, end] = range;
  const [entered, setEntered] = useState(false);
  const progress = useTransform(scrollYProgress, [start, end], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => setEntered(v >= start - 0.01));

  // 섹션 진입/퇴장 — 스크롤 직동 (4-keyframe)
  const t = SECTION_TRANSITION.duration;
  const contentOpacity = useTransform(scrollYProgress, [start, start + t, end - t, end], [0, 1, 1, 0]);
  const contentScale = useTransform(scrollYProgress, [start, start + t, end - t, end], [SECTION_TRANSITION.scaleIn, 1, 1, SECTION_TRANSITION.scaleOut]);
  const contentY = useTransform(scrollYProgress, [start, start + t], ["3%", "0%"]);

  // 내부 요소 — 임계값 트리거
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
          >Problem</motion.span>
          <div className="mt-4 overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              animate={titleTriggered ? { y: "0%" } : { y: "100%" }}
              transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
              className="text-[48px] font-semibold leading-tight tracking-tight text-gray-950"
            >캘린더,<br />아직도 직접 열고 있나요?</motion.h2>
          </div>
          <div className="mt-16">
            {problems.map((p, i) => (
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
                    <h3 className="text-2xl font-semibold text-gray-950">{p.title}</h3>
                    <p className="mt-2 text-base leading-relaxed text-gray-500">{p.description}</p>
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
  return (
    <section id={SECTION_IDS.problem} className="bg-gray-50 py-32 md:py-40">
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <motion.span variants={ANIMATION.fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="text-xs font-medium uppercase tracking-widest text-gray-400">Problem</motion.span>
        <motion.h2 variants={ANIMATION.fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="mt-4 text-[32px] font-semibold leading-tight tracking-tight text-gray-950">캘린더, 등록만 하고<br />확인은 안 하죠?</motion.h2>
        <motion.div
          variants={ANIMATION.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14"
        >
          {problems.map((p) => (
            <motion.div
              key={p.number}
              variants={ANIMATION.fadeInUp}
              className="border-t border-gray-300 py-7"
            >
              <div className="flex items-baseline gap-6">
                <span className="text-sm font-medium tabular-nums text-gray-300">{p.number}</span>
                <div>
                  <h3 className="text-xl font-semibold text-gray-950">{p.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-gray-500">{p.description}</p>
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
