import { t } from 'elysia';

// 게시글 생성 시 요청 바디 스키마
export const CreatePostBody = t.Object({
  title: t.String({ minLength: 1, maxLength: 100, description: '게시글 제목' }),
  content: t.String({ minLength: 1, description: '게시글 내용' }),
  author: t.String({ minLength: 1, maxLength: 50, description: '작성자 이름' }),
});

// 게시글 수정 시 요청 바디 스키마 (모두 optional)
export const UpdatePostBody = t.Object({
  title: t.Optional(t.String({ minLength: 1, maxLength: 100 })),
  content: t.Optional(t.String({ minLength: 1 })),
});

// URL 파라미터 스키마
export const PostParams = t.Object({
  id: t.Numeric({ description: '게시글 ID' }),
});

// 쿼리 파라미터 스키마 (목록 조회 시 페이징)
export const PostQuery = t.Object({
  page: t.Optional(t.Numeric({ default: 1, minimum: 1 })),
  limit: t.Optional(t.Numeric({ default: 10, minimum: 1, maximum: 50 })),
});

// 응답 시 사용하는 게시글 타입 (TypeScript)
export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}
