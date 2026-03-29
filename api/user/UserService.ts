// api/user/UserService.ts
import type { APIRequestContext } from '@playwright/test';
import { ConfigsGlobal } from '../common/ConfigsGlobal';
import { EndPointGlobal } from '../common/EndpointGlobal';
import { UserBuilder } from './UserBuilder';
import { BaseApiService } from '../common/BaseApiService';

export class UserService extends BaseApiService {

  private static url(path = '') {
    return `${ConfigsGlobal.BASE_URL}${EndPointGlobal.EP_USER}${path}`;
  }

  static async post(request: APIRequestContext, token: string) {
    const userData = UserBuilder.getDataToCreateUser();
    const { response, body } = await this.sendRequest('POST', request, this.url(), token, userData);
    return { response, body, requestData: userData };
  }

  static async get(request: APIRequestContext, token: string, username: string) {
    return await this.sendRequest('GET', request, this.url(`/?username=${username}`), token);
  }

  static async put(request: APIRequestContext, token: string, userId: number) {
    const updateData = UserBuilder.getDataToUpdateUser();
    const { response, body } = await this.sendRequest('PUT', request, this.url(`/${userId}`), token, updateData);
    return { response, body, requestData: updateData };
  }

  static async delete(request: APIRequestContext, token: string, username: string) {
    return await this.sendRequest('DELETE', request, this.url(`/?username=${username}`), token);
  }

  static async getAfterDelete(request: APIRequestContext, token: string, username: string) {
    return await this.sendRequest('GET', request, this.url(`/?username=${username}`), token, undefined, 400);
  }
}