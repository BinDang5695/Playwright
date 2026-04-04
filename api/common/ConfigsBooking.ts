// api/ConfigsBooking.ts
import { loadConfig } from '../common/ConfigLoader';

const config = loadConfig('configsbooking.json', 'api');

export const ConfigsBooking = {
  BASE_URL: config.BASE_URL_BOOKING,
  USERNAME: config.USERNAMEBOOKING,
  PASSWORD: config.PASSWORDBOOKING,
} as const;
