document.addEventListener("DOMContentLoaded", function () {
  const prevButtons = document.querySelectorAll(".prev");
  const nextButtons = document.querySelectorAll(".next");
  const cardsContainers = document.querySelectorAll(".card-container");



  for (let index = 0; index < cardsContainers.length; index++) {
    const container = cardsContainers[index];


    const products = container.querySelectorAll(".card");
    const productWidth = products[0].offsetWidth; //vedi quanto occupa un contenitore
    const totalProducts = products.length; //salva quante card ci sono
    let currentSlide = 0;

    // Funzione per aggiornare lo stato dei pulsanti
    function updateButtons() {
      prevButtons[index].disabled = currentSlide === 0;
      nextButtons[index].disabled = currentSlide === totalProducts - 3;
    }

    // Gestione click sul pulsante precedente - passo ai pulsanti lo stesso intex dei container per capire su quale pulsante attivare l'addeventlistener
    prevButtons[index].addEventListener("click", function () {
      if (currentSlide > 0) {
        currentSlide--;
        container.scrollTo({
          left: currentSlide * productWidth, //parti dalla slide attuale e vai indietro di quanto occupa 1 slide
          behavior: "smooth",
        });
      }
      updateButtons();
    });

    // Gestione click sul pulsante successivo
    nextButtons[index].addEventListener("click", function () {
      // if (currentSlide < totalProducts - 3) 
      {
        currentSlide++;
        container.scrollTo({
          left: currentSlide * productWidth,
          behavior: "smooth",
        });
      }
      updateButtons();
    });

    // Inizializza lo stato dei pulsanti
    updateButtons();
  };
});
