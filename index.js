var userChoice;
var computerChoice;
var snakeAudio = new Audio("assets/sound/snake.mp3");
var gunAudio = new Audio("assets/sound/gun.mp3");
var waterAudio = new Audio("assets/sound/water.mp3");
var lostAudio = new Audio("assets/sound/lost.mp3");
var winAudio = new Audio("assets/sound/win.wav");

function user(event) {
  userChoice = $(event.target).attr("id");
  // console.log("User choice: " + userChoice);
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
  // console.log("Computer choice: " + computerChoice);
  return computerChoice;
}

function playSound(sound) {
  sound.play();
}

function game() {
  $("#snake,#water,#gun").one("click", function (e) {
    var usrChoice = user(e);
    var cmpChoice = computer();
    console.log(usrChoice);
    console.log(cmpChoice);

    if (usrChoice == "snake" && cmpChoice == "snake") {
      $("#gun,.gun,#water,.water").fadeOut(1000);
      $("#header").text("TIE!");
    } else if (usrChoice == "water" && cmpChoice == "water") {
      $("#gun,.gun,#snake,.snake").fadeOut(1000);
      $("#header").text("TIE!");
    } else if (usrChoice == "gun" && cmpChoice == "gun") {
      $("#snake,.snake,#water,.water").fadeOut(1000);
      $("#header").text("TIE!");
    } else if (usrChoice == "snake" && cmpChoice == "water") {
      $("#gun,.gun").fadeOut(1000);
      $("#header").text("YOU WON!");
      playSound(winAudio);
    } else if (usrChoice == "water" && cmpChoice == "gun") {
      $("#snake,.snake").fadeOut(1000);
      $("#header").text("YOU WON!");
      playSound(winAudio);
    } else if (usrChoice == "gun" && cmpChoice == "snake") {
      $("#water,.water").fadeOut(1000);
      $("#header").text("YOU WON!");
      playSound(winAudio);
    } else {
      if (usrChoice == "water" && cmpChoice == "snake") {
        $("#gun,.gun").fadeOut(1000);
        $("#header").text("YOU LOSE!");
        playSound(lostAudio);
      } else if (usrChoice == "gun" && cmpChoice == "water") {
        $("#snake,.snake").fadeOut(1000);
        $("#header").text("YOU LOSE!");
        playSound(lostAudio);
      } else {
        $("#water,.water").fadeOut(1000);
        $("#header").text("YOU LOSE!");
        playSound(lostAudio);
      }
    }
    $("#header").hide();
    setTimeout(function () {
      $("#header").fadeIn(100);
    }, 100);
  });
}

game();
