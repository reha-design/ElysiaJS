import { eq, desc, sql } from 'drizzle-orm';
import { db } from './client';
import { posts, Post, NewPost } from './schema';
import { cache } from './redis';

export const store = {
  /**
   * 전체 게시글 조회 (Redis 캐싱 적용)
   */
  async findAll(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;
    
    // 1) 캐시 확인 (posts:all 키 사용)
    const cacheKey = `posts:all:p${page}:l${limit}`; // 페이지네이션 포함 키
    const cachedData = await cache.get<{ items: Post[], total: number }>(cacheKey);
    if (cachedData) {
      return { ...cachedData, source: 'cache' };
    }

    // 2) 캐시 미스 시 DB 조회
    const [items, [{ count: total }]] = await Promise.all([
      db.select().from(posts).orderBy(desc(posts.createdAt)).limit(limit).offset(offset),
      db.select({ count: sql<number>`count(*)` }).from(posts),
    ]);

    const result = { items, total, page, limit, totalPages: Math.ceil(total / limit) };

    // 3) Redis에 캐시 저장 (TTL 60초)
    await cache.set(cacheKey, result, 60);

    return { ...result, source: 'db' };
  },

  async findById(id: number) {
    const result = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
    return result[0] ?? null;
  },

  /**
   * 게시글 생성 (캐시 무효화)
   */
  async create(data: NewPost) {
    const [result] = await db.insert(posts).values(data);
    await this.clearCache();
    return this.findById(Number(result.insertId));
  },

  /**
   * 게시글 수정 (캐시 무효화)
   */
  async update(id: number, data: Partial<NewPost>) {
    await db.update(posts).set({ ...data, updatedAt: new Date() }).where(eq(posts.id, id));
    await this.clearCache();
    return this.findById(id);
  },

  /**
   * 게시글 삭제 (캐시 무효화)
   */
  async delete(id: number) {
    const [result] = await db.delete(posts).where(eq(posts.id, id));
    await this.clearCache();
    return result.affectedRows > 0;
  },

  /**
   * 게시물 관련 모든 캐시 삭제 (패턴 매칭)
   */
  async clearCache() {
    try {
      // ioredis의 keys()와 del()을 조합하여 posts:all:* 패턴의 모든 키 삭제
      const keys = await cache.redis.keys('posts:all:*');
      if (keys.length > 0) {
        await cache.redis.del(...keys);
      }
    } catch (err) {
      console.error('Redis clearCache error:', err);
    }
  }
};

