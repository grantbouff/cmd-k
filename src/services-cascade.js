import { gsap } from "./gsap-adapter.js";

document.addEventListener('DOMContentLoaded', () => {
    const isMobile = window.matchMedia("(max-width: 479px)");
    
    if (isMobile.matches) {
      // Mobile animation - trigger each card individually
      gsap.utils.toArray(".services_card").forEach((card, index) => {
        let servicesTimeMobile = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            end: "bottom -20%",
            scrub: 1,
            // markers: true,
            id: `card-${index}`,
          }
        });
      
        servicesTimeMobile.fromTo(
          card, 
          { y: "25%", scale: 0.9, opacity: 0 },
          { y: "0%", scale: 1, opacity: 1, ease: "power2.out" },
          "0%" 
        );
      
        servicesTimeMobile.to(
          card,
          { y: "-10%", scale: 0.95, opacity: 1 }, 
          "30%" 
        );
      
        servicesTimeMobile.to(
          card,
          { y: "-15%", scale: 0.85, opacity: 0, ease: "none" },
          "60%" 
        );
      });
    } else {
      // Your existing desktop timeline
      let servicesTimeDesk = gsap.timeline({
        scrollTrigger: {
          trigger: ".section_services",
          start: "15% 80%",
          end: "90% 80%",
          scrub: 2,
          toggleActions: "play play reverse reset"
        }
      });

      servicesTimeDesk.from(".services_heading-wrapper", {
        y: "50%",
        opacity: 0,
        duration: 1
      });
      
      servicesTimeDesk.from(".services_card", {
          y: "50%",
          scale: .9,
          stagger: { amount: 5 },
          duration: 8,
          ease: "back.out(1)",
        },
        "<.25"
      );
      
      servicesTimeDesk.from(".services_technical-label", {
          y: "25%",
          opacity: 0,
          duration: 4
        },
        "<.75"
      );
    }
  });