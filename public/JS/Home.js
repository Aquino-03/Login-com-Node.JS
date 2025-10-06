var swiper = new Swiper(".mySwiper", {
  loop: true, // o carrossel roda em loop
  autoplay: {
    delay: 10000, // muda a cada 3 segundos
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});