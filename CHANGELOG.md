# 📝 Changelog / Feature Log

이 파일은 프로젝트의 모든 개발 이력과 기능 추가 사항을 기록하는 문서입니다.

## [1.0.1] - 2026-03-20

### 🚀 추가 기능 (Added)
- **Swagger API 문서 자동화**:
    - `@elysiajs/swagger` 및 **Scalar UI** 연동 (`/swagger`).
- **프로젝트 문서화 및 관리**:
    - 루트 `README.md` 및 `CHANGELOG.md` 도입.
    - 트러블슈팅 리포트(`docs/troubleshooting/`) 체계 구축.
- **Git 리포지토리 공식 운용**:
    - GitHub 원격 저장소(`origin`) 연동 및 초기 데이터 푸시.

### 🐞 해결된 이슈 (Fixed)
- **데이터베이스 한글 깨짐 이슈**: `charset: 'utf8mb4'` 설정 및 검증 완료.

## [1.0.0] - 2026-03-20

### 🚀 초기 릴리즈 (Initial Release)
- **Git 저장소 초기화**: 프로젝트 버전 관리를 위한 Git 환경 구축.

## [0.1.0] - 2026-03-19

### 🏗 인프라 구축 (Infrastructure)
- **ElysiaJS 프로젝트 생성**: Bun 기반 초기 서버 환경 구축.
- **데이터베이스 연동**: Drizzle ORM 및 MySQL(Docker) 기본 스키마 정의.
- **캐싱 시스템**: IORedis 기반 Redis(Docker) 연동 및 캐싱 로직 구현.
- **기본 API 구현**: 게시글(Posts) CRUD 기능 최초 구현.

---
*앞으로 추가되는 모든 기능은 이 문서의 상단에 새로운 날짜와 함께 기록됩니다.*
