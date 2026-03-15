import { test, expect } from '../../api/common/BaseTestApi';
import CreateUserSchema from '../../test_data/CreateUserSchema.json';
import GetUserSchema from '../../test_data/GetUserSchema.json';
import UpdateUserSchema from '../../test_data/UpdateUserSchema.json';
import GetUserAfterPutSchema from '../../test_data/GetUserAfterPutSchema.json';
import DeleteUserSchema from '../../test_data/DeleteUserSchema.json';
import GetUserAfterDeleteSchema from '../../test_data/GetUserAfterDeleteSchema.json';
import { validateSchema } from '../../api/common/ApiTestHelper';
import { UserService } from '../../api/user/UserService';
import { VerifyUserHeaders } from '../../api/user/VerifyUserHeaders';
import { VerifyUserResponseBody } from '../../api/user/VerifyUserResponseBody';
let createdUser: any;
let createdUserId: number;
let createdUsername: string;
let updatedUserData: any;
test.describe.serial('API User Tests', () => {

  test('Post User', async ({ request, token }) => {
    const resultPost = await UserService.post(request, token);
    validateSchema(CreateUserSchema, resultPost.body);
    VerifyUserHeaders.verify(resultPost.response);
    VerifyUserResponseBody.verifyCreateUser(resultPost.body, resultPost.requestData);

    const created = resultPost.body.response;
    expect(created.id).toBeGreaterThan(0);
    createdUser = resultPost.body.response;
    createdUserId = created.id;
    createdUsername = created.username;
  });

  test('Get User', async ({ request, token }) => {
    const resultGet = await UserService.get(request, token, createdUsername);
    validateSchema(GetUserSchema, resultGet.body);
    VerifyUserHeaders.verify(resultGet.response);
    VerifyUserResponseBody.verifyGetUser(resultGet.body, createdUser);
  });

  test('Put User', async ({ request, token }) => {
    const resultPut = await UserService.put(request, token, createdUserId);
    validateSchema(UpdateUserSchema, resultPut.body);
    VerifyUserHeaders.verify(resultPut.response);
    updatedUserData = resultPut.requestData;
    createdUsername = updatedUserData.username;
    VerifyUserResponseBody.verifyUpdateUser(resultPut.body, updatedUserData);
  });

  test('Get User After Put', async ({ request, token }) => {
    const resultGetAfterPut = await UserService.get(request, token, createdUsername);
    validateSchema(GetUserAfterPutSchema, resultGetAfterPut.body);
    VerifyUserHeaders.verify(resultGetAfterPut.response);
    VerifyUserResponseBody.verifyGetUser(resultGetAfterPut.body, updatedUserData);
  });

  test('Delete User', async ({ request, token }) => {
    const resultAfterDelete = await UserService.delete(request, token, createdUsername);
    validateSchema(DeleteUserSchema, resultAfterDelete.body);
    VerifyUserHeaders.verify(resultAfterDelete.response);
    VerifyUserResponseBody.verifyDeleteUser(resultAfterDelete.body, updatedUserData);
  });

  test('Get User After Delete', async ({ request, token }) => {
    const resultGetAfterDelete = await UserService.getAfterDelete(request, token, createdUsername);
    validateSchema(GetUserAfterDeleteSchema, resultGetAfterDelete.body);
    VerifyUserHeaders.verify(resultGetAfterDelete.response);
    VerifyUserResponseBody.verifyGetAfterDeleteUser(resultGetAfterDelete.body);
  });

});
