// Sticky CTA logic
const stickyCta = document.getElementById("stickyCta");
const hero = document.getElementById("hero");

function handleScroll() {
  const heroBottom = hero.offsetHeight - 100;
  const scrolled = window.scrollY;

  if (scrolled > heroBottom) {
    stickyCta.classList.add("visible");
  } else {
    stickyCta.classList.remove("visible");
  }
}

window.addEventListener("scroll", handleScroll);

// Timer countdown logic
let startTime = Date.now();
const TIMER_DURATION = 15 * 60 * 1000; 

function updateTimer() {
  const elapsed = Date.now() - startTime;
  const remaining = Math.max(0, TIMER_DURATION - elapsed);

  const minutes = Math.floor(remaining / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);

  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");
  
  if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, "0");
  if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, "0");

  // Change CTA text when timer ends
  if (remaining === 0) {
    const timerCta = document.getElementById("timerCta");
    const stickyCta = document.querySelector(".sticky-cta__btn");
    const heroCta = document.querySelector(".hero__cta");

    if (timerCta) {
      timerCta.textContent = "Останній шанс!";
      timerCta.classList.add("last-chance");
    }
    if (stickyCta) stickyCta.textContent = "Останній шанс!";
    if (heroCta) heroCta.textContent = "Останній шанс!";

    return;
  }

  requestAnimationFrame(updateTimer);
}

updateTimer();

//slider
const swiper = new Swiper(".testimonialsSwiper", {
  slidesPerView: 2,
  spaceBetween: 24,
  loop: true,
  autoplay: {
      delay: 5000,
      disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  speed: 500,
  grabCursor: true,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    600: {
      slidesPerView: 2,
    }
  }
});


// FAQ Accordion
let currentOpenFaq = null;

// Робимо функцію глобальною
window.toggleFaq = function(index) {
  const faqItems = document.querySelectorAll(".faq__item");
  const clickedItem = faqItems[index];

  if (!clickedItem) return;

  // If clicking the same item, close it
  if (currentOpenFaq === index) {
    clickedItem.classList.remove("active");
    currentOpenFaq = null;
    return;
  }

  // Close previously open item
  if (currentOpenFaq !== null && faqItems[currentOpenFaq]) {
    faqItems[currentOpenFaq].classList.remove("active");
  }

  // Open clicked item
  clickedItem.classList.add("active");
  currentOpenFaq = index;
};

window.scrollToForm = function() {
  const formSection = document.getElementById("form") || document.querySelector(".form");
  
  if (formSection) {
    formSection.scrollIntoView({ behavior: "smooth" });
  } else {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth"
    });
  }
};

window.goToStep2 = function() {
  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");
  
  if (step1 && step2) {
    step1.classList.remove("active");
    step2.classList.add("active");
  }
};

