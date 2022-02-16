var questions = [
    {
        title: "Can you pass a anonymous function as an argument to another function?",
        choices: ["True", "False",],
        answer: "True"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["Quotes", "Curly Brackets", "Parentheses", "Square Brackets"],
        answer: "Parentheses"
    },
    {
        title: "Which of the following type of variable is visible only within a function where it is defined?",
        choices: ["Local Variable", "Global Variable", "Both of the Above", "None of the Above"],
        answer: "Local Variable"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["Commas", "Curly brackets", "Quotes", "Parenthesis"],
        answer: "Quotes"
    },
    {
        title: "Inside which HTML element do we put the JavaScript?",
        choices: ["<js>", "<scripting>", "<javascript>", "<script>"],
        answer: "<script>"
    },

];
// Declared variables
var score = 0;
var questionIndex = 0;


var countdownTime = document.querySelector("#countdown-time");
var timer = document.querySelector("#start-quiz");
var quizQuestions = document.querySelector("#quiz-questions");
var wrapper = document.querySelector("#wrapper");

var secondsLeft = 90;
// interval time
var holdInterval = 0;
// penalty seconds for wrong answer
var penalty = 15;

var ulCreate = document.createElement("ul");

// Starts timer when button is clicked
timer.addEventListener("click", function () {

    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            countdownTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                countdownTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

// Renders questions and choices to page: 
function render(questionIndex) {

    quizQuestions.innerHTML = "";
    ulCreate.innerHTML = "";
    // For loops 
    for (var i = 0; i < questions.length; i++) {
        // Appends question title only
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        quizQuestions.textContent = userQuestion;
    }

    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        quizQuestions.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
// compare choices with answer
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // Correct condition 
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
            // Correct condition 
        } else {
            // Will deduct -5 seconds off secondsLeft for wrong answers
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }

    }

    questionIndex++;

    if (questionIndex >= questions.length) {
        // Quiz Completed! will append last page with user stats
        quizCompleted();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    quizQuestions.appendChild(createDiv);

}
function quizCompleted() {
    quizQuestions.innerHTML = "";
    countdownTime.innerHTML = "";


    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "Quiz Completed!"

    quizQuestions.appendChild(createH1);


    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    quizQuestions.appendChild(createP);


    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        quizQuestions.appendChild(createP2);
    }


    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    quizQuestions.appendChild(createLabel);


    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    quizQuestions.appendChild(createInput);


    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    quizQuestions.appendChild(createSubmit);

    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);

            window.location.replace("./Highscores.html");
        }

    });

}

