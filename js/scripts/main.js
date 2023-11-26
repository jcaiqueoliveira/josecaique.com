const slide_podcast = new Swiper(".slide-podcast", {
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

//const btnMobile = document.getElementById("js-btn-mobile");
//
//btnMobile.addEventListener("click", () => {
//  btnMobile.classList.toggle("is-active");
//});


//document.addEventListener("DOMContentLoaded", function () {
//  const podcastData = [
//    { tag: 'Ep 01', duration: '12min', title: 'Realidade virtual: Entendendo a tecnologia' },
//    // Adicione outros slides conforme necessário
//  ];
//
//  const podcastSlider = document.getElementById('podcast-slider');
//
//  podcastData.forEach(slide => {
//    const slideHTML = `
//            <div class="swiper-slide">
//                <a href="detalhes-post.html" class="card-podcast">
//                    <div class="image">
//                        <img src="img/img-podcast-${slide.tag.slice(-2)}.jpg" alt="" />
//                    </div>
//                    <div class="info">
//                        <div class="time">
//                            <span class="tag-ep">${slide.tag}</span>
//                            <div class="read">
//                                <img src="img/icon-timer.svg" alt="" />
//                                <span>${slide.duration}</span>
//                            </div>
//                        </div>
//                        <h6 class="txt-white">${slide.title}</h6>
//                        <div class="play">
//                            <img src="img/icon-play.svg" alt="Ícone de Play" />
//                            <span>Ouvir agora</span>
//                        </div>
//                    </div>
//                </a>
//            </div>
//        `;
//
//    podcastSlider.insertAdjacentHTML('beforeend', slideHTML);
//  });
//
//  // Configurações do Swiper aqui
//  const slide_podcast = new Swiper(".slide-podcast", {
//    slidesPerView: 4,
//    spaceBetween: 32,
//    pagination: {
//      el: ".s-podcast .top-container .swiper-pagination",
//      clickable: true,
//    },
//    navigation: {
//      nextEl: ".s-podcast .top-container .btn-next",
//      prevEl: ".s-podcast .top-container .btn-prev",
//    },
//    speed: 600,
//    breakpoints: {
//      320: { slidesPerView: 1 },
//      768: { slidesPerView: 2 },
//      991: { slidesPerView: 3 },
//      1150: { slidesPerView: 4 },
//    },
//  });
//});

document.addEventListener("DOMContentLoaded", function (){
  loadPage(Pages.home, datahighlights)
//  const podcastSlider = document.getElementById('podcast-slider-id');
//  console.log(podcastSlider)
})