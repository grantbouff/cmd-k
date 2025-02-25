/* home.js - Generated 2025-02-25T11:05:56.565Z */

console.log("home.js bundle loaded");

// Initialize namespace
window.CMD_K = window.CMD_K || {};
window.CMD_K.components = {};

/* Warning: File init.js not found */
console.error("Missing file: init.js");

/* File: gsap-split-text.js */
console.log("Loading gsap-split-text.js");
(function() {
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
            tl.to(followElement, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.3"); // Start slightly before the previous animation finishes
        }
    });
});
})();

/* File: projects-slider.js */
console.log("Loading projects-slider.js");
(function() {
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
    slideToClickedSlide:true,
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
  
})();

/* File: services-cascade.js */
console.log("Loading services-cascade.js");
(function() {
    document.addEventListener('DOMContentLoaded', () => {
        const isMobile = window.matchMedia("(max-width: 479px)");
        
        if (isMobile.matches) {
          // Mobile animation - trigger each card individually
          gsap.utils.toArray(".services_card").forEach((card, index) => {
            let servicesTimeMobile = gsap.timeline({
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                end: "bottom -20%",
                scrub: 1,
                // markers: true,
                id: `card-${index}`,
              }
            });
          
            servicesTimeMobile.fromTo(
              card, 
              { y: "25%", scale: 0.9, opacity: 0 },
              { y: "0%", scale: 1, opacity: 1, ease: "power2.out" },
              "0%" 
            );
          
            servicesTimeMobile.to(
              card,
              { y: "-10%", scale: 0.95, opacity: 1 }, 
              "30%" 
            );
          
            servicesTimeMobile.to(
              card,
              { y: "-15%", scale: 0.85, opacity: 0, ease: "none" },
              "60%" 
            );
          });
        } else {
          // Your existing desktop timeline
          let servicesTimeDesk = gsap.timeline({
            scrollTrigger: {
              trigger: ".section_services",
              start: "15% 80%",
              end: "90% 80%",
              scrub: 2,
              toggleActions: "play play reverse reset"
            }
          });

          servicesTimeDesk.from(".services_heading-wrapper", {
            y: "50%",
            opacity: 0,
            duration: 1
          });
          
          servicesTimeDesk.from(".services_card", {
              y: "50%",
              scale: .9,
              stagger: { amount: 5 },
              duration: 8,
              ease: "back.out(1)",
            },
            "<.25"
          );
          
          servicesTimeDesk.from(".services_technical-label", {
              y: "25%",
              opacity: 0,
              duration: 4
            },
            "<.75"
          );
        }
      });
})();

/* File: benefits-simple-slide.js */
console.log("Loading benefits-simple-slide.js");
(function() {
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
    }, "<"); 
}



initBenefitAnimations();

// Re-init on screen size change
mediaQuery.addEventListener('change', initBenefitAnimations);
})();

/* File: check-box-logic.js */
console.log("Loading check-box-logic.js");
(function() {
$(document).ready(function () {
// Get all real option labels (excluding no-design)
const realOptionLabels = Array.from(document.querySelectorAll(
    '.w-checkbox.submit-form_select-field'))
  .filter(label => !label.querySelector('#no-design'));

// Get the fake option label
const fakeOptionLabel = document.querySelector(
  '.w-checkbox.submit-form_select-field:has(#no-design)');

// Map labels to their corresponding elements
const realOptions = realOptionLabels.map(label => ({
  label: label,
  input: label.querySelector('input[type="checkbox"]'),
  customCheckbox: label.querySelector('.w-checkbox-input')
}));

const fakeOption = {
  label: fakeOptionLabel,
  input: fakeOptionLabel.querySelector('input[type="checkbox"]'),
  customCheckbox: fakeOptionLabel.querySelector('.w-checkbox-input')
};

// Function to handle the style update
const updateCustomCheckbox = (customCheckbox, isChecked) => {
  if (isChecked) {
    // If it has 'is-checked', replace it with 'w--redirected-checked'
    if (customCheckbox.classList.contains('is-checked')) {
      customCheckbox.classList.remove('is-checked');
    }
    customCheckbox.classList.add('w--redirected-checked');
  } else {
    // Remove both classes when unchecking
    customCheckbox.classList.remove('is-checked', 'w--redirected-checked');
  }
};

// Function to handle real option click
const handleRealOptionClick = (option, e) => {
  e.preventDefault();
  e.stopPropagation();

  option.input.checked = !option.input.checked;
  updateCustomCheckbox(option.customCheckbox, option.input.checked);

  if (option.input.checked) {
    fakeOption.input.checked = false;
    updateCustomCheckbox(fakeOption.customCheckbox, false);
  }
};

// Function to handle fake option click
const handleFakeOptionClick = (e) => {
  e.preventDefault();
  e.stopPropagation();

  fakeOption.input.checked = !fakeOption.input.checked;
  updateCustomCheckbox(fakeOption.customCheckbox, fakeOption.input.checked);

  if (fakeOption.input.checked) {
    realOptions.forEach(option => {
      option.input.checked = false;
      updateCustomCheckbox(option.customCheckbox, false);
    });
  }
};

// Add click handlers to real options
realOptions.forEach((option) => {
  // Handle clicks on the entire label
  option.label.addEventListener('click', (e) => handleRealOptionClick(option, e));
});

// Add click handler to fake option
fakeOption.label.addEventListener('click', handleFakeOptionClick);

// Initial state sync
realOptions.forEach(option => {
  updateCustomCheckbox(option.customCheckbox, option.input.checked);
});
updateCustomCheckbox(fakeOption.customCheckbox, fakeOption.input.checked);

// Debug logging
console.log('Initialized with:', {
  realOptions: realOptions.map(o => ({
    checked: o.input.checked,
    classes: o.customCheckbox.className
  })),
  fakeOption: {
    checked: fakeOption.input.checked,
    classes: fakeOption.customCheckbox.className
  }
});

// Select all elements with the specified attribute
const rangeInputs = document.querySelectorAll('[if-lib="rangeslider-value-input"]');
const rangeLabel = document.querySelector('.submit-form_range-label');

// Function to handle input changes
function handleRangeInput(event) {
  const value = parseFloat(event.target.value);

  // Check if the value exists and is a number
  if (!isNaN(value)) {
    // Add or remove class based on value
    if (value > 0) {
      rangeLabel.classList.add('is-active');
    } else {
      rangeLabel.classList.remove('is-active');
    }
  }
}

// Add event listeners to all matching inputs
rangeInputs.forEach(input => {
  input.addEventListener('input', handleRangeInput);

  // Optional: Handle initial state
  const initialValue = parseFloat(input.value);
  if (!isNaN(initialValue) && initialValue > 0) {
    rangeLabel.classList.add('is-active');
  }
});

// Clean up function to remove event listeners (optional)
function cleanup() {
  rangeInputs.forEach(input => {
    input.removeEventListener('input', handleRangeInput);
  });
}

});

})();


// Initialize all components when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM ready, initializing components");
    if (window.CMD_K && window.CMD_K.init) {
      window.CMD_K.init();
    }
  });
} else {
  // DOM already loaded
  console.log("DOM already loaded, initializing components");
  if (window.CMD_K && window.CMD_K.init) {
    window.CMD_K.init();
  }
}
