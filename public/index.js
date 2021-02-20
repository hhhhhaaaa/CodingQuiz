const container = $(".bttn");

const buttonArray = [
  $("#begin"), $("#question1"), $("#question2"), $("#question3"), $("#question4"), $("#question5"),
  $("#question6"), $("#question7"), $("#question8"), $("#question9"), $("#question10"), $("#end")
]

container.on("click", function (event) {
  // console.log("Clicks");
  const element = $(event.target);
  for (let i = 0; i < buttonArray.length; i++) {
    console.log("still running");
    if (element.is(buttonArray[i])) {
      // console.log("Match");
      setTimeout(function () {
        buttonArray[i]
        buttonArray[i+1].css("visibility", "visible");
        buttonArray[i+1].data("visible", "visible");
      },
        5000);
      if (element.is("section")) {
          // console.log("Section");
          const state = element.attr("data-state");
          if (state === "hidden") {
            setTimeout(function () {
              // console.log("hidden");
              element.data("visible", "visible");
              element.css("visibility", "visible");
            },
              5000);
          } else {
            setTimeout(function () {
              // console.log("visible");
              element.css("visibility", "hidden");
              element.data("visible", "hidden");
            },
              5000);
          }
        }
      break;
    }
    
  }
});
