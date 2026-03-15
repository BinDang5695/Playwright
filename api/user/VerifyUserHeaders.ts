import { APIResponse, expect } from '@playwright/test';

export class VerifyUserHeaders {

  static verify(response: APIResponse) {
    const headers = response.headers();
    const dateHeader = headers['date'];

    expect(headers['connection']).toContain('Keep-Alive');
    expect(headers['keep-alive']).toContain('timeout=5, max=100');
    expect(headers['cache-control']).toContain('no-cache, private');
    expect(headers['content-type']).toContain('application/json');
    if (headers['x-ratelimit-limit']) {
      expect(Number(headers['x-ratelimit-limit'])).toBeGreaterThan(0);
    }
    if (headers['x-ratelimit-remaining']) {
      expect(Number(headers['x-ratelimit-remaining'])).toBeGreaterThan(0);
    }
    expect(headers['access-control-allow-origin']).toContain('*');
    expect(headers['vary']).toContain('Accept-Encoding');
    if (headers['content-length']) {
      expect(Number(headers['content-length'])).toBeGreaterThan(0);
    }
    expect(headers['content-encoding']).toContain('gzip');
    expect(dateHeader).toBeTruthy();
    expect(new Date(dateHeader!).toString()).not.toBe('Invalid Date');
    expect(headers['server']).toContain('LiteSpeed');
  }
}
