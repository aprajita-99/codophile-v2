/* eslint-disable @typescript-eslint/no-var-requires */

const algoliaModule = require("algoliasearch");

const algoliasearch =
  algoliaModule.default ??
  algoliaModule.algoliasearch ??
  algoliaModule;

export const algoliaClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_KEY
);

export const ALGOLIA_INDEX_NAME = process.env.ALGOLIA_INDEX_NAME!;