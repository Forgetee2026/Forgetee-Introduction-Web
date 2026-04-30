import LegalLayout from "@/components/layout/LegalLayout";
import { termsKoMd } from "./content-ko";
import { termsEnMd } from "./content-en";

export const metadata = {
  title: "ForGetee 서비스 이용약관 / Terms of Service",
  description: "ForGetee 서비스의 이용약관입니다.",
};

export default function TermsPage() {
  return (
    <LegalLayout
      contentKo={termsKoMd}
      contentEn={termsEnMd}
      toggleGroupId="lang-toggle-terms"
    />
  );
}
