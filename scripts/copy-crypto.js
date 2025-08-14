const fs = require("fs");
const path = require("path");

// Copy crypto-fix.js from src to dist
const srcPath = path.join(__dirname, "..", "src", "crypto-fix.js");
const distPath = path.join(__dirname, "..", "dist", "crypto-fix.js");

try {
  // Ensure dist directory exists
  const distDir = path.dirname(distPath);
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  // Copy the file
  fs.copyFileSync(srcPath, distPath);
  console.log("✅ crypto-fix.js copied successfully to dist folder");
} catch (error) {
  console.error("❌ Error copying crypto-fix.js:", error.message);
  process.exit(1);
}
