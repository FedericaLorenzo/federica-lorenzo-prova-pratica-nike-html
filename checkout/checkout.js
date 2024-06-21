//Si occupa del messaggio d'errore: manda un messaggio di errore diverso a seconda del campo vuoto o del formato non valido
function validateField(input, regex) {
  let inputValue = input.value;
  let closestDiv = input.closest('.field');
  let errorMessage = closestDiv.querySelector('.error-message');
  let closestLabel = closestDiv.querySelector('label');

  if (inputValue === "") {
    errorMessage.innerText = "Campo obbligatorio.";
    input.style.border = "1px solid red";
    closestLabel.style.color = "red"
  }
  else if (!regex.test(inputValue)) {
    errorMessage.innerText = "formato non valido";
    input.style.border = "1px solid red";
    closestLabel.style.color = "red"
  }
  else {
    errorMessage.innerText = "";
    input.style.border = "1px solid black";
    closestLabel.style.color = "black"

  }

}

//controlla che il campo sia stato riempito nel modo corretto
function checkField(input, regex) {
  let inputValue = input.value;

  if (inputValue === "") {
    return false;
  }
  else if (!inputValue.match(regex)) {
    return false;
  }
  else {
    return true;
  }

}


document.addEventListener("DOMContentLoaded", function () {

  const name = document.getElementById('name');
  const lName = document.getElementById('lastname');
  const address = document.getElementById('address');
  const cap = document.getElementById('cap');
  const city = document.getElementById('city');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');

  const shipmentBlock = document.getElementById('shipment');
  const paymentBlock = document.getElementById('payment');
  const deliverySubmit = document.querySelector('#delivery-submit');


  const textRegex = /^([^0-9]*[a-zA-ZÀ-ÿ][']?[^0-9]*){2,}$/;  //solo lettere maiuscole, minuscole, spazi e apostrofo, almeno 2 caratteri
  const capRegex = /^([0-9]){5}$/; //solo numeri per una lunghezza di 5
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const phoneRegex = /^(\+?39\s?)?\d{10}$/; //numero di 10 cifre con +39 e spazio opzionale
  const addressRegex = /([a-zA-ZÀ-ÿ]{2,}[']?)+[,]?[\s]?\d{1,5}([a-zA-Z]{1,3})?$/; // variante più semplice: ^[\w\d\sÀ-ÿ',]+$ accetta lettere numeri spazi virgole e apostrofo



  //controlla se tutti i campi del primo modulo restituiscono true e a sua volta restituisce true

  function checkAllFields() {
    if (checkField(name, textRegex) &&
      checkField(lName, textRegex) &&
      checkField(cap, capRegex) &&
      checkField(city, textRegex) &&
      checkField(email, emailRegex) &&
      checkField(phone, phoneRegex) &&
      checkField(address, addressRegex)) {
      return true;
    }
    else {
      return false;
    }

  }

  //abilita il pulsante per andare avanti solo se tutti i campi sono stati riempiti correttamente

  name.addEventListener('keyup', function () {
    validateField(name, textRegex);
    deliverySubmit.disabled = !checkAllFields();
  })

  lName.addEventListener('keyup', function () {
    validateField(lName, textRegex);
    deliverySubmit.disabled = !checkAllFields();
  })

  cap.addEventListener('keyup', function () {
    validateField(cap, capRegex);
    deliverySubmit.disabled = !checkAllFields();
  })

  city.addEventListener('keyup', function () {
    validateField(city, textRegex);
    deliverySubmit.disabled = !checkAllFields();
  })

  email.addEventListener('keyup', function () {
    validateField(email, emailRegex);
    deliverySubmit.disabled = !checkAllFields();
  })

  phone.addEventListener('keyup', function () {
    validateField(phone, phoneRegex);
    deliverySubmit.disabled = !checkAllFields();
  })

  address.addEventListener('keyup', function () {
    validateField(address, addressRegex);
    deliverySubmit.disabled = !checkAllFields();
  })


  //Se cliccabile, mostra il blocco successivo e nasconde il precedente
  deliverySubmit.addEventListener('click', function (event) {
    event.preventDefault();
    shipmentBlock.style.display = "none";
    document.querySelector('.payment-choice h2').style.color = "black";
    paymentBlock.style.display = "block";
  })




  //INIZIO PAGAMENTO


  const cardNumber = document.getElementById('cardNumber');
  const cardDate = document.getElementById('cardDate');
  const CVV = document.getElementById('cvv');


  const cardNumberRegex = /^[0-9]{13,19}$/  //solo numeri per una lunghezza tra 13 e 19
  const cardDateRegex = /^(0[1-9]|1[0,1,2])\/[2-3]{1}[0-9]{1}$/; //solo numeri, formato: 0 + numero tra 1 e 9 | 1 + numero tra 0 e 2 / un numero tra 2 e 3, un numero tra 0 e 9
  const cvvRegex = /^[0-9]{3}$/; //3 numeri

  //controlla se tutti i campi di pagamento siano validati correttamente e restituisce true
  function checkAllPayment() {

    if (checkField(cardNumber, cardNumberRegex) &&
      checkField(cardDate, cardDateRegex) &&
      checkField(CVV, cvvRegex)) {
      return true;
    } else {
      return false;
    }
  }

  cardNumber.addEventListener('keyup', function () {
    validateField(cardNumber, cardNumberRegex);
    paymentSubmit.disabled = !checkAllPayment();
  })

  cardDate.addEventListener('keyup', function () {
    validateField(cardDate, cardDateRegex);
    paymentSubmit.disabled = !checkAllPayment();
  })

  CVV.addEventListener('keyup', function () {
    validateField(CVV, cvvRegex);
    paymentSubmit.disabled = !checkAllPayment();
  })


  const paymentChoiceInputs = document.querySelectorAll('#payment .radio input')
  const paymentSubmit = document.querySelector('#payment-submit');


  //controlla che abbiano schelto come metodo di pagamento la carta, allora il bottone si attiverà solo al controllo dei campi coretti, altrimenti si attiva per portarli al pagamento esterno
  function checkPaymentChoice() {
    for (let index = 0; index < paymentChoiceInputs.length; index++) {
      let input = paymentChoiceInputs[index];

      input.addEventListener('change', function () {

        if (document.getElementById('credit-card').checked == false) {
          document.querySelector('.payment-box').style.display = "none"
          paymentSubmit.disabled = false;
          paymentSubmit.innerText = "Vai al pagamento";

        } else {
          document.querySelector('.payment-box').style.display = "block";
          checkAllPayment()
          paymentSubmit.innerText = "Paga e verifica";
          paymentSubmit.disabled = !checkAllPayment();
        }

      });
    }
  }



  checkPaymentChoice()



  //INIZIO THANK-YOU BLOCK

  const thankYouBlock = document.getElementById('thank-you');

  paymentSubmit.addEventListener('click', function (event) {
    event.preventDefault();

    //se sul bottone c'è scritto Paga e verifica, hanno quindi aggiunto i dettagli del cambiamento ed è cliccabile, mostra il thank-you block
    if (paymentSubmit.innerText == "Paga e verifica") {
      paymentBlock.style.display = "none";
      document.querySelector('.confirmation h2').style.color = "black";
      thankYouBlock.style.display = "block";
    }
  })


})