import type { PageLoad } from './$types';

export const load = (({params}) => {
  return {
    game: params.game
  };
}) satisfies PageLoad;