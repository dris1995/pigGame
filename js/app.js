/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScores, activePlayer, gamePlaying;

// start the game
init();

// show current score and dice image when roll dice button is pressed
document.querySelector(".btn-roll").addEventListener("click", function() {

  if(gamePlaying){
    // 1. Random number
    var dice = Math.floor(Math.random() * 6 + 1);

    // 2. Display the result
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";

    // 3. Update the round score if the rolled number was NOT A 1
    if (dice !== 1) {
      // Add score
      roundScores += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScores;
    } else {
      // Next players turn
      nextPlayerTurn();
      
    }
  }
  
});


// Add current score to the global score when the the HOLD button is pressed
document.querySelector('.btn-hold').addEventListener('click', function() {

  if(gamePlaying){
    // Add current score to global score
    scores[activePlayer] += roundScores;

    // Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // Check if the player won the game
    if(scores[activePlayer] >= 100 ) {
      document.querySelector('#name-' + activePlayer).textContent = 'WINNER!!!!';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    }else{
      // Next player turn
    nextPlayerTurn();
    }
      }
  
});


function nextPlayerTurn(){
  // Next players turn
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScores = 0;

  // Set the current score to 0
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  // Remove the active player status
  //document.querySelector(".player-0-panel").classList.remove("active");
  //document.querySelector(".player-1-panel").classList.add("active");
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  // Hide the dice
  //document.querySelector(".dice").style.display = "none";
}

// New game button
document.querySelector('.btn-new').addEventListener('click', init);
  
function init(){

  scores = [0, 0];
  roundScores = 0;
  activePlayer = 0; // 0 will be player 1 and 1 will be player 2
  gamePlaying = true;

  // Hide the dice and set all scores to 0
  document.querySelector(".dice").style.display = "none";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";


  // Change player name back
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  // Remove winner class
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  // Remove active  class
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  // Add active class to first player
  document.querySelector('.player-0-panel').classList.add('active');

}





//******************************************************************* */
var modal = document.getElementById("simpleModal");
var closeBtn = document.getElementsByClassName("closeBtn")[0];
var modalBtn = document.getElementById("btn-rule");

// Add Listeners
closeBtn.addEventListener("click", closeModal);
window.addEventListener("click", clickOutside);

// Add Listeners for  button
modalBtn.addEventListener("click", openModal);

// Function to open modal
function openModal() {
  modal.style.display = "block";
}

// Function to close modal
function closeModal() {
  modal.style.display = "none";
}

// Function to close modal if outside click
function clickOutside(e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
}