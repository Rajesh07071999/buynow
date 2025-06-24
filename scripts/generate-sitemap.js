// scripts/generate-sitemap.js
import fs from 'fs';

const baseUrl = 'https://buynow-neon.vercel.app';

// ✅ Only list public routes you want to show up in search
const pages = [
  '',
  'register',
  'login',
  'home',
  'profile',
  'cart',
  'dashboard',
  'order',
  'order-confirmation',
  

  // Add more *public* pages if you have them
];

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page ? '/' + page : '/'}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

fs.writeFileSync('public/sitemap.xml', sitemapContent.trim());
console.log('✅ sitemap.xml generated successfully.');
