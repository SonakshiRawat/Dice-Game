'use strict';
//selecting elements
const player0=document.querySelector('.player--0');
const player1=document.querySelector('.player--1');

const score0=document.querySelector('#score--0');
const score1=document.getElementById('score--1');
const current0=document.getElementById('current--0');
const current1=document.getElementById('current--1');

const dice=document.querySelector('.dice');
const btnNew=document.querySelector('.btn--new');
const btnRoll=document.querySelector('.btn--roll');
const btnHold=document.querySelector('.btn--hold');

//declare globally
let scores,currentScore,activePlayer,playing;
const init=function(){
//Starting conditions

scores = [0, 0];
currentScore = 0;
activePlayer = 0;
playing = true;

score0.textContent=0;
score1.textContent=0;
//current0.textContent=0;
//current1.textContent=0;



dice.classList.add('hidden');
player0.classList.remove('player--winner');
player1.classList.remove('player--winner');
player0.classList.add('player--active');
player1.classList.remove('player--active');
};
init();
const switchPlayer=function(){
    document.getElementById(`current--${activePlayer}`).textContent=0;
    currentScore=0;
    activePlayer=activePlayer===0?1:0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
}
 btnRoll.addEventListener('click',function(){
    if(playing){
        // 1.Generating a random dic roll
const d=Math.trunc(Math.random()*6)+1;

//2. Display dice
dice.classList.remove('hidden');
dice.src=`dd2/dice-${d}.png`;

//3. check for rolled 1
if(d!==1){
    //Add dice to score
    currentScore+=d;
 document.getElementById(`current--${activePlayer}`).textContent=currentScore;
}
else{
    //switch to next player
   switchPlayer();
}
 }
});

 btnHold.addEventListener('click',function(){
     if(playing){
     //1.Add score to active player
scores[activePlayer]+=currentScore;
console.log(scores[activePlayer]);
document.getElementById(`score--${activePlayer}`).textContent=scores[activePlayer];

//2.check if player score>=100
if(scores[activePlayer]>=20){
    //Finish the game
    playing=false;
    dice.classList.add('hidden');
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
}
else{
//3.Switch to next player
switchPlayer();
 }
}
 })

 btnNew.addEventListener('click',init)