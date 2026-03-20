# 📝 Changelog / Feature Log

이 파일은 프로젝트에 새로운 기능이 추가되거나 큰 변화가 있을 때마다 기록하는 문서입니다.

## [1.0.0] - 2026-03-20

### 🚀 추가 기능 (Added)
- **Git 리포지토리 구성**: 로컬 Git 저장소 초기화 및 GitHub 원격 저장소(`origin`) 연동 완료.
- **프로젝트 문서화**:
    - GitHub 메인 페이지 표시를 위한 루트 `README.md` 구성.
    - 트러블슈팅 리포트 자동 생성 및 `docs/troubleshooting/` 관리 체계 구축.
- **Swagger API 문서 자동화**:
    - `@elysiajs/swagger` 라이브러리 설치 및 연동.
    - **Scalar UI** 테마를 적용하여 `/swagger` 경로에서 시각적인 API 명세서 제공.
- **프로젝트 로그 기록 체계**: 기능 추가 시마다 기록할 고유의 `CHANGELOG.md` 도입.

### 🛠 인프라 및 환경 (Infra & Env)
- **ElysiaJS**: Bun 기반의 고성능 웹 프레임워크 초기 환경 구축.
- **Database**: Drizzle ORM 및 MySQL(Docker) 연동.
- **Caching**: Redis(Docker)를 활용한 API 조회 성능 최적화 기반 마련.
- **Character Set**: 데이터베이스 및 클라이언트의 `utf8mb4`(한글 지원) 설정 완료.

### 🐞 해결된 이슈 (Fixed)
- **데이터베이스 한글 깨짐 이슈**: `charset: 'utf8mb4'` 설정 미비로 발생했던 `???` 표시 문제를 해결하고 검증 완료.

---
*앞으로 추가되는 모든 기능은 이 문서의 상단에 새로운 날짜와 함께 기록됩니다.*
