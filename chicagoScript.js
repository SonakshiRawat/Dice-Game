"use strict";

const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const rounds = document.querySelector(".round");

const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");

const dice1 = document.querySelector(".dice1");
const dice2 = document.querySelector(".dice2");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");

const modal1 = document.querySelector('.modal1');
const modal2 = document.querySelector('.modal2');
const modal3 = document.querySelector('.modal3');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');

const closeModal = function () {
    modal1.classList.add('hidden');
    modal2.classList.add('hidden');
    modal3.classList.add('hidden');

    overlay.classList.add('hidden');
  };


let scores, activePlayer, playing, round, currentScore;
const init = function () {
  scores = [0, 0];
  activePlayer = 0;
  playing = true;
  round = 2;
  rounds.textContent = "Round 2";

  player0.classList.add("player--active");
  player1.classList.remove("player--active");
  player1.classList.add("player--inactive");
  player0.classList.remove("player--inactive");
  score0.textContent = 0;
  score1.textContent=0;
  // dice1.classList.add("hidden");
 //dice2.classList.add("hidden");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  dice1.src = `dd1/dice1.png`;
  dice2.src = `dd1/dice1.png`;
};
init();

const switchPlayer = function () {
  round = activePlayer === 1 ? round + 1 : round;
  activePlayer = activePlayer === 0 ? 1 : 0;
  /*  if(round>12&&activePlayer==0){
        playing=false;
        btnRoll.addEventListener('click',openModal);
    }*/
  console.log("r=" + round);
  console.log("s1=" + scores[0]);
  console.log("s2=" + scores[1]);

  document.querySelector(".round").textContent = `Round ${round}`;

  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

btnRoll.addEventListener("click", function () {
  dice1.classList.remove("hidden");
  dice2.classList.remove("hidden");
  /*   playing=false;
        btnRoll.addEventListener('click',openModal);*/
  if (playing) {
    let d1 = Math.trunc(Math.random() * 6) + 1;
    dice1.src = `dd1/dice${d1}.png`;

    let d2 = Math.trunc(Math.random() * 6) + 1;
    dice2.src = `dd1/dice${d2}.png`;
    let d = d1 + d2;
    console.log("d=" + d);
    if (d === round) {
      scores[activePlayer] += 1;
      console.log(scores[activePlayer]);
      document.getElementById(`score--${activePlayer}`).textContent =
        scores[activePlayer];
    }

    if (round === 12 && activePlayer === 1) {
      playing = false;

      if (scores[0] > scores[1]) {
        modal1.classList.remove("hidden");
        
      }
       else if(scores[0] === scores[1]) {
        modal3.classList.remove("hidden");
      }
      else{
        modal2.classList.remove("hidden");   
      }
      overlay.classList.remove("hidden");
      round = 11;
    }

    switchPlayer();
  }
});

btnNew.addEventListener("click", init);
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal1.classList.contains('hidden') ||!modal2.classList.contains('hidden')||!modal3.classList.contains('hidden')) {
    closeModal();
  }
});