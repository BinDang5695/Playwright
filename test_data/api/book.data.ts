import { faker } from '@faker-js/faker';
import type { Book } from '@models/types/api/book.model';

export const bookData = {

  create(): Book {
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
      status: true,
    };
  },

  update(): Book {
    return {
      name: `Bin Updated Book ${faker.number.int({ min: 1, max: 9999 })}`,
      category_id: 594,
      price: faker.number.int({ min: 1000, max: 100000 }),
      release_date: faker.date
        .future()
        .toISOString()
        .split('T')[0]!
        .replace(/-/g, '/'),
      image_ids: [76],
      status: true,
    };
  },

};