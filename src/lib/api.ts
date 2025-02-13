// src/lib/api.ts
/**
 * API 통신 모듈
 * - 할 일 목록 CRUD 작업 처리
 * - 이미지 업로드 기능
 * - 에러 핸들링
 */

const BASE_URL = "https://assignment-todolist-api.vercel.app/api";
const TENANT_ID = "suBao_todo_app";

// 기본 API 응답 타입 정의
interface TodoItem {
  id: number;
  tenantId: string;
  name: string;
  memo?: string;
  imageUrl?: string;
  isCompleted: boolean;
}

interface ImageUploadResponse {
  url: string;
}

/**
 * API 에러 처리를 위한 커스텀 에러 클래스
 */
export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

// 공통 fetch 래퍼 함수
const fetchWithErrorHandling = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  try {
    const defaultHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API 응답 에러:", {
        url,
        status: response.status,
        statusText: response.statusText,
        errorText,
      });
      throw new ApiError(response.status, errorText || "An error occurred");
    }

    return response;
  } catch (error) {
    console.error("Fetch 요청 중 에러:", error);
    throw error;
  }
};

// API 메서드
export const todoApi = {
  // 할 일 목록 조회
  getItems: async (page = 1, pageSize = 10): Promise<TodoItem[]> => {
    const response = await fetchWithErrorHandling(
      `${BASE_URL}/${TENANT_ID}/items?page=${page}&pageSize=${pageSize}`
    );
    return response.json();
  },

  // 할 일 등록
  createItem: async (name: string): Promise<TodoItem> => {
    const response = await fetchWithErrorHandling(
      `${BASE_URL}/${TENANT_ID}/items`,
      {
        method: "POST",
        body: JSON.stringify({ name }),
      }
    );
    return response.json();
  },

  // 할 일 상세 조회
  getItem: async (itemId: number): Promise<TodoItem> => {
    const response = await fetchWithErrorHandling(
      `${BASE_URL}/${TENANT_ID}/items/${itemId}`
    );
    return response.json();
  },

  // 할 일 수정
  updateItem: async (
    itemId: number,
    data: Partial<TodoItem>
  ): Promise<TodoItem> => {
    const response = await fetchWithErrorHandling(
      `${BASE_URL}/${TENANT_ID}/items/${itemId}`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
      }
    );
    return response.json();
  },

  // 할 일 삭제
  deleteItem: async (itemId: number): Promise<{ message: string }> => {
    const response = await fetchWithErrorHandling(
      `${BASE_URL}/${TENANT_ID}/items/${itemId}`,
      {
        method: "DELETE",
      }
    );
    return response.json();
  },

  // 이미지 업로드
  uploadImage: async (image: File): Promise<ImageUploadResponse> => {
    const formData = new FormData();
    formData.append("image", image, image.name);

    const response = await fetch(`${BASE_URL}/${TENANT_ID}/images/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Upload Error Response:", errorText);
      throw new Error(errorText || "이미지 업로드에 실패했습니다.");
    }

    return response.json();
  },
};

// 타입 익스포트
export type { TodoItem };
