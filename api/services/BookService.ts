  // api/BookService.ts
  import type { APIRequestContext } from '@playwright/test';
  import { EndPointGlobal } from '../common/EndpointGlobal';
  import { ConfigGlobal } from '../common/Config';
  import { bookData } from '@data/api/book.data';
  import { ApiClient } from '../common/ApiClient';

  export class BookService {

    private static url(path = '') {
      return `${ConfigGlobal.BASE_URL}${EndPointGlobal.EP_BOOK}${path}`;
    }

    static async post(request: APIRequestContext, token: string) {
      const requestData = bookData.create();
      const { response, body } = await ApiClient.sendRequest('POST', request, this.url(), token, requestData);
      return { response, body, requestData: requestData };
    }

    static async get(request: APIRequestContext, token: string, bookId: number) {
      return await ApiClient.sendRequest('GET', request, this.url(`/${bookId}`), token);
    }

    static async put(request: APIRequestContext, token: string, bookId: number) {
      const updateData = bookData.update();
      const { response, body } = await ApiClient.sendRequest('PUT', request, this.url(`/${bookId}`), token, updateData);
      return { response, body, requestData: updateData };
    }

    static async delete(request: APIRequestContext, token: string, bookId: number) {
      return await ApiClient.sendRequest('DELETE', request, this.url(`/${bookId}`), token);
    }

    static async getAfterDelete(request: APIRequestContext, token: string, bookId: number) {
      return await ApiClient.sendRequest('GET', request, this.url(`/${bookId}`), token, undefined, 400);
    }
  }