// api/BookService.ts
import type { APIRequestContext } from '@playwright/test';
import { ConfigsGlobal } from '../common/ConfigsGlobal';
import { EndPointGlobal } from '../common/EndpointGlobal';
import { UserBuilder } from './UserBuilder';
import { measureRequest } from '../common/ApiTestHelper';
import { ApiLogger } from '../common/ApiLogger';
import { expect } from '../common/BaseTestApi';

export class UserService {
  static async post(request: APIRequestContext, token: string) {
    const userData = UserBuilder.getDataToCreateUser();
    const url = `${ConfigsGlobal.BASE_URL}${EndPointGlobal.EP_USER}`;
    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
    };
    ApiLogger.logRequest('POST', url, { headers: headers, body: userData });

    const { response, duration } = await measureRequest(() =>
      request.post(url,{ headers, data: userData })
    );

    const body = await response.json();
    expect(response.status()).toBe(200);

    await ApiLogger.logResponse(response, duration);
    return { response, body, requestData: userData };
  }

  static async get(request: APIRequestContext, token: string, username: string) {
    const url = `${ConfigsGlobal.BASE_URL}${EndPointGlobal.EP_USER}/?username=${username}`;
    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
    };
    ApiLogger.logRequest('GET', url, { headers: headers });
    
    const { response, duration } = await measureRequest(() =>
      request.get(url, { headers })
    );

    const body = await response.json();
    expect(response.status()).toBe(200);
    
    await ApiLogger.logResponse(response, duration);
    return { response, body };
  }

  static async put( request: APIRequestContext, token: string, userId: number) {
    const updateData = UserBuilder.getDataToUpdateUser();
    const url = `${ConfigsGlobal.BASE_URL}${EndPointGlobal.EP_USER}/${userId}`;
    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
    };
    ApiLogger.logRequest('PUT', url, { headers: headers, body: updateData,});

    const { response, duration } = await measureRequest(() =>
      request.put(url, { headers, data: updateData,})
    );

    const body = await response.json();
    expect(response.status()).toBe(200);

    await ApiLogger.logResponse(response, duration);
    return { response, body, requestData: updateData };
  }

  static async delete( request: APIRequestContext, token: string, username: string ) {
    const url = `${ConfigsGlobal.BASE_URL}${EndPointGlobal.EP_USER}/?username=${username}`;
    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
    };
    ApiLogger.logRequest('DELETE', url, { headers: headers });

  const { response, duration } = await measureRequest(() =>
    request.delete(url, { headers, })
  );

  const body = await response.json();
  expect(response.status()).toBe(200);

  await ApiLogger.logResponse(response, duration);
  return { response, body };
}

  static async getAfterDelete(request: APIRequestContext, token: string, username: string) {
    const url = `${ConfigsGlobal.BASE_URL}${EndPointGlobal.EP_USER}/?username=${username}`;
    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
    };
    ApiLogger.logRequest('GET', url, { headers: headers });
    
    const { response, duration } = await measureRequest(() =>
      request.get(url, { headers })
    );

    const body = await response.json();
    expect(response.status()).toBe(400);
    
    await ApiLogger.logResponse(response, duration);
    return { response, body };
  }


}