import { faker } from '@faker-js/faker';
import { BookingCreateRequest } from './BookingCreateRequest';

export class BookingBuilder {

  static getDataToCreateBooking(): BookingCreateRequest {
    return {
      firstname: 'Bindz',
      lastname: 'Dang',
      totalprice: faker.number.int({ min: 100, max: 2000 }),
      depositpaid: true,
      bookingdates: {
        checkin: faker.date.future().toISOString().split('T')[0] ?? '',
        checkout: faker.date.future().toISOString().split('T')[0] ?? '',
      },
      additionalneeds: 'Breakfast'
    };
  }

  static getDataToUpdateBooking(): BookingCreateRequest {  // ← bỏ Partial<>
    return {
      firstname: 'Bindz Updated',
      lastname: 'Dang Updated',
      totalprice: faker.number.int({ min: 100, max: 2000 }),
      depositpaid: false,
      bookingdates: {
        checkin: faker.date.future().toISOString().split('T')[0] ?? '',
        checkout: faker.date.future().toISOString().split('T')[0] ?? '',
      },
      additionalneeds: 'Dinner',
    };
  }
}
