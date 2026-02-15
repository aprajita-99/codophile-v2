import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Codophile - Visual CSS Playground & Tailwind Generator',
    short_name: 'Codophile',
    description: 'Master CSS through real-time experimentation. Control properties visually, see instant changes, and generate production-ready CSS & Tailwind code.',
    start_url: '/',
    display: 'standalone',
    background_color: '#030014',
    theme_color: '#030014',
    icons: [
      {
        src: '/logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
