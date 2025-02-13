# ToDo List Application

Next.js와 TypeScript를 사용한 현대적인 할 일 관리 웹 애플리케이션입니다.

## 주요 기능

- 할 일 목록 조회 및 관리
- 할 일 추가/수정/삭제
- 할 일 완료 상태 토글
- 이미지 업로드 및 메모 작성
- 반응형 디자인 (모바일, 태블릿, 데스크탑 지원)

## 기술 스택

- **프레임워크:** Next.js 14
- **언어:** TypeScript
- **스타일링:** Tailwind CSS
- **배포:** Vercel
- **상태관리:** React Hooks
- **API 통신:** Fetch API

## 시작하기

### 필수 조건

- Node.js 20.x
- Yarn

### 설치

```bash
# 저장소 클론
git clone [repository-url]

# 디렉토리 이동
cd [project-directory]

# 의존성 설치
yarn install
```

### 개발 서버 실행

```bash
yarn dev
```

브라우저에서 `http://localhost:3000`으로 접속하여 애플리케이션을 확인할 수 있습니다.

## 주요 컴포넌트 구조

### 공통 컴포넌트

- `Button`: 다양한 스타일의 버튼 컴포넌트
- `Input`: 사용자 입력을 위한 인풋 컴포넌트
- `Toast`: 알림 메시지 표시 컴포넌트
- `ImageUpload`: 이미지 업로드 컴포넌트
- `MemoEditor`: 메모 작성/편집 컴포넌트
- `ChecklistItem`: 할 일 항목 컴포넌트

### 레이아웃 컴포넌트

- `Header`: 앱 상단 네비게이션
- `PageWrapper`: 페이지 레이아웃 컴포넌트

### 페이지

- `MainPage`: 할 일 목록 및 관리
- `ItemDetailPage`: 할 일 상세 정보 및 편집

## API 엔드포인트

- `GET /items`: 할 일 목록 조회
- `POST /items`: 새 할 일 추가
- `GET /items/:id`: 할 일 상세 조회
- `PATCH /items/:id`: 할 일 수정
- `DELETE /items/:id`: 할 일 삭제
- `POST /images/upload`: 이미지 업로드

## 스타일 가이드

### 브레이크포인트

- 모바일: 375px
- 태블릿: 744px
- 데스크탑: 1920px

### 색상

- Primary: Slate 색상 계열
- Accent: Violet, Rose, Lime 색상
- Text: Slate 800/900
- Background: Slate 50/100

## 프로젝트 구조

```
src/
├── app/                    # 앱 라우터
│   ├── mainpage/          # 메인 페이지
│   └── items/[itemId]/    # 상세 페이지
├── components/            # 컴포넌트
│   ├── common/           # 공통 컴포넌트
│   └── layout/           # 레이아웃 컴포넌트
└── lib/                  # 유틸리티 및 API
```

## 배포

애플리케이션은 Vercel을 통해 배포되며, 다음 URL에서 접근할 수 있습니다:
https://subao-todo-app.vercel.app/

## 라이선스

MIT License
