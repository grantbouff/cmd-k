import "./benefits-simple-slide.js";
import "./check-box-logic.js";
import "./gsap-split-text.js";
import "./projects-slider.js";
import "./services-cascade.js";
import "./method-cards.js";
import "./footer-draggable.js";

import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {Draggable} from "gsap/Draggable";
import {CustomEase} from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable);
gsap.registerPlugin(CustomEase);


window.CMD_K = window.CMD_K || {};

// Simple initialization function that just checks dependencies
// and calls the code that's already in your other files
window.CMD_K.init = function() {
  console.log("Initializing CMD_K components");
  
  // Check for required dependencies
  if (typeof gsap === 'undefined') {
    console.error("GSAP is not loaded");
    return;
  }
  
  if (typeof ScrollTrigger === 'undefined' && gsap.ScrollTrigger === undefined) {
    console.error("ScrollTrigger is not loaded");
    return;
  }
  
  // The real initialization happens in your individual files
  // which will run as part of the bundled JS
  console.log("Dependencies loaded, individual components will initialize themselves");
};

// Call the initialization function when the page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', window.CMD_K.init);
} else {
  // If DOMContentLoaded has already fired
  window.CMD_K.init();
}