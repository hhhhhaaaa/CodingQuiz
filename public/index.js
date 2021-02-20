// Listing of general use variables
const begin = $("#begin");
const clear = $(".clear");
const container = $(".section");
const end = $("#end")
const finalScore = $(".highscore");
const hp = $(".highscoresPage");
const hpLink = $(".hpLink");
const initials = $("#initials");
const qp = $(".quizPage");
const qpLink = $(".qpLink");
const scoreboard = $("#scoreboard")
const submission = $("#submission");
const time = $(".time");

// Array used to manage sections
const buttonArray = [
  begin, $("#question1"), $("#question2"), $("#question3"), $("#question4"), $("#question5"),
  end
]

// Variables to manage the score, highscore, timer, and submitArray respectively
let score = 0;
let highscore = 0;
let timer = 60;
let submitArray = [];

/**
 * Upon clicking on the Begin button...
 * throughEnd() is called (see throughEnd for details)
 * The interval to check on the timer is started.
 * Runs checks to make sure the end isn't here yet, else stopping the interval.
 * Decreases the timer.
 * Sets timer to be seen.
 * If the timer hits 0, sets up the End and stops the interval.
*/
begin.on("click", function (event) {
  throughEnd();
  // console.log("Begin click");
  const beginning = setInterval(() => {
    const endTime = end.data("visible");
    // console.log("Running");
    if (endTime === "visible") {
      // console.log("done");
      clearInterval(beginning);
    }
    timer--;
    if (timer > 0) {
      time.text(timer);
    } else if (timer === 0) {
      clearInterval(beginning);
      time.text(0);
      for (let i = 1; i < 6; i++) {
        buttonArray[i].data("visible", "hidden");
        buttonArray[i].css("display", "none");
        end.data("visible", "visible");
        end.css("display", "inline");
      }
      return;
    }
  }, 1000);
});

/**
 * Upon clicking inside the questions...
 * Runs through the buttonArray, making sure nothing is undefined
 * And making sure a button is pressed
 * If it is, then the current section is made invisible and
 * the next immediate section is made visible
 */
container.on("click", function (event) {
  // General use variables
  const element = $(event.target).parent();
  const button = $(event.target);
  const win = $(".win");
  const lose = $(".lose");
  for (let i = 0; i < buttonArray.length; i++) {
    // console.log("still running");
    if (element.is(undefined)) {
       return;
     } else if ((element.is(buttonArray[i])) && (button.is("button"))) {
       // console.log("Match");
       buttonArray[i + 1].data("visible", "visible");
       buttonArray[i + 1].css("display", "inline");
       element.data("visible", "hidden");
       element.css("display", "none");
    }
  }
  /**
   * If the answer is correct, it shows so and adds to the score
   * If it is not, it subtracts time from the timer
   */
  if (button.is(".correct")) {
    win.css("display", "inline");
    setTimeout(function () {
      win.css("display", "none");
    },
      1000
    );
    return score++;
  } else if (button.is(".incorrect")) {
    lose.css("display", "inline");
    setTimeout(function () {
      lose.css("display", "none");
    },
      1000
    );
    
    return timer = timer - 5;
  }
});

/**
 * A function, to setup an interval
 * Said interval constantly checks for the end, to submit the
 * final score and end the interval
 */
function throughEnd() {
const findEnd = setInterval(() => {
  const endTime = end.data("visible");
  const countdown = time.text();
  if (endTime === "visible") {
    clearInterval(findEnd);
    const finish = countdown * score;
    let highscore = finish;
    finalScore.text(highscore);
    return highscore;
  }
}, 1000);
  }

  /**
   * On click of the submission button...
   * Pushes the score to the submitArray so it can
   * be shown on the highscore board.
   * Mostly resets everything to initial values
   * afterwards.
   */
submission.on("click", () => {
  const inputText = initials.val();
  const inputNumber = finalScore.text();
  submitArray.push(inputText + ": " + inputNumber);
  scoreboard.append("<li>" + submitArray[0] + "</li>");
  submitArray.pop();
  initials.val("");
  end.data("visible", "hidden");
  end.css("display", "none");
  begin.data("visible", "visible");
  begin.css("display", "inline");
  qp.css("display", "none");
  hp.css("display", "inline");
  score = 0;
  highscore = 0;
  timer = 60;
  time.text(60);
  return;
});

// Shows Quiz Page; Hides HS Page
qpLink.on("click", () => {
  if (hp.css("display", "inline")) {
    // console.log("HP Shown");
    hp.css("display", "none");
    qp.css("display", "inline");
  }
});

// Shows HS Page; Hides Quiz Page
hpLink.on("click", () => {
  if (qp.css("display", "inline")) {
    // console.log("QP Shown");
    qp.css("display", "none");
    hp.css("display", "inline");
  }
});

// Clear score button
clear.on("click", () => {
  submitArray = [];
  scoreboard.empty();
});