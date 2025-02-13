// src/components/common/ChecklistItem.tsx

"use client";
import { useState } from "react";
import Image from "next/image";

// ChecklistItem 컴포넌트의 props 인터페이스 정의
interface ChecklistItemProps {
  text: string;
  isDetailPage?: boolean;
  width?: string | number;
  initialChecked: boolean;
  onCheckChange: () => void;
  onItemClick?: () => void;  // 선택적 아이템 클릭 핸들러
}

export const ChecklistItem = ({
  text,
  isDetailPage = false,
  width = "588px",
  initialChecked = false,
  onCheckChange,
  onItemClick,
}: ChecklistItemProps) => {
  // 체크 상태를 관리하는 상태 변수
  const [isChecked, setIsChecked] = useState(initialChecked);

  // 체크박스 클릭 핸들러
  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();  // 이벤트 버블링 방지
    setIsChecked(!isChecked);
    onCheckChange();
  };

  // 아이템 전체 클릭 핸들러
  const handleItemClick = () => {
    if (onItemClick) {
      onItemClick();
    }
  };

  return (
    <div
      onClick={handleItemClick}  // 아이템 전체 클릭 이벤트
      className={`
        checklist-base
        ${isDetailPage ? "h-16" : "h-[50px]"}
        ${isChecked ? "bg-violet-100" : "bg-white"}
        w-${typeof width === "number" ? width : width}
        cursor-pointer
        transition-all duration-200 ease-in-out
      `}
    >
      {/* 체크박스 아이콘 */}
      <div 
        className="ml-3"
        onClick={handleCheckboxClick}  // 체크박스 클릭 이벤트
      >
        <Image
          src={`/images/img/checkbox_${isChecked ? "after" : "before"}.svg`}
          alt="체크박스"
          width={32}
          height={32}
          className="transition-transform duration-200"
        />
      </div>

      {/* 텍스트 영역 */}
      <span
        className={`
          ml-4 
          ${isDetailPage ? "text-detail-title" : "text-checklist"}
          ${isChecked && !isDetailPage ? "line-through text-slate-500" : ""}
          transition-all duration-200
        `}
      >
        {text}
      </span>
    </div>
  );
};