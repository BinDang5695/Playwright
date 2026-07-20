// api/image/ImageService.ts
import type { APIRequestContext } from '@playwright/test';
import { ConfigGlobal } from '@api/common/Config';
import { EndPointGlobal } from '@api/common/EndpointGlobal';
import { ApiClient } from '@api/common/ApiClient';
import { imageData } from '@data/api/image.data';
import fs from 'fs';

export class ImageService {

  private static url(path = '') {
    return `${ConfigGlobal.BASE_URL}${EndPointGlobal.EP_IMAGE}${path}`;
  }

  static async post(
    request: APIRequestContext,
    token: string,
    imagePath: string = imageData.create.file
  ) {
    const multipart = { image: fs.createReadStream(imagePath) };
    const { response, body } = await ApiClient.sendRequest('POST', request, this.url(), token, undefined, 200, multipart);
    return { response, body, imagePath };
  }

  static async get(request: APIRequestContext, token: string, imageId: number) {
    return await ApiClient.sendRequest('GET', request, this.url(`/${imageId}`), token);
  }

  static async postUpdate(
    request: APIRequestContext,
    token: string,
    imageId: number,
    imagePath: string = imageData.update.file
  ) {
    const multipart = { image: fs.createReadStream(imagePath) };
    const { response, body } = await ApiClient.sendRequest('POST', request, this.url(`/${imageId}`), token, undefined, 200, multipart);
    return { response, body, requestData: { imageId, imagePath } };
  }

  static async delete(request: APIRequestContext, token: string, imageId: number) {
    return await ApiClient.sendRequest('DELETE', request, this.url(`/${imageId}`), token);
  }

  static async getAfterDelete(request: APIRequestContext, token: string, imageId: number) {
    return await ApiClient.sendRequest('GET', request, this.url(`/${imageId}`), token, undefined, 400);
  }
}