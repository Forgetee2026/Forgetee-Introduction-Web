"use client";

import { useState } from "react";
import { motion, useTransform, useMotionValueEvent, type MotionValue } from "framer-motion";
import { SECTION_IDS, ANIMATION, SECTION_TRANSITION } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n";

const FEATURE_KEYS = [
  { label: "01", key: "a" },
  { label: "02", key: "b" },
  { label: "03", key: "c" },
] as const;

function NaturalLanguageMockup() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 text-xs text-gray-400"><div className="h-2 w-2 rounded-full bg-gray-300" />일정 등록</div>
      <div className="mt-4 rounded-xl bg-gray-50 p-4"><p className="text-sm text-gray-700">&ldquo;내일 오후 3시 강남역 팀 미팅&rdquo;</p></div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-xs text-gray-500"><span className="rounded bg-gray-100 px-2 py-0.5">3월 25일</span><span className="rounded bg-gray-100 px-2 py-0.5">15:00</span><span className="rounded bg-gray-100 px-2 py-0.5">강남역</span></div>
        <p className="text-xs text-gray-400">AI가 자동으로 파악했어요</p>
      </div>
    </div>
  );
}
function TimelineMockup() {
  const times = [{ time: "D-1 오후 9시", label: "내일 미팅 준비 리마인드", active: false }, { time: "당일 오후 1시", label: "이동 시간 고려 알림", active: true }, { time: "당일 오후 2시 30분", label: "30분 전 최종 알림", active: false }];
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 text-xs text-gray-400"><div className="h-2 w-2 rounded-full bg-gray-300" />AI 리마인드</div>
      <div className="mt-4 space-y-4">{times.map((item, i) => (<div key={i} className="flex items-start gap-3"><div className="mt-1 flex flex-col items-center"><div className={`h-2.5 w-2.5 rounded-full ${item.active ? "bg-gray-950" : "bg-gray-300"}`} />{i < 2 && <div className="h-8 w-px bg-gray-200" />}</div><div><p className={`text-xs font-medium ${item.active ? "text-gray-950" : "text-gray-400"}`}>{item.time}</p><p className="text-xs text-gray-500">{item.label}</p></div></div>))}</div>
    </div>
  );
}
function CallMockup() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 text-xs text-gray-400"><div className="h-2 w-2 rounded-full bg-gray-300" />전화 리마인드</div>
      <div className="mt-4 flex flex-col items-center rounded-xl bg-gray-50 py-8">
        <div className="relative flex h-14 w-14 items-center justify-center">
          <motion.div animate={{ scale: [1, 1.6], opacity: [0.3, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }} className="absolute inset-0 rounded-full bg-gray-950" />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gray-950"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
        </div>
        <p className="mt-4 text-sm font-medium text-gray-950">ForGetee</p>
        <p className="mt-1 text-xs text-gray-400">&ldquo;오후 3시 팀 미팅, 30분 남았어요.&rdquo;</p>
      </div>
    </div>
  );
}
const mockups = [<NaturalLanguageMockup key="natural" />, <TimelineMockup key="timeline" />, <CallMockup key="call" />];

