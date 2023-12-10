const btnScrollTop = document.getElementById("js-btn-scroll-top");

btnScrollTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

const btnMobile = document.getElementById("js-btn-mobile");

if(btnMobile == null) {
  console.log("vazio")
} else {
  btnMobile.visible = true
  btnMobile.addEventListener("click", () => {
    btnMobile.classList.toggle("is-active");
  });
}

document.addEventListener("DOMContentLoaded", function (){
  loadPage(Pages.home, datahighlights)
})