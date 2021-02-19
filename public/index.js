var container = $(".container");

container.addEventListener("click", function(event) {
  var element = event.target;

  if (element.matches("div")) {
    var state = element.getAttribute("data-state");
    if (state === "hidden") {
      element.dataset.state = "visible";
      element.setAttribute("data-state", "visible");
    } else {
      element.dataset.state = "hidden";
      element.innerHTML = null;
    }
  }
});
