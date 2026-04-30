"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { Platform } from "@/hooks/useModal";
import { useLanguage } from "@/lib/i18n";

interface ServiceModalProps {
  isOpen: boolean;
  platform: Platform;
  onClose: () => void;
}

export default function ServiceModal({
  isOpen,
  platform,
  onClose,
}: ServiceModalProps) {
  const { t } = useLanguage();
  const platformLabel = platform === "ios" ? "App Store" : "Google Play";
  const body = t("serviceModal.body").replace("{platform}", platformLabel);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 배경 오버레이 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* 모달 */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 로고 */}
              <div className="mb-6 flex justify-center">
                <Image
                  src="/images/main_logo.png"
                  alt="ForGetee"
                  width={40}
                  height={40}
                  className="h-10 w-auto"
                />
              </div>

              {/* 콘텐츠 */}
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-950">
                  {t("serviceModal.title")}
                </h3>
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-gray-500">
                  {body}
                </p>
                <p className="mt-1.5 text-xs text-gray-400">
                  {t("serviceModal.subbody")}
                </p>
              </div>

              {/* 닫기 버튼 */}
              <button
                onClick={onClose}
                className="mt-8 w-full rounded-xl bg-gray-950 py-3 text-sm font-medium text-white transition-all hover:bg-gray-800 active:scale-[0.98]"
              >
                {t("serviceModal.confirm")}
              </button>

              {/* X 닫기 */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                aria-label={t("serviceModal.closeAria")}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M12 4L4 12M4 4l8 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
