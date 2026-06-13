import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, "..");

console.log("==========================================");
console.log("   PRODUCTION LAUNCH & SEO AUDIT SYSTEM   ");
console.log("==========================================");

let success = true;
const errors = [];
const warnings = [];

// 1. Verify Build Output Directory
const distDir = path.join(rootDir, "dist");
if (!fs.existsSync(distDir)) {
  errors.push("Production output directory 'dist/' does not exist. Run 'npm run build' first.");
  success = false;
} else {
  console.log("✔ [Vite Build] Verified production 'dist/' directory output exists.");
}

// 2. Verify robots.txt exists
const publicRobots = path.join(rootDir, "public", "robots.txt");
const distRobots = path.join(rootDir, "dist", "robots.txt");

if (!fs.existsSync(publicRobots)) {
  errors.push("Missing robots.txt in public/ directory.");
  success = false;
} else if (!fs.existsSync(distRobots)) {
  errors.push("Missing robots.txt in production dist/ directory.");
  success = false;
} else {
  const content = fs.readFileSync(distRobots, "utf8");
  if (!content.includes("Sitemap: https://www.batterybx.com/sitemap.xml")) {
    warnings.push("robots.txt does not contain sitemap index reference pointing to www.batterybx.com");
  } else {
    console.log("✔ [Robots.txt] Verified robots.txt exists and contains correct sitemap pointers.");
  }
}

// 3. Verify sitemaps
const sitemapFiles = [
  "sitemap.xml",
  "sitemap-main.xml",
  "sitemap-jeddah.xml",
  "sitemap-makkah.xml",
  "sitemap-services.xml"
];

sitemapFiles.forEach(sitemap => {
  const pubPath = path.join(rootDir, "public", sitemap);
  const dstPath = path.join(rootDir, "dist", sitemap);

  if (!fs.existsSync(pubPath)) {
    warnings.push(`Missing /public/${sitemap}`);
  }
  if (!fs.existsSync(dstPath)) {
    errors.push(`Missing production resource: /dist/${sitemap}`);
    success = false;
  }
});

if (success) {
  console.log("✔ [Sitemaps] Verified all sitemaps are copied to production output directory.");
}

// 4. Verify canonical domain and check for localhost references in build files
if (fs.existsSync(distDir)) {
  const scanDirSync = (dir) => {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        scanDirSync(fullPath);
      } else if (file.endsWith(".js") || file.endsWith(".html") || file.endsWith(".json") || file.endsWith(".css")) {
        const content = fs.readFileSync(fullPath, "utf8");
        
        // Check for localhost / 127.0.0.1 in URLs
        if (content.includes("http://localhost") || content.includes("https://localhost") || content.includes("http://127.0.0.1")) {
          // Find the matching lines for context logging
          const lines = content.split("\n");
          lines.forEach((line, index) => {
            if (line.includes("localhost") || line.includes("127.0.0.1")) {
              // Ignore benign patterns e.g. dev comments or server logs
              if (!line.includes("console.log") && !line.includes("Vite") && !line.includes("HMR")) {
                errors.push(`Forbidden localhost reference found in ${path.relative(rootDir, fullPath)} line ${index + 1}: ${line.trim().substring(0, 100)}`);
                success = false;
              }
            }
          });
        }
        
        // Verify canonical rules and ensure they don't point to subdomains or staging
        if (file.endsWith(".html") && content.includes("<link rel=\"canonical\"")) {
          if (!content.includes("https://www.batterybx.com")) {
            errors.push(`Canonical URL in ${path.relative(rootDir, fullPath)} points to invalid domain.`);
            success = false;
          }
        }
      }
    });
  };

  try {
    scanDirSync(distDir);
  } catch (err) {
    errors.push(`Error scanning build files: ${err.message}`);
    success = false;
  }
}

// Summary and exit code setup
console.log("\n==========================================");
console.log("              AUDIT SUMMARY               ");
console.log("==========================================");
if (warnings.length > 0) {
  console.log("\nWarnings:");
  warnings.forEach(w => console.log(`[!] ${w}`));
}

if (!success) {
  console.error("\n❌ AUDIT FAILED! The following critical blockers were discovered:");
  errors.forEach(e => console.error(` - ${e}`));
  console.log("\nFix these issue before continuing with deployment.");
  process.exit(1);
} else {
  console.log("\n✨ ALL GREEN! Production build is verified and ready for deployment.");
  process.exit(0);
}
