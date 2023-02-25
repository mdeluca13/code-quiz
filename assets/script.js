//Setting variables
var timer = document.getElementById("timer");
var quizStart = document.getElementById("start");
var secondsLeft = 75;
var timerShown = 0;
var pages = document.querySelectorAll(".pages");
var main = document.getElementById("main");
var question1 = document.getElementById("question-1");
var question2 = document.getElementById("question-2");
var question3 = document.getElementById("question-3");
var question4 = document.getElementById("question-4");
var question5 = document.getElementById("question-5");
var endQuiz = document.getElementById("end-quiz");
var highScore = document.getElementById("high-score");
var resultWrong = document.getElementById("result-wrong");
var resultRight = document.getElementById("result-right");
var finalScore = document.getElementById("final-score");
var right = document.querySelectorAll(".right");
var wrong = document.querySelectorAll(".wrong");
var submit = document.getElementById("submit");
var goBack = document.getElementById("go-back");
var highScoreButton = document.getElementById("high-score-button");
var initials = document.getElementById("initials");
var displayHighScore = document.getElementById("display-high-score-item");

// timer function 
function setTime() {
    var timerInterval = setInterval(function() {
        timer.textContent = "Seconds Left: " + secondsLeft;
        secondsLeft--;
        if (secondsLeft < 0) {
            clearInterval(timerInterval);
            for (var i = 0; i < pages.length; i++) {
                pages[i].setAttribute("style", "display: none");
                pages[i].dataset.state = "hidden";
                endQuiz.setAttribute("style", "");
                endQuiz.dataset.state = "shown";
            }
        }
        if (endQuiz.dataset.state === "shown") {
            clearInterval(timerInterval);
            secondsLeft++;
            finalScore.textContent = "Your final score is " + secondsLeft + ".";
        }
    }, 1000);
}

// Setting timer to - 10 when incorrect answer selected
function setTimerText() {
    timer.textContent = "Seconds Left: " + secondsLeft;
  }

// loops event listener on wrong answer
for (i = 0; i < wrong.length; i++) {
    wrong[i].addEventListener("click", function (){
        secondsLeft = secondsLeft - 10;
        nextPage();
        setTimerText();
        resultWrong.setAttribute("style", "");
        hideResultWrong();
    })
}
// loops event listener on correct answer
for (i = 0; i < right.length; i++) {
    right[i].addEventListener("click", function (){
        nextPage();
        resultRight.setAttribute("style", "");
        hideResultRight();
    })
}

//Hides wrong result after 2 seconds
function hideResultWrong() {
    var resultTime = setInterval(function() {
        timerShown++;
        if (timerShown === 2) {
            resultWrong.setAttribute("style", "display:none");
            clearInterval(resultTime);
            timerShown = 0;
        }
    }, 1000);
}

//Hides correct result after 2 seconds
function hideResultRight() {
    var resultTime = setInterval(function() {
        timerShown++;
        if (timerShown === 2) {
            resultRight.setAttribute("style", "display:none");
            clearInterval(resultTime);
            timerShown = 0;
        }
    }, 1000);
}

// next page function
function nextPage() {
    if (main.dataset.state === "shown") {
        main.setAttribute("style", "display:none");
        main.dataset.state = "hidden";
        question1.setAttribute("style", "");
        question1.dataset.state = "shown";
    }
    else if (question1.dataset.state === "shown") {
        question1.setAttribute("style", "display:none");
        question1.dataset.state = "hidden";
        question2.setAttribute("style", "");
        question2.dataset.state = "shown";
    }
    else if (question2.dataset.state === "shown") {
        question2.setAttribute("style", "display:none");
        question2.dataset.state = "hidden";
        question3.setAttribute("style", "");
        question3.dataset.state = "shown";
    }
    else if (question3.dataset.state === "shown") {
        question3.setAttribute("style", "display:none");
        question3.dataset.state = "hidden";
        question4.setAttribute("style", "");
        question4.dataset.state = "shown";
    }
    else if (question4.dataset.state === "shown") {
        question4.setAttribute("style", "display:none");
        question4.dataset.state = "hidden";
        question5.setAttribute("style", "");
        question5.dataset.state = "shown";
    }
    else if (question5.dataset.state === "shown") {
        question5.setAttribute("style", "display:none");
        question5.dataset.state = "hidden";
        endQuiz.setAttribute("style", "");
        endQuiz.dataset.state = "shown";
    }
    else if (endQuiz.dataset.state === "shown") {
        endQuiz.setAttribute("style", "display:none");
        endQuiz.dataset.state = "hidden";
        highScore.setAttribute("style", "");
        highScore.dataset.state = "shown";
    }
    else if (highScore.dataset.state === "shown") {
        highScore.setAttribute("style", "display:none");
        highScore.dataset.state = "hidden";
        main.setAttribute("style", "");
        main.dataset.state = "shown";
    }
}

// what will occur after start quiz button is clicked
quizStart.addEventListener("click", function() {
    nextPage();
    setTime();
});

// event listener on submit button for quiz end page
submit.addEventListener("click", function() {
    nextPage();
    // var list = [];
    var highScoreItem = {
        initials: initials.value,
        score: secondsLeft
    }
    localStorage.setItem("highScoreItem", JSON.stringify(highScoreItem));
    
    displayHighScore.textContent = highScoreItem.initials + " - " + highScoreItem.score;

    // var highScoreList = [];
    // // var highScoreItem = {
    // //     initials: initials.value,
    // //     score: secondsLeft
    // // }
    
    // highScoreList.push({initials: initials.value, score:secondsLeft});
    // localStorage.setItem("highScoreItem", JSON.stringify(highScoreList));

    // highScoreList = JSON.parse(localStorage.getItem("highScoreList"));

    // console.log(highScoreList)

    // localStorage.setItem("highScoreItem", JSON.stringify(highScoreItem));
    // console.log(highScoreItem);
    
    // var initials = document.getElementById("initials");
    // var highScoreItem = localStorage.setItem("highScoreItem", initials.value + " - " + secondsLeft);
    // console.log(highScoreItem);
})

// function addHighScore() {

// }

// event listener on go back button on high score page
goBack.addEventListener("click", function() {
    secondsLeft = 75;
    nextPage();
})

highScoreButton.addEventListener("click", function() {
    for (var i = 0; i < pages.length; i++) {
        pages[i].setAttribute("style", "display: none");
        pages[i].dataset.state = "hidden";
    }
    highScore.setAttribute("style", "");
    highScore.dataset.state = "shown";
})
