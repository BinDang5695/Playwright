// api/BookService.ts
import type { APIRequestContext } from '@playwright/test';
import { EndPointGlobal } from '../common/EndpointGlobal';
import { ConfigsGlobal } from '../common/ConfigsGlobal';
import { BookBuilder } from './BookBuilder';
import { BaseApiService } from '../common/BaseApiService';

export class BookService extends BaseApiService {

  private static url(path = '') {
    return `${ConfigsGlobal.BASE_URL}${EndPointGlobal.EP_BOOK}${path}`;
  }

  static async post(request: APIRequestContext, token: string) {
    const bookData = BookBuilder.getDataToCreateBook();
    const { response, body } = await this.sendRequest('POST', request, this.url(), token, bookData);
    return { response, body, requestData: bookData };
  }

  static async get(request: APIRequestContext, token: string, bookId: number) {
    return await this.sendRequest('GET', request, this.url(`/${bookId}`), token);
  }

  static async put(request: APIRequestContext, token: string, bookId: number) {
    const updateData = BookBuilder.getDataToUpdateBook();
    const { response, body } = await this.sendRequest('PUT', request, this.url(`/${bookId}`), token, updateData);
    return { response, body, requestData: updateData };
  }

  static async delete(request: APIRequestContext, token: string, bookId: number) {
    return await this.sendRequest('DELETE', request, this.url(`/${bookId}`), token);
  }

  // expectedStatus khác 200 thì truyền vào
  static async getAfterDelete(request: APIRequestContext, token: string, bookId: number) {
    return await this.sendRequest('GET', request, this.url(`/${bookId}`), token, undefined, 400);
  }
}