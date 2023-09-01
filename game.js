var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var randomNumber;

var level = 0;
var started = false;

$(document).keydown(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var i = 1;
    while (i) {
        var rnd = Math.random();
        rnd *= 100;
        if (Math.floor(rnd) <= 3 && Math.floor(rnd) >= 0) {
            randomNumber = Math.floor(rnd);
            i = 0;
        }
    }
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    var audio = new Audio("./sounds/" + randomChosenColour + ".mp3");
    audio.play();
}

function playSound(name) {
    var audio1 = new Audio("./sounds/" + name + ".mp3");
    audio1.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");

    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {


        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
                nextSequence();
            }, 1000);

        }

    } else {

        var audio2 = new Audio("./sounds/wrong.mp3");
        audio2.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");

        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");

        function startOver() {
            level = 0;
            gamePattern = [];
            started = false;
        }

        startOver();
    }
}
