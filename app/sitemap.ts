import { MetadataRoute } from 'next';
import { playgroundData } from './playground/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://codophile.in";

  // Static routes
  const routes = [
    '',
    '/playground/css',
    '/playground/tailwind',
    '/about' // assuming about page exists as hinted by list_dir
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // CSS Playground routes
  const cssRoutes = Object.keys(playgroundData.css.properties).map((slug) => ({
    url: `${baseUrl}/playground/css/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Tailwind Playground routes
  const tailwindRoutes = Object.keys(playgroundData.tailwind.properties).map((slug) => ({
    url: `${baseUrl}/playground/tailwind/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...routes, ...cssRoutes, ...tailwindRoutes];
}
