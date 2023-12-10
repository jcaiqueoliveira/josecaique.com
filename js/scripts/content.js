// Function to load page dinamically
function loadPage(page, content) {
    const pageContent = getPage(page.page);
    fetch(pageContent)
        .then(response => response.text())
        .then(html => {
            for (let key in content) {
                if (content.hasOwnProperty(key)) {
                    const pattern = new RegExp(`{{${key}}}`, 'g');
                    html = html.replace(pattern, content[key]);
                }
            }
            document.getElementById('content').innerHTML = html;

            if(page === Pages.home){
                const script = document.createElement('script');
                script.src = './js/all.js';
                script.defer = true;
                document.head.appendChild(script);

                const podcastSlider1 = document.getElementById('podcast-slider-id');
                loadSlide()
            }
        })
        .catch(error => console.error('Erro ao carregar componente:', error));
}

function sliderConfig(){
    return new Swiper(".slide-podcast", {
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
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            991: { slidesPerView: 3 },
            1150: { slidesPerView: 4 },
        },
    });
}

// Function to add menu without repetition of html
function generateMenu() {
    const menuData = [
        { label: 'Início', page: Pages.home },
        { label: 'Artigos', page: Pages.articles },
        { label: 'Sobre', page: Pages.about}
    ];

    const menuContainer = document.getElementById('menu');

    menuData.forEach(item => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#';
        link.className = 'item-categorie';
        link.onclick = function() {
            loadPage(item.page, item.page.content);
            return false;
        };

        const span = document.createElement('span');
        span.textContent = item.label;

        link.appendChild(span);
        listItem.appendChild(link);
        menuContainer.appendChild(listItem);
    });

    const btnMobile = document.getElementById("js-btn-mobile");

    btnMobile.addEventListener("click", () => {
        btnMobile.classList.toggle("is-active");
    });
}