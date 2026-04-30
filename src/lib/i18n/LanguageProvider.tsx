"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ko } from "./dict-ko";
import { en } from "./dict-en";
import { getByPath, type Language, type TranslationDict } from "./types";

const STORAGE_KEY = "forget-lang";

const DICTS: Record<Language, TranslationDict> = { ko, en };

interface LanguageContextValue {
  lang: Language;
  setLang: (next: Language) => void;
  toggle: () => void;
  t: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

function detectInitialLang(): Language {
  if (typeof window === "undefined") return "ko";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "ko" || stored === "en") return stored;
  // 브라우저 navigator 가 ko* 면 ko, 아니면 en
  const nav = window.navigator.language || "";
  return nav.toLowerCase().startsWith("ko") ? "ko" : "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // SSG 첫 렌더는 항상 ko (HTML lang="ko") — 마운트 후 사용자 선택으로 교체
  const [lang, setLangState] = useState<Language>("ko");

  useEffect(() => {
    const initial = detectInitialLang();
    if (initial !== "ko") setLangState(initial);
  }, []);

  // <html lang> 동기화
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = useCallback((next: Language) => {
    setLangState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
  }, []);

  const toggle = useCallback(() => {
    setLang(lang === "ko" ? "en" : "ko");
  }, [lang, setLang]);

  const t = useCallback(
    (path: string) => getByPath(DICTS[lang], path),
    [lang],
  );

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, toggle, t }),
    [lang, setLang, toggle, t],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
