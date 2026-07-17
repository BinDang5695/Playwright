import { expect } from '@playwright/test';

export class VerifyResponseBody {

  static verifySuccessMessage(body: any) {

    expect(body)
      .toHaveProperty('message');

    expect(body.message)
      .toBe('Success');

    expect(body)
      .toHaveProperty('response');
  }

  static verifyId(response: any) {

    expect(response)
      .toHaveProperty('id');

    expect(typeof response.id)
      .toBe('number');

    expect(response.id)
      .toBeGreaterThan(0);
  }

  static verifyNotFound(
    body: any,
    message: string
  ) {

    expect(body)
      .toHaveProperty('message');

    expect(body.message)
      .toBe('Not found');

    expect(body)
      .toHaveProperty('errors');

    expect(body.errors)
      .toBe(message);

    expect(body)
      .not
      .toHaveProperty('response');
  }

}