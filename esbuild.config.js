const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

// Handle watch mode
const watch = process.argv.includes('--watch');

// Create build context
const buildOptions = {
  entryPoints: ['src/init.js'],
  bundle: true,
  outfile: 'dist/home-bundle.js',
  minify: !watch, // Don't minify in watch mode for easier debugging
  format: 'iife',
  target: ['es2015'],
  sourcemap: watch ? 'inline' : false,
  // Mark GSAP libraries as external to avoid bundling them
  external: ['gsap', 'gsap/ScrollTrigger', 'gsap/CustomEase'],
  banner: {
    js: `/* CMD-K Components - ${new Date().toISOString()}
 * This bundle expects GSAP to be loaded via CDN:
 * - https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.7/gsap.min.js
 * - https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.7/ScrollTrigger.min.js
 * - https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.7/CustomEase.min.js
 */
console.log("CMD-K bundle loaded - ${new Date().toISOString()}");
`,
  },
  define: {
    'process.env.NODE_ENV': watch ? '"development"' : '"production"'
  },
  loader: {
    '.js': 'jsx' // In case you use any JSX syntax
  }
};

// Create build
if (watch) {
  console.log('👀 Watching for changes...');
  
  esbuild.context(buildOptions).then(context => {
    context.watch();
  });
} else {
  console.log('🔨 Building production bundle...');
  
  esbuild.build(buildOptions).then(() => {
    // Ensure the dist directory exists
    const distDir = path.join(__dirname, 'dist');
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir);
    }
    
    console.log('✅ Build complete!');
  }).catch(err => {
    console.error('❌ Build failed:', err);
    process.exit(1);
  });
}