// api/BookService.ts
import type { APIRequestContext } from '@playwright/test';
import { ConfigsGlobal } from '../common/ConfigsGlobal';
import { EndPointGlobal } from '../common/EndpointGlobal';
import { BookBuilder } from './BookBuilder';
import { measureRequest } from '../common/ApiTestHelper';
import { ApiLogger } from '../common/ApiLogger';
import { expect } from '../common/BaseTestApi';

export class BookService {
  static async post(request: APIRequestContext, token: string) {
    const bookData = BookBuilder.getDataToCreateBook();
    const url = `${ConfigsGlobal.BASE_URL}${EndPointGlobal.EP_BOOK}`;
    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
    };
    ApiLogger.logRequest('POST', url, { headers: headers, body: bookData });

    const { response, duration } = await measureRequest(() =>
      request.post(url, { headers: headers, data: bookData })
    );

    const body = await response.json();
    expect(response.status()).toBe(200);

    await ApiLogger.logResponse(response, duration);
    return { response, body, requestData: bookData };
  }

  static async get(request: APIRequestContext, token: string, bookId: number) {
    const url = `${ConfigsGlobal.BASE_URL}${EndPointGlobal.EP_BOOK}/${bookId}`;
    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
    };
    ApiLogger.logRequest('GET', url, { headers: headers });
    
    const { response, duration } = await measureRequest(() =>
      request.get(url, { headers: headers })
    );

    const body = await response.json();
    expect(response.status()).toBe(200);
    
    await ApiLogger.logResponse(response, duration);
    return { response, body };
  }

  static async put( request: APIRequestContext, token: string, bookId: number) {
    const updateData = BookBuilder.getDataToUpdateBook();
    const url = `${ConfigsGlobal.BASE_URL}${EndPointGlobal.EP_BOOK}/${bookId}`;
    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
    };
    ApiLogger.logRequest('PUT', url, { headers: headers,
      body: updateData,
    });

    const { response, duration } = await measureRequest(() =>
      request.put(url, {
        headers: headers,
        data: updateData,
      })
    );

    const body = await response.json();
    expect(response.status()).toBe(200);

    await ApiLogger.logResponse(response, duration);
    return { response, body, requestData: updateData };
  }

static async delete( request: APIRequestContext, token: string, bookId: number ) {
  const url = `${ConfigsGlobal.BASE_URL}${EndPointGlobal.EP_BOOK}/${bookId}`;
  const headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
    };
  ApiLogger.logRequest('DELETE', url, {
    headers: { headers },
  });

  const { response, duration } = await measureRequest(() =>
    request.delete(url, {
      headers: headers,
    })
  );

  const body = await response.json();
  expect(response.status()).toBe(200);

  await ApiLogger.logResponse(response, duration);
  return { response, body };
}

  static async getAfterDelete(request: APIRequestContext, token: string, bookId: number) {
    const url = `${ConfigsGlobal.BASE_URL}${EndPointGlobal.EP_BOOK}/${bookId}`;
    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
    };    
    ApiLogger.logRequest('GET', url, { headers: headers });
    
    const { response, duration } = await measureRequest(() =>
      request.get(url, { headers: headers })
    );

    const body = await response.json();
    expect(response.status()).toBe(400);
    
    await ApiLogger.logResponse(response, duration);
    return { response, body };
  }


}

