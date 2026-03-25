import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl font-bold text-gray-200">404</h1>
      <p className="mt-4 text-lg text-gray-500">
        페이지를 찾을 수 없습니다.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-gray-950 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-gray-800"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
