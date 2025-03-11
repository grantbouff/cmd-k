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
    
    // Get reference to the center element (either use mc-intro or any other reference point)
    const centerElement = document.querySelector("#mc-intro");
   
    // Create custom ease
    CustomEase.create("snapEase", "M0,0 C0.457,0.191 0.335,0.884 0.444,1.026 0.563,1.181 1,1.134 1,1");
    
    // Card-specific animation configurations
    const cardConfigs = [
      { 
        id: "#mc1", 
        startX: -150,    
        startY: -100,  
        rotation: gsap.utils.random(-25, -10),
        scale: 0.7,
        delay: 0.1,
        duration: 0.8,
        ease: "snapEase"
      },
      { 
        id: "#mc2", 
        startX: 200,
        startY: -50,
        rotation: gsap.utils.random(5, 15),
        scale: 0.65,
        delay: 0.2,
        duration: 0.75,
        ease: "power3.out"
      },
      { 
        id: "#mc3", 
        startX: -100,
        startY: 150,
        rotation: gsap.utils.random(-15, -5),
        scale: 0.8,
        delay: 0.15,
        duration: 0.9,
        ease: "snapEase"
      },
      { 
        id: "#mc4", 
        startX: 120,
        startY: 100,
        rotation: gsap.utils.random(10, 20),
        scale: 0.75,
        delay: 0.3,
        duration: 0.85,
        ease: "back.out(1.2)"
      },
      { 
        id: "#mc5", 
        startX: -180,
        startY: 50,
        rotation: gsap.utils.random(-20, -10),
        scale: 0.7,
        delay: 0.25,
        duration: 0.65,
        ease: "snapEase"
      },
      { 
        id: "#mc6", 
        startX: -160,
        startY: -120,
        rotation: gsap.utils.random(5, 15),
        scale: 0.25,
        delay: 0.12,
        duration: 0.7,
        ease: "power2.out"
      },
      { 
        id: "#mc7", 
        startX: -40,
        startY: -150,
        rotation: gsap.utils.random(-10, 0),
        scale: 0.72,
        delay: 0.32,
        duration: 0.75,
        ease: "snapEase"
      },
      { 
        id: "#mc8", 
        startX: -40,
        startY: -150,
        rotation: gsap.utils.random(-10, 0),
        scale: 0.72,
        delay: 0.32,
        duration: 0.75,
        ease: "snapEase"
      },
      { 
        id: "#mc9", 
        startX: 80,
        startY: 160,
        rotation: gsap.utils.random(0, 10),
        scale: 0.68,
        delay: 0.22,
        duration: 0.85,
        ease: "power4.out"
      }
    ];
    
    // Animate each card individually with their specific configurations
    cardConfigs.forEach(card => {
      const element = document.querySelector(card.id);
      if (!element) return; // Skip if element not found
      
      // Calculate the actual starting position
      const startX = card.startX; 
      const startY = card.startY;
      
      // Set the initial position relative to the center
      gsap.set(element, {
        x: startX,
        y: startY,
        opacity: 0.1,
        scale: card.scale,
        rotation: card.rotation,
        transformOrigin: "center center"
      });
      
      // Add to timeline
      tl.to(card.id, {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: card.duration,
        ease: card.ease
      }, `<+${card.delay}`);
    });
    
    // Optional: For debugging - add a marker at center point
    /*
    const marker = document.createElement('div');
    marker.style.position = 'absolute';
    marker.style.width = '10px';
    marker.style.height = '10px';
    marker.style.backgroundColor = 'red';
    marker.style.borderRadius = '50%';
    marker.style.zIndex = '9999';
    marker.style.left = `${centerX}px`;
    marker.style.top = `${centerY}px`;
    document.body.appendChild(marker);
    */
  });