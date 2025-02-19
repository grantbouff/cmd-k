const projectSlider = new Swiper(".swiper.is-projects", {
    a11y: {
        prevSlideMessage: 'Previous slide',
        nextSlideMessage: 'Next slide',
      },
    wrapperClass: "swiper-wrapper",
    slideClass: "swiper-item",
    navigation: {
        nextEl: '[data-swiper-next]',
        prevEl: '[data-swiper-prev]',
    },

    initialSlide: 1,
    slideToClickedSlide:'true',
    mousewheel: 'true',
    forceToAxis: 'true',
    spaceBetween: 0,
    centeredSlides: 'true',
    speed: 700,
    slidesPerView: 'auto',
    keyboard: {
        enabled: true,
      },
    loop: 'true',
    simulateTouch: 'true',
    momentum: 'true',
    minimumVelocity: .01,

  });
  