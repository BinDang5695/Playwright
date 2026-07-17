import { faker } from '@faker-js/faker';
import type { User } from '@models/types/api/user.model';

export const userData: {
  create: User;
  update: Partial<User>;
} = {

  create: {
    username: `bin_user_${faker.number.int({ min: 1000, max: 9999 })}`,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.helpers.replaceSymbols('Bin@###'),
    phone: `0${faker.number.int({ min: 100000000, max: 999999999 })}`,
    userStatus: 1,
  },

  update: {
    username: `bin_update_user_${faker.number.int({ min: 1000, max: 9999 })}`,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.helpers.replaceSymbols('Bin@###'),
    phone: `0${faker.number.int({ min: 100000000, max: 999999999 })}`,
    userStatus: 1,
  },

};