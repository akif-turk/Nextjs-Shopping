import tokendirectus from '@/lib/tokendirectus';
import { deleteItems } from '@directus/sdk';

export const deleteFromCart = async (user_id: string, token: string) => {
  const directus = tokendirectus(token);
  const response = await directus.request(
    deleteItems('cart', {
      filter: {
        user_id: { _eq: user_id },
      },
    })
  );

  return response;
};
