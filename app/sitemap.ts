import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.codophile.in";

  const playgroundRoutes = [
    "css",
    "tailwind",
    "effects",
    "backgrounds",
    "borders",
    "filters",
    "flexbox",
    "typography",
    "transitions",
    "text-shadow",
    "box-shadow",
    "backdrop-filter",
  ];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${baseUrl}/playground`,
      lastModified: new Date(),
      priority: 0.9,
    },
    ...playgroundRoutes.map((route) => ({
      url: `${baseUrl}/playground/${route}`,
      lastModified: new Date(),
      priority: 0.8,
    })),
  ];
}