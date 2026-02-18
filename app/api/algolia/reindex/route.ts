import { algoliaClient, ALGOLIA_INDEX_NAME } from "@/lib/algolia/client";
import { effectsData } from "@/app/effects/data";

export async function POST() {
  const records = effectsData.map((effect) => ({
    objectID: effect.id,
    title: effect.title,
    description: effect.description,
    keywords: effect.keywords,
    url: `/effects/${effect.id}`,
    type: "effect",
  }));

  await algoliaClient.saveObjects({
    indexName: ALGOLIA_INDEX_NAME,
    objects: records,
  });

  return Response.json({
    success: true,
    count: records.length,
  });
}