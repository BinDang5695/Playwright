// utils/ConfigLoader.ts
import fs from 'fs';
import path from 'path';

export function loadConfig(fileName: string) {
  const configPath = path.resolve(process.cwd(), 'test_data', fileName);

  if (!fs.existsSync(configPath)) {
    throw new Error(`Config file not found: ${configPath}`);
  }

  console.log('Loading config:', configPath);

  return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
}