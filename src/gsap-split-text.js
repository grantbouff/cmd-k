document.addEventListener("DOMContentLoaded", function() {

    const splitTypes = document.querySelectorAll('[anima-gsap="split-text"]');


    splitTypes.forEach((char, i) => {
    const text = new SplitType(char, { types: ['chars', 'words'] });
    gsap.from(text.chars, {
        scrollTrigger: {
        trigger: char,
        start: 'top 80%',
        end: 'top 20%',
        scrub: true,
        },
        opacity: 0.2,
        stagger: 0.1,
    })
    });

});