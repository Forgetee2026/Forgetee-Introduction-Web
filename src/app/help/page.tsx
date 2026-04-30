"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n";
import { SUPPORT_EMAIL } from "@/lib/external-urls";
import LanguageToggle from "@/components/ui/LanguageToggle";

const GOOGLE_STEP_KEYS = ["step1", "step2", "step3", "step4", "step5"] as const;
const APPLE_STEP_KEYS = ["step1", "step2", "step3", "step4"] as const;

export default function HelpPage() {
  const { t } = useLanguage();

  return (
    <>
      {/* 단순 헤더 — 메인 페이지로 돌아가는 링크 + 언어 토글 */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4 md:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/images/main_logo_size_up.png"
              alt="ForGetee 로고"
              width={28}
              height={28}
              className="h-7 w-auto"
            />
            <span className="text-lg font-semibold tracking-tight text-gray-950">
              For<span className="font-bold">G</span>etee
            </span>
          </Link>
          <LanguageToggle layoutGroupId="lang-toggle-help" />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-16 md:px-8 md:py-24">
        {/* 페이지 타이틀 */}
        <div className="mb-16">
          <h1 className="text-[40px] font-semibold leading-tight tracking-tight text-gray-950 md:text-[48px]">
            {t("help.title")}
          </h1>
          <p className="mt-3 text-base text-gray-500 md:text-lg">
            {t("help.subtitle")}
          </p>
        </div>

        {/* 인트로 + 설정 화면 미리보기 */}
        <section className="mb-16 grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 md:p-8">
            <p className="text-sm leading-relaxed text-gray-700 md:text-base">
              {t("help.intro")}
            </p>
          </div>
          {/* 설정 화면 스크린샷 — Google/Apple 토글이 한 화면에 모두 보임 */}
          <div className="mx-auto w-full max-w-[280px] overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm md:w-72">
            <Image
              src="/images/help/calendar-sync-settings.png"
              alt={t("help.google.title")}
              width={580}
              height={1256}
              className="h-auto w-full"
              priority
            />
          </div>
        </section>

        {/* Google 캘린더 연동 */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-950 md:text-3xl">
            {t("help.google.title")}
          </h2>
          <ol className="mt-6 space-y-4">
            {GOOGLE_STEP_KEYS.map((key, i) => (
              <li key={key} className="flex gap-4">
                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-gray-950 text-xs font-semibold text-white">
                  {i + 1}
                </span>
                <p className="pt-0.5 text-base leading-relaxed text-gray-700">
                  {t(`help.google.${key}`)}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Apple 캘린더 연동 */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-950 md:text-3xl">
            {t("help.apple.title")}
          </h2>
          <ol className="mt-6 space-y-4">
            {APPLE_STEP_KEYS.map((key, i) => (
              <li key={key} className="flex gap-4">
                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-gray-950 text-xs font-semibold text-white">
                  {i + 1}
                </span>
                <p className="pt-0.5 text-base leading-relaxed text-gray-700">
                  {t(`help.apple.${key}`)}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* 데이터 사용 안내 — OAuth verification 검토 시점에 검토팀이 확인하는 핵심 섹션 */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-950 md:text-3xl">
            {t("help.dataUsage.title")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-700">
            {t("help.dataUsage.summary")}
          </p>
          <dl className="mt-8 divide-y divide-gray-200 rounded-2xl border border-gray-200">
            {[
              { labelKey: "scopeLabel", valueKey: "scopeValue" },
              { labelKey: "dataLabel", valueKey: "dataValue" },
              { labelKey: "purposeLabel", valueKey: "purposeValue" },
              { labelKey: "storageLabel", valueKey: "storageValue" },
              { labelKey: "thirdLabel", valueKey: "thirdValue" },
              { labelKey: "retentionLabel", valueKey: "retentionValue" },
            ].map(({ labelKey, valueKey }) => (
              <div
                key={labelKey}
                className="flex flex-col gap-2 px-5 py-4 md:flex-row md:items-start md:gap-6"
              >
                <dt className="w-full flex-none text-sm font-semibold text-gray-950 md:w-44">
                  {t(`help.dataUsage.${labelKey}`)}
                </dt>
                <dd className="text-sm leading-relaxed text-gray-700">
                  {t(`help.dataUsage.${valueKey}`)}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* 연동 해제 */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-950 md:text-3xl">
            {t("help.disconnect.title")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-700">
            {t("help.disconnect.body")}
          </p>
        </section>

        {/* 추가 문의 */}
        <section className="mb-16 rounded-2xl border border-gray-200 bg-gray-50 p-6 md:p-8">
          <h2 className="text-lg font-semibold text-gray-950">
            {t("help.contact.label")}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-700">
            {t("help.contact.body")}
          </p>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="mt-4 inline-block text-sm font-medium text-gray-950 underline underline-offset-4 hover:text-gray-700"
          >
            {SUPPORT_EMAIL}
          </a>
        </section>

        {/* 메인으로 돌아가기 */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-950"
        >
          <span aria-hidden>←</span>
          {t("help.backToHome")}
        </Link>
      </main>
    </>
  );
}
