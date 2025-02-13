/**
 * 메인 페이지 컴포넌트
 * 주요 기능:
 * - 할 일 목록 표시 및 관리
 * - 새로운 할 일 추가
 * - 할 일 완료/미완료 상태 토글
 * - 할 일 상세 페이지 이동
 * - 로딩 및 에러 상태 처리
 */
"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { ChecklistItem } from "@/components/common/ChecklistItem";
import { PageWrapper } from "@/components/PageWrapper";
import { todoApi, type TodoItem, ApiError } from "@/lib/api";

export default function MainPage() {
  // 상태 관리
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * 할 일 목록 조회
   * - API를 통해 전체 할 일 목록을 가져옴
   * - 에러 발생 시 에러 메시지 표시
   */
  const fetchTodos = useCallback(async () => {
    try {
      setError(null);
      const items = await todoApi.getItems();
      setTodos(items);
    } catch (error) {
      console.error("할 일 목록을 불러오는 중 에러 발생:", error);
      
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : "할 일 목록을 불러오는데 실패했습니다.";
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 초기 데이터 로드
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  /**
   * 할 일 추가 처리
   * - 입력값 검증
   * - API를 통해 새로운 할 일 생성
   * - 성공 시 목록 새로고침
   */
  const handleAddTodo = async () => {
    if (!inputValue.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await todoApi.createItem(inputValue);
      setInputValue(""); // 입력창 초기화
      fetchTodos(); // 목록 새로고침
    } catch (error) {
      setError("할 일을 추가하는데 실패했습니다.");
      console.error("Failed to add todo:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Enter 키 입력 처리
   * - Enter 키 입력 시 할 일 추가
   */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAddTodo();
    }
  };

  /**
   * 체크 상태 변경 처리
   * - API를 통해 할 일의 완료 상태 토글
   * - 성공 시 목록 새로고침
   */
  const handleCheckChange = async (id: number, isCompleted: boolean) => {
    try {
      setError(null);
      await todoApi.updateItem(id, { isCompleted: !isCompleted });
      fetchTodos();
    } catch (error) {
      setError("상태 변경에 실패했습니다.");
      console.error("Failed to update todo:", error);
    }
  };

  /**
   * 상세 페이지 이동 처리
   */
  const handleItemClick = (id: number) => {
    router.push(`/items/${id}`);
  };

  // 완료/미완료 항목 분리
  const todoItems = todos.filter((todo) => !todo.isCompleted);
  const doneItems = todos.filter((todo) => todo.isCompleted);

  // 에러 상태 UI
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <p className="text-rose-500 mb-4">{error}</p>
        <button onClick={fetchTodos} className="text-slate-900 underline">
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen bg-slate-50">
      <main className="max-w-[1920px] w-full mx-auto px-4 py-8">
        <PageWrapper
          // 상단 섹션: 새 할 일 입력
          topSection={
            <div className="flex w-full gap-4">
              <Input
                placeholder="할 일을 입력해주세요"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isSubmitting}
              />
              <Button
                variant={todos.length === 0 ? "addEmpty" : "addDefault"}
                onClick={handleAddTodo}
                disabled={isSubmitting}
              >
                추가하기
              </Button>
            </div>
          }
          // 왼쪽 섹션: 할 일 목록
          leftSection={
            <>
              <Image
                src="/images/img/todo.svg"
                alt="todo"
                width={101}
                height={36}
                priority
                className="mb-4"
              />
              <div className="space-y-4">
                {isLoading ? (
                  // 로딩 상태
                  <div className="flex justify-center items-center py-8">
                    <div className="animate-pulse text-slate-500">
                      로딩 중...
                    </div>
                  </div>
                ) : todoItems.length === 0 ? (
                  // 빈 상태
                  <div className="flex flex-col items-center justify-center gap-6">
                    {/* 모바일 이미지 */}
                    <div className="block tablet:hidden">
                      <Image
                        src="/images/img/black_TODO_S.svg"
                        alt="todo"
                        width={120}
                        height={120}
                        priority
                        className="mb-4"
                      />
                    </div>
                    {/* 태블릿/데스크탑 이미지 */}
                    <div className="hidden tablet:block mt-[64px]">
                      <Image
                        src="/images/img/black_TODO_L.svg"
                        alt="todo"
                        width={240}
                        height={240}
                        priority
                        className="w-[240px] h-[240px] mb-6"
                      />
                    </div>
                    <div className="flex flex-col text-empty">
                      <span>할 일이 없어요.</span>
                      <span>TODO를 새롭게 추가해 주세요!</span>
                    </div>
                  </div>
                ) : (
                  // 할 일 목록
                  todoItems.map((todo) => (
                    <ChecklistItem
                      key={todo.id}
                      text={todo.name}
                      initialChecked={false}
                      onCheckChange={() =>
                        handleCheckChange(todo.id, todo.isCompleted)
                      }
                      onItemClick={() => handleItemClick(todo.id)}
                    />
                  ))
                )}
              </div>
            </>
          }
          // 오른쪽 섹션: 완료된 할 일 목록
          rightSection={
            <>
              <Image
                src="/images/img/done.svg"
                alt="done"
                width={97}
                height={36}
                priority
                className="mb-4"
              />
              <div className="space-y-4">
                {isLoading ? (
                  <div className="flex justify-center items-center py-8">
                    <div className="animate-pulse text-slate-500">
                      로딩 중...
                    </div>
                  </div>
                ) : doneItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center gap-6">
                    {/* 모바일 이미지 */}
                    <div className="block tablet:hidden">
                      <Image
                        src="/images/img/black_Done_S.svg"
                        alt="done"
                        width={120}
                        height={120}
                        priority
                        className="mb-4"
                      />
                    </div>
                    {/* 태블릿/데스크탑 이미지 */}
                    <div className="hidden tablet:block mt-[64px]">
                      <Image
                        src="/images/img/black_Done_L.svg"
                        alt="done"
                        width={240}
                        height={240}
                        priority
                        className="w-[240px] h-[240px] mb-6"
                      />
                    </div>
                    <div className="flex flex-col text-empty">
                      <span>아직 다 한 일이 없어요.</span>
                      <span>해야 할 일을 체크해 보세요!</span>
                    </div>
                  </div>
                ) : (
                  doneItems.map((todo) => (
                    <ChecklistItem
                      key={todo.id}
                      text={todo.name}
                      initialChecked={true}
                      onCheckChange={() =>
                        handleCheckChange(todo.id, todo.isCompleted)
                      }
                      onItemClick={() => handleItemClick(todo.id)}
                    />
                  ))
                )}
              </div>
            </>
          }
        />
      </main>
    </div>
  );
}