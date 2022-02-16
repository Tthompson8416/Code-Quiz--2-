var userScore = document.querySelector("#score");
console.log(userScore);
var allScores = localStorage.getItem("allScores");
if (allScores === null) {
    allScores = [];
} else {
    allScores = JSON.parse(allScores);
}
// For loops
for (var i = 0; i < allScores.length; i++) {
    // Appends question title only

    var listElement = document.createElement("li")
    console.log(allScores);
    listElement.textContent = allScores[i].initials + "-" + allScores[i].score;

    userScore.appendChild(listElement)

}

