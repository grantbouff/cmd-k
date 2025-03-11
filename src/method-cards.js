import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(CustomEase, ScrollTrigger); 

document.addEventListener('DOMContentLoaded', () => {

    const isMobile = window.matchMedia("(max-width: 767px)");
    const methodContainer = document.querySelector(".section_method .container-large");
    const methodWrapper = document.querySelector(".method_wrapper");

    CustomEase.create("easeSnap", "M0,0 C0.321,0.079 0.438,0.613 0.5,1 0.526,1.165 1,1.137 1,1 ");

      
    if (isMobile.matches) {
        // Mobile animations here

        // // Background parallax effect (separate from the pinned timeline)
        // gsap.fromTo(methodWrapper, 
        //   {
        //     y: "50%"
        //   },
        //   { 
        //     y: "-5%",
        //     ease: "none",
        //     scrollTrigger: {
        //       trigger: methodContainer,
        //       start: "top bottom",
        //       end: "bottom bottom",
        //       scrub: 2
        //     }
        //   }
        // );

        // Create animation timeline separate from pin
        const tl = gsap.timeline({
          scrollTrigger: {
            // markers: true,
            trigger: methodContainer,
            id: "mobile-anima",
            start: "top 50%", 
            end: "+=50%",   // Match the pinned section's end
            // scrub: 1,
            toggleActions: "play none none reverse"  
          }
        });

        tl.from("[intro-card-bg]", {
          scaleY: 2,
          transformOrigin: "top center",
          duration: 1.25,
          ease: "power1.out"
        });

        tl.from("[intro-child]", {
          y: "75%",
          opacity: 0,
          duration: 1,
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
          const startOffset = index === 0 ? "-=75%" : "<5%"; 

          gsap.set(card.element, {
            y: "100%",
            opacity: 0,
            transformOrigin: "top center"
          });
        
          tl.to(card.element, {
            y: 0,
            opacity: 1,
            duration: 1.25,
            ease: "power1.out"
          }, startOffset);
        });
      

    } else {
        // Desktop animations here
        const tl = gsap.timeline({
          scrollTrigger: {
            // markers: true,
            trigger: methodContainer,
            start: "35% 80%", 
            end: "+=0%",  
            toggleActions: "play none none reverse"  
            // pin: true,        
            // scrub: 1,         
            // pinSpacing: true
            // pinReparent: true   
          },
        });
    
        gsap.from(methodWrapper, {
          scrollTrigger: {
            trigger: methodContainer,
            start: "top bottom",
            end: "bottom top",
            scrub: 3,
          },
          y: "10%",  
          ease: "none"
        });
        

        tl.from("[intro-card-bg]", {
          border: ".25px",
          scale: 2.025,
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
                amount: .5,
                },
            ease: "easeSnap" // Using our snap effect
          }, startOffset);
        });
    }
});

  