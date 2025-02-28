// bundle.js - Save this in your project root
const fs = require('fs');
const path = require('path');

// Define ONLY the files you want to include in your bundles
const bundles = {
  'home.js': [
    'init.js', // Add this new initialization file first
    'gsap-split-text.js',
    'projects-slider.js',
    'services-cascade.js',
    'benefits-simple-slide.js',
    'check-box-logic.js',
    'method-cards.js',
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
  
  // Add debug console log to track bundle loading
  bundleContent += `console.log("${bundleName} bundle loaded");\n\n`;
  
  // Add namespace and initialization object
  bundleContent += `// Initialize namespace\n`;
  bundleContent += `window.CMD_K = window.CMD_K || {};\n`;
  bundleContent += `window.CMD_K.components = {};\n\n`;
  
  fileList.forEach(fileName => {
    const filePath = path.join(srcDir, fileName);
    if (fs.existsSync(filePath)) {
      // Add debug console log for each individual file
      bundleContent += `/* File: ${fileName} */\n`;
      bundleContent += `console.log("Loading ${fileName}");\n`;
      
      // Wrap the file content in an IIFE to prevent variable conflicts
      bundleContent += `(function() {\n`;
      
      const content = fs.readFileSync(filePath, 'utf8');
      bundleContent += content;
      
      bundleContent += `\n})();\n\n`;
    } else {
      console.error(`Warning: File not found: ${filePath}`);
      // Add a note in the bundle about the missing file
      bundleContent += `/* Warning: File ${fileName} not found */\n`;
      bundleContent += `console.error("Missing file: ${fileName}");\n\n`;
    }
  });
  
  // Add initialization call at the end
  bundleContent += `\n// Initialize all components when DOM is ready\n`;
  bundleContent += `if (document.readyState === 'loading') {\n`;
  bundleContent += `  document.addEventListener('DOMContentLoaded', function() {\n`;
  bundleContent += `    console.log("DOM ready, initializing components");\n`;
  bundleContent += `    if (window.CMD_K && window.CMD_K.init) {\n`;
  bundleContent += `      window.CMD_K.init();\n`;
  bundleContent += `    }\n`;
  bundleContent += `  });\n`;
  bundleContent += `} else {\n`;
  bundleContent += `  // DOM already loaded\n`;
  bundleContent += `  console.log("DOM already loaded, initializing components");\n`;
  bundleContent += `  if (window.CMD_K && window.CMD_K.init) {\n`;
  bundleContent += `    window.CMD_K.init();\n`;
  bundleContent += `  }\n`;
  bundleContent += `}\n`;
  
  // Write bundle to disk
  fs.writeFileSync(path.join(distDir, bundleName), bundleContent);
  console.log(`Created bundle: ${bundleName}`);
});

console.log('All bundles created successfully!');