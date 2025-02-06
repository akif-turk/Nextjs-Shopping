import { APIURL } from '@/constans';
import { createDirectus, rest, staticToken } from '@directus/sdk';

const tokendirectus = (token: string) =>
  createDirectus(APIURL).with(staticToken(token)).with(rest());

export default tokendirectus;
