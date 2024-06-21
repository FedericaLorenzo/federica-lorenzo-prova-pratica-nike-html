document.addEventListener("DOMContentLoaded", function () {
  const leftArrow = document.querySelector("#prev");
  const rightArrow = document.querySelector("#next");
  const cartOverlay = document.querySelector("#cart-overlay");
  const addCartButton = document.getElementById("add-cart");
  const closePopupButton = document.getElementById("cart-popup-close");


  //SEZIONE DELLE IMMAGINI DI SINISTRA

  //applica overlay nero alla thumbnail con il corretto IDX
  let thumbnailOverlay = function (dataIdx) {
    document.querySelector("#thumbnails-container > .active").classList.remove("active");
    document.querySelector(`#thumbnails-container > [data-index='${parseInt(dataIdx)}']`).classList.add("active");
  };

  // al mouseover seleziona la foto attiva nel container e rimuovi la classe active, poi prendi la foto con il data-index passato ed applica a quello la classe active, nel mentre metti anche l'over sulla thumbnail corrispondente (thumbnail e photo big avranno data-index corrispondenti)
  let thumbnailMouseover = function (dataIdx) {
    thumbnailOverlay(dataIdx); //Per mettere overlay nero
    document.querySelector(`#photo-big > .active`).classList.remove("active");
    document.querySelector(`#photo-big > [data-index='${parseInt(dataIdx)}']`).classList.add("active"); // mostra la foto grande
    if (document.querySelector(`#photo-big > [data-index='${parseInt(dataIdx)}']`).tagName == 'VIDEO') {
      document.querySelector(`#photo-big > [data-index='${parseInt(dataIdx)}']`).play();
    }
  };

  //al mouseover prendi il data-index della foto overata e passalo alla funzione thumbnailMouseover
  let thumbnails = document.querySelectorAll(".thumbnail");
  for (let i = 0; i < thumbnails.length; i++) {
    thumbnails[i].addEventListener("mouseover", function () {
      thumbnailMouseover(this.getAttribute("data-index"));
    });
  }


  leftArrow.addEventListener("click", function () {
    const currentActive = document.querySelector("#photo-big > .active");
    const prevSibling = currentActive.previousElementSibling;
    currentActive.classList.remove("active");

    if (prevSibling) {
      prevSibling.classList.add("active");
      if (prevSibling.tagName == 'VIDEO') {
        prevSibling.play();
      }
      thumbnailOverlay(prevSibling.getAttribute("data-index"));
    } else {
      //se non c'è un prima prendi l'ultima
      const last = document.querySelector("#photo-big > :last-child");
      last.classList.add("active");
      if (last.tagName == 'VIDEO') {
        last.play();
      }
      thumbnailOverlay(last.getAttribute("data-index"));
    }
  });

  rightArrow.addEventListener("click", function () {
    const currentActive = document.querySelector("#photo-big > .active");
    const nextSibling = currentActive.nextElementSibling;
    currentActive.classList.remove("active");
    if (nextSibling) {
      nextSibling.classList.add("active");
      if (nextSibling.tagName == 'VIDEO') {
        nextSibling.play();
      }
      thumbnailOverlay(nextSibling.getAttribute("data-index"));
    } else {
      //se non c'è un dopo prendi la prima
      const first = document.querySelector("#photo-big > :first-child");
      first.classList.add("active");
      if (first.tagName == 'VIDEO') {
        first.play();
      }
      thumbnailOverlay(first.getAttribute("data-index"));
    }
  });

  //INIZIO SEZIONE DEL MODULO TAGLIA

  const sizeChoiceDiv = document.querySelector("#size-choice");
  const sizeParagraphCart = document.querySelector("#cart-details p:last-of-type");
  const sizeChoiceInputs = document.querySelectorAll('#size-choice input[type="radio"]');

  for (let i = 0; i < sizeChoiceInputs.length; i++) {
    sizeChoiceInputs[i].addEventListener("click", function () {
      sizeChoiceDiv.style.border = "none"; //resetta il bordo rosso dell'errore
      document.querySelector("#form-titles span:first-of-type").style.color =
        "black"; //resetta colore "seleziona taglia"
      if (document.querySelector("#size-error")) {
        document.querySelector("#size-error").style.display = "none";
      } //se c'è l'errore non mostrarlo
    });
  }

  addCartButton.addEventListener("click", function (event) {
    event.preventDefault();

    //controlla che un valore sia selezionato e prende l'id di quel valore
    let isSelected = false;
    let selectedValue = undefined;
    for (let i = 0; i < sizeChoiceInputs.length; i++) {
      let input = sizeChoiceInputs[i];
      if (input.checked) {
        isSelected = true;
        selectedValue = input.id;
        break;
      }
    }

    sizeParagraphCart.innerText = "Taglia/misura EU"; //resetta la taglia nel carrello

    //gestisce l'errore della taglia non selezionata
    if (isSelected) {
      sizeChoiceDiv.style.border = "none"; //resetta il bordo rosso dell'errore
      document.querySelector("#form-titles span:first-of-type").style.color =
        "black"; //resetta colore "seleziona taglia"
      cartOverlay.style.display = "block"; //mostra il carrello
      sizeParagraphCart.innerHTML += " " + selectedValue; //mostra la taglia nel carrello
      if (document.querySelector("#size-error")) {
        document.querySelector("#size-error").style.display = "none";
      } //se c'è l'errore non mostrarlo
    } else {
      if (!document.querySelector("#size-error")) {
        let p = document.createElement("p");
        p.setAttribute("id", "size-error");
        p.innerHTML = "Seleziona una taglia";
        p.style.color = "red";
        document.querySelector("#form-titles span:first-of-type").style.color = "red";
        sizeChoiceDiv.style.border = "1px solid red";
        sizeChoiceDiv.after(p);
      }
    }

  });


  closePopupButton.addEventListener("click", function () {
    cartOverlay.style.display = "none";
  });
});
