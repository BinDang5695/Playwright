import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import fs from 'fs';

export default class SchemaValidator {
  private static ajv = (() => {
    const ajv = new Ajv({ allErrors: true, strict: false });
    addFormats(ajv);
    return ajv;
  })();

  static validate(schemaPath: string, responseBody: any): void {
    const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
    const validate = this.ajv.compile(schema);

    const valid = validate(responseBody);
    if (!valid) {
      throw new Error(
        `❌ Schema validation failed:\n${JSON.stringify(validate.errors, null, 2)}`
      );
    }
  }
}
