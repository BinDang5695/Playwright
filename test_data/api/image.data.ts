import type { Image } from '@models/types/api/image.model';
import path from 'node:path';

export const imageData: {
  create: Image;
  update: Image;
} = {

  create: {
    file: path.resolve(
      'test_data/UK.jpg'
    ),
  },

  update: {
    file: path.resolve(
      'test_data/sample_image.jpg'
    ),
  },

};