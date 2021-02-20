const begin = $("#begin");
const container = $(".section");
const end = $("#end")
const finalScore = $(".highscore");
const initials = $("#initials");
const scoreboard = $("#scoreboard")
const submission = $("#submission");
const submitArray = [];
const time = $(".time");
const hpLink = $(".hpLink");
const qpLink = $(".qpLink");
const qp = $(".quizPage");
const hp = $(".highscoresPage");

const buttonArray = [
  begin, $("#question1"), $("#question2"), $("#question3"), $("#question4"), $("#question5"),
  end
]

let score = 0;
let highscore = 0;
let timer = 60;

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

container.on("click", function (event) {
  // console.log("Clicks");
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
  if (button.is(".correct")) {
    // console.log("correct");
    win.css("display", "inline");
    setTimeout(function () {
      win.css("display", "none");
    },
      1000
    );
    return score++;
  } else if (button.is(".incorrect")) {
    // console.log("incorrect");
    lose.css("display", "inline");
    setTimeout(function () {
      lose.css("display", "none");
    },
      1000
    );
    
    return timer = timer - 5;
  }
});


function throughEnd() {
const findEnd = setInterval(() => {
  const endTime = end.data("visible");
  const countdown = time.text();
  if (endTime === "visible") {
    // console.log("done");
    clearInterval(findEnd);
    const finish = countdown * score;
    let highscore = finish;
    finalScore.text(highscore);
    return highscore;
  }
}, 1000);
  }

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

qpLink.on("click", () => {
  if (hp.css("display", "inline")) {
    // console.log("HP Shown");
    hp.css("display", "none");
    qp.css("display", "inline");
  }
});

hpLink.on("click", () => {
  if (qp.css("display", "inline")) {
    // console.log("QP Shown");
    qp.css("display", "none");
    hp.css("display", "inline");
  }
});