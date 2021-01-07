var restartBtn = document.getElementById("restartQuiz");
var clearBtn = document.getElementById("clearScore");
var scoreList = document.getElementById("scores-list");

var highScores = JSON.parse(localStorage.getItem("highScores") || "[]");

highScores.sort(function(a,b){
    return b.score-a.score;
})

highScores.forEach(function(s){
    var newLi = document.createElement("li");
    newLi.textContent = s.name + " - "+ s.score;
    scoreList.append(newLi)
})

clearBtn.addEventListener("click", function(){
    localStorage.clear();
})

restartBtn.addEventListener("click", function(){
    history.back();
})

