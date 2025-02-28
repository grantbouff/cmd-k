import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
gsap.registerPlugin(CustomEase); 

document.addEventListener("DOMContentLoaded", function() {

    
    // Initialize the timeline
    const tl = gsap.timeline({
      defaults: {
        ease: "power2.out", // Default easing for all animations
        duration: 0.8       // Default duration
      }
    });
    
    // Animation for mc-intro
    tl.fromTo("#mc-intro", 
      {
        opacity: 0,
        scale: 2,
        transformOrigin: "top center"
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power4.out"
      }
    );
    
    const cards = Array.from({ length: 8 }, (_, i) => `#mc${i+1}`);

    // Generate random rotation values between -20 and 20 degrees for each card
    const randomRotations = cards.map(() => gsap.utils.random(-20, 20));
    
    // Apply staggered animation to all cards
    tl.fromTo(cards, 
      {
        opacity: 0,
        scale: 0.8,
        rotation: (index) => randomRotations[index] // Start with slight rotation
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0, // Rotate to normal position
        duration: 0.7,
        stagger: 0.15, // Stagger each animation by 0.15 seconds
        ease: CustomEase.create("custom", "M0,0 C0.457,0.191 0.335,0.884 0.444,1.026 0.563,1.181 1,1.134 1,1 "),
      }
    );
    
    // Optional: Add scroll trigger functionality
    // Uncomment if you want animations to trigger on scroll
    /*
    gsap.registerPlugin(ScrollTrigger);
    
    ScrollTrigger.create({
      trigger: "#mc-intro",
      start: "top 80%",
      animation: tl
    });
    */
    
    // Optional: Control panel for adjusting animations
    // You can use this for testing and then apply the values directly in the code
    /*
    const controlPanel = {
      introOpacity: 1,
      introWidth: "100%",
      cardOpacity: 1,
      cardScale: 1,
      stagger: 0.2,
      ease: "back.out"
    };
    
    // Initialize control panel if dat.GUI is available
    if (typeof dat !== "undefined") {
      const gui = new dat.GUI();
      gui.add(controlPanel, "introOpacity", 0, 1, 0.1).onChange(updateAnimation);
      gui.add(controlPanel, "introWidth", ["60%", "80%", "100%"]).onChange(updateAnimation);
      gui.add(controlPanel, "cardOpacity", 0, 1, 0.1).onChange(updateAnimation);
      gui.add(controlPanel, "cardScale", 0.5, 1.5, 0.1).onChange(updateAnimation);
      gui.add(controlPanel, "stagger", 0, 0.5, 0.05).onChange(updateAnimation);
      gui.add(controlPanel, "ease", ["power1.out", "power2.out", "power3.out", "back.out", "elastic.out"]).onChange(updateAnimation);
    }
    
    function updateAnimation() {
      tl.clear();
      
      tl.fromTo("#mc-intro", 
        { opacity: 0, width: "60%" },
        { opacity: controlPanel.introOpacity, width: controlPanel.introWidth, duration: 1.2 }
      );
      
      tl.fromTo(Array.from({ length: 8 }, (_, i) => `#mc-${i+1}`), 
        { opacity: 0, scale: 0.8 },
        { opacity: controlPanel.cardOpacity, scale: controlPanel.cardScale, stagger: controlPanel.stagger, ease: controlPanel.ease }
      );
    }
    */
  });