import { expect } from '@playwright/test';

export class VerifyBookResponseBody {

  private static verifySuccessMessage(body: any) {
    expect(body).toHaveProperty('message');
    expect(body.message).toBe('Success');
    expect(body).toHaveProperty('response');
  }

  private static verifyBookId(response: any) {
    expect(response).toHaveProperty('id');
    expect(typeof response.id).toBe('number');
    expect(response.id).toBeGreaterThan(0);
  }

  private static verifyBookFields(response: any, expected: any) {
    expect(response.name).toBe(expected.name);
    expect(response.category_id).toBe(expected.category_id);
    expect(response.price).toBe(expected.price);
  }

  private static verifyDateFormat(response: any, expected?: any) {
    expect(typeof response.release_date).toBe('string');
    expect(response.release_date).toMatch(/^\d{4}\/\d{2}\/\d{2}$/);
    if (expected?.release_date) {
      expect(response.release_date).toBe(
        expected.release_date.replace(/-/g, '/')
      );
    }
  }

  private static verifyImage(response: any) {
    expect(response).toHaveProperty('image');
    expect(Array.isArray(response.image)).toBeTruthy();
    expect(response.image.length).toBeGreaterThan(0);

    const image = response.image[0];
    expect(image).toHaveProperty('id');
    expect(typeof image.id).toBe('number');
    expect(image).toHaveProperty('path');
    expect(typeof image.path).toBe('string');
    expect(image.path).toContain('public/images/');
  }

  static verifyCreateBook(body: any, expected: any) {
    this.verifySuccessMessage(body);
    const response = body.response;
    this.verifyBookId(response);
    this.verifyBookFields(response, expected);
    expect(response.status).toBe(expected.status);
    this.verifyDateFormat(response, expected);
    this.verifyImage(response);
  }

  static verifyGetBook(body: any, expected: any) {
    this.verifySuccessMessage(body);
    const response = body.response;
    this.verifyBookId(response);
    this.verifyBookFields(response, expected);
    expect(Boolean(response.status)).toBe(expected.status);
    this.verifyDateFormat(response, expected);
    this.verifyImage(response);
  }

  static verifyUpdateBook(body: any, expected: any) {
    this.verifySuccessMessage(body);
    const response = body.response;
    this.verifyBookId(response);
    this.verifyBookFields(response, expected);
    expect(response.status).toBe(expected.status);
    this.verifyDateFormat(response, expected);
    this.verifyImage(response);
  }

  static verifyDeleteBook(body: any, expected?: any) {
    this.verifySuccessMessage(body);
    const response = body.response;
    this.verifyBookId(response);
    if (expected) {
      this.verifyBookFields(response, expected);
      expect(Boolean(response.status)).toBe(expected.status);
    }
    this.verifyDateFormat(response, expected);
  }

  static verifyGetAfterDeleteBook(body: any) {
    expect(body).toHaveProperty('message');
    expect(body.message).toBe('Not found');
    expect(body).toHaveProperty('errors');
    expect(body.errors).toBe('No book found with the submitted id');
    expect(body).not.toHaveProperty('response');
  }
}
