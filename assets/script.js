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
var clear = document.getElementById("clear");
var highScoreButton = document.getElementById("high-score-button");
var initials = document.getElementById("initials");
var displayHighScore = document.getElementById("display-high-score-item");
var tableDIV = document.getElementById("table");
var timerInterval; 
var localStorageData;

// timer function 
function setTime() {
    timerInterval = setInterval(function() {
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

// next page function to determine what page is shown and which are hidden
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


// event listener on submit button for quiz end page to save scores
submit.addEventListener("click", function() {
    nextPage();

    var highScoreItem = {
        initials: initials.value,
        score: secondsLeft
    }
    
    localStorageData = JSON.parse(localStorage.getItem('highScoreItem'));
    if (localStorageData === null) {

        localStorageData = [];
        localStorageData.push(highScoreItem);
    }
    else {
        localStorageData.push(highScoreItem);
    }
    localStorage.setItem("highScoreItem", JSON.stringify(localStorageData));
    getFromLocalStorage();
})

// function to display the highscores on the highscore page 
function getFromLocalStorage() {
    tableDIV.innerHTML = "";
    var table = document.createElement('table');

    var th1 = document.createElement('th');
    th1.innerHTML = "Rank";

    var th2 = document.createElement('th');
    th2.innerHTML = "Initials";

    var th3 = document.createElement('th');
    th3.innerHTML = "Score";
    table.append(th1, th2, th3);

    //if statements for 0 - 4 high scores to display sorted
    var storageData = JSON.parse(localStorage.getItem('highScoreItem'));
    if (storageData === null){
        return;
    }
    else if (storageData.length === 1) {

        var tr = document.createElement('tr');

        var td1 = document.createElement('td');
        td1.innerHTML = 1 + ".";

        var td2 = document.createElement('td');
        td2.innerHTML = storageData[0].initials;

        var td3 = document.createElement('td');
        td3.innerHTML = storageData[0].score;

        tr.append(td1,td2, td3);
        table.append(tr);
        tableDIV.append(table);
    }
    else if (storageData.length === 2) {
        var sortedData = storageData.sort(function(a, b){return b.score - a.score});
        for (var i = 0; i < 2; i++) {
            tr = document.createElement('tr');
    
            td1 = document.createElement('td');
            td1.innerHTML = i+1 + ".";
    
            td2 = document.createElement('td');
            td2.innerHTML = sortedData[i].initials;
    
            td3 = document.createElement('td');
            td3.innerHTML = sortedData[i].score;
    
            tr.append(td1,td2, td3);
            table.append(tr);
        }
    }
    else if (storageData.length === 3) {
        sortedData = storageData.sort(function(a, b){return b.score - a.score});
        for (var i = 0; i < 3; i++) {
            tr = document.createElement('tr');
    
            td1 = document.createElement('td');
            td1.innerHTML = i+1 + ".";
    
            td2 = document.createElement('td');
            td2.innerHTML = sortedData[i].initials;
    
            td3 = document.createElement('td');
            td3.innerHTML = sortedData[i].score;
    
            tr.append(td1,td2, td3);
            table.append(tr);
        }
    }
    else if (storageData.length === 4) {
        sortedData = storageData.sort(function(a, b){return b.score - a.score});
        for (var i = 0; i < 4; i++) {
            tr = document.createElement('tr');
    
            td1 = document.createElement('td');
            td1.innerHTML = i+1 + ".";
    
            td2 = document.createElement('td');
            td2.innerHTML = sortedData[i].initials;
    
            td3 = document.createElement('td');
            td3.innerHTML = sortedData[i].score;
    
            tr.append(td1,td2, td3);
            table.append(tr);
        }
    }
    // display top 5 scores sorted
    else if (storageData.length >= 5) {
        sortedData = storageData.sort(function(a, b){return b.score - a.score});
        for (var i = 0; i < 5; i++) {
            tr = document.createElement('tr');
    
            td1 = document.createElement('td');
            td1.innerHTML = i+1 + ".";
    
            td2 = document.createElement('td');
            td2.innerHTML = sortedData[i].initials;
    
            td3 = document.createElement('td');
            td3.innerHTML = sortedData[i].score;
    
            tr.append(td1,td2, td3);
            table.append(tr);
        }
    }
    tableDIV.append(table);
}


// event listener on go back button on high score page
goBack.addEventListener("click", function() {
    secondsLeft = 75;
    nextPage();
})

// event listener on high score button
highScoreButton.addEventListener("click", function() {
    clearInterval(timerInterval);
    for (var i = 0; i < pages.length; i++) {
        pages[i].setAttribute("style", "display: none");
        pages[i].dataset.state = "hidden";
    }
    highScore.setAttribute("style", "");
    highScore.dataset.state = "shown";
    getFromLocalStorage();
})

// event listener for clear high score button
clear.addEventListener("click", function() {
    localStorage.clear();
    getFromLocalStorage();
})
