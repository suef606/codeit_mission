// src/components/common/Button.tsx
/**
 * 공통 버튼 컴포넌트
 * - 여러 스타일 변형 지원 (addDefault, addEmpty, edit, success, delete)
 * - 반응형 디자인
 * - 아이콘 포함 가능
 * - 그림자 효과로 입체감 표현
 */
import { ButtonHTMLAttributes } from "react";
import Image from "next/image";

// 버튼 종류 정의
type ButtonVariant = 
  | "addDefault"    // 일반 추가하기 버튼 (회색 배경)
  | "addEmpty"      // 빈 상태 추가하기 버튼 (보라색 배경)
  | "edit"          // 수정완료 버튼 (회색 배경)
  | "success"       // 수정완료 버튼 (체크 후, 라임색 배경)
  | "delete";       // 삭제하기 버튼 (빨간색 배경)

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  width?: string | number;
}

// 버튼 종류별 스타일과 아이콘 설정
const BUTTON_CONFIGS = {
  addDefault: {
    style: `bg-slate-200 text-slate-900 hover:bg-slate-300`,
    icon: "/images/button/plus_bk.svg"
  },
  addEmpty: {
    style: `bg-violet-600 text-white hover:bg-violet-700`,
    icon: "/images/button/plus_wh.svg"
  },
  edit: {
    style: `bg-slate-100 text-slate-900 hover:bg-slate-200`,
    icon: "/images/button/check_bk.svg"
  },
  success: {
    style: `bg-lime-300 text-slate-900 hover:bg-lime-400`,
    icon: "/images/button/check_bk.svg"
  },
  delete: {
    style: `bg-rose-500 text-white hover:bg-rose-600`,
    icon: "/images/button/X_wt.svg"
  },
};

export const Button = ({
  children,
  variant = "addDefault",
  className,
  ...props
}: ButtonProps) => {
  const config = BUTTON_CONFIGS[variant];
  const isAddButton = variant === 'addDefault' || variant === 'addEmpty';

  // 버튼 너비 설정
  const getWidthClass = () => {
    if (isAddButton) {
      return 'w-[54.783px] tablet:w-[168px]'; // 반응형 너비
    }
    return 'w-[168px]'; // 고정 너비
  };

  return (
    <div className="relative">
      {/* 그림자 레이어 */}
      <div className="absolute top-[5px] left-[4.65222px] w-[calc(100%-1px)] h-[52px]
                    bg-slate-900 rounded-[24px] z-0" />

      {/* 버튼 본체 */}
      <button
        className={`
          relative
          h-[52px]
          rounded-[24px]
          border-2 border-slate-900
          inline-flex items-center justify-center gap-1
          text-base font-bold
          transition-colors
          z-10
          ${config.style}
          ${getWidthClass()}
          ${className}
        `}
        {...props}
      >
        <Image
          src={config.icon}
          alt=""
          width={20}
          height={20}
          className="w-5 h-5"
        />
        {isAddButton ? (
          <span className="hidden tablet:inline">{children}</span>
        ) : (
          children
        )}
      </button>
    </div>
  );
};