function SolutionFixed({ scrollYProgress, range }: { scrollYProgress: MotionValue<number>; range: [number, number] }) {
  const { t } = useLanguage();
  const [start, end] = range;
  const [activeIndex, setActiveIndex] = useState(0);
  const progress = useTransform(scrollYProgress, [start, end], [0, 1]);
  const [entered, setEntered] = useState(false);

  const tr = SECTION_TRANSITION.duration;
  const contentOpacity = useTransform(scrollYProgress, [start, start + tr, end - tr, end], [0, 1, 1, 0]);
  const contentScale = useTransform(scrollYProgress, [start, start + tr, end - tr, end], [SECTION_TRANSITION.scaleIn, 1, 1, SECTION_TRANSITION.scaleOut]);
  const contentY = useTransform(scrollYProgress, [start, start + tr], ["3%", "0%"]);

  const progressWidth = useTransform(progress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setEntered(v >= start - 0.01);
  });
  useMotionValueEvent(progress, "change", (v) => {
    if (v < 0.33) setActiveIndex(0); else if (v < 0.66) setActiveIndex(1); else setActiveIndex(2);
  });

  return (
    <div className={`absolute inset-0 z-[3] bg-white pointer-events-auto ${entered ? "" : "invisible"}`}>
      <motion.div style={{ opacity: contentOpacity, scale: contentScale, y: contentY }} className="flex h-full items-center">
        <div className="mx-auto w-full max-w-6xl px-8">
          <div className="mb-12">
            <span className="text-xs font-medium uppercase tracking-widest text-gray-400">{t("solution.eyebrow")}</span>
            <h2 className="mt-4 text-[48px] font-semibold leading-tight tracking-tight text-gray-950">{t("solution.title")}</h2>
            <p className="mt-3 text-lg text-gray-500">{t("solution.subtitle")}</p>
            <div className="mt-8 h-px w-full bg-gray-200"><motion.div style={{ width: progressWidth }} className="h-full bg-gray-950" /></div>
          </div>
          <div className="flex items-start gap-16">
            <div className="flex-1">
              <div className="mb-8 flex items-center gap-6">
                {FEATURE_KEYS.map((_, i) => (<span key={i} className={`text-sm font-semibold transition-all duration-500 ${activeIndex === i ? "text-gray-950 scale-110" : "text-gray-300"}`}>{String(i + 1).padStart(2, "0")}</span>))}
              </div>
              <div className="relative min-h-[160px]">
                {FEATURE_KEYS.map((f, i) => (
                  <motion.div key={i} animate={{ opacity: activeIndex === i ? 1 : 0, y: activeIndex === i ? 0 : 16 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0" style={{ pointerEvents: activeIndex === i ? "auto" : "none" }}>
                    <h3 className="text-3xl font-semibold tracking-tight text-gray-950">{t(`solution.items.${f.key}.title`)}</h3>
                    <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-gray-500">{t(`solution.items.${f.key}.body`)}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative w-full max-w-md flex-1">
              <div className="relative min-h-[300px]">
                {mockups.map((m, i) => (
                  <motion.div key={i} animate={{ opacity: activeIndex === i ? 1 : 0, scale: activeIndex === i ? 1 : 0.96 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0" style={{ pointerEvents: activeIndex === i ? "auto" : "none" }}>{m}</motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function SolutionMobile() {
  const { t } = useLanguage();
  return (
    <section id={SECTION_IDS.solution} className="py-32 md:py-40">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <motion.span variants={ANIMATION.fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="text-xs font-medium uppercase tracking-widest text-gray-400">{t("solution.eyebrow")}</motion.span>
        <motion.h2 variants={ANIMATION.fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="mt-4 text-[32px] font-semibold leading-tight tracking-tight text-gray-950">{t("solution.title")}</motion.h2>
        <div className="mt-16 space-y-20">
          {FEATURE_KEYS.map((f, i) => (
            <motion.div key={f.label} variants={ANIMATION.fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="flex flex-col gap-8">
              <div><span className="text-sm font-semibold text-gray-300">{f.label}</span><h3 className="mt-2 text-2xl font-semibold tracking-tight text-gray-950">{t(`solution.items.${f.key}.title`)}</h3><p className="mt-4 whitespace-pre-line text-base leading-relaxed text-gray-500">{t(`solution.items.${f.key}.body`)}</p></div>
              <div>{mockups[i]}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface Props { scrollYProgress?: MotionValue<number>; range?: [number, number] }
export default function SolutionSection({ scrollYProgress, range }: Props) {
  if (scrollYProgress && range) return <SolutionFixed scrollYProgress={scrollYProgress} range={range} />;
  return <SolutionMobile />;
}
