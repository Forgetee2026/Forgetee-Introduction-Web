// 지원 언어
export type Language = "ko" | "en";

// 번역 dict — 네스트된 string 트리. 임의 깊이 허용.
export interface TranslationDict {
  [key: string]: string | TranslationDict;
}

/**
 * dict 에서 "hero.title" 같은 path 로 string 추출.
 * 매칭 안 되면 path 자체를 반환(개발 중 누락 키 표시용).
 */
export function getByPath(dict: TranslationDict, path: string): string {
  const value = path
    .split(".")
    .reduce<string | TranslationDict | undefined>(
      (acc, key) => (typeof acc === "object" && acc !== null ? acc[key] : undefined),
      dict,
    );
  if (typeof value === "string") return value;
  return path;
}
