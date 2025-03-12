
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

  const isMobile = window.matchMedia("(max-width: 767px)");
  const benefitsSection = document.querySelector(".section_benefits");
  const benefitsWrapper = document.querySelector(".benefits_wrapper");
  const benefits = document.querySelector(".benefits_all-cards");
  const cards = benefits.querySelectorAll('.benefits_card');
  const benefitsTitle = document.querySelector("#benefit-title.global_section-title");
  const mobileStart = "bottom 90%";
  const mobileEnd = "+=50%";

  function getScrollAmount() {
    const initialOffset = benefits.getBoundingClientRect().x - benefitsWrapper.getBoundingClientRect()
      .x;
    const benefitsWidth = benefits.scrollWidth;
    const wrapperWidth = benefitsWrapper.offsetWidth;
    return -(benefitsWidth + initialOffset - wrapperWidth);
  }


  if (isMobile.matches) {
    // Mobile animations here

    // // Create a vertical scroll animation for the wrapper
    // gsap.fromTo(benefitsWrapper,
    //   {
    //     y: "20%"
    //   },
    //   { 
    //   y: "-5%",
    //   ease: "none",
    //   scrollTrigger: {
    //     trigger: benefitsSection,
    //     start: mobileStart,
    //     end: mobileEnd,
    //     scrub: 1,
    //   },
    // });

    // const distance = getScrollAmount();
    // const tl = gsap.timeline({
    //   scrollTrigger: {
    //     // markers: true,
    //     trigger: benefitsSection,
    //     start: mobileStart,
    //     end: mobileEnd,
    //     pin: true,        
    //     scrub: 1,         
    //     pinSpacing: true,
    //     invalidateOnRefresh: true
    //   }
    // });


    // // Add the animations to the timeline
    // tl.to(benefits, {
    //   x: distance * 0.7, // Move container partially
    //   ease: "power1.in",
    // })
    // .to(cards, {
    //   x: distance * 0.3, // Complete the remaining distance with stagger
    //   ease: "power1.in",
    //   stagger: {
    //     each: 0.01,
    //     from: "start"
    //   }
    // }, "<"); 



  } else {
    // Desktop animations here

    function benefitDesktop() {
      // Clear any existing ScrollTriggers
      ScrollTrigger.getAll().forEach(st => st.kill());
    
      gsap.to(benefitsTitle, {
        scrollTrigger: {
        // markers: true,
        trigger: benefitsWrapper,
        start: "clamp(top 90%)",
        end: "clamp(top 20%)",
        scrub: {
          ease: "power2.out",
          duration: .5
          }
        },
        y: "-300%",
        ease: "power2.out"
      });

      // Create a timeline for both container and cards
      const distance = getScrollAmount();
      const tl = gsap.timeline({
        scrollTrigger: {
          // markers: true,
          trigger: benefitsWrapper,
          start: "clamp(top 90%)",
          end: "top 30%",
          scrub: 1,
          invalidateOnRefresh: true
        }
      });

      // Add the animations to the timeline
      tl.to(benefits, {
        x: distance * 0.5, // Move container partially
        ease: "power1.in",
      })
      .to(cards, {
        x: distance * 0.5, // Complete the remaining distance with stagger
        ease: "power1.in",
        stagger: {
          each: 0.01,
          from: "start"
        }
      }, "<"); 
  }



  benefitDesktop();

  // Re-init on screen size change
  isMobile.addEventListener('change', benefitDesktop);

};


});