
function loadSlide(){

    const podcastSlider = document.getElementById('podcast-slider-id');
    videos.forEach(video => {
        const slideHTML = `
            <div class="swiper-slide">
                <a href=${video.link} class="card-podcast">
                    <div class="image">
                        <img src=${video.img} alt="" />
                    </div>
                    <div class="info">
                        <div class="time">
                            <span class="tag-ep">${video.tag}</span>
                            <div class="read">
                                <img src="img/icon-timer.svg" alt="" />
                                <span>${video.time}</span>
                            </div>
                        </div>
                        <h6 class="txt-white">${video.title}</h6>
                        <div class="play">
                            <img src="../img/icon-play.svg" alt="Ícone de Play" />
                            <span>Assistir agora</span>
                        </div>
                    </div>
                </a>
            </div>
        `;
        podcastSlider.insertAdjacentHTML('beforeend', slideHTML);
    });
    
    sliderConfig()
}
