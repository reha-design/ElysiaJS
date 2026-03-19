import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

// Redis 클라이언트 싱글톤 인스턴스
export const redis = new Redis(redisUrl, {
  maxRetriesPerRequest: null,
});

redis.on('connect', () => console.log('🚀 Redis 연결 성공'));
redis.on('error', (err) => console.error('❌ Redis 연결 오류:', err));

/**
 * 캐시 관련 유틸리티 함수
 */
export const cache = {
  redis, // 직접 접근용 인스턴스 노출
  // 게시글 목록 캐시 키
  POSTS_KEY: 'posts:all',

  /**
   * 데이터를 JSON으로 직렬화하여 저장 (기본 TTL 60초)
   */
  async set(key: string, value: any, ttl = 60) {
    try {
      await redis.set(key, JSON.stringify(value), 'EX', ttl);
    } catch (err) {
      console.error(`Redis set error [${key}]:`, err);
    }
  },

  /**
   * 데이터를 가져와서 객체로 역직렬화
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      const data = await redis.get(key);
      return data ? JSON.parse(data) : null;
    } catch (err) {
      console.error(`Redis get error [${key}]:`, err);
      return null;
    }
  },

  /**
   * 특정 키(들) 삭제 (Cache Invalidation)
   */
  async del(...keys: string[]) {
    try {
      if (keys.length > 0) {
        await redis.del(...keys);
      }
    } catch (err) {
      console.error(`Redis del error [${keys.join(', ')}]:`, err);
    }
  }
};
