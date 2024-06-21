document.addEventListener("DOMContentLoaded", function () {
  let quantitySelects = document.querySelectorAll(".quantity");

  let itemUnitaryPrices = []

  //prende sia i singoli prezzi sia il prezzo totale, per ogni prezzo unitario su cui cicla lo trasforma in un numero e lo salva in un array, poi in una variabile totalprice salva il prezzo del giro + il prezzo precedente, infine prende entrambi gli elementi summaryprice e ci passa dentro il totale
  function sumPrices() {
    let summaryPriceElements = document.querySelectorAll(".summary-price");
    let cartPriceElements = document.querySelectorAll(".cart-price");
    let totalPrice = 0;

    for (let index = 0; index < cartPriceElements.length; index++) {
      let element = cartPriceElements[index];
      const newElementNumber = parseFloat(element.innerText);
      itemUnitaryPrices.push(newElementNumber) //salvo i prezzi iniziali per poi usarli per la moltiplicazione * quantity
      totalPrice += newElementNumber;
    }

    for (let index = 0; index < summaryPriceElements.length; index++) {
      let element = summaryPriceElements[index];

      element.innerHTML = totalPrice.toFixed(2) + " €";
    }
  };


  //ciclando sui select degli articoli presenti nel carrello, al cambio prende il pezzo dell'articolo orginale salvato nell'array precedentemente e lo moltiplica per la quantità che vede in quel momento, lo salva in un totale e lo passa all'elemento cart-price html

  function changePriceOnQuantity() {

    for (let index = 0; index < quantitySelects.length; index++) {
      let element = quantitySelects[index];
      element.addEventListener("change", function () {
        let itemPriceTotal = 0
        let quantity = element.value;
        let cartProduct = this.closest('.cart-product');
        itemPriceTotal = itemUnitaryPrices[index] * quantity;

        cartProduct.querySelector('.cart-price span').innerText = itemPriceTotal.toFixed(2) + " €"
        sumPrices()
      });
    }

  }


  //partendo da ogni icona cestino, prende il più vicino genitore cart-item(l'articolo) e lo rimuove, allo stesso tempo si prende l'indice di quell'elemento e lo rimuove dall'array dei prezzi unitari iniziali

  let binIcons = document.querySelectorAll(".bin");
  function removeCartItem() {
    for (let i = 0; i < binIcons.length; i++) {
      binIcons[i].addEventListener("click", function () {
        let cartItem = this.closest(".cart-item");
        if (cartItem) {
          cartItem.remove();
        }
        itemUnitaryPrices.splice(i, 1) //rimuove 1 elemento dall'array partendo dallo stesso indice su cui sta iterando
        changePriceOnQuantity();
        sumPrices()
      });
    }
  }


  changePriceOnQuantity();
  sumPrices();
  removeCartItem();

});
