import { test, expect } from '../../fixtures/api.fixture';
import CreateImageSchema from '@data/api/CreateImageSchema.json';
import GetImageSchema from '@data/api/GetImageSchema.json';
import UpdateImageSchema from '@data/api/UpdateImageSchema.json';
import GetImageAfterPutSchema from '@data/api/GetImageAfterPutSchema.json';
import DeleteImageSchema from '@data/api/DeleteImageSchema.json';
import GetImageAfterDeleteSchema from '@data/api/GetImageAfterDeleteSchema.json';
import { validateSchema } from '@models/helpers/ApiHelper';
import { ImageService } from '@api/image/ImageService';
import { VerifyResponseHeaders } from '@api/common/VerifyResponseHeaders';
import { VerifyImageResponseBody } from '@api/image/VerifyImageResponseBody';

let createdImage: any;
let createdImageId: number;

test.describe.serial('API Image Tests', () => {


    test('[IMAGE_001] Create Image Successfully', async ({ request, token }) => {

        await test.step('Send POST request to create image', async () => {

            const resultPost = await ImageService.post(
                request,
                token
            );

            await test.step('Validate response schema', async () => {
                validateSchema(CreateImageSchema, resultPost.body);
            });

            await test.step('Verify response headers', async () => {
                VerifyResponseHeaders.verify(resultPost.response);
            });

            await test.step('Verify create image response body', async () => {
                VerifyImageResponseBody.verifyCreateImage(
                    resultPost.body
                );
            });

            await test.step('Save created image information', async () => {
                const created = resultPost.body.response;

                expect(created.id).toBeGreaterThan(0);

                createdImage = created;
                createdImageId = created.id;
            });
        });

    });


    test('[IMAGE_002] Get Image Successfully', async ({ request, token }) => {

        await test.step('Send GET request to get image detail', async () => {

            const resultGet = await ImageService.get(
                request,
                token,
                createdImageId
            );

            await test.step('Validate response schema', async () => {
                validateSchema(
                    GetImageSchema,
                    resultGet.body
                );
            });

            await test.step('Verify response headers', async () => {
                VerifyResponseHeaders.verify(resultGet.response);
            });

            await test.step('Verify get image response body', async () => {
                VerifyImageResponseBody.verifyGetImage(
                    resultGet.body
                );
            });

        });

    });


    test('[IMAGE_003] Update Image Successfully', async ({ request, token }) => {

        await test.step('Send PUT request to update image', async () => {

            const resultPut = await ImageService.postUpdate(
                request,
                token,
                createdImageId
            );

            await test.step('Validate response schema', async () => {
                validateSchema(
                    UpdateImageSchema,
                    resultPut.body
                );
            });

            await test.step('Verify response headers', async () => {
                VerifyResponseHeaders.verify(resultPut.response);
            });

            await test.step('Verify update image response body', async () => {
                VerifyImageResponseBody.verifyUpdateImage(
                    resultPut.body
                );
            });

        });

    });


    test('[IMAGE_004] Get Image After Update Successfully', async ({ request, token }) => {

        await test.step('Send GET request after updating image', async () => {

            const resultGetAfterPut = await ImageService.get(
                request,
                token,
                createdImageId
            );

            await test.step('Validate response schema', async () => {
                validateSchema(
                    GetImageAfterPutSchema,
                    resultGetAfterPut.body
                );
            });

            await test.step('Verify response headers', async () => {
                VerifyResponseHeaders.verify(
                    resultGetAfterPut.response
                );
            });

            await test.step('Verify updated image response body', async () => {
                VerifyImageResponseBody.verifyGetImage(
                    resultGetAfterPut.body
                );
            });

        });

    });


    test('[IMAGE_005] Delete Image Successfully', async ({ request, token }) => {

        await test.step('Send DELETE request to remove image', async () => {

            const result = await ImageService.delete(
                request,
                token,
                createdImageId
            );

            await test.step('Validate response schema', async () => {
                validateSchema(
                    DeleteImageSchema,
                    result.body
                );
            });

            await test.step('Verify response headers', async () => {
                VerifyResponseHeaders.verify(
                    result.response
                );
            });

            await test.step('Verify delete image response body', async () => {
                VerifyImageResponseBody.verifyDeleteImage(
                    result.body
                );
            });

        });

    });


    test('[IMAGE_006] Get Image After Delete Successfully', async ({ request, token }) => {

        await test.step('Send GET request after deleting image', async () => {

            const result = await ImageService.getAfterDelete(
                request,
                token,
                createdImageId
            );

            await test.step('Validate response schema', async () => {
                validateSchema(
                    GetImageAfterDeleteSchema,
                    result.body
                );
            });

            await test.step('Verify response headers', async () => {
                VerifyResponseHeaders.verify(
                    result.response
                );
            });

            await test.step('Verify deleted image response body', async () => {
                VerifyImageResponseBody.verifyGetAfterDeleteImage(
                    result.body
                );
            });

        });

    });

});