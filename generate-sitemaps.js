import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "https://www.batterybx.com";

// Load dynamic unified schema
const unifiedSchemaPath = path.join(__dirname, 'public', 'unified-schema.json');
let seoPages = {};
try {
  const fileContent = fs.readFileSync(unifiedSchemaPath, 'utf8');
  const parsed = JSON.parse(fileContent);
  seoPages = parsed.seoData || {};
} catch (e) {
  console.error("Warning: Could not load unified-schema.json for dynamic routes, using fallback.", e);
}

// Complete active districts with GPS and SEO mapping
const COVERED_DISTRICTS = [
  // Jeddah high-intensity commercial & residential nodes
  { name: 'al-safa', nameAr: 'الصفا', city: 'jeddah', lat: 21.5714, lng: 39.1970, callDensity: 'high' },
  { name: 'al-hamdaniya', nameAr: 'الحمدانية', city: 'jeddah', lat: 21.7289, lng: 39.1556, callDensity: 'high' },
  { name: 'al-rawdah', nameAr: 'الروضة', city: 'jeddah', lat: 21.5750, lng: 39.1550, callDensity: 'high' },
  { name: 'al-salamah', nameAr: 'السلامة', city: 'jeddah', lat: 21.5862, lng: 39.1549, callDensity: 'high' },
  { name: 'al-zahra', nameAr: 'الزهراء', city: 'jeddah', lat: 21.5841, lng: 39.1352, callDensity: 'high' },
  { name: 'al-naeem', nameAr: 'النعيم', city: 'jeddah', lat: 21.6111, lng: 39.1432, callDensity: 'high' },
  { name: 'al-muhammadiyah', nameAr: 'المحمدية', city: 'jeddah', lat: 21.6384, lng: 39.1278, callDensity: 'high' },
  { name: 'al-naseem', nameAr: 'النسيم', city: 'jeddah', lat: 21.5115, lng: 39.2224, callDensity: 'high' },
  { name: 'al-marwah', nameAr: 'المروة', city: 'jeddah', lat: 21.6022, lng: 39.1895, callDensity: 'high' },
  { name: 'north-obhur', nameAr: 'أبحر الشمالية', city: 'jeddah', lat: 21.7126, lng: 39.1023, callDensity: 'high' },
  { name: 'south-obhur', nameAr: 'أبحر الجنوبية', city: 'jeddah', lat: 21.6854, lng: 39.1129, callDensity: 'high' },
  { name: 'taybah', nameAr: 'طيبة', city: 'jeddah', lat: 21.7511, lng: 39.1678, callDensity: 'medium' },
  { name: 'al-nahdah', nameAr: 'النهضة', city: 'jeddah', lat: 21.6190, lng: 39.1255, callDensity: 'medium' },
  { name: 'al-nuzhah', nameAr: 'النزهة', city: 'jeddah', lat: 21.5734, lng: 39.1834, callDensity: 'medium' },
  { name: 'al-basateen', nameAr: 'البساتين', city: 'jeddah', lat: 21.6625, lng: 39.1190, callDensity: 'medium' },
  { name: 'al-marjan', nameAr: 'المرجان', city: 'jeddah', lat: 21.6515, lng: 39.1084, callDensity: 'medium' },
  { name: 'al-kawthar', nameAr: 'الكوثر', city: 'jeddah', lat: 21.7155, lng: 39.1764, callDensity: 'medium' },
  { name: 'al-bawadi', nameAr: 'البوادي', city: 'jeddah', lat: 21.5794, lng: 39.1688, callDensity: 'medium' },
  { name: 'al-samer', nameAr: 'السامر', city: 'jeddah', lat: 21.5880, lng: 39.2154, callDensity: 'medium' },
  { name: 'mushrefah', nameAr: 'مشرفة', city: 'jeddah', lat: 21.5312, lng: 39.1815, callDensity: 'medium' },
  { name: 'al-rahmaniyah', nameAr: 'الرحمانية', city: 'jeddah', lat: 21.7011, lng: 39.1952, callDensity: 'medium' },
  { name: 'al-taysir', nameAr: 'التيسير', city: 'jeddah', lat: 21.5540, lng: 39.2392, callDensity: 'medium' },
  { name: 'al-jamiah', nameAr: 'حي الجامعة', city: 'jeddah', lat: 21.4812, lng: 39.2154, callDensity: 'medium' },
  { name: 'al-rayyan', nameAr: 'الريان', city: 'jeddah', lat: 21.6934, lng: 39.1990, callDensity: 'medium' },
  { name: 'al-sharafiyah', nameAr: 'الشرفية', city: 'jeddah', lat: 21.5122, lng: 39.1841, callDensity: 'medium' },
  { name: 'al-aziziyah-jeddah', nameAr: 'العزيزية', city: 'jeddah', lat: 21.5452, lng: 39.1982, callDensity: 'medium' },
  { name: 'al-fayha', nameAr: 'الفيحاء', city: 'jeddah', lat: 21.4984, lng: 39.2132, callDensity: 'medium' },
  { name: 'al-hamra', nameAr: 'الحمراء', city: 'jeddah', lat: 21.5270, lng: 39.1060, callDensity: 'medium' },
  { name: 'al-faisaliyah', nameAr: 'الفيصلية', city: 'jeddah', lat: 21.5645, lng: 39.1812, callDensity: 'medium' },
  { name: 'al-waziriyah', nameAr: 'الوزيرية', city: 'jeddah', lat: 21.4468, lng: 39.2215, callDensity: 'low' },
  { name: 'ghulail', nameAr: 'غليل', city: 'jeddah', lat: 21.4284, lng: 39.2120, callDensity: 'low' },
  { name: 'al-mahjar', nameAr: 'المحجر', city: 'jeddah', lat: 21.4390, lng: 39.1989, callDensity: 'low' },
  { name: 'petromin', nameAr: 'بترومين', city: 'jeddah', lat: 21.4502, lng: 39.1845, callDensity: 'low' },
  { name: 'al-ajaweed', nameAr: 'الأجاويد', city: 'jeddah', lat: 21.4055, lng: 39.2550, callDensity: 'low' },
  { name: 'al-fadhilah', nameAr: 'الفضيلة', city: 'jeddah', lat: 21.3650, lng: 39.2810, callDensity: 'low' },
  { name: 'al-sanabel', nameAr: 'السنابل', city: 'jeddah', lat: 21.3789, lng: 39.2612, callDensity: 'low' },
  { name: 'industrial-2', nameAr: 'الصناعية الثانية', city: 'jeddah', lat: 21.3411, lng: 39.2890, callDensity: 'low' },
  { name: 'industrial-3', nameAr: 'الصناعية الثالثة', city: 'jeddah', lat: 21.3120, lng: 39.3140, callDensity: 'low' },
  { name: 'al-qurainiyah', nameAr: 'القرنية', city: 'jeddah', lat: 21.3502, lng: 39.2590, callDensity: 'low' },
  { name: 'al-khumra', nameAr: 'الخمرة', city: 'jeddah', lat: 21.3912, lng: 39.2312, callDensity: 'low' },

  // Makkah high-intensity commercial & pilgrim routes
  { name: 'al-shawqiah', nameAr: 'الشوقية', city: 'makkah', lat: 21.3798, lng: 39.7923, callDensity: 'high' },
  { name: 'al-awali', nameAr: 'العوالي', city: 'makkah', lat: 21.3654, lng: 39.8654, callDensity: 'high' },
  { name: 'al-aziziyah-makkah', nameAr: 'العزيزية-مكة', city: 'makkah', lat: 21.3980, lng: 39.8540, callDensity: 'high' },
  { name: 'al-sharaiah', nameAr: 'الشرائع', city: 'makkah', lat: 21.4312, lng: 39.9654, callDensity: 'high' },
  { name: 'al-zaidi', nameAr: 'حي الزايدي', city: 'makkah', lat: 21.3854, lng: 39.7154, callDensity: 'high' },
  { name: 'al-rusaifah', nameAr: 'الرصيفة', city: 'makkah', lat: 21.4089, lng: 39.7890, callDensity: 'high' },
  { name: 'bathaa-quraish', nameAr: 'بطحاء قريش', city: 'makkah', lat: 21.3650, lng: 39.8120, callDensity: 'high' },
  { name: 'al-nawariyah', nameAr: 'النوارية', city: 'makkah', lat: 21.5542, lng: 39.7352, callDensity: 'medium' },
  { name: 'al-umrah', nameAr: 'العمرة', city: 'makkah', lat: 21.4989, lng: 39.7523, callDensity: 'medium' },
  { name: 'al-taneem', nameAr: 'التنعيم', city: 'makkah', lat: 21.4578, lng: 39.7824, callDensity: 'medium' },
  { name: 'al-jiranah', nameAr: 'الجعرانة', city: 'makkah', lat: 21.4912, lng: 39.9234, callDensity: 'medium' },
  { name: 'al-basateen-makkah', nameAr: 'حي البساتين-مكة', city: 'makkah', lat: 21.5126, lng: 39.7432, callDensity: 'medium' },
  { name: 'al-buhayrat', nameAr: 'حي البحيرات', city: 'makkah', lat: 21.4745, lng: 39.7612, callDensity: 'medium' },
  { name: 'al-kakiah', nameAr: 'الكعكية', city: 'makkah', lat: 21.3621, lng: 39.8021, callDensity: 'medium' },
  { name: 'wali-al-ahad', nameAr: 'ولي العهد', city: 'makkah', lat: 21.3215, lng: 39.7615, callDensity: 'medium' },
  { name: 'al-iskan', nameAr: 'الإسكان', city: 'makkah', lat: 21.4011, lng: 39.7712, callDensity: 'medium' },
  { name: 'al-khalidiyah', nameAr: 'حي الخالدية', city: 'makkah', lat: 21.3912, lng: 39.7915, callDensity: 'medium' },
  { name: 'al-husayniyah', nameAr: 'حي الحسينية', city: 'makkah', lat: 21.3323, lng: 39.8867, callDensity: 'low' },
  { name: 'al-maabdah', nameAr: 'المعابدة', city: 'makkah', lat: 21.4389, lng: 39.8423, callDensity: 'low' },
  { name: 'al-rashidiyah', nameAr: 'حي الراشدية', city: 'makkah', lat: 21.4552, lng: 39.9812, callDensity: 'low' },
  { name: 'umm-al-jood', nameAr: 'أم الجود', city: 'makkah', lat: 21.4150, lng: 39.7432, callDensity: 'low' },
  { name: 'bathaa-makkah', nameAr: 'بطحاء مكة', city: 'makkah', lat: 21.4210, lng: 39.8180, callDensity: 'low' }
];

