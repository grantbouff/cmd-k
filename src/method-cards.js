import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(CustomEase, ScrollTrigger); 

document.addEventListener('DOMContentLoaded', () => {

    const isMobile = window.matchMedia("(max-width: 767px)");
    const methodContainer = document.querySelector(".section_method .container-large");
    const methodWrapper = document.querySelector(".method_wrapper");

    CustomEase.create("easeSnap", "M0,0 C0.155,-0.11 0.319,-0.022 0.411,0.169 0.457,0.266 0.553,0.789 0.615,1 0.652,1.127 0.988,1.12 1,1 ");

      
    if (isMobile.matches) {
        // Mobile animations here
        gsap.fromTo(methodWrapper, 
          {
            y: "50%"
          },
          { 
            y: "0%",
            ease: "none",
            scrollTrigger: {
              trigger: methodContainer,
              start: "top bottom",
              end: "bottom bottom",
              scrub: 1
            }
          }
        );

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: methodContainer,
            markers: true,
            id: "mobile-intro-card",
            start: "top 15%", 
            end: "center 15%",    
            pin: true,
            pinSpacing: true,       
            scrub: 1 
          },
        });

        tl.from("[intro-card-bg]", {
          scaleY: 2.5,
          // y: "25%",
          transformOrigin: "top center",
          duration: .5,
          ease: "power1.out"
        });

        tl.from("[intro-child]", {
          y: "75%",
          // scaleY: .5,
          opacity: 0,
          duration: .5,
          // stagger: 0.05,
          ease: "power1.out"
        }, "<15%");

        // Get all the method cards
        const methodCards = Array.from(document.querySelectorAll("[id^='mc']")).filter(card => card.id !== "mc-intro");

        // Function to get the computed visual order
        function getVisualOrder() {
          const cardsWithPositions = Array.from(methodCards).map(card => {
            const rect = card.getBoundingClientRect();
            return {
              element: card,
              id: card.id,
              x: rect.left + rect.width / 2,
              y: rect.top + rect.height / 2
            };
          });
          
          // Sort cards by vertical position (top to bottom)
          // then by horizontal position (left to right) within each row
          return cardsWithPositions.sort((a, b) => {
            const rowThreshold = 50;
            
            if (Math.abs(a.y - b.y) < rowThreshold) {
              return a.x - b.x; // Sort by horizontal position
            }
            // Otherwise sort by vertical position
            return a.y - b.y;
          });
        }

        // Get cards in their visual order
        const visualOrderCards = getVisualOrder();
        console.log("Visual order of cards:", visualOrderCards.map(card => card.id));

        // Animate each card in the visual order

        visualOrderCards.forEach((card, index) => {

          const startOffset = index === 0 ? "-=85%" : "-=85%"; // First card starts very early, all others start after the previous one

          gsap.set(card.element, {
            y: "100%",
            opacity: 0,
            // scale: 0.8,
            transformOrigin: "top center"
          });
        
          tl.to(card.element, {
            y: 0,
            opacity: 1,
            duration: .5,
            ease: "power1.out"
          }, startOffset);
        }
        );

    } else {
        // Desktop animations here
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: methodContainer,
            markers: true,
            start: "35% center", 
            end: "+=100%",    
            pin: true,        
            scrub: 2,         
            pinSpacing: true
            // pinReparent: true   
          },
        });
    
        gsap.from(methodWrapper, {
          scrollTrigger: {
            trigger: methodContainer,
            start: "top bottom",
            end: "bottom top",
            scrub: 4,
          },
          y: "-10%",  
          ease: "none"
        });
        
        tl.from("#mc-intro", {
          border: ".25px",
          scale: 2.25,
          y: "25%",
          transformOrigin: "center center",
          duration: 1.5,
          ease: "easeSnap"
        });
    
        tl.from("[intro-child]", {
          y: "100%",
          scale: 0.95,
          opacity: 0,
          duration: 0.5,
          stagger: 0.125,
          // ease: "snapIn"
        }, "<50%");
        
        // Create an array of card IDs and random rotations
        const cards = Array.from({ length: 9 }, (_, i) => `#mc${i+1}`);
        const randomRotations = cards.map(() => gsap.utils.random(-20, 20));
        
        // Card-specific animation configurations
        const cardConfigs = [
          {id: "#mc1", startX: "100%", startY: "100%"},
          {id: "#mc2",startX: "0%", startY: "100%" },
          {id: "#mc3", startX: "-100%", startY: "100%"},
          {id: "#mc4", startX: "100%", startY: "0%" },
          {id: "#mc5", startX: "-100%", startY: "0%" },
          {id: "#mc6", startX: "100%", startY: "-100%" },
          {id: "#mc7", startX: "50%", startY: "-100%" },
          {id: "#mc8", startX: "0%", startY: "-100%" },
          {id: "#mc9", startX: "-100%", startY: "-100%" }
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
    }
});

  