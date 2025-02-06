import tokendirectus from '@/lib/tokendirectus';
import { readItems } from '@directus/sdk';

export const getToCart = async (user_id: string, token: string) => {
  const directus = tokendirectus(token);
  const response = await directus.request(
    readItems('cart', {
      filter: {
        user_id: { _eq: user_id },
      },
    })
  );

  return response;
};
