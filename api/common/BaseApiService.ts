// api/common/BaseApiService.ts
import type { APIRequestContext } from '@playwright/test';
import { measureRequest } from './ApiTestHelper';
import { ApiLogger } from './ApiLogger';
import { expect } from './BaseTestApi';

export class BaseApiService {

  protected static buildHeaders(token: string) {
    return {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    };
  }

  protected static async sendRequest(
    method: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE',
    request: APIRequestContext,
    url: string,
    token: string,
    data?: any,
    expectedStatus = 200,
    multipart?: Record<string, any>,
    customHeaders?: Record<string, string>,
  ) {
    const headers = customHeaders ?? this.buildHeaders(token);
    ApiLogger.logRequest(method, url, { headers, body: data ?? multipart });

    const { response, duration } = await measureRequest(() => {
      switch (method) {
        case 'POST': return request.post(url, { headers, ...(multipart ? { multipart } : { data }) });
        case 'GET': return request.get(url, { headers });
        case 'PUT': return request.put(url, { headers, ...(multipart ? { multipart } : { data }) });
        case 'PATCH': return request.put(url, { headers, data });
        case 'DELETE': return request.delete(url, { headers });
      }
    });
    const contentType = response.headers()['content-type'] ?? '';
    const body = contentType.includes('application/json')
      ? await response.json()
      : await response.text();
    expect(response.status()).toBe(expectedStatus);
    ApiLogger.logResponse(response, duration);

    return { response, body };
  }
}