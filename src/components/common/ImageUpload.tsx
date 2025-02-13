// src/components/common/ImageUpload.tsx
/**
 * 이미지 업로드 컴포넌트
 * - 이미지 업로드 및 미리보기 기능
 * - 드래그 앤 드롭 스타일 UI
 * - 파일 크기 제한(5MB) 검증
 * - 토스트 메시지로 피드백 제공
 * - 반응형 디자인
 */
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { todoApi } from "@/lib/api";
import { Toast } from "@/components/common/Toast";

interface ImageUploadProps {
  initialImageUrl?: string;        // 초기 이미지 URL
  onImageUpload?: (url: string) => void;  // 업로드 완료 콜백
}

export const ImageUpload = ({
  initialImageUrl,
  onImageUpload,
}: ImageUploadProps) => {
  // 상태 관리
  const [imageUrl, setImageUrl] = useState<string | undefined>(initialImageUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [isToastVisible, setIsToastVisible] = useState(false);

  // initialImageUrl 변경 시 상태 업데이트
  useEffect(() => {
    setImageUrl(initialImageUrl);
  }, [initialImageUrl]);

  // 토스트 메시지 표시 함수
  const showToast = (message: string) => {
    setToastMessage(message);
    setIsToastVisible(true);
  };

  /**
   * 이미지 업로드 처리 함수
   * - 파일 크기 검증
   * - 이미지 업로드 API 호출
   * - 결과에 따른 토스트 메시지 표시
   */
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const MAX_FILE_SIZE = 5 * 1024 * 1024;  // 5MB

    if (!file) return;

    // 파일 크기 검증
    if (file.size > MAX_FILE_SIZE) {
      showToast('이미지 크기는 5MB 이하여야 합니다');
      e.target.value = '';
      return;
    }

    try {
      // 이미지 업로드 API 호출
      const response = await todoApi.uploadImage(file);
      const newImageUrl = response.url;

      // 상태 업데이트 및 콜백 호출
      setImageUrl(newImageUrl);
      onImageUpload?.(newImageUrl);
    } catch (error) {
      console.error('이미지 업로드 에러:', error);
      showToast('이미지 업로드에 실패했습니다');
    }
  };

  return (
    <>
      {/* 이미지 업로드 영역 */}
      <div
        className={`
          relative 
          w-full desktop:w-[384px] 
          h-[311px] 
          flex-shrink-0 
          rounded-[24px] 
          border-2 border-dashed border-slate-300 
          bg-slate-50 
          flex items-center justify-center
          cursor-pointer
        `}
        onClick={() => fileInputRef.current?.click()}
      >
        {imageUrl ? (
          <>
            {/* 업로드된 이미지 표시 */}
            <Image
              src={imageUrl}
              alt="업로드된 이미지"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-[24px]"
            />
            {/* 편집 버튼 */}
            <Image
              src="/images/image_upload_edit.svg"
              alt="이미지 편집"
              width={64}
              height={64}
              className="absolute right-[22px] bottom-[28px] z-10"
            />
          </>
        ) : (
          <>
            {/* 빈 상태 UI */}
            <Image
              src="/images/image_upload_centor_img.svg"
              alt="업로드 센터 이미지"
              width={64}
              height={64}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
            />
            <Image
              src="/images/image_upload_plus.svg"
              alt="이미지 업로드"
              width={64}
              height={64}
              className="absolute right-[22px] bottom-[28px] z-10"
            />
          </>
        )}

        {/* 숨겨진 파일 입력 */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          multiple={false}
        />
      </div>

      {/* 토스트 메시지 */}
      <Toast
        message={toastMessage}
        isVisible={isToastVisible}
        onClose={() => setIsToastVisible(false)}
      />
    </>
  );
};