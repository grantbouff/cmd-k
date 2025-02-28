import { gsap, ScrollTrigger, CustomEase } from "./gsap-adapter.js";

// Import all component modules
import "./benefits-simple-slide.js";
import "./check-box-logic.js";
import "./gsap-split-text.js";
import "./projects-slider.js";
import "./services-cascade.js";
import "./method-cards.js";

// Create namespace
window.CMD_K = window.CMD_K || {};

// Initialize function
window.CMD_K.init = function() {
  console.log("Initializing CMD_K components");
  
  // Check dependencies
  if (typeof gsap === 'undefined' || !gsap) {
    console.error("GSAP is not loaded. Please add the GSAP CDN to your page.");
    return;
  }
  
  if (typeof ScrollTrigger === 'undefined' && !gsap.ScrollTrigger) {
    console.error("ScrollTrigger is not loaded. Please add the ScrollTrigger CDN to your page.");
    return;
  }
  
  console.log("Dependencies loaded, individual components are initialized");
};

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', window.CMD_K.init);
} else {
  // If DOMContentLoaded has already fired
  window.CMD_K.init();
}

// Export common utilities for other modules to use
export { gsap, ScrollTrigger, CustomEase };