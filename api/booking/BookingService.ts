// api/booking/BookingService.ts
import type { APIRequestContext } from '@playwright/test';
import { ConfigsBooking } from '../common/ConfigsBooking';
import { EndPointGlobal } from '../common/EndpointGlobal';
import { BookingBuilder } from './BookingBuilder';
import { BaseApiService } from '../common/BaseApiService';

export class BookingService extends BaseApiService {

  private static url(path = '') {
    return `${ConfigsBooking.BASE_URL}${EndPointGlobal.EP_BOOKING}${path}`;
  }

  static async post(request: APIRequestContext, token: string) {
    const bookingData = BookingBuilder.getDataToCreateBooking();
    const headers = { 'Content-Type': 'application/json', Accept: 'application/json' };
    const { response, body } = await this.sendRequest('POST', request, this.url(), token, bookingData, 200, undefined, headers);
    return { response, body, requestData: bookingData };
  }

  static async get(request: APIRequestContext, token: string, bookingId: number) {
    const headers = { Accept: 'application/json' };
    return await this.sendRequest('GET', request, this.url(`/${bookingId}`), token, undefined, 200, undefined, headers);
  }

  static async patch(request: APIRequestContext, token: string, bookingId: number) {
    const updateData = BookingBuilder.getDataToUpdateBooking();
    const headers = { 'Content-Type': 'application/json', Accept: 'application/json', Cookie: `token=${token}` };
    const { response, body } = await this.sendRequest('PATCH', request, this.url(`/${bookingId}`), token, updateData, 200, undefined, headers);
    return { response, body, requestData: updateData };
  }

  static async delete(request: APIRequestContext, token: string, bookingId: number) {
    const headers = { 'Content-Type': 'application/json', Cookie: `token=${token}` };
    return await this.sendRequest('DELETE', request, this.url(`/${bookingId}`), token, undefined, 201, undefined, headers);
  }

  static async getAfterDelete(request: APIRequestContext, token: string, bookingId: number) {
    const headers = { Accept: 'application/json' };
    return await this.sendRequest('GET', request, this.url(`/${bookingId}`), token, undefined, 404, undefined, headers);
  }
}