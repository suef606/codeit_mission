// src/app/items/[itemId]/page.tsx
/**
 * 할 일 상세 페이지 컴포넌트
 * 주요 기능:
 * - 할 일 항목의 상세 정보 표시
 * - 이미지 업로드/수정
 * - 메모 작성/수정
 * - 항목 삭제
 * - 변경사항 저장
 */
"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/common/Button";
import { PageWrapper } from "@/components/PageWrapper";
import { todoApi, type TodoItem } from "@/lib/api";
import { ImageUpload } from "@/components/common/ImageUpload";
import { MemoEditor } from "@/components/common/MemoEditor";

export default function ItemDetailPage({
  params,
}: {
  params: { itemId: string };
}) {
  // 라우터 및 상태 관리
  const router = useRouter();
  const [item, setItem] = useState<TodoItem | null>(null);
  const [memo, setMemo] = useState("");
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  /**
   * 할 일 상세 정보 조회
   * - API를 통해 할 일 항목의 상세 정보를 가져옴
   * - 에러 발생 시 메인 페이지로 리다이렉트
   */
  const fetchItemDetail = useCallback(async () => {
    try {
      const data = await todoApi.getItem(Number(params.itemId));
      setItem(data);
      setMemo(data.memo || "");
      setImageUrl(data.imageUrl);
    } catch (error) {
      console.error("아이템 불러오기 실패:", error);
      router.push("/");
    } finally {
      setIsLoading(false);
    }
  }, [params.itemId, router]);

  // 초기 데이터 로드
  useEffect(() => {
    fetchItemDetail();
  }, [params.itemId, fetchItemDetail]);

  /**
   * 이미지 업로드 처리
   * - 새 이미지 URL을 상태에 저장
   */
  const handleImageUpload = async (newImageUrl: string) => {
    setImageUrl(newImageUrl);
  };

  /**
   * 메모 저장 처리
   * - 새 메모 내용을 상태에 저장
   */
  const handleMemoSave = async (updatedMemo: string) => {
    setMemo(updatedMemo);
  };

  /**
   * 전체 변경사항 저장 처리
   * - 메모와 이미지 URL 변경사항 확인
   * - 변경된 항목만 API 호출하여 업데이트
   * - 저장 완료 후 메인 페이지로 이동
   */
  const handleSaveAll = async () => {
    if (!item) return;

    setIsSaving(true);
    try {
      const updateData: Partial<TodoItem> = {};

      // 변경된 메모가 있다면 추가
      if (memo !== item.memo) {
        updateData.memo = memo;
      }

      // 변경된 이미지 URL이 있다면 추가
      if (imageUrl !== item.imageUrl) {
        updateData.imageUrl = imageUrl;
      }

      // 변경사항이 있을 경우에만 API 호출
      if (Object.keys(updateData).length > 0) {
        await todoApi.updateItem(item.id, updateData);

        // 저장 후 최신 데이터 다시 불러오기
        await fetchItemDetail();

        // 성공 알림
        alert("성공적으로 저장되었습니다.");
      }

      // 메인 페이지로 이동
      router.push("/");
    } catch (error) {
      console.error("저장 실패:", error);
      alert("저장 중 오류가 발생했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * 할 일 삭제 처리
   * - 삭제 확인 후 API 호출
   * - 삭제 완료 시 메인 페이지로 이동
   */
  const handleDelete = async () => {
    if (!item) return;

    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await todoApi.deleteItem(item.id);
      router.push("/");
    } catch (error) {
      console.error("아이템 삭제 실패:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  // 로딩 중 표시
  if (isLoading || !item) {
    return <div className="text-center py-8">로딩 중...</div>;
  }

  return (
    <div className="mx-auto min-h-screen bg-slate-50">
      <main className="max-w-[1920px] w-full mx-auto px-4 py-8">
        <PageWrapper
          // 상단 섹션: 할 일 제목 및 체크박스 표시
          topSection={
            <div
              className={`
            w-full h-[64px] 
            flex items-center justify-center gap-4
            rounded-[24px] border-2 border-slate-900
            ${item.isCompleted ? "bg-violet-200" : "bg-white"}
          `}
            >
              <Image
                src={`/images/img/${
                  item.isCompleted ? "checkbox_after" : "checkbox_before"
                }.svg`}
                alt="체크박스"
                width={32}
                height={32}
              />
              <span className="text-slate-900 text-detail-title">
                {item.name}
              </span>
            </div>
          }
          // 왼쪽 섹션: 이미지 업로드 영역
          leftSection={
            <ImageUpload
              initialImageUrl={item.imageUrl}
              onImageUpload={handleImageUpload}
            />
          }
          // 오른쪽 섹션: 메모 에디터 영역
          rightSection={
            <div className="desktop:w-full">
              <MemoEditor initialMemo={item.memo} onSaveMemo={handleMemoSave} />
            </div>
          }
          // 하단 섹션: 저장/삭제 버튼 영역
          bottomSection={
            <div
              className="
            flex justify-center desktop:justify-end 
            gap-2 tablet:gap-4 
            mt-8
          "
            >
              <Button
                variant={item.isCompleted ? "success" : "edit"}
                onClick={handleSaveAll}
                disabled={isSaving}
              >
                {isSaving ? "저장 중..." : "수정완료"}
              </Button>
              <Button
                variant="delete"
                onClick={handleDelete}
                disabled={isSaving}
              >
                삭제하기
              </Button>
            </div>
          }
        />
      </main>
    </div>
  );
}
