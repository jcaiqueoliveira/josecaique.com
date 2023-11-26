var slide_podcast = new Swiper(".slide-podcast", {
  slidesPerView: 4,
  spaceBetween: 32,
  pagination: {
    el: ".s-podcast .top-container .swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".s-podcast .top-container .btn-next",
    prevEl: ".s-podcast .top-container .btn-prev",
  },
  speed: 600,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    991: {
      slidesPerView: 3,
    },
    1150: {
      slidesPerView: 4,
    },
  },
});

const btnScrollTop = document.getElementById("js-btn-scroll-top");

btnScrollTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

const btnMobile = document.getElementById("js-btn-mobile");

btnMobile.addEventListener("click", () => {
  btnMobile.classList.toggle("is-active");
});
