import * as path from 'path';

export default class SystemHelper {

  static getCurrentDir(): string {
    return process.cwd();
  }

  static getFilePath(relativePath: string): string {
    return path.join(this.getCurrentDir(), relativePath);
  }
}
