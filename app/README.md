# ElysiaJS 게시판 실습 (Bun + Drizzle + MySQL)

Bun 런타임 환경에서 ElysiaJS와 Drizzle ORM, MySQL(Docker)을 사용하여 구축된 게시판 CRUD REST API입니다.

## 🚀 시작하기

**중요**: 모든 명령어는 `app` 폴더(프로젝트 루트 디렉토리) 내부에서 실행해야 합니다. 만약 상위 폴더(`c:\portpolio\ElysiaJS`)에 있다면, 먼저 아래 명령어로 이동해주세요.

```bash
cd app
```

### 1. 패키지 설치
```bash
bun install
```

### 2. 환경 설정 (.env)
기본적으로 `.env` 파일에 아래 값이 설정되어 있습니다:
```env
DATABASE_URL=mysql://elysia:elysia1234@localhost:13306/ElysiaDB
```

### 3. 데이터베이스 (Docker - MySQL) 실행
MySQL 8.0 컨테이너를 바탕화면에 있는 Docker Desktop이 켜진 상태에서 기동합니다:
```bash
docker compose up -d
```
> ※ `docker ps` 명령어로 `elysia_mysql` 컨테이너가 정상적으로 실행 중(`Up`)인지 확인하세요.

### 4. DB 테이블 생성 (마이그레이션)
Drizzle Schema(`src/db/schema.ts`)를 실제 DB에 반영합니다:
```bash
bun run db:push
```

### 5. 서버 실행 (개발 모드)
핫 리로딩(`--watch`) 옵션이 켜진 상태로 서버가 열립니다:
```bash
bun run dev
```
> 브라우저 또는 클라이언트 도구(Postman 등)를 통해 `http://localhost:3000/v1` 경로로 API에 접속할 수 있습니다.


---

## 📖 API 엔드포인트 목록

모든 API 경로는 `/v1/posts` 입니다.

| 메서드 | 경로 | 설명 | 요청 예시 |
|---|---|---|---|
| `GET`   | `/v1/posts` | 게시글 전체 목록 조회 (페이징 지원: `?page=1&limit=10`) | |
| `GET`   | `/v1/posts/:id` | 게시글 단건 조회 | |
| `POST`  | `/v1/posts` | 새 게시글 생성 | `{ "title": "제목", "content": "내용", "author": "작성자" }` |
| `PATCH` | `/v1/posts/:id` | 기존 게시글 수정 | `{ "title": "수정할 제목" }` |
| `DELETE`| `/v1/posts/:id` | 게시글 삭제 | |


---

## 🗄️ 유용한 명령어 (Drizzle 관련)

- **DB 관리자 GUI 모드 접속 (Drizzle Studio)**
  ```bash
  bun run db:studio
  ```
  명령어 실행 후 터미널에 나타난 링크(`https://local.drizzle.studio...`)로 접속하면 브라우저에서 직접 데이터를 조회/수정할 수 있습니다.