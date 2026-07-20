// api/user/UserService.ts
import type { APIRequestContext } from '@playwright/test';
import { ConfigGlobal } from '@api/common/Config';
import { EndPointGlobal } from '@api/common/EndpointGlobal';
import { userData } from '@data/api/user.data';
import { ApiClient } from '@api/common/ApiClient';

export class UserService {

  private static url(path = '') {
    return `${ConfigGlobal.BASE_URL}${EndPointGlobal.EP_USER}${path}`;
  }

  static async post(request: APIRequestContext, token: string) {
    const requestData = userData.create;
    const { response, body } = await ApiClient.sendRequest('POST', request, this.url(), token, requestData);
    return { response, body, requestData: requestData };
  }

  static async get(request: APIRequestContext, token: string, username: string) {
    return await ApiClient.sendRequest('GET', request, this.url(`/?username=${username}`), token);
  }

  static async put(request: APIRequestContext, token: string, userId: number) {
    const updateData = userData.update;
    const { response, body } = await ApiClient.sendRequest('PUT', request, this.url(`/${userId}`), token, updateData);
    return { response, body, requestData: updateData };
  }

  static async delete(request: APIRequestContext, token: string, username: string) {
    return await ApiClient.sendRequest('DELETE', request, this.url(`/?username=${username}`), token);
  }

  static async getAfterDelete(request: APIRequestContext, token: string, username: string) {
    return await ApiClient.sendRequest('GET', request, this.url(`/?username=${username}`), token, undefined, 400);
  }
}