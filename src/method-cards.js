import { gsap } from "gsap";

document.addEventListener('DOMContentLoaded', function() {
  
    // Select the method intro card and small method cards
    const introCard = document.getElementById('mc5');
    const methodWrapper = document.querySelector('.method_wrapper');
    const smallCards = document.querySelectorAll('.method_card, .method_image');

    // Create a media query for 768px and above
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    function methodsAnimation() {
        const tl = gsap.timeline({
            scrollTrigger: {
                markers: true, 
                trigger: methodWrapper,
                start: "top 100%", 
                end: "center 20%",
                scrub: 1,
                anticipatePin: 1 // Helps with smoother pin initialization
            }
        });

        // Add the scaling animation to the timeline for the intro card
        tl.from(introCard, {
            scale: 2.25,
            opacity: 0.5,
            y: "-40%",
            ease: "power2.out"
        });

        // Add the scaling and opacity animation for the small cards
        tl.from(smallCards, {
            scale: 0,
            opacity: 0,
            stagger: 0.2,
            ease: "power2.out"
        }, 
        "-=.75"
        ); // Start this animation 0.5 seconds before the previous one ends
    }

    methodsAnimation();

    // Re-init on screen size change
    mediaQuery.addEventListener('change', methodsAnimation);
    
});