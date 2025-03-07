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

    //Styling the swiper
    initialSlide: 1,
    spaceBetween: 0,
    centeredSlides: true,
    speed: 700,
    slidesPerView: 'auto',
    loop: true,

    //Navigating the swiper
    slideToClickedSlide: true,
    direction: 'horizontal',
    mousewheel: {
      forceToAxis: true
    },
    keyboard: {
      enabled: true,
    },
    simulateTouch: true,
    momentum: true,
    minimumVelocity: 0.01,

  });
  