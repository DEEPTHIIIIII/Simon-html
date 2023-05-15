var gamePattern=[];
var userCreatedPattern=[];
var buttonColors=["red","blue","green","yellow"];
var level=0;var started=false;
$(document).keypress(function(){
                    if(!started)
                    {
                                        $("#level-title").text("Level "+level);
                                        nextSequence();
                                        started=true;
                    }
                   
});

$(".btn").click(function(){
                    var userChoosenColor=$(this).attr("id");
                    userCreatedPattern.push(userChoosenColor);
                    playSound(userChoosenColor);
                    animatePressed(userChoosenColor);
                    checkAnswer(userCreatedPattern.length-1);
});

function checkAnswer(currentLevel)
{
                    if(gamePattern[currentLevel] === userCreatedPattern[currentLevel])
                    {
                                        if(userCreatedPattern.length === gamePattern.length)
                                        {
                                                            setTimeout(function(){
                                                                                nextSequence();
                                                            },1000);
                                        }
                    }else
                    {
                                        playSound("wrong");
                                        $("body").addClass("game-over");
                                        $("#level-title").text("Game Over,Press any key to restart");
                                        setTimeout(function(){
                                                            $("body").removeClass("game-over");
                                        },200);
                                        reStart();

                    }

}

function nextSequence()
{
                    userCreatedPattern=[];
                    level++;
                    $("#level-title").text("level "+level);
                    var randomNumber=Math.floor((Math.random())*4);
                    var randomChosenColor=buttonColors[randomNumber];
                    gamePattern.push(randomChosenColor);

                    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
                    //var audio=new Audio('sounds/'+randomChosenColor+'mp3');
                    //audio.play();
                    playSound(randomChosenColor);
                    
}


function playSound(colorname)
{
                    var audio=new Audio("sounds/"+colorname+".mp3");
                    audio.play();
}

function animatePressed(currentColor)
{
                    
                    $("#"+currentColor).addClass("pressed");
                    setTimeout(function()
                    {
                                        $("#"+currentColor).removeClass("pressed");
                    },100);
}
function reStart()
{
                    level=0;
                    gamePattern=[];
                    started=false;
}