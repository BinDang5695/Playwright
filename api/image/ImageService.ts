// api/image/ImageService.ts
import type { APIRequestContext } from '@playwright/test';
import { ConfigsGlobal } from '../common/ConfigsGlobal';
import { EndPointGlobal } from '../common/EndpointGlobal';
import { measureRequest } from '../common/ApiTestHelper';
import { ApiLogger } from '../common/ApiLogger';
import { expect } from '../common/BaseTestApi';
import { ImagePath } from './ImagePath';
import fs from 'fs';

export class ImageService {

  static async postCreate( request: APIRequestContext,
    token: string,
    imagePath: string = ImagePath.createImage()
  ) {
    const url = `${ConfigsGlobal.BASE_URL}${EndPointGlobal.EP_IMAGE}`;
    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
    };
    ApiLogger.logRequest('POST', url, { headers: headers, body: { image: imagePath }, });

    const { response, duration } = await measureRequest(() =>
      request.post(url, {
        headers: headers,
        multipart: {
          image: fs.createReadStream(imagePath),
        },
      })
    );

    const body = await response.json();
    expect(response.status()).toBe(200);

    await ApiLogger.logResponse(response, duration);
    return { response, body, imagePath };
  }

  static async get( request: APIRequestContext,
    token: string,
    imageId: number
  ) {
    const url = `${ConfigsGlobal.BASE_URL}${EndPointGlobal.EP_IMAGE}/${imageId}`;
    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
    };
    ApiLogger.logRequest('GET', url, { headers: headers });

    const { response, duration } = await measureRequest(() =>
      request.get(url, {
        headers: headers,
        })
    );

    const body = await response.json();
    expect(response.status()).toBe(200);

    await ApiLogger.logResponse(response, duration);
    return { response, body };
}

  static async postUpdate( request: APIRequestContext,
    token: string,
    imageId: number,
    imagePath: string = ImagePath.UpdateImage()
  ) {
    const url = `${ConfigsGlobal.BASE_URL}${EndPointGlobal.EP_IMAGE}/${imageId}`;
    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
    };
    const requestData = {
        imageId,
        imagePath,
    };
    ApiLogger.logRequest('POST', url, { headers, body: requestData });

    const { response, duration } = await measureRequest(() =>
      request.post(url, {
        headers,
        multipart: {
          image: fs.createReadStream(imagePath),
        },
      })
    );

    const body = await response.json();
    expect(response.status()).toBe(200);

    await ApiLogger.logResponse(response, duration);
    return { response, body, requestData };
}

  static async delete( request: APIRequestContext,
    token: string,
    imageId: number
  ) {
    const url = `${ConfigsGlobal.BASE_URL}${EndPointGlobal.EP_IMAGE}/${imageId}`;
    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
    };
    ApiLogger.logRequest('DELETE', url, { headers: headers });

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

  static async getAfterDelete( request: APIRequestContext,
    token: string,
    imageId: number
  ) {
    const url = `${ConfigsGlobal.BASE_URL}${EndPointGlobal.EP_IMAGE}/${imageId}`;
    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
    };
    ApiLogger.logRequest('GET', url, { headers: headers });

    const { response, duration } = await measureRequest(() =>
      request.get(url, {
        headers: headers,
      })
    );

    const body = await response.json();
    expect(response.status()).toBe(400);

    await ApiLogger.logResponse(response, duration);
    return { response, body };
}
}
