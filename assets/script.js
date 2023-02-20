//Setting timer
var timer = document.queryselector(".time");
var secondsLeft = 75;

function setTime() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timer.textContent = "Seconds Left: " + secondsLeft;
    }, 1000);

    // if (secondsLeft === 0) {
        //open page showing all done! your final score = __ enter initials text box
    //}
}
console.log(secondsLeft);
// setTime();
// Call setTime() on button click