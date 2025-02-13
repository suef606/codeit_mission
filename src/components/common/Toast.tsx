// src/components/common/Toast.tsx
/**
 * 토스트 메시지 컴포넌트
 * - 임시 알림 메시지를 화면 하단에 표시
 * - 3초 후 자동으로 사라짐
 * - 모바일 친화적인 디자인
 */
import { useEffect } from 'react';

interface ToastProps {
  message: string;      // 표시할 메시지
  isVisible: boolean;   // 토스트 표시 여부
  onClose: () => void;  // 토스트 닫기 콜백
}

export const Toast = ({ message, isVisible, onClose }: ToastProps) => {
  // 3초 후 자동으로 닫히는 타이머 설정
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      // 컴포넌트 언마운트 시 타이머 정리
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-slate-900 text-white px-6 py-3 rounded-[24px] shadow-lg">
        {message}
      </div>
    </div>
  );
};