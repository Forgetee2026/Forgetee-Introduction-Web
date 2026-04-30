"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import {
  privacyPolicyUrl,
  termsOfServiceUrl,
  SUPPORT_EMAIL,
} from "@/lib/external-urls";

export default function Footer() {
  const { lang, t } = useLanguage();

  return (
    <footer className="border-t border-gray-200">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* 로고 + 소개 */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <Image
                src="/images/main_logo_size_up.png"
                alt="ForGetee 로고"
                width={24}
                height={24}
                className="h-6 w-auto"
              />
              <span className="text-base font-semibold tracking-tight text-gray-950">
                For<span className="font-bold">G</span>etee
              </span>
            </div>
            <p className="max-w-xs whitespace-pre-line text-sm leading-relaxed text-gray-500">
              {t("footer.tagline")}
            </p>
          </div>

          {/* 링크 */}
          <div className="flex gap-12 text-sm text-gray-500">
            <div className="flex flex-col gap-3">
              <span className="font-medium text-gray-950">
                {t("footer.sections.service")}
              </span>
              <a
                href={privacyPolicyUrl(lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-gray-700"
              >
                {t("footer.links.privacy")}
              </a>
              <a
                href={termsOfServiceUrl(lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-gray-700"
              >
                {t("footer.links.terms")}
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-medium text-gray-950">
                {t("footer.sections.help")}
              </span>
              <Link
                href="/help"
                className="transition-colors hover:text-gray-700"
              >
                {t("footer.links.calendarSync")}
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-medium text-gray-950">
                {t("footer.sections.contact")}
              </span>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="transition-colors hover:text-gray-700"
              >
                {SUPPORT_EMAIL}
              </a>
            </div>
          </div>
        </div>

        {/* 저작권 */}
        <div className="mt-12 border-t border-gray-100 pt-6">
          <p className="text-xs text-gray-400">{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
