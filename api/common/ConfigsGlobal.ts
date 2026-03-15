import { loadConfig } from '../common/ConfigLoader';

const config = loadConfig('configs.json');

export const ConfigsGlobal = {
  AUTHOR: config.AUTHOR,
  BASE_URL: config.BASE_URL,
  USERNAME: config.USERNAME,
  PASSWORD: config.PASSWORD,
} as const;
