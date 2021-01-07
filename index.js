var startBtn = document.getElementById("start-quiz")
var homeBtn = document.querySelector(".homeBtn");
var questionText = document.querySelector(".questionText");
var form = document.querySelector(".form");
var optionDiv = document.getElementById("options");
var nextBtn = document.getElementById("nextBtn");
var msgDiv = document.getElementById("msg");
var minutesDisplay = document.getElementById("minutes");
var secondsDisplay = document.getElementById("seconds");
var scoreSpan = document.getElementById("test-score");
var submitBtn = document.getElementById("submit-button");


var index = 0;
var answer;
var totalSecond = 120;
var secondsElapsed = 0;
var finalScore = 0;
var countdown;

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", function(event){
    event.stopPropagation();
    if (!(msgDiv.textContent)){
        secondsElapsed += 20;
    }
    renderQuestion()
});
submitBtn.addEventListener("click", function(event){
    event.stopPropagation();
    addScore();

    window.location.href = "./highScores.html";
})


function startQuiz(event){
    event.stopPropagation();
    document.getElementById("home").classList.add("display-none");
    document.getElementById("quiz").classList.remove("display-none");

    renderQuestion()
    startTimer()
}

function renderQuestion(){
    if (index >= quiz.length){
        clearInterval(countdown);
        stopTimer();
        renderFinishedScreen()
        return;
    }

    questionText.innerHTML = "";
    optionDiv.innerHTML = "";
    msgDiv.innerHTML = "";

    var question = quiz[index].question;
    var options = quiz[index].choices;
    answer = quiz[index].correct;
    index++;

    var text = document.createElement("div")
    text.setAttribute("id", "question-text")
    text.textContent =  question;
    questionText.append(text);

    var choiceBtn;
    for (var i = 0; i < options.length; i++){
       choiceBtn = document.createElement("button");
       choiceBtn.type = 'button';
       choiceBtn.id = 'choice' + (i+1);
       choiceBtn.value = options[i]
       choiceBtn.textContent = options[i];

       var br = document.createElement("br");

       optionDiv.append(choiceBtn);
       optionDiv.append(br);
    }
    optionDiv.addEventListener("click", checkAnswer);
}

function checkAnswer(event){
    event.preventDefault();
    if (!(event.target.matches("button"))){
        return 
    }
    var chosen = event.target.value;

    if (chosen !== answer){
        msgDiv.textContent = "Incorrect !";
        msgDiv.setAttribute("class", "incorrect");
        secondsElapsed += 20;
    }else{
        msgDiv.textContent = "Correct !"
        msgDiv.setAttribute("class", "correct");
    }
    this.removeEventListener("click", checkAnswer);
}

function getFormattedMinutes(){
    var secondsLeft =  totalSecond - secondsElapsed;
    var minutesLeft = Math.floor(secondsLeft/60);
    
    return minutesLeft;
}

function getFormattedSeconds(){
    var secondsLeft = (totalSecond-secondsElapsed) % 60;
    var formattedSeconds;

    if(secondsLeft < 10){
        formattedSeconds = "0"+ secondsLeft;
    }else{
        formattedSeconds = secondsLeft;
    }

    return formattedSeconds;
}

function startTimer(){
    countdown = setInterval(function(){
        secondsElapsed++;
        renderTime();
        if (secondsElapsed >= totalSecond){
            clearInterval(countdown);
            stopTimer();
            renderFinishedScreen();
        }
    },1000)

}

function stopTimer(){
    finalScore = totalSecond - secondsElapsed;
    totalSecond = 120;
    secondsElapsed= 0;

    minutesDisplay.textContent = getFormattedMinutes();
    secondsDisplay.textContent = getFormattedSeconds();
}

function renderFinishedScreen(){
    document.getElementById("quiz").classList.add("display-none");
    document.getElementById("submit-score").classList.remove("display-none");
    scoreSpan.textContent = "Your final score is " + finalScore;

}

function renderTime(){
    minutesDisplay.textContent = getFormattedMinutes();
    secondsDisplay.textContent = getFormattedSeconds();
}

function addScore(){
    var userName = document.getElementById("user-name").value;
    var newScore = {
        name: userName,
        score: finalScore,
    }
    var highScores = JSON.parse(localStorage.getItem("highScores")||"[]");
    var exist = false;
    for (highscore of highScores){
        if(userName === highscore.name){
            exist = true;
            highscore.score = (finalScore > highscore.score)? finalScore : highscore.score;
        }
    }
    if (!(exist)){
        highScores.push(newScore);
    }
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

var quiz = [
    {
        "question"		: 	"What is the HTML tag under which one can write the JavaScript code?",
        "choices"		: 	[
                                "A. <javascript> ",
                                "B. <scripted>",
                                "C. <script>",
                                "D. <js>"
                            ],
        "correct"		: 	"C. <script>",  
    },
    {
        "question"		: 	"Which of the following is the correct syntax to display “HelloWorld” in an alert box using JavaScript?",
        "choices"		: 	[
                                "A. alertbox(“HelloWorld”)",
                                "B. msg(“HelloWorld”)",
                                "C. msgbox(“HelloWorld”)",
                                "D. alert(“HelloWorld”)"
                            ],
        "correct"		: 	"D. alert(“HelloWorld”)",
    },
    {
        "question"		: 	"What is the correct syntax for referring to an external script called “index.js”?",
        "choices"		: 	[
                                "A. <script src=”index.js”>",
                                "B. <script href=”index.js”>",
                                "C. <script ref=”index.js”>",
                                "D. <script name=”index.js”>"
                            ],
        "correct"		: 	"A. <script src=”index.js”>",
    },
    {
        "question"		: 	"The external JavaScript file must contain <script> tag. True or False?",
        "choices"		: 	[
                                "A. True",
                                "B. False",
                            ],
        "correct"		: 	"B. False",  
    },
    {
        "question"		: 	"Which of the following is not a reserved word in JavaScript?",
        "choices"		: 	[
                                "A. interface",
                                "B. throws",
                                "C. program",
                                "D. short",
                            ],
        "correct"		: 	"C. program",  
    },

];



