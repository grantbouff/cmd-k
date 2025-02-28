// Adapter to handle both development (npm) and production (CDN) environments
let gsapExports;

// For browser environment (production)
if (typeof window !== 'undefined' && window.gsap) {
  gsapExports = {
    gsap: window.gsap,
    ScrollTrigger: window.ScrollTrigger || {},
    CustomEase: window.CustomEase || {}
  };
  
  // Register plugins if available
  if (window.gsap) {
    if (window.ScrollTrigger) window.gsap.registerPlugin(window.ScrollTrigger);
    if (window.CustomEase) window.gsap.registerPlugin(window.CustomEase);
  }
} 
// For Node.js environment (development)
else {
  try {
    const gsap = require('gsap');
    const ScrollTrigger = require('gsap/ScrollTrigger').ScrollTrigger;
    const CustomEase = require('gsap/CustomEase').CustomEase;
    
    gsapExports = { gsap, ScrollTrigger, CustomEase };
    
    // Register plugins
    gsap.registerPlugin(ScrollTrigger, CustomEase);
  } catch (e) {
    console.warn("GSAP modules not found during build. This is expected during the build process.");
    // Provide dummy implementations for build process
    gsapExports = {
      gsap: { registerPlugin: () => {} },
      ScrollTrigger: {},
      CustomEase: {}
    };
  }
}

export const { gsap, ScrollTrigger, CustomEase } = gsapExports;