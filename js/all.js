"use strict";function loadPage(i,o){var e=getPage(i.page);fetch(e).then(function(e){return e.text()}).then(function(e){for(var t in o){var n;o.hasOwnProperty(t)&&(n=new RegExp("{{".concat(t,"}}"),"g"),e=e.replace(n,o[t]))}var a;document.getElementById("content").innerHTML=e,i===Pages.home&&((a=document.createElement("script")).src="./js/all.js",a.defer=!0,document.head.appendChild(a),document.getElementById("podcast-slider-id"),loadSlide())}).catch(function(e){return console.error("Erro ao carregar componente:",e)})}function sliderConfig(){return new Swiper(".slide-podcast",{slidesPerView:4,spaceBetween:32,pagination:{el:".s-podcast .top-container .swiper-pagination",clickable:!0},navigation:{nextEl:".s-podcast .top-container .btn-next",prevEl:".s-podcast .top-container .btn-prev"},speed:600,breakpoints:{320:{slidesPerView:1},768:{slidesPerView:2},991:{slidesPerView:3},1150:{slidesPerView:4}}})}function generateMenu(){var e=[{label:"Início",page:Pages.home},{label:"Artigos",page:Pages.articles},{label:"Sobre",page:Pages.about}],i=document.getElementById("menu");e.forEach(function(e){var t=document.createElement("li"),n=document.createElement("a"),a=(n.href="#",n.className="item-categorie",n.onclick=function(){return loadPage(e.page,e.page.content),!1},document.createElement("span"));a.textContent=e.label,n.appendChild(a),t.appendChild(n),i.appendChild(t)})}var datahighlights={category:"Tecnologia",data:"29, Novembro, 2022",time:"15min de leitura",title:"Lições aprendidas modularizando uma aplicação",link:"https://medium.com/@kandadev/li%C3%A7%C3%B5es-aprendidas-enquanto-modularizando-um-aplicativo-ea68b4855c06",category1:"Tecnologia",data1:"29, Abril, 2022",time1:"5min de leitura",title1:"Mantenha sua funcionalidade simples",link1:"https://medium.com/@kandadev/mantenha-sua-funcionalidade-simples-8977c704352a"},videos=[{title:"Resolvendo desafio técnico android",link:"https://www.youtube.com/watch?v=XpL2GrkJdbU",time:"40:12",tag:"Entrevista",img:"../img/youtube/img-podcast-03.jpg"},{title:"Entrevista de design de sistema",link:"https://youtu.be/UUALCBMDAV0?si=4a3R0ibdE-Y2anjy",time:"14:07",tag:"Entrevista",img:"../img/youtube/img-podcast-03.jpg"},{title:"Desenvolvimento mobile, qual escolher?",link:"https://youtu.be/wu9U43yp5bY?si=pOvZoENm6JyRpSnp",time:"10:31",tag:"Vlog",img:"../img/youtube/img-podcast-03.jpg"},{title:"Tipos diferentes de processos seletivos...",link:"https://www.youtube.com/watch?v=dy7FqUjesqY",time:"19:09",tag:"Vlog",img:"../img/youtube/img-podcast-03.jpg"},{title:"Performance ruim com clean code?",link:"https://www.youtube.com/watch?v=Wah8yfW5FyY",time:"10:34",tag:"Vlog",img:"../img/youtube/img-podcast-03.jpg"}],articlesContent={},aboutContent={};function getPage(e){return"../../pages/"+e}var Pages={home:{page:"home.html",content:datahighlights},articles:{page:"articles.html",content:articlesContent},about:{page:"about.html",content:aboutContent}},btnScrollTop=document.getElementById("js-btn-scroll-top"),btnMobile=(btnScrollTop.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})}),document.getElementById("js-btn-mobile"));function loadSlide(){var t=document.getElementById("podcast-slider-id");videos.forEach(function(e){e='\n            <div class="swiper-slide">\n                <a href='.concat(e.link,' class="card-podcast">\n                    <div class="image">\n                        <img src=').concat(e.img,' alt="" />\n                    </div>\n                    <div class="info">\n                        <div class="time">\n                            <span class="tag-ep">').concat(e.tag,'</span>\n                            <div class="read">\n                                <img src="img/icon-timer.svg" alt="" />\n                                <span>').concat(e.time,'</span>\n                            </div>\n                        </div>\n                        <h6 class="txt-white">').concat(e.title,'</h6>\n                        <div class="play">\n                            <img src="../img/icon-play.svg" alt="Ícone de Play" />\n                            <span>Assistir agora</span>\n                        </div>\n                    </div>\n                </a>\n            </div>\n        ');t.insertAdjacentHTML("beforeend",e)}),sliderConfig()}btnMobile.addEventListener("click",function(){btnMobile.classList.toggle("is-active")}),document.addEventListener("DOMContentLoaded",function(){loadPage(Pages.home,datahighlights)});