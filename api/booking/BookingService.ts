// api/BookService.ts
import type { APIRequestContext } from '@playwright/test';
import { ConfigsBooking } from '../common/ConfigsBooking';
import { EndPointGlobal } from '../common/EndpointGlobal';
import { BookingBuilder } from './BookingBuilder';
import { measureRequest } from '../common/ApiTestHelper';
import { ApiLogger } from '../common/ApiLogger';
import { expect } from '../common/BaseTestApi';

export class BookingService {
  static async post(request: APIRequestContext, token: string) {
    const bookingData = BookingBuilder.getDataToCreateBooking();
    const url = `${ConfigsBooking.BASE_URL}${EndPointGlobal.EP_BOOKING}`;
    const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    };
    ApiLogger.logRequest('POST', url, { headers: headers, body: bookingData });

    const { response, duration } = await measureRequest(() =>
      request.post(url, { headers: headers, data: bookingData })
    );

    const body = await response.json();
    expect(response.status()).toBe(200);

    await ApiLogger.logResponse(response, duration);
    return { response, body, requestData: bookingData };
  }

  static async get(request: APIRequestContext, token: string, bookingId: number) {
    const url = `${ConfigsBooking.BASE_URL}${EndPointGlobal.EP_BOOKING}/${bookingId}`;
    const headers = {
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

  static async patch( request: APIRequestContext, token: string, bookingId: number) {
    const updateData = BookingBuilder.getDataToUpdateBooking();
    const url = `${ConfigsBooking.BASE_URL}${EndPointGlobal.EP_BOOKING}/${bookingId}`;
    const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Cookie': `token=${token}`
    };
    ApiLogger.logRequest('PATCH', url, { headers: headers,
      body: updateData,
    });

    const { response, duration } = await measureRequest(() =>
      request.patch(url, {
        headers: headers,
        data: updateData,
      })
    );

    const body = await response.json();
    expect(response.status()).toBe(200);

    await ApiLogger.logResponse(response, duration);
    return { response, body, requestData: updateData };
  }

static async delete( request: APIRequestContext, token: string, bookingId: number ) {
  const url = `${ConfigsBooking.BASE_URL}${EndPointGlobal.EP_BOOKING}/${bookingId}`;
  const headers = {
        'Content-Type': 'application/json',
        'Cookie': `token=${token}`
    };
  ApiLogger.logRequest('DELETE', url, {
    headers: headers,
  });

  const { response, duration } = await measureRequest(() =>
    request.delete(url, {
      headers: headers,
    })
  );

  const body = await response.text();
  expect(response.status()).toBe(201);

  await ApiLogger.logResponse(response, duration);
  return { response, body };
}

  static async getAfterDelete(request: APIRequestContext, token: string, bookingId: number) {
    const url = `${ConfigsBooking.BASE_URL}${EndPointGlobal.EP_BOOKING}/${bookingId}`;
    const headers = {
        Accept: 'application/json',
    };    
    ApiLogger.logRequest('GET', url, { headers: headers });
    
    const { response, duration } = await measureRequest(() =>
      request.get(url, { headers: headers })
    );

    const body = await response.text();
    expect(response.status()).toBe(404);
    
    await ApiLogger.logResponse(response, duration);
    return { response, body };
  }


}

