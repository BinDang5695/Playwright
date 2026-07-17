import { expect } from '@playwright/test';
import { VerifyResponseBody } from '../common/VerifyResponseBody';

export class VerifyBookResponseBody {

  private static verifyBookFields(
    response: any,
    expected: any
  ) {

    expect(response.name)
      .toBe(expected.name);

    expect(response.category_id)
      .toBe(expected.category_id);

    expect(response.price)
      .toBe(expected.price);

  }

  private static verifyDateFormat(
    response:any,
    expected?:any
  ){

    expect(typeof response.release_date)
      .toBe('string');

    expect(response.release_date)
      .toMatch(/^\d{4}\/\d{2}\/\d{2}$/);

    if(expected?.release_date){

      expect(response.release_date)
        .toBe(
          expected.release_date.replace(/-/g,'/')
        );
    }
  }

  private static verifyImage(response:any){

    expect(response.image)
      .toBeDefined();

    expect(Array.isArray(response.image))
      .toBeTruthy();

    expect(response.image.length)
      .toBeGreaterThan(0);
  }

  static verifyCreateBook(
    body:any,
    expected:any
  ){

    VerifyResponseBody.verifySuccessMessage(body);

    const response = body.response;

    VerifyResponseBody.verifyId(response);


    this.verifyBookFields(
      response,
      expected
    );

    expect(Boolean(response.status))
  .toBe(expected.status);

    this.verifyDateFormat(
      response,
      expected
    );

    this.verifyImage(response);

  }

  static verifyGetBook(
    body:any,
    expected:any
  ){

    this.verifyCreateBook(
      body,
      expected
    );

  }

  static verifyUpdateBook(
    body:any,
    expected:any
  ){

    this.verifyCreateBook(
      body,
      expected
    );

  }

  static verifyDeleteBook(body:any){

    VerifyResponseBody.verifySuccessMessage(body);

    VerifyResponseBody.verifyId(
      body.response
    );
  }

  static verifyGetAfterDeleteBook(body:any){

    VerifyResponseBody.verifyNotFound(
      body,
      'No book found with the submitted id'
    );
  }

}