var buttonColours = ["red","blue","green","yellow"];
var userClickedPattern = [];
var gamePattern = [];

var level = 0;
var started =false;
$(document).on("keypress",function(){
    if(!started){
        $("#level-title").text("Level "+level)
        nextSequence();
    }
    started = true;
})

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

function nextSequence(){
    level++;
    $("#level-title").text("Level "+level);
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    play(randomChosenColour)
}


$(".btn").on("click" , function(e){
    //var userChosenColour = $(this).attr("id");
    var userChosenColour = e.target.id
    //or you can event it and event.target.id
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour)
    play(userChosenColour)
    checkAnswer(userClickedPattern.length-1);
})


function play(name){
    var sound = new Audio('sounds/'+name+'.mp3')
    sound.play(); 
}

function animatePress(currentColour){
    $("#"+ currentColour).addClass('pressed');
    setTimeout(() => {
        $("#"+ currentColour).removeClass('pressed');
    }, 100);
}


function checkAnswer(currentlevel) {
    if (userClickedPattern[currentlevel]==gamePattern[currentlevel]) {
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        $("body").addClass("game-over");
        play("wrong")
        setTimeout(() => {
            $("body").removeClass("game-over")
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart")
        startOver();
    }
}