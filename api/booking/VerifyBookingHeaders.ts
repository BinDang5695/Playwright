import { APIResponse, expect } from '@playwright/test';

export class VerifyBookingHeaders {

  private static verifyCommonHeaders(response: APIResponse) {
    const headers = response.headers();
    const dateHeader = headers['date'];

    if (headers['content-length']) {
      expect(Number(headers['content-length'])).toBeGreaterThan(0);
    }
    expect(dateHeader).toBeTruthy();
    const parsedDate = new Date(dateHeader!);
    expect(parsedDate.toString()).not.toBe('Invalid Date');
    expect(dateHeader).toContain('GMT');
    expect(Math.abs(Date.now() - parsedDate.getTime())).toBeLessThan(5 * 60 * 1000);

    expect(headers['etag']).toContain('W/');
    expect(headers['nel']).toContain('heroku-nel');
    expect(headers['report-to']).toContain('heroku-nel');
    expect(headers['reporting-endpoints']).toContain('heroku-nel');
    expect(headers['server']).toContain('Heroku');
    expect(headers['via']).toContain('heroku-router');
    expect(headers['x-powered-by']).toContain('Express');
  }

  static verify(response: APIResponse) {
    expect(response.headers()['content-type']).toContain('application/json; charset=utf-8');
    this.verifyCommonHeaders(response);
  }

  static verifyText(response: APIResponse) {
    expect(response.headers()['content-type']).toContain('text/plain; charset=utf-8');
    this.verifyCommonHeaders(response);
  }
}