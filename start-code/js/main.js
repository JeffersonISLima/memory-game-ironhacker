/* Projeto: Memory Game - Trabalho do primeiro módulo do curso Ironhackc web dev.  apresentado em sala de aula.
Desenvolvedor: Jeffers I S Lima
Contato: jeffersoninacio@hotmail.com
Início: 08/04/2019
Término: 12/04/2019 */

// Cria as animações Toasty e winner
let toasty = document.getElementById("div-toasty");
toasty.innerHTML = `<img id="toasty-opacity" class=" " src="img/toasty.png" alt="toasty">`;

//retorna o ID board-cards do HTML
const boardCards = document.querySelector("#board-cards");

let cardsIntoHtml = ""; //Váriavel utilizada para renderizar o conteúdo no HTML
let firstCard, secondCard;
let lockCards = false;

//Array de imagens
const imgs = [
  "css.png",
  "ironhack.png",
  "js.png",
  "mongoDB.png",
  "node.png",
  "penguin.png"
];

//Random cards
shuffle(imgs);
function shuffle(array) {
  var indice_atual = array.length,
    valor_temporario,
    indice_aleatorio;

  while (0 !== indice_atual) {
    indice_aleatorio = Math.floor(Math.random() * indice_atual);
    indice_atual -= 1;
    valor_temporario = array[indice_atual];
    array[indice_atual] = array[indice_aleatorio];
    array[indice_aleatorio] = valor_temporario;
  }
  return array;
}

//Pecorre cada item do array retornado a criação das divs contendo as cartas com seus atributos e armazena na variável cardsIntoHmtl
imgs.forEach(img => {
  cardsIntoHtml += `<div class = "memory-card" data-card = "${img}"/>
    <img class = "front-face" src = "img/${img}"/>
    <img class="back-face"/>
  </div>`;
});

/* Renderiza todas as cartas geradas no forEach dentro do HTML
  Retorna o valor das imagens duplicadas de 6 para 12 */
boardCards.innerHTML = cardsIntoHtml + cardsIntoHtml;

/** Fim da Renderização HTML */

//Contagem do sangue na tela
function blood() {
  let counter = 0;
  let auxCounter = 0;
  let memoryCard = document.querySelectorAll(".memory-card");
  memoryCard.forEach(img => {
    img.addEventListener("click", function() {
      auxCounter += 1;
      if (auxCounter % 2 === 0) {
        counter += 1;
        document.querySelector("#health").innerHTML = counter;

        let healthDown = 20;
        healthDown -= counter;

        if (counter === 21) {
          counter = 0;
          auxCounter = 0;
          document.querySelector("#health").innerHTML = 0;

          gameOver();
        }

        if (healthDown === 16) {
          document.getElementById("blood").src = "./img/health-76.png";

          document.getElementById("toasty-opacity").className = "toasty-1";
        }

        if (healthDown === 13) {
          toasty.innerHTML = ``;
          toasty.innerHTML = `<img id="toasty-opacity" class=" " src="img/toasty.png" alt="toasty">`; /*  */
        }

        if (healthDown === 12) {
          document.querySelector(".blood").src = "./img/health-52.png";

          document.getElementById("toasty-opacity").className = "toasty-1";
          /* toasty.setAttribute('class', 'toasty-3'); */
        }

        if (healthDown === 10) {
          toasty.innerHTML = ``;
          toasty.innerHTML = `<img id="toasty-opacity" class=" " src="img/toasty.png" alt="toasty">`; /*  */
        }

        if (healthDown === 9) {
          document.querySelector(".blood").src = "./img/health-28.png";
          document.getElementById("toasty-opacity").className = "toasty-1";
        }

        if (healthDown === 6) {
          toasty.innerHTML = ``;
          toasty.innerHTML = `<img id="toasty-opacity" class=" " src="img/toasty.png" alt="toasty">`; /*  */
        }

        if (healthDown === 5) {
          document.querySelector(".blood").src = "./img/health-4.png";
          document.getElementById("toasty-opacity").className = "toasty-1";
        }

        if (healthDown === 1) {
          toasty.innerHTML = ``;
          toasty.innerHTML = `<img id="toasty-opacity" class=" " src="img/toasty.png" alt="toasty">`;
        }

        if (healthDown === 0) {
          document.querySelector(".blood").src = "./img/health-0.png";

          document.getElementById("toasty-opacity").className = "toasty-1";
        }
      }
    });
  });
}
blood();

const cards = document.querySelectorAll(".memory-card");

//Virar a carta
function flipCard() {
  if (lockCards) return false;
  this.classList.add("flip");

  if (!firstCard) {
    firstCard = this;
    return false;
  }

  secondCard = this;

  checkForMatch();
}

let countPairCards = 0;

//Verificar igualdade
function checkForMatch() {
  let isMatch = firstCard.dataset.card === secondCard.dataset.card;

  !isMatch ? unFlipCards() : resetCards(isMatch);

  if (isMatch) {
    countPairCards += 1;
  }

  if (countPairCards === 6) {
    winner();
  }
}

//Desvira as cartas diferentes
function unFlipCards() {
  lockCards = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetCards();
  }, 1000);
}

//Limpa todas as variáveis para nova jogada
function resetCards(isMatch = false) {
  if (isMatch) {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
  }
  [firstCard, secondCard, lockCards] = [null, null, false];
}

cards.forEach(card => card.addEventListener("click", flipCard));

//Renderiza Texto GAME OVER ao chegar em 20 Rounds
function gameOver() {
  toasty.innerHTML = ``;
  toasty.innerHTML = `<img id="toasty-opacity" class=" " src="img/toasty.png" alt="toasty">`;
  document.getElementById("toasty-opacity").className = "toasty-1";

  let gameOverHTML = document.getElementById("renderEndGame");

  gameOverHTML.innerHTML = `<div id="game-over">
  <span>
    GAME OVER
    <img class="imagesEnd" src="./img/cerebro-triste.png" />
    <h3 style="font-size: 5vw;">
      Try Again
    </h3>
    </span>
  </div>`;

  gameOverHTML.addEventListener("click", function() {
    location.reload();
  });
}

//Campeão
function winner() {
  toasty.innerHTML = ``;
  toasty.innerHTML = `<img id="toasty-opacity" class=" " src="img/winner.png" alt="toasty">`;
  document.getElementById("toasty-opacity").className = "toasty-win";

  let champion = document.getElementById("renderEndGame");

  champion.innerHTML = `<div id="game-over">
  <span style="color: yellow;"/>
    YOU WIN!!
    <img class="imagesEnd" src="./img/champion.png"/>
    <h6 style="font-size: 5vw;">
      play again
    </h6>
    </span>
  </div>`;

  champion.addEventListener("click", function() {
    location.reload();
  });
}
