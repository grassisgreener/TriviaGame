var questions = [{
    question: "Who is this? ",
    choices: ["Frank Sinatra", "Seth McFarlane*", "Bing Cosby", "Fred Astaire"],
    correctAnswer: 1
}, {
    question: "Name this tune: ",
    // <iframe width="560" height="315" src="https://www.youtube.com/embed/41P4jHWRYYQ" frameborder="0" allowfullscreen></iframe>
    choices: ["Hi-Five", "New Edition", "Zapp and Roger*", "Shai"],
    correctAnswer: 2,
    hasAudio: true,
    // audioSource: (local path mp3 source)
}, {
    question: "Holiday was Madonna's first hit on the Billbaord Hot 100 Chart. In what Year was it released?",
    choices: ["1982", "1983*", "1980", "1985"],
    correctAnswer: 1
}, {
    question: "Name that Tune:",
    // <iframe width="560" height="315" src="https://www.youtube.com/embed/QQcQDbpDH_o" frameborder="0" allowfullscreen></iframe>",
    choices: ["Cinema", "I'll love you Forever", "Favorite Movie", "You are My Cinema"],
    correctAnswer: 0
    // hasAudio: true,
}, {
    question: "What famous actor played at the Continental Club?",
    choices: ["Dennis Quaid*", "Gynmeth Paltrow", "Jennifer Lopez", "Scarlet Johannson"],
    correctAnswer: 0
}];
// This is the html:
// <html>
// <body>
// <div id="container">
// <button id="play">Play Music</button>
// </div>
// </body>
// </html>
// This is the jquery:
// $('document').ready(function () {

// $('#play').click(function(){    
// var audio = {};
// audio["walk"] = new Audio();
// audio["walk"].src = "http://www.rangde.org/static/bell-ring-01.mp3"
// audio["walk"].addEventListener('load', function() {
// audio["walk"].play();
// });
// }); 
// });
var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;
var count = 10
var intervalStop

function timer() {
    intervalStop = setInterval(function() {
        console.log(count--)
        $("#timer1").html(count);
        if (count == 0) {
            console.log("Stop");
            $("#quizContainer").html("Game is Over!")
            stopTimer();
            displayCurrentQuestion();
            count = 10;
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(intervalStop)
}
$(document).ready(function() {

    // Display the first question
    displayCurrentQuestion();
    // setTimeout(displayCurrentQuestion, 5000);
    $(this).find(".quizMessage").hide();

    // On clicking next, display the next question
    // instead of on click for line 79, use timer // When timer goes to 0, append a new question here
    $(this).find(".nextButton").on("click", function() {
        if (!quizOver) {

            value = $("input[type='radio']:checked").val();

            if (value == undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } else {
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
                $(document).find(".quizMessage").hide();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }

                currentQuestion++; // Since we have already displayed the first question on DOM ready
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    //                    $(document).find(".nextButton").toggle();
                    //                    $(document).find(".playAgainButton").toggle();
                    // Change the text in the next button to ask if user wants to play again
                   
                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                }
            }
        } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });

});

// This displays the current question AND the choices
function displayCurrentQuestion() {
    timer();

    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // place button here IF question.hasAudio===true (when clicked plays audio)
    // Create Event Handler 

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}