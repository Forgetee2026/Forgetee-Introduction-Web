"use client";

import { useState } from "react";
import Link from "next/link";
import {
  motion,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { SECTION_IDS, ANIMATION, SECTION_TRANSITION } from "@/lib/constants";
import { useScrollTrigger } from "@/hooks/useScrollTrigger";
import { useLanguage } from "@/lib/i18n";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const FEATURE_KEYS = [
  { number: "01", key: "a" },
  { number: "02", key: "b" },
  { number: "03", key: "c" },
  { number: "04", key: "d" },
] as const;

function AboutContent({ t, isDesktop }: { t: (k: string) => string; isDesktop: boolean }) {
  return (
    <div className={`mx-auto w-full max-w-5xl ${isDesktop ? "px-8" : "px-6 md:px-8"}`}>
      <span className="text-xs font-medium uppercase tracking-widest text-gray-400">
        {t("about.eyebrow")}
      </span>
      <h2
        className={`mt-4 whitespace-pre-line font-semibold leading-tight tracking-tight text-gray-950 ${
          isDesktop ? "text-[44px]" : "text-[28px]"
        }`}
      >
        {t("about.title")}
      </h2>
      <p
        className={`mt-6 max-w-3xl whitespace-pre-line leading-relaxed text-gray-600 ${
          isDesktop ? "text-lg" : "text-base"
        }`}
      >
        {t("about.description")}
      </p>

      <div className={isDesktop ? "mt-12" : "mt-10"}>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-950">
          {t("about.featuresTitle")}
        </h3>
        <ul className={`mt-4 grid gap-3 ${isDesktop ? "grid-cols-2 gap-x-8" : "grid-cols-1"}`}>
          {FEATURE_KEYS.map((f) => (
            <li
              key={f.number}
              className="flex items-baseline gap-4 border-t border-gray-200 py-3"
            >
              <span className="text-xs font-medium tabular-nums text-gray-300">
                {f.number}
              </span>
              <span className={`text-gray-700 ${isDesktop ? "text-base" : "text-sm"}`}>
                {t(`about.features.${f.key}`)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={`rounded-2xl border border-gray-200 bg-gray-50 ${
          isDesktop ? "mt-10 p-6" : "mt-8 p-5"
        }`}
      >
        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-950">
          {t("about.dataUsageTitle")}
        </h3>
        <p
          className={`mt-3 whitespace-pre-line leading-relaxed text-gray-600 ${
            isDesktop ? "text-base" : "text-sm"
          }`}
        >
          {t("about.dataUsage")}
        </p>
        <Link
          href="/privacy"
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gray-950 underline-offset-4 hover:underline"
        >
          {t("about.privacyLink")}
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}

function AboutFixed({
  scrollYProgress,
  range,
}: {
  scrollYProgress: MotionValue<number>;
  range: [number, number];
}) {
  const { t } = useLanguage();
  const [start, end] = range;
  const [entered, setEntered] = useState(false);
  const progress = useTransform(scrollYProgress, [start, end], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => setEntered(v >= start - 0.01));

  const tr = SECTION_TRANSITION.duration;
  const contentOpacity = useTransform(
    scrollYProgress,
    [start, start + tr, end - tr, end],
    [0, 1, 1, 0],
  );
  const contentScale = useTransform(
    scrollYProgress,
    [start, start + tr, end - tr, end],
    [SECTION_TRANSITION.scaleIn, 1, 1, SECTION_TRANSITION.scaleOut],
  );
  const contentY = useTransform(scrollYProgress, [start, start + tr], ["3%", "0%"]);

  const labelTriggered = useScrollTrigger(progress, 0.05);
  const bodyTriggered = useScrollTrigger(progress, 0.15);

  return (
    <div
      className={`absolute inset-0 z-[2] bg-white pointer-events-auto ${entered ? "" : "invisible"}`}
    >
      <motion.div
        style={{ opacity: contentOpacity, scale: contentScale, y: contentY }}
        className="flex h-full items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={labelTriggered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
          className="w-full"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={bodyTriggered ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.05 }}
          >
            <AboutContent t={t} isDesktop />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function AboutMobile() {
  const { t } = useLanguage();
  return (
    <section id={SECTION_IDS.about} className="bg-white py-24 md:py-32">
      <motion.div
        variants={ANIMATION.staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.div variants={ANIMATION.fadeInUp}>
          <AboutContent t={t} isDesktop={false} />
        </motion.div>
      </motion.div>
    </section>
  );
}

interface Props {
  scrollYProgress?: MotionValue<number>;
  range?: [number, number];
}

export default function AboutSection({ scrollYProgress, range }: Props) {
  if (scrollYProgress && range)
    return <AboutFixed scrollYProgress={scrollYProgress} range={range} />;
  return <AboutMobile />;
}
