import fs from 'fs';
import path from 'path';

import content from '../public/contents/categories/content.js';

// Base URLs for different languages
const baseUrl = 'https://fahrettinrizaergin.com'

// Define routes for both languages
let routes = [
    '/',
    '/about',
    '/blogs',
    '/contact'
]

const paths = content['en']

paths.map(p => routes.push(`/blogs/${p.slug}`))


// Generate sitemap.xml for each language
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="URL_ADDRESS.sitemaps.org/schemas/sitemap/0.9">
    ${routes.map(route => `\n<url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
</url>`).join('')}
</urlset>`;
fs.writeFileSync(path.join(process.cwd(), `public/sitemap.xml`), sitemap);
 