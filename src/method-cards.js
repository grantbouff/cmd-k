import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(CustomEase, ScrollTrigger); 

document.addEventListener("DOMContentLoaded", function() {
    
    const methodContainer = document.querySelector(".section_method .container-large");
    const methodWrapper = document.querySelector(".method_wrapper");

    CustomEase.create("easeSnap", "M0,0 C0.155,-0.11 0.319,-0.022 0.411,0.169 0.457,0.266 0.553,0.789 0.615,1 0.652,1.127 0.988,1.12 1,1 ");

    // Initialize the timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: methodContainer,
        markers: true,
        start: "45% center", 
        end: "+=100%",    
        pin: true,        
        scrub: 2,         
        pinSpacing: true,
        pinReparent: true   
      },
    });

    gsap.from(methodWrapper, {
        scrollTrigger: {
          trigger: methodContainer,
          start: "top bottom",
          end: "bottom top",
          scrub: 4,
        },
        y: "20%",  // Start from 20% down and move up
        ease: "none"
      });
    
    
    tl.fromTo("#mc-intro", 
      {
        scale: 2.25,
        y: "25%",
        transformOrigin: "center center"
      },
      {
        scale: 1,
        y: "0%",
        duration: 1.5,
        ease: "easeSnap" 
      }
    );

    tl.fromTo("[intro-child]", 
        {
          y: "100%",
          scale: 0.95,
          opacity: 0
        },
        {
          y: "0%",
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.125,
        //   ease: "snapIn"
        }, 
        "<50%" 
      );
    
    // Get reference to the center element
    const centerElement = document.querySelector("#mc-intro");
    const cards = Array.from({ length: 9 }, (_, i) => `#mc${i+1}`);
    const randomRotations = cards.map(() => gsap.utils.random(-20, 20));
    
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

      const startOffset = index === 0 ? "-=100%" : // First card starts very early
                                        "<1%";  // All other cards start after the previous one
      
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
        duration: 1.5,
        stagger:{ 
            from: "random",
            amount: 5,
            },
        ease: "easeSnap" // Using our snap effect
      }, startOffset);
    });
    
  });