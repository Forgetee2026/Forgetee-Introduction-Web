"use client";

import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import LanguageToggle from "@/components/ui/LanguageToggle";
import { useLanguage } from "@/lib/i18n";

interface LegalLayoutProps {
  /** 마크다운 본문 (한국어/영어) */
  contentKo: string;
  contentEn: string;
  /** 토글 group id (페이지마다 다르게) */
  toggleGroupId: string;
}

/**
 * /privacy, /terms 같은 정책 페이지 공통 레이아웃.
 * 헤더 + Markdown 본문(prose 스타일) + 메인으로 돌아가는 링크.
 */
export default function LegalLayout({
  contentKo,
  contentEn,
  toggleGroupId,
}: LegalLayoutProps) {
  const { lang, t } = useLanguage();
  const content = lang === "ko" ? contentKo : contentEn;

  return (
    <>
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4 md:px-8">
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
          <LanguageToggle layoutGroupId={toggleGroupId} />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12 md:px-8 md:py-16">
        <article className="legal-article">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </article>

        <div className="mt-16 border-t border-gray-200 pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-950"
          >
            <span aria-hidden>←</span>
            {t("help.backToHome")}
          </Link>
        </div>
      </main>
    </>
  );
}
