import { test, expect } from '../../api/common/BaseTestApi';
import CreateImageSchema from '../../test_data/CreateImageSchema.json';
import GetImageSchema from '../../test_data/GetImageSchema.json';
import UpdateImageSchema from '../../test_data/UpdateImageSchema.json';
import GetImageAfterPutSchema from '../../test_data/GetImageAfterPutSchema.json';
import DeleteImageSchema from '../../test_data/DeleteImageSchema.json';
import GetImageAfterDeleteSchema from '../../test_data/GetImageAfterDeleteSchema.json';
import { validateSchema } from '../../api/common/ApiTestHelper';
import { ImageService } from '../../api/image/ImageService';
import { VerifyImageHeaders } from '../../api/image/VerifyImageHeaders';
import { VerifyImageResponseBody } from '../../api/image/VerifyImageResponseBody';
let createdImage: any;
let createdImageId: number;
let updatedImageData: any;
test.describe.serial('API Image Tests', () => {

  test('Post Image', async ({ request, token }) => {
    const resultPost = await ImageService.postCreate(request, token);
    validateSchema(CreateImageSchema, resultPost.body);
    VerifyImageHeaders.verify(resultPost.response);
    VerifyImageResponseBody.verifyCreateImage(
      resultPost.body,
    );
    const created = resultPost.body.response;
    expect(created.id).toBeGreaterThan(0);
    createdImage = resultPost.body.response;
    createdImageId = created.id;
  });

  test('Get Image', async ({ request, token }) => {
    const resultGet = await ImageService.get(request, token, createdImageId);
    validateSchema(GetImageSchema, resultGet.body);
    VerifyImageHeaders.verify(resultGet.response);
    VerifyImageResponseBody.verifyGetImage(resultGet.body, createdImage);
  });

  test('Put Image', async ({ request, token }) => {
    const resultPut = await ImageService.postUpdate(request, token, createdImageId);
    validateSchema(UpdateImageSchema, resultPut.body);
    VerifyImageHeaders.verify(resultPut.response);
    VerifyImageResponseBody.verifyUpdateImage(resultPut.body, updatedImageData);
  });

  test('Get Image After Put', async ({ request, token }) => {
    const resultGetAfterPut = await ImageService.get(request, token, createdImageId);
    validateSchema(GetImageAfterPutSchema, resultGetAfterPut.body);
    VerifyImageHeaders.verify(resultGetAfterPut.response);
    VerifyImageResponseBody.verifyGetImage(resultGetAfterPut.body, updatedImageData);
  });

  test('Delete Image', async ({ request, token }) => {
    const result = await ImageService.delete(request, token, createdImageId);
    validateSchema(DeleteImageSchema, result.body);
    VerifyImageHeaders.verify(result.response);
    VerifyImageResponseBody.verifyDeleteImage(result.body, updatedImageData);
  });

  test('Get Image After Delete', async ({ request, token }) => {
    const result = await ImageService.getAfterDelete(request, token, createdImageId);
    validateSchema(GetImageAfterDeleteSchema, result.body);
    VerifyImageHeaders.verify(result.response);
    VerifyImageResponseBody.verifyGetAfterDeleteImage(result.body);
  });

});
