import { expect } from '@playwright/test';
import { VerifyResponseBody } from '../common/VerifyResponseBody';

export class VerifyUserResponseBody {

  private static verifyUserFields(
    response:any,
    expected:any
  ){

    VerifyResponseBody.verifyId(response);

    expect(response.username)
      .toBe(expected.username);

    expect(response.firstName)
      .toBe(expected.firstName);

    expect(response.lastName)
      .toBe(expected.lastName);

    expect(response.email)
      .toBe(expected.email);

    expect(response.phone)
      .toBe(expected.phone);

    expect(response.userStatus)
      .toBe(expected.userStatus);
  }

  static verifyCreateUser(
    body:any,
    expected:any
  ){

    VerifyResponseBody.verifySuccessMessage(body);

    this.verifyUserFields(
      body.response,
      expected
    );

  }

  static verifyGetUser(
    body:any,
    expected:any
  ){

    this.verifyCreateUser(
      body,
      expected
    );

  }

  static verifyUpdateUser(
    body:any,
    expected:any
  ){

    this.verifyCreateUser(
      body,
      expected
    );

  }

  static verifyDeleteUser(
    body:any,
    expected:any
  ){

    this.verifyCreateUser(
      body,
      expected
    );

  }

  static verifyGetAfterDeleteUser(body:any){

    VerifyResponseBody.verifyNotFound(
      body,
      'No user found with the submitted id'
    );

  }

}