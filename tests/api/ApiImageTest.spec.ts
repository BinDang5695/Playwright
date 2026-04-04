import { test, expect } from '@api/common/BaseTestApi';
import CreateImageSchema from '@data/api/CreateImageSchema.json';
import GetImageSchema from '@data/api/GetImageSchema.json';
import UpdateImageSchema from '@data/api/UpdateImageSchema.json';
import GetImageAfterPutSchema from '@data/api/GetImageAfterPutSchema.json';
import DeleteImageSchema from '@data/api/DeleteImageSchema.json';
import GetImageAfterDeleteSchema from '@data/api/GetImageAfterDeleteSchema.json';
import { validateSchema } from '@api/common/ApiTestHelper';
import { ImageService } from '@api/image/ImageService';
import { VerifyImageHeaders } from '@api/image/VerifyImageHeaders';
import { VerifyImageResponseBody } from '@api/image/VerifyImageResponseBody';
let createdImage: any;
let createdImageId: number;
test.describe.serial('API Image Tests', () => {

  test('Post Image', async ({ request, token }) => {
    const resultPost = await ImageService.postCreate(request, token);
    validateSchema(CreateImageSchema, resultPost.body);
    VerifyImageHeaders.verify(resultPost.response);
    VerifyImageResponseBody.verifyCreateImage( resultPost.body );
    const created = resultPost.body.response;
    expect(created.id).toBeGreaterThan(0);
    createdImage = resultPost.body.response;
    createdImageId = created.id;
  });

  test('Get Image', async ({ request, token }) => {
    const resultGet = await ImageService.get(request, token, createdImageId);
    validateSchema(GetImageSchema, resultGet.body);
    VerifyImageHeaders.verify(resultGet.response);
    VerifyImageResponseBody.verifyGetImage(resultGet.body);
  });

  test('Put Image', async ({ request, token }) => {
    const resultPut = await ImageService.postUpdate(request, token, createdImageId);
    validateSchema(UpdateImageSchema, resultPut.body);
    VerifyImageHeaders.verify(resultPut.response);
    VerifyImageResponseBody.verifyUpdateImage(resultPut.body);
  });

  test('Get Image After Put', async ({ request, token }) => {
    const resultGetAfterPut = await ImageService.get(request, token, createdImageId);
    validateSchema(GetImageAfterPutSchema, resultGetAfterPut.body);
    VerifyImageHeaders.verify(resultGetAfterPut.response);
    VerifyImageResponseBody.verifyGetImage(resultGetAfterPut.body);
  });

  test('Delete Image', async ({ request, token }) => {
    const result = await ImageService.delete(request, token, createdImageId);
    validateSchema(DeleteImageSchema, result.body);
    VerifyImageHeaders.verify(result.response);
    VerifyImageResponseBody.verifyDeleteImage(result.body);
  });

  test('Get Image After Delete', async ({ request, token }) => {
    const result = await ImageService.getAfterDelete(request, token, createdImageId);
    validateSchema(GetImageAfterDeleteSchema, result.body);
    VerifyImageHeaders.verify(result.response);
    VerifyImageResponseBody.verifyGetAfterDeleteImage(result.body);
  });

});
