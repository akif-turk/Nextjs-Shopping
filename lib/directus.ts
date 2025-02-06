import { APIURL } from '@/constans';
import { createDirectus, rest } from '@directus/sdk';

const directus = createDirectus(APIURL).with(
  rest({
    onRequest: (options) => ({ ...options, cache: 'no-store' }),
  })
);

export default directus;
