import { expect } from '@playwright/test';

export class VerifyImageResponseBody {

  static verifyCreateImage(body: any) {

    expect(body).toHaveProperty('message');
    expect(body.message).toBe('Success');
    
    expect(body).toHaveProperty('response');
    const response = body.response;

    expect(response.path).toContain('public/images/');
    expect(response).toHaveProperty('id');
    expect(typeof response.id).toBe('number');
    expect(response.id).toBeGreaterThan(0);
  }

  static verifyGetImage(body: any, expected: any) {

    expect(body).toHaveProperty('message');
    expect(body.message).toBe('Success');
    
    expect(body).toHaveProperty('response');
    const response = body.response;

    expect(response.path).toContain('public/images/');
    expect(response).toHaveProperty('id');
    expect(typeof response.id).toBe('number');
    expect(response.id).toBeGreaterThan(0);
}
  
  static verifyUpdateImage(body: any, expected: any) {

    expect(body).toHaveProperty('message');
    expect(body.message).toBe('Success');
    
    expect(body).toHaveProperty('response');
    const response = body.response;

    expect(response.path).toContain('public/images/');
    expect(response).toHaveProperty('id');
    expect(typeof response.id).toBe('number');
    expect(response.id).toBeGreaterThan(0);
}

  static verifyDeleteImage(body: any, expected?: any) {

    expect(body).toHaveProperty('message');
    expect(body.message).toBe('Success');
    
    expect(body).toHaveProperty('response');
    const response = body.response;

    expect(response.path).toContain('public/images/');
    expect(response).toHaveProperty('id');
    expect(typeof response.id).toBe('number');
    expect(response.id).toBeGreaterThan(0);
}

  static verifyGetAfterDeleteImage(body: any, expected?: any) {
    expect(body).toHaveProperty('message');
    expect(body.message).toBe('Not found');

    expect(body).toHaveProperty('errors');
    expect(body.errors).toBe('No image found with the submitted id');

    expect(body).not.toHaveProperty('response');
  }  
  
}