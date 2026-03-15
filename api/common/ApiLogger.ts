import { APIResponse } from '@playwright/test';

export class ApiLogger {

    static logRequest(
    method: string,
    url: string,
    options?: {
      headers?: Record<string, any>;
      body?: any;
    }
  ) {
    console.log('================ REQUEST =================');
    console.log('METHOD:', method);
    console.log('URL:', url);

    if (options?.headers) {
      console.log('HEADERS:');
      Object.entries(options.headers).forEach(([k, v]) =>
        console.log(`  ${k}: ${v}`)
      );
    }

    if (options?.body) {
      console.log('BODY:');
      console.log(JSON.stringify(options.body, null, 2));
    }
  }

  static async logResponse(
    response: APIResponse,
    duration: number
  ) {
    const headers = response.headers();
    let body: any;

    try {
      body = await response.json();
    } catch {
      body = await response.text();
    }

    console.log('================ RESPONSE ================');
    console.log('STATUS CODE:', response.status());
    console.log('RESPONSE TIME:', duration, 'ms');
    console.log('================ RESPONSE BODY ================:');
    if (typeof body === 'string') {
      console.log(body);
    } else {
      console.log(JSON.stringify(body, null, 2));
    }
    console.log('==============================================');

    console.log('================ RESPONSE HEADERS ================:');
    Object.entries(headers).forEach(([k, v]) =>
      console.log(`  ${k}: ${v}`)
    );

    if (headers['set-cookie']) {
      console.log('COOKIES:');
      headers['set-cookie']
        .split(',')
        .forEach(c => console.log(`  ${c.trim()}`));
    }

  }
}
