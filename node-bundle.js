// bundle.js - Save this in your project root
const fs = require('fs');
const path = require('path');

// Define ONLY the files you want to include in your bundles
// You can have multiple bundles even for a single page
// This way you can exclude any work-in-progress files
const bundles = {
  'home.js': [
    'benefits-simple-slide.js',
    'check-box-logic.js',
    'gsap-split-text.js',
    'projects-slider.js',
    'services-cascade.js'
    // Add only the files that are ready to be bundled
  ]
  
};

const srcDir = path.join(__dirname, 'src');
const distDir = path.join(__dirname, 'dist');

// Make sure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// Create each bundle
Object.keys(bundles).forEach(bundleName => {
  const fileList = bundles[bundleName];
  let bundleContent = `/* ${bundleName} - Generated ${new Date().toISOString()} */\n\n`;
  
  fileList.forEach(fileName => {
    const filePath = path.join(srcDir, fileName);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      bundleContent += `/* File: ${fileName} */\n`;
      bundleContent += content;
      bundleContent += '\n\n';
    } else {
      console.error(`Warning: File not found: ${filePath}`);
    }
  });
  
  // Write bundle to disk
  fs.writeFileSync(path.join(distDir, bundleName), bundleContent);
  console.log(`Created bundle: ${bundleName}`);
});

console.log('All bundles created successfully!');