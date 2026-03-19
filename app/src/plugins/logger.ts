import { logger } from '@bogeychan/elysia-logger';
import { Elysia } from 'elysia';

// ── 소요시간 포맷 (1ms 미만 → μs, 1s 이상 → s) ──────────────
function formatDuration(ms: number): string {
  if (ms < 1)    return `${(ms * 1000).toFixed(1)}μs`;
  if (ms < 1000) return `${ms.toFixed(1)}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

// ── 타임스탬프 ───────────────────────────────────────────────
function timestamp(): string {
  const n = new Date();
  const pad = (v: number) => String(v).padStart(2, '0');
  return `${n.getFullYear()}-${pad(n.getMonth()+1)}-${pad(n.getDate())} ${pad(n.getHours())}:${pad(n.getMinutes())}:${pad(n.getSeconds())}`;
}

// ── 상태코드 레이블 ──────────────────────────────────────────
function statusMark(code: number): string {
  if (code < 300) return '✓';
  if (code < 400) return '→';
  if (code < 500) return '✗';
  return '‼';
}

// ── URL에서 path 안전 추출 ────────────────────────────────────
function getPath(url: string): string {
  try { return new URL(url).pathname; }
  catch { return url || '-'; }
}

/**
 * @bogeychan/elysia-logger 라이브러리를 사용하여 로깅 인프라를 구축하고, 
 * 출력 스타일은 사용자가 요청한 커스텀 포맷을 유지합니다.
 */
export const customLogger = new Elysia({ name: 'custom.logger' })
  // 1) 라이브러리 등록 (라이브러리 자체 로그는 비활성화하여 중복 방지)
  .use(logger({
    level: 'info',
    autoLogging: false
  }))
  // 2) 소요시간 측정을 위한 시작 시각 주입 (as: 'global' 필수)
  .derive({ as: 'global' }, () => ({
    _startTime: performance.now(),
    _errorMsg: '' as string
  }))
  // 3) 에러 발생 시 메시지 캡처
  .onError({ as: 'global' }, (ctx) => {
    const err = ctx.error;
    (ctx as any)._errorMsg = err instanceof Error ? err.message : String(err);
  })
  // 4) 응답 후 커스텀 포맷 출력
  .onAfterResponse({ as: 'global' }, (ctx: any) => {
    const { request, set, server, _startTime, _errorMsg } = ctx;
    
    const elapsed = performance.now() - _startTime;
    const status  = Number(set.status ?? 200);
    const method  = request.method.padEnd(7);
    const path    = getPath(request.url);
    const ip      = (server && request ? server.requestIP(request)?.address : null) ?? '-';

    const timeStr = formatDuration(elapsed);

    const line = [
      `[${timestamp()}]`,
      method,
      path.padEnd(35),
      String(status).padEnd(4),
      statusMark(status),
      timeStr.padStart(10),
      `ip:${ip}`
    ].join('  ');

    const finalLine = _errorMsg ? `${line}  ← ${_errorMsg}` : line;

    // 라이브러리의 log 객체를 사용하여 인쇄하거나 console 사용
    if (status >= 400) {
      console.error(finalLine);
    } else {
      console.log(finalLine);
    }
  });

