import type { Metadata } from "next";
import { pretendard } from "@/lib/fonts";
import { SITE_CONFIG } from "@/lib/constants";
import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  keywords: [
    "AI 일정 관리",
    "스마트 리마인더",
    "일정 알림",
    "AI 캘린더",
    "ForGetee",
    "일정 리마인더",
    "AI 비서",
    "일정 관리 앱",
  ],
  authors: [{ name: "ForGetee" }],
  creator: "ForGetee",
  openGraph: {
    type: "website",
    locale: SITE_CONFIG.locale,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: "ForGetee - 일정은 잊으세요. 기억은 제가 할게요.",
    description:
      "AI가 대신 기억하는 세상에서, 당신은 그냥 살면 됩니다. AI 기반 스마트 일정 리마인더.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "ForGetee - AI 일정 리마인더",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ForGetee - AI가 대신 기억합니다",
    description: "일정은 잊으세요. 기억은 제가 할게요.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// JSON-LD 구조화 데이터
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ForGetee",
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ForGetee",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "iOS, Android",
    description: "AI 기반 스마트 일정 리마인더 서비스",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "KRW",
    },
    author: {
      "@type": "Organization",
      name: "ForGetee",
      url: SITE_CONFIG.url,
    },
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} antialiased`}>
      <head>
        {jsonLd.map((data, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
          />
        ))}
      </head>
      <body className="min-h-screen bg-background text-foreground">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
