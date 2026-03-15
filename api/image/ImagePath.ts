// api/image/ImagePath.ts
import path from 'path';

export class ImagePath {

  static createImage(): string {
    return path.resolve('test_data/UK.jpg');
  }

  static UpdateImage(): string {
    return path.resolve('test_data/sample_image.jpg');
  }
}