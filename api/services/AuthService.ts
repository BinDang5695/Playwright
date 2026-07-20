// api/GlobalService.ts
import type { APIRequestContext } from '@playwright/test';
import { expect } from '@playwright/test';
import { ApiClient } from '@api/common/ApiClient';
import { EndPointGlobal } from '@api/common/EndpointGlobal';
import { ConfigGlobal } from '@api/common/Config';
import { validateSchema } from '@models/helpers/ApiHelper';
import loginSchema from '@data/api/LoginSchema.json';

export class AuthService {

  static async login(
    request: APIRequestContext
  ): Promise<string> {

    const loginData = {
      username: ConfigGlobal.USERNAME,
      password: ConfigGlobal.PASSWORD,
    };

    const url =
      `${ConfigGlobal.BASE_URL}${EndPointGlobal.EP_LOGIN}`;

    const { body } =
      await ApiClient.sendRequest(
        'POST',
        request,
        url,
        undefined,
        loginData,
        200
      );

    expect(body.token).toBeTruthy();

    validateSchema(
      loginSchema,
      body
    );

    return body.token as string;
  }

}