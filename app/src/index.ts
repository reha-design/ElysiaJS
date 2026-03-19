import { Elysia } from 'elysia';
import { BunAdapter } from 'elysia/adapter/bun';
import { postRoutes } from './routes/post';

const app = new Elysia({ adapter: BunAdapter })
  // 1) 전역 로깅용 컨텍스트
  .derive({ as: 'global' }, () => ({ _startTime: performance.now() }))
  
  // 2) 전역 로그 출력 (가장 먼저 실행되어 모든 경로 캡처)
  .onAfterResponse({ as: 'global' }, ({ request, set, _startTime }) => {
    const duration = (performance.now() - _startTime).toFixed(2);
    let path = '/';
    try { path = new URL(request.url).pathname; } catch { path = request.url; }
    
    console.log(`[LOGGER] ${request.method} ${path} -> ${set.status} (${duration}ms)`);
  })

  // 3) API 그룹 설정
  .group('/v1', (app) => 
    app
      .get('/health', () => ({ status: 'ok', timestamp: new Date().toISOString() }))
      .use(postRoutes)
  )
  
  // 4) 기본 경로 404 방지용 안내 (선택 사항)
  .get('/', () => "Elysia Server is running. Try /v1/health")
  
  .listen(3000);

console.log(`🦊 서버 실행 중: http://localhost:3000`);
console.log(`📋 헬스체크: http://localhost:3000/v1/health`);
console.log(`📋 게시판 API: http://localhost:3000/v1/posts`);