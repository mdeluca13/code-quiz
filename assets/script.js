//Setting variables
var timer = document.getElementById("timer");
var quizStart = document.getElementById("start");
var secondsLeft = 75;
var questions = document.querySelectorAll(".questions");
var main = document.getElementById("main");
var question1 = document.getElementById("question-1");
var question2 = document.getElementById("question-2");
var question3 = document.getElementById("question-3");
var question4 = document.getElementById("question-4");
var question5 = document.getElementById("question-5");
var right = document.querySelectorAll(".right");

// hiding questions when on main page
for (var i = 0; i < questions.length; i++) {
    questions[i].setAttribute("style", "display: none");
}

// timer function 
function setTime() {
    var timerInterval = setInterval(function() {
        timer.textContent = "Seconds Left: " + secondsLeft;
        secondsLeft--;
        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            //display score page 
            //add score to high score
            //open page showing all done! your final score = __ enter initials text box
        }
    }, 1000);
}
// what will occur after start quiz button is clicked
quizStart.addEventListener("click", function() {
    setTime();
    main.setAttribute("style", "display:none");
    question1.setAttribute("style", "display: relative");
});

// add button clicks for each question
// if right is clicked then go to next question, display correct, add to score???? score is time left????, go to next question
// else >> wrong, minus 10 seconds from timer, display incorrect, go to next question