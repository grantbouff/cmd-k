import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
gsap.registerPlugin(CustomEase); 

document.addEventListener("DOMContentLoaded", function() {

    
    
    // Initialize the timeline
    const tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".method_wrapper",
        start: "20% 100%",
        end: "bottom 120%",
        scrub: 2,
        markers: true,
        }
    });
    
    // Animation for mc-intro
    tl.fromTo("#mc-intro", 
      {
        scale: 2.25,
        transformOrigin: "center center"
      },
      {
        scale: 1,
        duration: 6,
        ease: CustomEase.create("custom", "M0,0 C0.155,-0.11 0.319,-0.022 0.411,0.169 0.457,0.266 0.553,0.789 0.615,1 0.652,1.127 0.988,1.12 1,1 ")
      }
    );
    
    
    // Get reference to the center element (either use mc-intro or any other reference point)
    const centerElement = document.querySelector("#mc-intro");
    const cards = Array.from({ length: 9 }, (_, i) => `#mc${i+1}`);
    const randomRotations = cards.map(() => gsap.utils.random(-20, 20));

    ease: CustomEase.create("snapEase", "M0,0 C0.029,0.684 0.568,1.003 0.702,1.076 0.876,1.17 1,1.13 1,1 ");
    
    // Card-specific animation configurations
    const cardConfigs = [
      { 
        id: "#mc1", 
        startX: "100%",    
        startY: "100%"
      },
      { 
        id: "#mc2", 
        startX: "0%",    
        startY: "100%" 
      },
      { 
        id: "#mc3", 
        startX: "-100%",    
        startY: "100%"
      },
      { 
        id: "#mc4", 
        startX: "100%",    
        startY: "0%" 
      },
      { 
        id: "#mc5", 
        startX: "-100%",    
        startY: "0%" 
      },
      { 
        id: "#mc6", 
        startX: "100%",    
        startY: "-100%" 
      },
      { 
        id: "#mc7", 
        startX: "50%",    
        startY: "-100%" 
      },
      { 
        id: "#mc8", 
        startX: "0%",    
        startY: "-100%" 
      },
      { 
        id: "#mc9", 
        startX: "-100%",    
        startY: "-100%" 
      }
    ];
    
    // Animate each card individually with their specific configurations
    cardConfigs.forEach((card, index) => {
        const element = document.querySelector(card.id);
        if (!element) return;
      
    
      gsap.set(element, {
        x: card.startX,
        y: card.startY,
        opacity: 0,
        scale: 0.8,
        rotation: randomRotations[index],
        transformOrigin: "top center"
      });
      
      // Add to timeline
      tl.to(card.id, {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 6,
        ease: "snapEase"
      }, `<+ 0.1`);
    });
    
  });