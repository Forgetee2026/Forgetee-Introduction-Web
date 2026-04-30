import type { Language } from "./i18n/types";

/**
 * Notion 공개 문서 URL — forget-app 의 `external_urls.dart` 와 동일.
 * 두 곳에서 동일 URL 을 사용해야 OAuth 검증 시 일관성이 유지된다.
 */
const PRIVACY_URLS: Record<Language, string> = {
  ko: "https://tall-dress-17c.notion.site/341c79f5820f80deb462f5abd3f80516",
  en: "https://tall-dress-17c.notion.site/Privacy-Policy-341c79f5820f8082acf5f6a0411384da",
};

const TERMS_URLS: Record<Language, string> = {
  ko: "https://tall-dress-17c.notion.site/341c79f5820f80ffb0f6c9781ae25bf4",
  en: "https://tall-dress-17c.notion.site/Terms-of-Service-341c79f5820f8071845bf092959fe49c",
};

export const APP_STORE_IOS_URL =
  "https://apps.apple.com/kr/app/%ED%8F%AC%EA%B2%8C%ED%8B%B0-%EC%BA%98%EB%A6%B0%EB%8D%94-%EB%8C%80%EC%8B%A0-%EA%B8%B0%EC%96%B5%ED%95%B4%EC%A3%BC%EB%8A%94-ai/id6763168647";

export const SUPPORT_EMAIL = "kimkeonhwi991231@gmail.com";

export const privacyPolicyUrl = (lang: Language): string => PRIVACY_URLS[lang];
export const termsOfServiceUrl = (lang: Language): string => TERMS_URLS[lang];
