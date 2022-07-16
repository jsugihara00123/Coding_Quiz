var questions = [
  {
      title: "Commonly used data types DO NOT include:",
      choices: ["1. Strings", "2. Booleans", "3. Alerts", "4. Numbers"],
      answer: "3. Alerts"
  },
  {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["1. Quotes", "2. Curly brackets", "3. Parentheses", "4. Square brackets"],
      answer: "3. Parentheses"
  },
  {
      title: "Arrays in Javascript can be used to store ____.",
      choices: ["1. Numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
      answer: "4. all of the above"
  },
  {
      title: "String values must be enclosed within ____ when being assigned to variables.",
      choices: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
      answer: "3. quotes"
  },
  {
      title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
      choices: ["1. Javascript", "2. terminal / bash", "3. for loops", "4. console log"],
      answer: "4. console log"
  },

];
var score = 0;
var questionIndex = 0;



var currentTime = document.querySelector("#timer");
var timer = document.querySelector("#startBtn");
var questionsDiv = document.querySelector("#questionsDiv");

var timeLeft = 60;
var penalty = 10;
var holdInterval = 0;

var createUl = document.createElement("ul");


timer.addEventListener("click", function () {

  if (holdInterval === 0) {
      holdInterval = setInterval(function () {
          timeLeft--;
          currentTime.textContent = "Time Left: " + timeLeft;

          if (timeLeft <= 0) {
              clearInterval(holdInterval);
              allDone();
              currentTime.textContent = "Time's up!";
          }
      }, 1000);
  }
  render(questionIndex);
});


function render(questionIndex) {
  createUl.innerHTML = "";
  questionsDiv.innerHTML = "";

  for (var i = 0; i < questions.length; i++) {
      var userQuestion = questions[questionIndex].title;
      var userChoices = questions[questionIndex].choices;
      questionsDiv.textContent = userQuestion;
  }
  userChoices.forEach(function (newItem) {
      var listItem = document.createElement("li");
      listItem.textContent = newItem;
      questionsDiv.appendChild(createUl);
      createUl.appendChild(listItem);
      listItem.addEventListener("click", (compare));
  })
}
function compare(event) {
  var element = event.target;

  if (element.matches("li")) {

      var createDiv = document.createElement("div");
      createDiv.setAttribute("id", "createDiv");

      if (element.textContent == questions[questionIndex].answer) {
          score++;
          createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;

        } else {

            timeLeft = timeLeft - penalty;
          createDiv.textContent = "Incorrect! The correct answer is:  " + questions[questionIndex].answer;
      }

  }

  questionIndex++;

  if (questionIndex >= questions.length) {

    allDone();
      createDiv.textContent = "This is the End of the Quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
  } else {
      render(questionIndex);
  }
  questionsDiv.appendChild(createDiv);

}

function allDone() {
  questionsDiv.innerHTML = "";
  currentTime.innerHTML = "";


  var createH1 = document.createElement("h1");
  createH1.setAttribute("id", "createH1");
  createH1.textContent = "All Done!"

  questionsDiv.appendChild(createH1);


  var createP = document.createElement("p");
  createP.setAttribute("id", "createP");

  questionsDiv.appendChild(createP);


  if (timeLeft >= 0) {
      var timeRemaining = timeLeft;
      var createP2 = document.createElement("p");
      clearInterval(holdInterval);
      createP.textContent = "Your final score is: " + timeRemaining;

      questionsDiv.appendChild(createP2);
  }


  var createLabel = document.createElement("label");
  createLabel.setAttribute("id", "createLabel");
  createLabel.textContent = "Enter your initials: ";

  questionsDiv.appendChild(createLabel);

  
  var createInput = document.createElement("input");
  createInput.setAttribute("type", "text");
  createInput.setAttribute("id", "initials");
  createInput.textContent = "";

  questionsDiv.appendChild(createInput);


  var createSubmit = document.createElement("button");
  createSubmit.setAttribute("type", "submit");
  createSubmit.setAttribute("id", "Submit");
  createSubmit.textContent = "Submit";

  questionsDiv.appendChild(createSubmit);


  createSubmit.addEventListener("click", function () {
      var initials = createInput.value;

      if (initials === null) {

          console.log("No value entered!");

      } else {
          var finalScore = {
            score: timeRemaining,  
            initials: initials,
              
          }
          console.log(finalScore);
          var scores = localStorage.getItem("scores");
          if (scores === null) {
              scores = [];
          } else {
              scores = JSON.parse(scores);
          }
          scores.push(finalScore);
          var newScore = JSON.stringify(scores);
          localStorage.setItem("scores", newScore);

          window.location.replace("./assets/index2.html");
      }
  });

}


