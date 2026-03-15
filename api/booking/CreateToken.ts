// api/LoginBuilder.ts
import { ConfigsBooking } from '../common/ConfigsBooking';
import { CreateBooking } from './CreateBooking';

export class CreateToken {
  static getDataCreateToken(): CreateBooking {
    return {
      username: ConfigsBooking.USERNAME,
      password: ConfigsBooking.PASSWORD,
    };
  }
}
