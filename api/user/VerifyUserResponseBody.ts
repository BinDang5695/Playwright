import { expect } from '@playwright/test';

export class VerifyUserResponseBody {

  static verifyCreateUser(body: any, expected: any) {

    expect(body).toHaveProperty('message');
    expect(body.message).toBe('Success');
    
    expect(body).toHaveProperty('response');
    const response = body.response;

    expect(response.username).toBe(expected.username);
    expect(response.firstName).toBe(expected.firstName);
    expect(response.lastName).toBe(expected.lastName);
    expect(response.email).toBe(expected.email);
    expect(response.phone).toBe(expected.phone);
    expect(response.userStatus).toBe(expected.userStatus);
    expect(response).toHaveProperty('id');
    expect(typeof response.id).toBe('number');
    expect(response.id).toBeGreaterThan(0);
  }

  static verifyGetUser(body: any, expected: any) {

    expect(body).toHaveProperty('message');
    expect(body.message).toBe('Success');
    
    expect(body).toHaveProperty('response');
    const response = body.response;

    expect(response.username).toBe(expected.username);
    expect(response.firstName).toBe(expected.firstName);
    expect(response.lastName).toBe(expected.lastName);
    expect(response.email).toBe(expected.email);
    expect(response.phone).toBe(expected.phone);
    expect(response.userStatus).toBe(expected.userStatus);
    expect(response).toHaveProperty('id');
    expect(typeof response.id).toBe('number');
    expect(response.id).toBeGreaterThan(0);
}
  
  static verifyUpdateUser(body: any, expected: any) {

    expect(body).toHaveProperty('message');
    expect(body.message).toBe('Success');
    
    expect(body).toHaveProperty('response');
    const response = body.response;

    expect(response.username).toBe(expected.username);
    expect(response.firstName).toBe(expected.firstName);
    expect(response.lastName).toBe(expected.lastName);
    expect(response.email).toBe(expected.email);
    expect(response.phone).toBe(expected.phone);
    expect(response.userStatus).toBe(expected.userStatus);
    expect(response).toHaveProperty('id');
    expect(typeof response.id).toBe('number');
    expect(response.id).toBeGreaterThan(0);
}

  static verifyDeleteUser(body: any, expected?: any) {

    expect(body).toHaveProperty('message');
    expect(body.message).toBe('Success');
    
    expect(body).toHaveProperty('response');
    const response = body.response;

    expect(response.username).toBe(expected.username);
    expect(response.firstName).toBe(expected.firstName);
    expect(response.lastName).toBe(expected.lastName);
    expect(response.email).toBe(expected.email);
    expect(response.phone).toBe(expected.phone);
    expect(response.userStatus).toBe(expected.userStatus);
    expect(response).toHaveProperty('id');
    expect(typeof response.id).toBe('number');
    expect(response.id).toBeGreaterThan(0);
}

  static verifyGetAfterDeleteUser(body: any, expected?: any) {
    expect(body).toHaveProperty('message');
    expect(body.message).toBe('Not found');

    expect(body).toHaveProperty('errors');
    expect(body.errors).toBe('No user found with the submitted id');

    expect(body).not.toHaveProperty('response');
  }  
  
}
