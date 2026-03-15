import { expect } from '@playwright/test';

export class VerifyBookResponseBody {

  static verifyCreateBook(body: any, expected: any) {
    expect(body).toHaveProperty('message');
    expect(body.message).toBe('Success');
    
    expect(body).toHaveProperty('response');
    const response = body.response;

    expect(response).toHaveProperty('id');
    expect(typeof response.id).toBe('number');
    expect(response.id).toBeGreaterThan(0);

    expect(response.name).toBe(expected.name);
    expect(response.category_id).toBe(expected.category_id);
    expect(response.price).toBe(expected.price);
    expect(response.status).toBe(expected.status);
    expect(typeof response.release_date).toBe('string');
    expect(response.release_date).toMatch(/^\d{4}\/\d{2}\/\d{2}$/);
    if (expected.release_date) {
      expect(response.release_date).toBe(
        expected.release_date.replace(/-/g, '/')
      );
    }

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

  static verifyGetBook(body: any, expected: any) {
    expect(body).toHaveProperty('message');
    expect(body.message).toBe('Success');
    
    expect(body).toHaveProperty('response');
    const response = body.response;

    expect(response).toHaveProperty('id');
    expect(typeof response.id).toBe('number');
    expect(response.id).toBeGreaterThan(0);

    expect(response.name).toBe(expected.name);
    expect(response.category_id).toBe(expected.category_id);
    expect(response.price).toBe(expected.price);
    expect(Boolean(response.status)).toBe(expected.status);
    expect(typeof response.release_date).toBe('string');
    expect(response.release_date).toMatch(/^\d{4}\/\d{2}\/\d{2}$/);
    if (expected.release_date) {
      expect(response.release_date).toBe(
        expected.release_date.replace(/-/g, '/')
      );
    }

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
  
  static verifyUpdateBook(body: any, expected: any) {
    expect(body).toHaveProperty('message');
    expect(body.message).toBe('Success');
    
    expect(body).toHaveProperty('response');
    const response = body.response;

    expect(response).toHaveProperty('id');
    expect(typeof response.id).toBe('number');
    expect(response.id).toBeGreaterThan(0);

    expect(response.name).toBe(expected.name);
    expect(response.category_id).toBe(expected.category_id);
    expect(response.price).toBe(expected.price);
    expect(response.status).toBe(expected.status);
    expect(typeof response.release_date).toBe('string');
    expect(response.release_date).toMatch(/^\d{4}\/\d{2}\/\d{2}$/);
    if (expected.release_date) {
      expect(response.release_date).toBe(
        expected.release_date.replace(/-/g, '/')
      );
    }

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

  static verifyDeleteBook(body: any, expected?: any) {
    expect(body).toHaveProperty('message');
    expect(body.message).toBe('Success');

    expect(body).toHaveProperty('response');
    const response = body.response;

    expect(response).toHaveProperty('id');
    expect(typeof response.id).toBe('number');
    expect(response.id).toBeGreaterThan(0);

    if (expected) {
      expect(response.name).toBe(expected.name);
      expect(response.category_id).toBe(expected.category_id);
      expect(response.price).toBe(expected.price);

      expect(Boolean(response.status)).toBe(expected.status);

      if (expected.release_date) {
        expect(response.release_date).toBe(
          expected.release_date.replace(/-/g, '/')
        );
      }
    }

    expect(typeof response.release_date).toBe('string');
    expect(response.release_date).toMatch(/^\d{4}\/\d{2}\/\d{2}$/);
  }

  static verifyGetAfterDeleteBook(body: any, expected?: any) {
    expect(body).toHaveProperty('message');
    expect(body.message).toBe('Not found');

    expect(body).toHaveProperty('errors');
    expect(body.errors).toBe('No book found with the submitted id');

    expect(body).not.toHaveProperty('response');
  }  
  
}
