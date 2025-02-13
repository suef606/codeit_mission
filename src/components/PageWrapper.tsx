// src/components/PageWrapper.tsx
/**
 * 페이지 레이아웃 래퍼 컴포넌트
 * - 모든 페이지의 기본 레이아웃 구조 제공
 * - 반응형 레이아웃 지원
 * - 섹션별 컨텐츠 배치 관리
 */
interface PageWrapperProps {
  topSection?: React.ReactNode;    // 상단 섹션 (선택적)
  leftSection: React.ReactNode;    // 왼쪽 섹션 (필수)
  rightSection: React.ReactNode;   // 오른쪽 섹션 (필수)
  bottomSection?: React.ReactNode; // 하단 섹션 (선택적)
}

export function PageWrapper({ 
  topSection, 
  leftSection, 
  rightSection, 
  bottomSection 
}: PageWrapperProps) {
  return (
    // 최상위 컨테이너 (최대 너비 제한 및 중앙 정렬)
    <div className="w-full max-w-[1200px] mx-auto">
      {/* 상단 섹션 */}
      {topSection && (
        <div className="mb-8">
          {topSection}
        </div>
      )}
      
      {/* 메인 컨텐츠 영역: 
          - 모바일/태블릿: 세로 배치
          - 데스크탑: 가로 배치
      */}
      <div className={`
        w-full
        flex flex-col                    
        gap-y-8                          
        desktop:flex-row                 
        tablet-max:flex-col              
        tablet-max:gap-y-8              
      `}>
        {/* 왼쪽 섹션 - 최소 높이 설정으로 빈 상태에서도 공간 확보 */}
        <div className="
          w-full
          tablet-max:w-full
          min-h-[400px]
        ">
          {leftSection}
        </div>

        {/* 오른쪽 섹션 - 데스크탑에서 왼쪽 여백 추가 */}
        <div className="
          w-full
          tablet-max:w-full
          desktop:ml-6
        ">
          {rightSection}
        </div>
      </div>

      {/* 하단 섹션 */}
      {bottomSection && (
        <div className="mt-8">
          {bottomSection}
        </div>
      )}
    </div>
  );
}