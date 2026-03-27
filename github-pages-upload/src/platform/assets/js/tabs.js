(function () {
  var tabsets = document.querySelectorAll("[data-tabset]");

  Array.prototype.forEach.call(tabsets, function (tabset) {
    var buttons = tabset.querySelectorAll("[role='tab']");
    var panels = tabset.querySelectorAll("[role='tabpanel']");

    function activateTab(button) {
      var targetId = button.getAttribute("aria-controls");

      Array.prototype.forEach.call(buttons, function (item) {
        item.setAttribute("aria-selected", item === button ? "true" : "false");
      });

      Array.prototype.forEach.call(panels, function (panel) {
        panel.hidden = panel.id !== targetId;
      });
    }

    Array.prototype.forEach.call(buttons, function (button) {
      button.addEventListener("click", function () {
        activateTab(button);
      });
    });
  });
}());
