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
                y: 20 // Start slightly below the final position
            });
        }
        
        // Create timeline for sequencing animations
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                end: 'top 20%',
                scrub: true,
            }
        });
        
        // Add the split text animation to the timeline
        tl.from(text.chars, {
            opacity: 0.2,
            stagger: 0.1,
            duration: 1
        });
        
        // Add the follow element animation to run after the split text animation
        if (followElement) {
            tl.from(followElement, {
                opacity: 0,
                y: "50%",
                duration: 2,
                ease: "power2.out"
            }, "-=0.3"); // Start slightly before the previous animation finishes
        }
    });
});