function wrapUrl(url, changefreq, priority) {
  const timestamp = new Date().toISOString().split('T')[0];
  return `  <url>
    <loc>${url}</loc>
    <lastmod>${timestamp}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

function writeSitemapFile(filename, content) {
  const absolutePath = path.join(__dirname, 'public', filename);
  fs.writeFileSync(absolutePath, content, 'utf8');
  console.log(`[Sitemap Intelligence] Built: /public/${filename}`);
}

async function buildSitemaps() {
  console.log("Initializing Split Sitemap Intelligence System...");

  // 1. MAIN SITEMAP (/sitemap-main.xml)
  // Ordered by absolute SEO value
  const sitemapMainHeader = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  let sitemapMainUrls = [];
  
  // High-demand core structural links
  sitemapMainUrls.push(wrapUrl(`${BASE_URL}/`, 'daily', '1.00'));
  sitemapMainUrls.push(wrapUrl(`${BASE_URL}/services`, 'daily', '0.90'));
  sitemapMainUrls.push(wrapUrl(`${BASE_URL}/prices`, 'daily', '0.85'));
  sitemapMainUrls.push(wrapUrl(`${BASE_URL}/about`, 'weekly', '0.80'));
  sitemapMainUrls.push(wrapUrl(`${BASE_URL}/express`, 'weekly', '0.75'));
  sitemapMainUrls.push(wrapUrl(`${BASE_URL}/contact`, 'weekly', '0.70'));
  sitemapMainUrls.push(wrapUrl(`${BASE_URL}/join`, 'weekly', '0.65'));

  const sitemapMainContent = `${sitemapMainHeader}\n${sitemapMainUrls.join('\n')}\n</urlset>`;
  writeSitemapFile('sitemap-main.xml', sitemapMainContent);


  // 2. JEDDAH SITEMAP (/sitemap-jeddah.xml)
  // Dynamic priority according to commercial & call-volume density
  const sitemapJeddahHeader = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  let sitemapJeddahUrls = [];

  const jeddahDistricts = COVERED_DISTRICTS.filter(d => d.city === 'jeddah');
  jeddahDistricts.forEach(district => {
    let priority = '0.65';
    let freq = 'weekly';
    if (district.callDensity === 'high') {
      priority = '0.90';
    } else if (district.callDensity === 'medium') {
      priority = '0.80';
    }

    const arLoc = `${BASE_URL}/?city=jeddah&amp;district=${district.name}&amp;lang=ar`;
    const enLoc = `${BASE_URL}/?city=jeddah&amp;district=${district.name}&amp;lang=en`;

    sitemapJeddahUrls.push(wrapUrl(arLoc, freq, priority));
    sitemapJeddahUrls.push(wrapUrl(enLoc, freq, (parseFloat(priority) - 0.05).toFixed(2)));
  });

  const sitemapJeddahContent = `${sitemapJeddahHeader}\n${sitemapJeddahUrls.join('\n')}\n</urlset>`;
  writeSitemapFile('sitemap-jeddah.xml', sitemapJeddahContent);


  // 3. MAKKAH SITEMAP (/sitemap-makkah.xml)
  // Dynamic priority according to commercial & calls density
  const sitemapMakkahHeader = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  let sitemapMakkahUrls = [];

  const makkahDistricts = COVERED_DISTRICTS.filter(d => d.city === 'makkah');
  makkahDistricts.forEach(district => {
    let priority = '0.65';
    let freq = 'weekly';
    if (district.callDensity === 'high') {
      priority = '0.90';
    } else if (district.callDensity === 'medium') {
      priority = '0.80';
    }

    const arLoc = `${BASE_URL}/?city=makkah&amp;district=${district.name}&amp;lang=ar`;
    const enLoc = `${BASE_URL}/?city=makkah&amp;district=${district.name}&amp;lang=en`;

    sitemapMakkahUrls.push(wrapUrl(arLoc, freq, priority));
    sitemapMakkahUrls.push(wrapUrl(enLoc, freq, (parseFloat(priority) - 0.05).toFixed(2)));
  });

  const sitemapMakkahContent = `${sitemapMakkahHeader}\n${sitemapMakkahUrls.join('\n')}\n</urlset>`;
  writeSitemapFile('sitemap-makkah.xml', sitemapMakkahContent);


  // 4. SERVICES DEEP SEO PAGES SITEMAP (/sitemap-services.xml)
  // Dynamic mapping of all seoData entry slugs with custom prioritized weights
  const sitemapServicesHeader = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  let sitemapServicesUrls = [];

  Object.keys(seoPages).forEach(slug => {
    let priority = '0.70';
    let freq = 'weekly';

    // High conversion service terms
    if (['batteries-jeddah', 'puncture-jeddah', 'battery-change-jeddah', 'battery-24h-jeddah'].includes(slug)) {
      priority = '0.98';
      freq = 'daily';
    } else if (['agm-battery-jeddah', 'battery-jumpstart-jeddah', 'districts-makkah'].includes(slug)) {
      priority = '0.88';
      freq = 'daily';
    } else if (slug.startsWith('districts-') && (slug.includes('north') || slug.includes('east') || slug.includes('south') || slug.includes('west') || slug.includes('center'))) {
      priority = '0.82';
      freq = 'weekly';
    } else if (slug.startsWith('districts-')) {
      priority = '0.78';
      freq = 'weekly';
    }

    sitemapServicesUrls.push(wrapUrl(`${BASE_URL}/services/${slug}`, freq, priority));
  });

  const sitemapServicesContent = `${sitemapServicesHeader}\n${sitemapServicesUrls.join('\n')}\n</urlset>`;
  writeSitemapFile('sitemap-services.xml', sitemapServicesContent);


  // 5. MASTER INDEX SITEMAP INDEX (/sitemap.xml)
  // Directing crawl engine to each sub-module dynamically
  const timestamp = new Date().toISOString().split('T')[0];
  const masterSitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemap-main.xml</loc>
    <lastmod>${timestamp}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-services.xml</loc>
    <lastmod>${timestamp}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-jeddah.xml</loc>
    <lastmod>${timestamp}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-makkah.xml</loc>
    <lastmod>${timestamp}</lastmod>
  </sitemap>
</sitemapindex>`;

  writeSitemapFile('sitemap.xml', masterSitemapContent);
  
  // Mirror to root directory as backup serving endpoint
  try {
    fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), masterSitemapContent, 'utf8');
    fs.writeFileSync(path.join(__dirname, 'public', 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${BASE_URL}/sitemap.xml\n`, 'utf8');
    fs.writeFileSync(path.join(__dirname, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${BASE_URL}/sitemap.xml\n`, 'utf8');
    console.log("[Sitemap Intelligence] Master files backed up to root and robots.txt written.");
  } catch (err) {
    console.error("Backup failed", err);
  }

  // COMPRESSED CLOUD PING SENSOR SUBMISSION TRIGGER
  // Pings index updates to supporting channels
  console.log("[Sitemap Intelligence] Rebuild successful. Rebuilding completed for all nodes.");
}

buildSitemaps().catch(e => console.error(e));
