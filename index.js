var userChoice;
var computerChoice;
var snakeAudio = new Audio("assets/sound/snake.mp3");
var gunAudio = new Audio("assets/sound/gun.mp3");
var waterAudio = new Audio("assets/sound/water.mp3");
var lostAudio = new Audio("assets/sound/lost.mp3");
var winAudio = new Audio("assets/sound/win.wav");
var round = 1;
var maxRounds = 5;
var userScore = 0;
var computerScore = 0;

function user(event) {
  userChoice = $(event.target).attr("id");
  return userChoice;
}

function computer() {
  var randomNumber = Math.floor(Math.random() * 3) + 1;
  switch (randomNumber) {
    case 1:
      computerChoice = "snake";
      break;
    case 2:
      computerChoice = "water";
      break;
    case 3:
      computerChoice = "gun";
      break;
    default:
      console.log("sorry");
      break;
  }
  return computerChoice;
}

function playSound(sound) {
  sound.play();
}

function resetGame() {
  $(".img, .title").fadeIn(1000);
  $("#header").text("CHOOSE YOUR SIDE");
}

function updateScores() {
  $("#user-score").text(userScore);
  $("#computer-score").text(computerScore);
}

function updateRoundCounter() {
  $("#round-counter").text(round);
}

function game() {
  $("#snake,#water,#gun").on("click", function (e) {
    if (round > maxRounds) {
      $("#header").text("Game Over! Refresh to play again.");
      return;
    }

    var usrChoice = user(e);
    var cmpChoice = computer();
    console.log(`Round ${round} - User: ${usrChoice}, Computer: ${cmpChoice}`);

    // Hide the third option
    $(".img, .title")
      .not(`#${usrChoice}, #${cmpChoice}, .${usrChoice}, .${cmpChoice}`)
      .fadeOut(1000);

    if (usrChoice == cmpChoice) {
      $("#header").text("TIE!");
    } else if (
      (usrChoice == "snake" && cmpChoice == "water") ||
      (usrChoice == "water" && cmpChoice == "gun") ||
      (usrChoice == "gun" && cmpChoice == "snake")
    ) {
      $("#header").text(`YOU WON!`);
      playSound(winAudio);
      userScore++;
    } else {
      $("#header").text(`YOU LOSE!`);
      playSound(lostAudio);
      computerScore++;
    }

    updateScores();

    if (round < maxRounds) {
      round++;
      updateRoundCounter();
      setTimeout(function () {
        resetGame();
      }, 2000);
    } else {
      setTimeout(function () {
        $("#header").text("Game Over! Refresh to play again.");
      }, 2000);
    }
  });
}

$(document).ready(function () {
  game();
});
