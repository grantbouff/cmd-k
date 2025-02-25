/* features.js - Generated 2025-02-25T10:21:56.747Z */

/* File: services-cascade.js */
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
          
            // Step 1: Fade + move in (first 30% of scroll)
            servicesTimeMobile.fromTo(
              card, 
              { y: "25%", scale: 0.9, opacity: 0 },
              { y: "0%", scale: 1, opacity: 1, ease: "power2.out" },
              "0%" // Start at the beginning of the timeline
            );
          
            // Step 2: Hold the card in place (30% to 60% of scroll)
            servicesTimeMobile.to(
              card,
              { y: "-10%", scale: 0.95, opacity: 1 }, 
              "30%" // Hold animation at 30% of the scroll duration
            );
          
            // Step 3: Fade + move out (60% to 100% of scroll)
            servicesTimeMobile.to(
              card,
              { y: "-15%", scale: 0.85, opacity: 0, ease: "none" },
              "60%" // Start fading out at 60% of the scroll duration
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
              // rotate: 50,
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

