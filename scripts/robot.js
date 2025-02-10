import fs from 'fs';
import path from 'path';

const robotsTxtContent = `User-agent: *
Allow: /
Sitemap: https://fahrettinrizaergin.com/sitemap.xml
`;


try {
    fs.writeFileSync(path.join(process.cwd(), `public/robots.txt`), robotsTxtContent);
    console.log('robots.txt file has been created successfully!');
} catch (error) {
    console.error('Error creating robots.txt:', error);
}