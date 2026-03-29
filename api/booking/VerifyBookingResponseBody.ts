import { expect } from '@playwright/test';

export class VerifyBookingResponseBody {

  private static verifyBookingFields(booking: any, expected: any) {
    expect(booking.firstname).toBe(expected.firstname);
    expect(booking.lastname).toBe(expected.lastname);
    expect(booking.totalprice).toBe(expected.totalprice);
    expect(booking.depositpaid).toBe(expected.depositpaid);
  }

  private static verifyBookingDates(bookingdates: any, expected: any, normalize = false) {
    expect(typeof bookingdates.checkin).toBe('string');
    expect(typeof bookingdates.checkout).toBe('string');
    expect(bookingdates.checkin).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(bookingdates.checkout).toMatch(/^\d{4}-\d{2}-\d{2}$/);

    if (expected.bookingdates) {
      const checkin  = normalize ? expected.bookingdates.checkin.replace(/\//g, '-')  : expected.bookingdates.checkin;
      const checkout = normalize ? expected.bookingdates.checkout.replace(/\//g, '-') : expected.bookingdates.checkout;
      expect(bookingdates.checkin).toBe(checkin);
      expect(bookingdates.checkout).toBe(checkout);
    }
  }

  private static verifyAdditionalNeeds(booking: any, expected: any) {
    if (expected.additionalneeds) {
      expect(booking.additionalneeds).toBe(expected.additionalneeds);
    }
  }

  private static verifyBookingBody(body: any, expected: any) {
    this.verifyBookingFields(body, expected);
    expect(body).toHaveProperty('bookingdates');
    this.verifyBookingDates(body.bookingdates, expected);
    this.verifyAdditionalNeeds(body, expected);
  }

  static verifyCreateBooking(body: any, expected: any) {
    expect(body).toHaveProperty('bookingid');
    expect(typeof body.bookingid).toBe('number');
    expect(body.bookingid).toBeGreaterThan(0);
    expect(body).toHaveProperty('booking');

    this.verifyBookingFields(body.booking, expected);
    expect(body.booking).toHaveProperty('bookingdates');
    this.verifyBookingDates(body.booking.bookingdates, expected, true);
    this.verifyAdditionalNeeds(body.booking, expected);
  }

  static verifyGetBooking(body: any, expected: any) {
    this.verifyBookingBody(body, expected);
  }

  static verifyUpdatePartialBooking(body: any, expected: any) {
    this.verifyBookingBody(body, expected);
  }

  static verifyDeleteBooking(body: any) {
    expect(body).toBe('Created');
  }

  static verifyGetAfterDeleteBooking(body: any) {
    expect(body).toBe('Not Found');
  }
}