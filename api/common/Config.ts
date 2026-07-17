// api/common/Config.ts
import fs from 'fs';
import path from 'node:path';

function loadConfig(fileName: string) {

  const configPath = path.resolve(
    process.cwd(),
    'test_data',
    'api',
    fileName
  );

  if (!fs.existsSync(configPath)) {
    throw new Error(
      `Config file not found: ${configPath}`
    );
  }

  return JSON.parse(
    fs.readFileSync(configPath, 'utf-8')
  );
}

const globalConfig =
  loadConfig('configs.json');

export const ConfigGlobal = {
  AUTHOR: globalConfig.AUTHOR,
  BASE_URL: globalConfig.BASE_URL,
  USERNAME: globalConfig.USERNAME,
  PASSWORD: globalConfig.PASSWORD,
} as const;