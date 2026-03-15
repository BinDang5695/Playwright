import { expect } from '@playwright/test';

export class VerifyBookingResponseBody {

  static verifyCreateBooking(body: any, expected: any) {
    expect(body).toHaveProperty('bookingid');
    expect(typeof body.bookingid).toBe('number');
    expect(body.bookingid).toBeGreaterThan(0);

    expect(body).toHaveProperty('booking');
    const booking = body.booking;

    expect(booking.firstname).toBe(expected.firstname);
    expect(booking.lastname).toBe(expected.lastname);
    expect(booking.totalprice).toBe(expected.totalprice);
    expect(booking.depositpaid).toBe(expected.depositpaid);

    expect(booking).toHaveProperty('bookingdates');
    const bookingdates = booking.bookingdates;

    expect(typeof bookingdates.checkin).toBe('string');
    expect(typeof bookingdates.checkout).toBe('string');

    expect(bookingdates.checkin).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(bookingdates.checkout).toMatch(/^\d{4}-\d{2}-\d{2}$/);

    if (expected.bookingdates) {
      expect(bookingdates.checkin).toBe(expected.bookingdates.checkin.replace(/\//g, '-'));
      expect(bookingdates.checkout).toBe(expected.bookingdates.checkout.replace(/\//g, '-'));
    }

    if (expected.additionalneeds) {
      expect(booking.additionalneeds).toBe(expected.additionalneeds);
    }
  }

  static verifyGetBooking(body: any, expected: any) {

    const bookingdates = body.bookingdates;

    expect(body.firstname).toBe(expected.firstname);
    expect(body.lastname).toBe(expected.lastname);
    expect(body.totalprice).toBe(expected.totalprice);
    expect(body.depositpaid).toBe(expected.depositpaid);

    expect(body).toHaveProperty('bookingdates');

    expect(typeof bookingdates.checkin).toBe('string');
    expect(typeof bookingdates.checkout).toBe('string');

    expect(bookingdates.checkin).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(bookingdates.checkout).toMatch(/^\d{4}-\d{2}-\d{2}$/);

    if (expected.bookingdates) {
      expect(bookingdates.checkin).toBe(expected.bookingdates.checkin);
      expect(bookingdates.checkout).toBe(expected.bookingdates.checkout);
    }

    if (expected.additionalneeds) {
      expect(body.additionalneeds).toBe(expected.additionalneeds);
    }
  } 
  
  static verifyUpdatePartialBooking(body: any, expected: any) {
    const bookingdates = body.bookingdates;

    expect(body.firstname).toBe(expected.firstname);
    expect(body.lastname).toBe(expected.lastname);
    expect(body.totalprice).toBe(expected.totalprice);
    expect(body.depositpaid).toBe(expected.depositpaid);

    expect(body).toHaveProperty('bookingdates');

    expect(typeof bookingdates.checkin).toBe('string');
    expect(typeof bookingdates.checkout).toBe('string');

    expect(bookingdates.checkin).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(bookingdates.checkout).toMatch(/^\d{4}-\d{2}-\d{2}$/);

    if (expected.bookingdates) {
      expect(bookingdates.checkin).toBe(expected.bookingdates.checkin);
      expect(bookingdates.checkout).toBe(expected.bookingdates.checkout);
    }

    if (expected.additionalneeds) {
      expect(body.additionalneeds).toBe(expected.additionalneeds);
    }
  }

  static verifyDeleteBooking(body: any, expected?: any) {
    expect(body).toBe('Created');
  }

  static verifyGetAfterDeleteBooking(body: any, expected?: any) {
    expect(body).toBe('Not Found');
  }  
  
}
