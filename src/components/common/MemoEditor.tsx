// src/components/common/MemoEditor.tsx
/**
 * 메모 에디터 컴포넌트
 * - 메모 작성 및 편집 기능
 * - 줄 노트 배경 디자인
 * - 편집/보기 모드 전환
 * - 자동 저장 기능
 */
import { useState } from "react";
import Image from "next/image";

interface MemoEditorProps {
  initialMemo?: string;            // 초기 메모 내용
  onSaveMemo: (memo: string) => void;  // 저장 콜백
}

export const MemoEditor = ({
  initialMemo = "",
  onSaveMemo,
}: MemoEditorProps) => {
  const [memo, setMemo] = useState(initialMemo);
  const [isEditing, setIsEditing] = useState(false);

  // 메모 저장 처리
  const handleSave = () => {
    if (memo !== initialMemo) {
      onSaveMemo(memo);
    }
    setIsEditing(false);
  };

  return (
    <div className={`
      relative 
      w-full desktop:w-[588px] 
      h-[311px] 
      rounded-[24px] 
      bg-yellow-50 
      overflow-hidden
    `}>
      {/* 메모장 라인 배경 */}
      <Image
        src="/images/memo_line.svg"
        alt="메모 라인 배경"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        className="absolute inset-0 z-0 h-[311px]"
      />

      {/* 메모 타이틀 */}
      <div className="absolute top-[24px] left-1/2 transform -translate-x-1/2 z-10">
        <span className="text-amber-800 text-base font-extrabold">memo</span>
      </div>

      {/* 메모 컨텐츠 영역 */}
      <div className="relative z-10 pt-16 w-full h-full">
        {isEditing ? (
          // 편집 모드
          <div className="w-full h-full relative">
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              className="w-full h-[calc(100%-60px)] p-4 bg-transparent 
                       resize-none text-slate-800 text-base font-normal 
                       focus:outline-none"
              placeholder="메모를 입력하세요"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-end">
              <button
                onClick={handleSave}
                className="bg-slate-900 text-white px-4 py-2 rounded"
              >
                저장
              </button>
            </div>
          </div>
        ) : (
          // 보기 모드
          <div
            className="w-full h-full p-4 
                     cursor-pointer flex items-start overflow-auto
                     text-slate-800 text-base font-normal"
            onClick={() => setIsEditing(true)}
          >
            {memo || "메모를 입력하세요"}
          </div>
        )}
      </div>
    </div>
  );
};