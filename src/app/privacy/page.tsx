import LegalLayout from "@/components/layout/LegalLayout";
import { privacyKoMd } from "./content-ko";
import { privacyEnMd } from "./content-en";

export const metadata = {
  title: "ForGetee 개인정보처리방침 / Privacy Policy",
  description:
    "ForGetee 의 개인정보 처리 방침 및 Google API Services 사용자 데이터 정책 준수 안내.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      contentKo={privacyKoMd}
      contentEn={privacyEnMd}
      toggleGroupId="lang-toggle-privacy"
    />
  );
}
