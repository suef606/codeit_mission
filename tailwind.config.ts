// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 기본 색상 설정 유지
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Slate 컬러 - 기본 UI 요소들의 색상
        slate: {
          100: '#F1F5F9',  // 배경색
          200: '#E2E8F0',  // 버튼 기본 배경
          300: '#CBD5E1',  // 구분선
          400: '#94A3B8',  // 보조 텍스트
          500: '#64748B',  // 부가 정보
          800: '#1E293B',  // 강조 텍스트
          900: '#0F172A'   // 주요 텍스트
        },
        // 상태 표시 컬러 - 특정 상태나 액션을 나타내는 색상
        violet: {
          100: '#EDE9FE',  // 체크리스트 완료 배경
          200: '#DDD6FE',  // 상세페이지 체크리스트 완료 배경
          600: '#7C3AED'   // 보라색 버튼 배경
        },
        rose: {
          500: '#F43F5E'   // 삭제 버튼 배경
        },
        lime: {
          300: '#BEF264'   // 수정완료 버튼 배경 (체크 후)
        }
      },
      // 반응형 breakpoint 설정
      // - mobile, tablet, desktop 3단계로 구분
      // - 각 breakpoint는 최소 너비 기준
      screens: {
        'mobile': '375px',
        'tablet': '744px',
        'tablet-max': {'max': '1079px'},  // 가장 큰 태블릿 크기까지
        'desktop': '1080px',              // 태블릿 최대 크기 이후부터 데스크탑으로 간주
      },
      // 폰트 크기 설정
      fontSize: {
        'base': '16px',    // 기본 텍스트 크기
        'lg': '20px',      // 상세페이지 제목 크기
      },
      // 폰트 패밀리 설정
      fontFamily: {
        'nanumSquare': ['NanumSquare', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;