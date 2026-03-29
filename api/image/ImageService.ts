// api/image/ImageService.ts
import type { APIRequestContext } from '@playwright/test';
import { ConfigsGlobal } from '../common/ConfigsGlobal';
import { EndPointGlobal } from '../common/EndpointGlobal';
import { BaseApiService } from '../common/BaseApiService';
import { ImagePath } from './ImagePath';
import fs from 'fs';

export class ImageService extends BaseApiService {

  private static url(path = '') {
    return `${ConfigsGlobal.BASE_URL}${EndPointGlobal.EP_IMAGE}${path}`;
  }

  static async postCreate(
    request: APIRequestContext,
    token: string,
    imagePath: string = ImagePath.createImage()
  ) {
    const multipart = { image: fs.createReadStream(imagePath) };
    const { response, body } = await this.sendRequest('POST', request, this.url(), token, undefined, 200, multipart);
    return { response, body, imagePath };
  }

  static async get(request: APIRequestContext, token: string, imageId: number) {
    return await this.sendRequest('GET', request, this.url(`/${imageId}`), token);
  }

  static async postUpdate(
    request: APIRequestContext,
    token: string,
    imageId: number,
    imagePath: string = ImagePath.UpdateImage()
  ) {
    const multipart = { image: fs.createReadStream(imagePath) };
    const { response, body } = await this.sendRequest('POST', request, this.url(`/${imageId}`), token, undefined, 200, multipart);
    return { response, body, requestData: { imageId, imagePath } };
  }

  static async delete(request: APIRequestContext, token: string, imageId: number) {
    return await this.sendRequest('DELETE', request, this.url(`/${imageId}`), token);
  }

  static async getAfterDelete(request: APIRequestContext, token: string, imageId: number) {
    return await this.sendRequest('GET', request, this.url(`/${imageId}`), token, undefined, 400);
  }
}