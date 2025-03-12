import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(Observer, ScrollTrigger);

let total = 0,
    xTo,
    itemValues = []

window.addEventListener("DOMContentLoaded", () => {

    const content = document.querySelector('.section_benefits .benefits_all-cards')
    const cards = document.querySelectorAll('.section_benefits .benefits_card')
    const cardsLength = cards.length / 2
    const half = content.clientWidth / 2

    const wrap = gsap.utils.wrap(-half, 0);

    xTo = gsap.quickTo(content, "x", {
        duration: 0.5, // Will transition over 0.5s
        ease: 'power3', // Non-linear
        modifiers: {
            x: gsap.utils.unitize(wrap),
        },
    });

    // Generate an array of random values between -10 and 10
    for (let i = 0; i < cardsLength; i++) {
        itemValues.push((Math.random() - 0.5) * 20);
    }

    const tl = gsap.timeline({ paused: true });
    tl.to(cards, {
        // rotate: (index) => (itemValues[index % cardsLength]),
        // xPercent: (index) => (itemValues[index % cardsLength]),
        yPercent: (index) => (itemValues[index % cardsLength]),
        scale: 0.975,
        duration: 0.5,
        ease: 'back.inOut(2)', 
    });

    Observer.create({
        target: content,
        type: "pointer,touch",
        lockAxis: "x",
        allowContextMenu: false,
        // allowEventDefault: false, // Detect both pointer and touch events
        onPress: () => tl.play(), // Play the timeline when pressing down
        onDrag: (self) => { // Update the horizontal position while dragging
            total += self.deltaX
            xTo(total)
        },
        onRelease: () => { // Reverse the timeline when releasing the pointer
            tl.reverse()
        },
        onStop: () => { // Reverse the timeline when the interaction stops
            tl.reverse()
        },
    });


    // Add ScrollTrigger to fast forward/reverse the horizontal scroll
    // ScrollTrigger.create({
    //     // markers: true,
    //     trigger: content,
    //     start: "top 70%",
    //     end: "bottom 50%",
    //     scrub: 1,
    //     onUpdate: (self) => {
            
    //         const scrollDirection = self.direction === 1 ? -1 : 1; 
    //         total += scrollDirection * 3.5; 
    //         xTo(total);
    //     }
    // });

    gsap.ticker.add(tick);

    // TO GO FURTHER: You can add an offscreen check and kill Observer when necessary
});

function tick(time, deltaTime) {
    const root = document.documentElement;
    const speed = parseFloat(getComputedStyle(root).getPropertyValue('--semantic--benefits-scroll-speed')) || 50;
    total -= deltaTime / speed; // Adjust the speed of automatic scrolling    
    xTo(total);
}