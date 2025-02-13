// src/components/common/Input.tsx
/**
 * 공통 입력 필드 컴포넌트
 * - 그림자 효과가 있는 스타일링
 * - 에러 상태 표시 기능
 * - 포커스 효과
 * - 반응형 디자인
 */
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;     // 입력 필드 레이블 (선택적)
  error?: string;     // 에러 메시지 (선택적)
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {/* 레이블 영역 */}
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        
        {/* 입력 필드 컨테이너 */}
        <div className="relative">
          {/* 그림자 레이어 */}
          <div className="absolute top-[5px] left-[4.65222px] w-[calc(100%-1px)] h-[50px] 
                         bg-slate-900 rounded-[23px]" />
          
          {/* 입력 필드 */}
          <input
            ref={ref}
            className={`
              relative
              w-full h-[50px]
              rounded-[23px]
              border-[2px] border-slate-900
              bg-slate-100
              px-6
              text-center
              text-slate-900
              placeholder:text-slate-500
              focus:outline-none
              focus:ring-0
              transition-colors
              ${error ? "border-red-500" : ""}
              ${className}
            `}
            {...props}
          />
        </div>
        
        {/* 에러 메시지 */}
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";