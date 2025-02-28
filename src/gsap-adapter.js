// src/gsap-adapter.js
let gsapExports;

// For browser environment (production)
if (typeof window !== 'undefined' && window.gsap) {
  // Make sure ScrollTrigger is properly registered
  if (window.ScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);
  }
  if (window.CustomEase) {
    window.gsap.registerPlugin(window.CustomEase);
  }
  
  gsapExports = {
    gsap: window.gsap,
    ScrollTrigger: window.ScrollTrigger,
    CustomEase: window.CustomEase
  };
} 
// For Node.js environment (development) - silently create placeholders
else {
  gsapExports = {
    gsap: { registerPlugin: () => {} },
    ScrollTrigger: { 
      getAll: () => [],
      create: () => {},
      refresh: () => {},
      kill: () => {}
    },
    CustomEase: {
      create: () => {}
    }
  };
}

export const { gsap, ScrollTrigger, CustomEase } = gsapExports;