import { test, expect } from '../../api/common/BaseTestApi';
import CreateBookSchema from '../../test_data/CreateBookSchema.json';
import GetBookSchema from '../../test_data/GetBookSchema.json';
import UpdateBookSchema from '../../test_data/UpdateBookSchema.json';
import GetBookAfterPutSchema from '../../test_data/GetBookAfterPutSchema.json';
import DeleteBookSchema from '../../test_data/DeleteBookSchema.json';
import GetBookAfterDeleteSchema from '../../test_data/GetBookAfterDeleteSchema.json';
import { validateSchema } from '../../api/common/ApiTestHelper';
import { BookService } from '../../api/book/BookService';
import { VerifyBookHeaders } from '../../api/book/VerifyBookHeaders';
import { VerifyBookResponseBody } from '../../api/book/VerifyBookResponseBody';
let createdBook: any;
let createdBookId: number;
let updatedBookData: any;
test.describe.serial('API Book Tests', () => {

  test('Post Book', async ({ request, token }) => {
    const resultPost = await BookService.post(request, token);
    validateSchema(CreateBookSchema, resultPost.body);
    VerifyBookHeaders.verify(resultPost.response);
    VerifyBookResponseBody.verifyCreateBook(
      resultPost.body,
      resultPost.requestData
    );
    const created = resultPost.body.response;
    expect(created.id).toBeGreaterThan(0);
    createdBook = resultPost.body.response;
    createdBookId = created.id;
  });

  test('Get Book', async ({ request, token }) => {
    const resultGet = await BookService.get(request, token, createdBookId);
    validateSchema(GetBookSchema, resultGet.body);
    VerifyBookHeaders.verify(resultGet.response);
    VerifyBookResponseBody.verifyGetBook(resultGet.body, createdBook);
  });

  test('Put Book', async ({ request, token }) => {
    const resultPut = await BookService.put(request, token, createdBookId);
    validateSchema(UpdateBookSchema, resultPut.body);
    VerifyBookHeaders.verify(resultPut.response);
    updatedBookData = resultPut.requestData;
    VerifyBookResponseBody.verifyUpdateBook(resultPut.body, updatedBookData);
  });

  test('Get Book After Put', async ({ request, token }) => {
    const resultGetAfterPut = await BookService.get(request, token, createdBookId);
    validateSchema(GetBookAfterPutSchema, resultGetAfterPut.body);
    VerifyBookHeaders.verify(resultGetAfterPut.response);
    VerifyBookResponseBody.verifyGetBook(resultGetAfterPut.body, updatedBookData);
  });

  test('Delete Book', async ({ request, token }) => {
    const result = await BookService.delete(request, token, createdBookId);
    validateSchema(DeleteBookSchema, result.body);
    VerifyBookHeaders.verify(result.response);
    VerifyBookResponseBody.verifyDeleteBook(result.body, updatedBookData);
  });

  test('Get Book After Delete', async ({ request, token }) => {
    const result = await BookService.getAfterDelete(request, token, createdBookId);
    validateSchema(GetBookAfterDeleteSchema, result.body);
    VerifyBookHeaders.verify(result.response);
    VerifyBookResponseBody.verifyGetAfterDeleteBook(result.body);
  });

});
