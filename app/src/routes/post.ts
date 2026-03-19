import { Elysia, NotFoundError } from 'elysia';
import { store } from '../db/store';
import {
  CreatePostBody,
  UpdatePostBody,
  PostParams,
  PostQuery,
} from '../models/post.model';

export const postRoutes = new Elysia({ prefix: '/posts', tags: ['Posts'] })

  // ✅ [GET] /posts - 게시글 목록 조회 (페이징)
  .get(
    '/',
    async ({ query }) => {
      const page = query.page ?? 1;
      const limit = query.limit ?? 10;
      return store.findAll(page, limit);
    },
    {
      query: PostQuery,
      detail: { summary: '게시글 목록 조회' },
    }
  )

  // ✅ [GET] /posts/:id - 게시글 단건 조회
  .get(
    '/:id',
    async ({ params }) => {
      const post = await store.findById(params.id);
      if (!post) throw new NotFoundError('게시글을 찾을 수 없습니다.');
      return post;
    },
    {
      params: PostParams,
      detail: { summary: '게시글 단건 조회' },
    }
  )

  // ✅ [POST] /posts - 게시글 생성
  .post(
    '/',
    async ({ body, set }) => {
      const post = await store.create(body);
      set.status = 201;
      return post;
    },
    {
      body: CreatePostBody,
      detail: { summary: '게시글 생성' },
    }
  )

  // ✅ [PATCH] /posts/:id - 게시글 수정
  .patch(
    '/:id',
    async ({ params, body }) => {
      const post = await store.update(params.id, body);
      if (!post) throw new NotFoundError('게시글을 찾을 수 없습니다.');
      return post;
    },
    {
      params: PostParams,
      body: UpdatePostBody,
      detail: { summary: '게시글 수정' },
    }
  )

  // ✅ [DELETE] /posts/:id - 게시글 삭제
  .delete(
    '/:id',
    async ({ params, set }) => {
      const ok = await store.delete(params.id);
      if (!ok) throw new NotFoundError('게시글을 찾을 수 없습니다.');
      set.status = 204;
    },
    {
      params: PostParams,
      detail: { summary: '게시글 삭제' },
    }
  );
