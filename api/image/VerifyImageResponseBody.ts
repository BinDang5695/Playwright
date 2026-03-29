import { expect } from '@playwright/test';

export class VerifyImageResponseBody {

  private static verifySuccessMessage(body: any) {
    expect(body).toHaveProperty('message');
    expect(body.message).toBe('Success');
    expect(body).toHaveProperty('response');
  }

  private static verifyImageFields(response: any) {
    expect(response).toHaveProperty('id');
    expect(typeof response.id).toBe('number');
    expect(response.id).toBeGreaterThan(0);
    expect(response.path).toContain('public/images/');
  }

  static verifyCreateImage(body: any) {
    this.verifySuccessMessage(body);
    this.verifyImageFields(body.response);
  }

  static verifyGetImage(body: any) {
    this.verifySuccessMessage(body);
    this.verifyImageFields(body.response);
  }

  static verifyUpdateImage(body: any) {
    this.verifySuccessMessage(body);
    this.verifyImageFields(body.response);
  }

  static verifyDeleteImage(body: any) {
    this.verifySuccessMessage(body);
    this.verifyImageFields(body.response);
  }

  static verifyGetAfterDeleteImage(body: any) {
    expect(body).toHaveProperty('message');
    expect(body.message).toBe('Not found');
    expect(body).toHaveProperty('errors');
    expect(body.errors).toBe('No image found with the submitted id');
    expect(body).not.toHaveProperty('response');
  }
}