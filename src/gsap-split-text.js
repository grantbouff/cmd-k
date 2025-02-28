import { gsap } from "./gsap-adapter.js";

document.addEventListener("DOMContentLoaded", function() {
    const splitTypes = document.querySelectorAll('[anima-gsap="split-text"]');

    splitTypes.forEach((element, i) => {
        // Split the text
        const text = new SplitType(element, { types: ['chars', 'words'] });
        
        // Find the follow-up element using the attribute selector
        // Look for the nearest follow element that comes after this split-text
        const followElement = element.closest('section, div')?.querySelector('[anima-gsap="split-follow"]');
        
        // First, ensure the follow element is initially invisible
        if (followElement) {
            gsap.set(followElement, { 
                opacity: 0,
                y: "50%"
            });
        }
        
        // Create timeline for sequencing animations
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                end: 'top 20%',
                scrub: 2
            }
        });
        
        // Add the split text animation to the timeline
        tl.from(text.chars, {
            opacity: 0.2,
            stagger: 0.1,
            duration: 2
        });
        
        // Add the follow element animation to run after the split text animation
        if (followElement) {
            tl.to(followElement, {
                opacity: 1,
                y: "0%",
                duration: 6,
                ease: "power2.out"
            }, "-=0.3"); // Start slightly before the previous animation finishes
        }
    });
});