import { APIResponse, expect } from '@playwright/test';

export class VerifyBookingHeaders {

  static verify(response: APIResponse) {
    const headers = response.headers();
    const dateHeader = headers['date'];

    expect(headers['content-type']).toContain('application/json; charset=utf-8');
    if (headers['content-length']) {
      expect(Number(headers['content-length'])).toBeGreaterThan(0);
    }
    expect(dateHeader).toBeTruthy();
    const parsedDate = new Date(dateHeader!);
    expect(parsedDate.toString()).not.toBe('Invalid Date');
    expect(dateHeader).toContain('GMT');

    const diff = Math.abs(Date.now() - parsedDate.getTime());
    expect(diff).toBeLessThan(5 * 60 * 1000);

    expect(headers['etag']).toContain('W/');
    expect(headers['nel']).toContain('heroku-nel');
    expect(headers['report-to']).toContain('heroku-nel');
    expect(headers['report-to']).toContain('heroku-nel');
    expect(headers['reporting-endpoints']).toContain('heroku-nel');
    expect(headers['server']).toContain('Heroku');
    expect(headers['via']).toContain('heroku-router');
    expect(headers['x-powered-by']).toContain('Express');

  }

  static verifyText(response: APIResponse) {
    const headers = response.headers();
    const dateHeader = headers['date'];

    expect(headers['content-type']).toContain('text/plain; charset=utf-8');
    if (headers['content-length']) {
      expect(Number(headers['content-length'])).toBeGreaterThan(0);
    }
    expect(dateHeader).toBeTruthy();
    const parsedDate = new Date(dateHeader!);
    expect(parsedDate.toString()).not.toBe('Invalid Date');
    expect(dateHeader).toContain('GMT');

    const diff = Math.abs(Date.now() - parsedDate.getTime());
    expect(diff).toBeLessThan(5 * 60 * 1000);

    expect(headers['etag']).toContain('W/');
    expect(headers['nel']).toContain('heroku-nel');
    expect(headers['report-to']).toContain('heroku-nel');
    expect(headers['report-to']).toContain('heroku-nel');
    expect(headers['reporting-endpoints']).toContain('heroku-nel');
    expect(headers['server']).toContain('Heroku');
    expect(headers['via']).toContain('heroku-router');
    expect(headers['x-powered-by']).toContain('Express');

  }
}
