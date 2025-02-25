gsap.registerPlugin(ScrollTrigger)

window.addEventListener("DOMContentLoaded", () => {

    /* LENIS SMOOTH SCROLL (OPTIONAL) 
    lenis = new Lenis({
        autoRaf: true,
    })
    /* LIENIS SMOOTH SCROLL (OPTIONAL) */
    
    const container = document.querySelector('.mwg_effect001 .mwg-1_container')
    const cardsContainer = container.querySelector('.cards')
    const cards = document.querySelectorAll('.card')
    const distance = cardsContainer.clientWidth - window.innerWidth

    const scrollTween = gsap.to(cardsContainer, {
        x: - distance,
        ease: 'none', // linear progression
        // let's pin our container while our cardsContainer is animating
        scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: true, // progress with the scroll
            start: 'top 35%',
            end: '+=' + distance
        }
    });

    cards.forEach(card => {
        // const values = {
        //     // get a value between 30 and 50 or -30 and -50
        //     x: (Math.random() * 20 + 30) * (Math.random() < 0.5 ? 1 : -1),
        //     // get a value between 10 and 16 or -16 and -10
        //     y: (Math.random() * 6 + 10) * (Math.random() < 0.5 ? 1 : -1),
        //     // get a value between 10 and 20 or -10 and -20
        //     rotation: (Math.random() * 10 + 10) * (Math.random() < 0.5 ? 1 : -1)
        // };

        gsap.fromTo(card, {
            // let's start from this 3 values
            rotation: values.rotation,
            xPercent: values.x,
            yPercent: values.y
        }, {
            // and finish to its 3 opposite values
            rotation: - values.rotation,
            xPercent: - values.x,
            yPercent: - values.y,
            ease: 'none', // linear progression
            scrollTrigger:{
                trigger:card,
                containerAnimation: scrollTween, // our tween will listen to our scrollTween container position
                start:'left 120%' ,
                end:'right -20%',
                scrub:true, // the animation progress with the scroll
            }
        })
    })
})


