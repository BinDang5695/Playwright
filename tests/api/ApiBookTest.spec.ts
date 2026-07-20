import { test, expect } from '../../fixtures/api.fixture';
import CreateBookSchema from '@data/api/CreateBookSchema.json';
import GetBookSchema from '@data/api/GetBookSchema.json';
import UpdateBookSchema from '@data/api/UpdateBookSchema.json';
import GetBookAfterPutSchema from '@data/api/GetBookAfterPutSchema.json';
import DeleteBookSchema from '@data/api/DeleteBookSchema.json';
import GetBookAfterDeleteSchema from '@data/api/GetBookAfterDeleteSchema.json';
import { validateSchema } from '@models/helpers/ApiHelper';
import { BookService } from '@api/services/BookService';
import { VerifyResponseHeaders } from '@api/common/VerifyResponseHeaders';
import { VerifyBookResponseBody } from '@api/verify/VerifyBookResponseBody';

let createdBook: any;
let createdBookId: number;
let updatedBookData: any;

test.describe.serial('API Book Tests', () => {

    test('[BOOK_001] Create Book Successfully', async ({ request, token }) => {

        await test.step('Send POST request to create book', async () => {

            const resultPost = await BookService.post(request, token);

            await test.step('Validate response schema', async () => {
                validateSchema(CreateBookSchema, resultPost.body);
            });

            await test.step('Verify response headers', async () => {
                VerifyResponseHeaders.verify(resultPost.response);
            });

            await test.step('Verify create book response body', async () => {
                VerifyBookResponseBody.verifyCreateBook(
                    resultPost.body,
                    resultPost.requestData
                );
            });

            await test.step('Save created book information', async () => {
                const created = resultPost.body.response;

                expect(created.id).toBeGreaterThan(0);

                createdBook = created;
                createdBookId = created.id;
            });
        });

    });

    test('[BOOK_002] Get Book Successfully', async ({ request, token }) => {

        await test.step('Send GET request to get book detail', async () => {

            const resultGet = await BookService.get(
                request,
                token,
                createdBookId
            );

            await test.step('Validate response schema', async () => {
                validateSchema(GetBookSchema, resultGet.body);
            });

            await test.step('Verify response headers', async () => {
                VerifyResponseHeaders.verify(resultGet.response);
            });

            await test.step('Verify get book response body', async () => {
                VerifyBookResponseBody.verifyGetBook(
                    resultGet.body,
                    createdBook
                );
            });
        });

    });

    test('[BOOK_003] Update Book Successfully', async ({ request, token }) => {

        await test.step('Send PUT request to update book', async () => {

            const resultPut = await BookService.put(
                request,
                token,
                createdBookId
            );

            await test.step('Validate response schema', async () => {
                validateSchema(UpdateBookSchema, resultPut.body);
            });

            await test.step('Verify response headers', async () => {
                VerifyResponseHeaders.verify(resultPut.response);
            });

            await test.step('Verify update book response body', async () => {
                updatedBookData = resultPut.requestData;

                VerifyBookResponseBody.verifyUpdateBook(
                    resultPut.body,
                    updatedBookData
                );
            });
        });

    });

    test('[BOOK_004] Get Book After Update Successfully', async ({ request, token }) => {

        await test.step('Send GET request after updating book', async () => {

            const resultGetAfterPut = await BookService.get(
                request,
                token,
                createdBookId
            );

            await test.step('Validate response schema', async () => {
                validateSchema(
                    GetBookAfterPutSchema,
                    resultGetAfterPut.body
                );
            });

            await test.step('Verify response headers', async () => {
                VerifyResponseHeaders.verify(resultGetAfterPut.response);
            });

            await test.step('Verify updated book response body', async () => {
                VerifyBookResponseBody.verifyGetBook(
                    resultGetAfterPut.body,
                    updatedBookData
                );
            });
        });

    });

    test('[BOOK_005] Delete Book Successfully', async ({ request, token }) => {

        await test.step('Send DELETE request to remove book', async () => {

            const result = await BookService.delete(
                request,
                token,
                createdBookId
            );

            await test.step('Validate response schema', async () => {
                validateSchema(DeleteBookSchema, result.body);
            });

            await test.step('Verify response headers', async () => {
                VerifyResponseHeaders.verify(result.response);
            });

            await test.step('Verify delete book response body', async () => {
                VerifyBookResponseBody.verifyDeleteBook(
                    result.body
                );
            });
        });

    });

    test('[BOOK_006] Get Book After Delete Successfully', async ({ request, token }) => {

        await test.step('Send GET request after deleting book', async () => {

            const result = await BookService.getAfterDelete(
                request,
                token,
                createdBookId
            );

            await test.step('Validate response schema', async () => {
                validateSchema(
                    GetBookAfterDeleteSchema,
                    result.body
                );
            });

            await test.step('Verify response headers', async () => {
                VerifyResponseHeaders.verify(result.response);
            });

            await test.step('Verify deleted book response body', async () => {
                VerifyBookResponseBody.verifyGetAfterDeleteBook(
                    result.body
                );
            });
        });

    });

});