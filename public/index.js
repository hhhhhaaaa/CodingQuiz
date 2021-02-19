var container = document.querySelector(".container");

container.addEventListener("click", function(event) {
  var element = event.target;

  if (element.matches("div")) {
    var state = element.getAttribute("data-state");
    var numbah = element.getAttribute("data-number");

    if (state === "hidden") {
      element.dataset.state = "visible";
      element.setAttribute("data-state", "visible");
      element.innerHTML = numbah;
    } else {
      element.dataset.state = "hidden";
      element.innerHTML = null;
    }
  }
});
