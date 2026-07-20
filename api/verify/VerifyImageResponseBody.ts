import { expect } from '@playwright/test';
import { VerifyResponseBody } from '@api/common/VerifyResponseBody';

export class VerifyImageResponseBody {

  private static verifyImageFields(response:any){

    VerifyResponseBody.verifyId(response);

    expect(response.path)
      .toContain('public/images/');

  }

  static verifyCreateImage(body:any){

    VerifyResponseBody.verifySuccessMessage(body);

    this.verifyImageFields(
      body.response
    );

  }

  static verifyGetImage(body:any){

    this.verifyCreateImage(body);

  }

  static verifyUpdateImage(body:any){

    this.verifyCreateImage(body);
  }

  static verifyDeleteImage(body:any){

    this.verifyCreateImage(body);

  }

  static verifyGetAfterDeleteImage(body:any){

    VerifyResponseBody.verifyNotFound(
      body,
      'No image found with the submitted id'
    );

  }

}