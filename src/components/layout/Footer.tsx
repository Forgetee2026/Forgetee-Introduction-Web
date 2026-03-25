import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* 로고 + 소개 */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <Image
                src="/images/main_logo.png"
                alt="ForGet 로고"
                width={24}
                height={24}
                className="h-6 w-auto"
              />
              <span className="text-base font-semibold tracking-tight text-gray-950">
                For<span className="font-bold">G</span>et
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-gray-500">
              AI가 대신 기억하는 세상에서,
              <br />
              당신은 그냥 살면 됩니다.
            </p>
          </div>

          {/* 링크 */}
          <div className="flex gap-12 text-sm text-gray-500">
            <div className="flex flex-col gap-3">
              <span className="font-medium text-gray-950">서비스</span>
              <a href="#" className="transition-colors hover:text-gray-700">
                개인정보처리방침
              </a>
              <a href="#" className="transition-colors hover:text-gray-700">
                이용약관
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-medium text-gray-950">문의</span>
              <a
                href="mailto:contact@forget.app"
                className="transition-colors hover:text-gray-700"
              >
                contact@forget.app
              </a>
            </div>
          </div>
        </div>

        {/* 저작권 */}
        <div className="mt-12 border-t border-gray-100 pt-6">
          <p className="text-xs text-gray-400">
            &copy; 2026 ForGet. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
