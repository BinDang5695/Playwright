import { test, expect } from '../../fixtures/api.fixture';
import CreateUserSchema from '@data/api/CreateUserSchema.json';
import GetUserSchema from '@data/api/GetUserSchema.json';
import UpdateUserSchema from '@data/api/UpdateUserSchema.json';
import GetUserAfterPutSchema from '@data/api/GetUserAfterPutSchema.json';
import DeleteUserSchema from '@data/api/DeleteUserSchema.json';
import GetUserAfterDeleteSchema from '@data/api/GetUserAfterDeleteSchema.json';
import { validateSchema } from '@models/helpers/ApiHelper';
import { UserService } from '@api/user/UserService';
import { VerifyResponseHeaders } from '@api/common/VerifyResponseHeaders';
import { VerifyUserResponseBody } from '@api/user/VerifyUserResponseBody';

let createdUser: any;
let createdUserId: number;
let createdUsername: string;
let updatedUserData: any;

test.describe.serial('API User Tests', () => {


    test('[USER_001] Create User Successfully', async ({ request, token }) => {

        await test.step('Send POST request to create user', async () => {

            const resultPost = await UserService.post(
                request,
                token
            );

            await test.step('Validate response schema', async () => {
                validateSchema(
                    CreateUserSchema,
                    resultPost.body
                );
            });

            await test.step('Verify response headers', async () => {
                VerifyResponseHeaders.verify(
                    resultPost.response
                );
            });

            await test.step('Verify create user response body', async () => {
                VerifyUserResponseBody.verifyCreateUser(
                    resultPost.body,
                    resultPost.requestData
                );
            });

            await test.step('Save created user information', async () => {
                const created = resultPost.body.response;

                expect(created.id).toBeGreaterThan(0);

                createdUser = created;
                createdUserId = created.id;
                createdUsername = created.username;
            });

        });

    });


    test('[USER_002] Get User Successfully', async ({ request, token }) => {

        await test.step('Send GET request to get user detail', async () => {

            const resultGet = await UserService.get(
                request,
                token,
                createdUsername
            );

            await test.step('Validate response schema', async () => {
                validateSchema(
                    GetUserSchema,
                    resultGet.body
                );
            });

            await test.step('Verify response headers', async () => {
                VerifyResponseHeaders.verify(
                    resultGet.response
                );
            });

            await test.step('Verify get user response body', async () => {
                VerifyUserResponseBody.verifyGetUser(
                    resultGet.body,
                    createdUser
                );
            });

        });

    });


    test('[USER_003] Update User Successfully', async ({ request, token }) => {

        await test.step('Send PUT request to update user', async () => {

            const resultPut = await UserService.put(
                request,
                token,
                createdUserId
            );

            await test.step('Validate response schema', async () => {
                validateSchema(
                    UpdateUserSchema,
                    resultPut.body
                );
            });

            await test.step('Verify response headers', async () => {
                VerifyResponseHeaders.verify(
                    resultPut.response
                );
            });

            await test.step('Verify update user response body', async () => {

                updatedUserData = resultPut.requestData;
                createdUsername = updatedUserData.username;

                VerifyUserResponseBody.verifyUpdateUser(
                    resultPut.body,
                    updatedUserData
                );

            });

        });

    });


    test('[USER_004] Get User After Update Successfully', async ({ request, token }) => {

        await test.step('Send GET request after updating user', async () => {

            const resultGetAfterPut = await UserService.get(
                request,
                token,
                createdUsername
            );

            await test.step('Validate response schema', async () => {
                validateSchema(
                    GetUserAfterPutSchema,
                    resultGetAfterPut.body
                );
            });

            await test.step('Verify response headers', async () => {
                VerifyResponseHeaders.verify(
                    resultGetAfterPut.response
                );
            });

            await test.step('Verify updated user response body', async () => {
                VerifyUserResponseBody.verifyGetUser(
                    resultGetAfterPut.body,
                    updatedUserData
                );
            });

        });

    });


    test('[USER_005] Delete User Successfully', async ({ request, token }) => {

        await test.step('Send DELETE request to remove user', async () => {

            const resultAfterDelete = await UserService.delete(
                request,
                token,
                createdUsername
            );

            await test.step('Validate response schema', async () => {
                validateSchema(
                    DeleteUserSchema,
                    resultAfterDelete.body
                );
            });

            await test.step('Verify response headers', async () => {
                VerifyResponseHeaders.verify(
                    resultAfterDelete.response
                );
            });

            await test.step('Verify delete user response body', async () => {
                VerifyUserResponseBody.verifyDeleteUser(
                    resultAfterDelete.body,
                    updatedUserData
                );
            });

        });

    });


    test('[USER_006] Get User After Delete Successfully', async ({ request, token }) => {

        await test.step('Send GET request after deleting user', async () => {

            const resultGetAfterDelete = await UserService.getAfterDelete(
                request,
                token,
                createdUsername
            );

            await test.step('Validate response schema', async () => {
                validateSchema(
                    GetUserAfterDeleteSchema,
                    resultGetAfterDelete.body
                );
            });

            await test.step('Verify response headers', async () => {
                VerifyResponseHeaders.verify(
                    resultGetAfterDelete.response
                );
            });

            await test.step('Verify deleted user response body', async () => {
                VerifyUserResponseBody.verifyGetAfterDeleteUser(
                    resultGetAfterDelete.body
                );
            });

        });

    });

});