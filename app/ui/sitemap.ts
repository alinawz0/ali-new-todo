import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://ali-new-todo.vercel.app',
      lastModified: new Date(),
    },
  ]
}