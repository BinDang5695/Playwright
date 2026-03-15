import { faker } from '@faker-js/faker';
import { BookCreateRequest } from './BookCreateRequest';

export class BookBuilder {

  static getDataToCreateBook(): BookCreateRequest {
    return {
      name: `Bin Tester dz ${faker.number.int({ min: 1, max: 9999 })}`,
      category_id: 594,
      price: faker.number.int({ min: 1000, max: 100000 }),
      release_date: faker.date
        .future()
        .toISOString()
        .split('T')[0]!
        .replace(/-/g, '/'),
      image_ids: [76],
      status: true
    };
  }

static getDataToUpdateBook(): Partial<BookCreateRequest> {
  return {
    name: `Bin Updated Book ${faker.number.int({ min: 1, max: 9999 })}`,
    category_id: 594,
    release_date: faker.date
        .future()
        .toISOString()
        .split('T')[0]!
        .replace(/-/g, '/'),
    price: faker.number.int({ min: 1000, max: 99999 }),
    image_ids: [76],
    status: true
  };
}
}
