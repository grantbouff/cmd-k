const benefits = document.querySelector(".benefits_all-cards");
const benefitsWrapper = document.querySelector(".benefits_wrapper");
const cards = benefits.querySelectorAll('.benefits_card');
const benefitsTitle = document.querySelector("#benefit-title.global_section-title");
const animaStart = "clamp(top 100%)";

function getScrollAmount() {
  const initialOffset = benefits.getBoundingClientRect().x - benefitsWrapper.getBoundingClientRect()
    .x;
  const benefitsWidth = benefits.scrollWidth;
  const wrapperWidth = benefitsWrapper.offsetWidth;
  return -(benefitsWidth + initialOffset - wrapperWidth);
}

// Create a media query for 768px and above
const mediaQuery = window.matchMedia("(min-width: 768px)");

// function shouldPin() {
//     const scrollDistance = Math.abs(getScrollAmount());
//     const minScrollThreshold = window.innerWidth * 0.2;
//     return scrollDistance > minScrollThreshold;
// }



function initBenefitAnimations() {
    // Clear any existing ScrollTriggers
    ScrollTrigger.getAll().forEach(st => st.kill());
  
    // Title animation stays the same
    if (mediaQuery.matches && benefitsTitle) {
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
    }
  
    // Create a vertical scroll animation for the wrapper
    gsap.from(benefitsWrapper, {
      scrollTrigger: {
        trigger: benefitsWrapper,
        start: animaStart,
        end: "clamp(bottom 0%)",
        scrub: 1.5,
      },
      y: "20%",
      ease: "none"
    });
  
    // Create a timeline for both container and cards
    const distance = getScrollAmount();
    const tl = gsap.timeline({
      scrollTrigger: {
        // markers: true,
        trigger: benefitsWrapper,
        start: animaStart,
        end: window.innerWidth < 768 ? "top 20%" : "clamp(top 50%)",
        scrub: 1.5,
        invalidateOnRefresh: true
      }
    });

    // Add the animations to the timeline
    tl.to(benefits, {
      x: distance * 0.5, // Move container partially
      ease: window.innerWidth < 768 ? "back.in(1)" : "back.in(1.4)",
    })
    .to(cards, {
      x: distance * 0.5, // Complete the remaining distance with stagger
      ease: window.innerWidth < 768 ? "back.in(1)" : "back.in(1.4)",
      stagger: {
        each: 0.01,
        from: "start"
      }
    }, "<"); // The "<" makes this animation start at the same time as the previous one
}

// function initScrollAnimations() {
//     // Clear any existing ScrollTriggers
//     ScrollTrigger.getAll().forEach(st => st.kill());
  
//     // Title animation remains the same
//     if (mediaQuery.matches && benefitsTitle) {
//       gsap.to(benefitsTitle, {
//         scrollTrigger: {
//           trigger: benefitsWrapper,
//           start: "clamp(bottom 80%)",
//           end: "clamp(bottom 15%)",
//           scrub: {
//             ease: "power2.out",
//             duration: 4
//           },
//         },
//         y: "-300%"
//       });
//     }
  
//     // Calculate the total distance each card needs to move
//     const distance = getScrollAmount();
    
//     // Create a timeline for the cards
//     const tl = gsap.timeline({
//       scrollTrigger: {
//         markers: true,
//         trigger: benefitsWrapper,
//         start: "clamp(top 90%)",
//         end: `clamp(+=${Math.abs(distance)})`,
//         pin: false,
//         scrub: 2,
//         invalidateOnRefresh: true
//       }
//     });
  
//     // Animate each card with a stagger effect
//     tl.to(cards, {
//       x: distance,
//       ease: "back.inOut(1.4)",
//       stagger: {
//         each: 0.01, // Adjust this value to control the stagger amount
//         from: "start" // You can change this to "center" or "end"
//       }
//     });
//   }
// function initScrollAnimations() {
//   // Clear any existing ScrollTriggers
//   ScrollTrigger.getAll().forEach(st => st.kill());

//   // Only set up title animation if screen width is >= 768px
//   if (mediaQuery.matches && benefitsTitle) {
//     gsap.to(benefitsTitle, {
//       scrollTrigger: {
//         trigger: benefitsWrapper,
//         start: "clamp(bottom 80%)", // Starts slightly before the cards
//         end: "clamp(bottom 15%)", // Ends when cards begin
//         scrub: 1,
//       },
//       y: "-300%", // Adjust this value as needed
//       ease: "power2.out"
//     });
//   }


//   // Main cards animation
//   ScrollTrigger.create({
//     markers: true,
//     trigger: benefitsWrapper,
//     start: "clamp(bottom 80%)",
//     end: `clamp(+=${Math.abs(getScrollAmount())})`,
//     pin: shouldPin(),
//     scrub: 1,
//     invalidateOnRefresh: true,
//     animation: gsap.to(benefits, {
//       x: getScrollAmount,
//       ease: "none"
//     })
//   });

// }

// Initial setup

initBenefitAnimations();

// Re-init on screen size change
mediaQuery.addEventListener('change', initBenefitAnimations);