import { expect } from '@playwright/test';

export class VerifyUserResponseBody {

  private static verifySuccessMessage(body: any) {
    expect(body).toHaveProperty('message');
    expect(body.message).toBe('Success');
    expect(body).toHaveProperty('response');
  }

  private static verifyUserFields(response: any, expected: any) {
    expect(response).toHaveProperty('id');
    expect(typeof response.id).toBe('number');
    expect(response.id).toBeGreaterThan(0);
    expect(response.username).toBe(expected.username);
    expect(response.firstName).toBe(expected.firstName);
    expect(response.lastName).toBe(expected.lastName);
    expect(response.email).toBe(expected.email);
    expect(response.phone).toBe(expected.phone);
    expect(response.userStatus).toBe(expected.userStatus);
  }

  private static verifyUserSuccess(body: any, expected: any) {
    this.verifySuccessMessage(body);
    this.verifyUserFields(body.response, expected);
  }

  static verifyCreateUser(body: any, expected: any) { this.verifyUserSuccess(body, expected); }
  static verifyGetUser(body: any, expected: any) { this.verifyUserSuccess(body, expected); }
  static verifyUpdateUser(body: any, expected: any) { this.verifyUserSuccess(body, expected); }
  static verifyDeleteUser(body: any, expected: any) { this.verifyUserSuccess(body, expected); }

  static verifyGetAfterDeleteUser(body: any) {
    expect(body).toHaveProperty('message');
    expect(body.message).toBe('Not found');
    expect(body).toHaveProperty('errors');
    expect(body.errors).toBe('No user found with the submitted id');
    expect(body).not.toHaveProperty('response');
  }
}