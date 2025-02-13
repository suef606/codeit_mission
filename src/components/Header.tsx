// src/components/Header.tsx
/**
 * 헤더 컴포넌트
 * - 앱의 최상단에 위치하는 네비게이션 헤더
 * - 반응형으로 로고 크기가 조절됨
 * - 브라우저 크기에 따라 레이아웃 자동 조정
 */
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    // 전체 너비 컨테이너 (배경색 및 여백 설정)
    <div className="w-full px-4">
      {/* 컨텐츠 너비 제한 및 중앙 정렬 컨테이너 */}
      <div className="w-[1200px] mx-auto">
        {/* 헤더 컨텐츠 영역 */}
        <header className="flex items-center h-[60px]">
          {/* 홈으로 이동하는 로고 링크 */}
          <Link href="/" className="inline-block">
            {/* 모바일용 작은 로고 (744px 미만에서 표시) */}
            <div className="block tablet:hidden">
              <Image
                src="/images/img/logo_S.svg"
                alt="do it;"
                width={71}
                height={40}
                priority  // 빠른 로딩을 위한 우선순위 설정
              />
            </div>
            {/* 태블릿/데스크탑용 큰 로고 (744px 이상에서 표시) */}
            <div className="hidden tablet:block">
              <Image
                src="/images/img/logo_L.svg"
                alt="do it;"
                width={151}
                height={40}
                priority
              />
            </div>
          </Link>
        </header>
      </div>
    </div>
  );
};