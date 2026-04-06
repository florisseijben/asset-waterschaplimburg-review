(function () {
  var tabsets = document.querySelectorAll("[data-tabset]");

  Array.prototype.forEach.call(tabsets, function (tabset) {
    var buttons = tabset.querySelectorAll("[role='tab']");
    var panels = tabset.querySelectorAll("[role='tabpanel']");
    var tabsetId = tabset.id || ("tabset-" + Math.random().toString(36).slice(2, 10));

    tabset.setAttribute("id", tabsetId);

    function buttonIndex(button) {
      return Array.prototype.indexOf.call(buttons, button);
    }

    function ownerForPanel(panel) {
      var owner = null;

      Array.prototype.some.call(buttons, function (item) {
        if (item.getAttribute("aria-controls") === panel.id) {
          owner = item;
          return true;
        }

        return false;
      });

      return owner;
    }

    function activateTab(button, options) {
      var settings = options || {};
      var targetId = button.getAttribute("aria-controls");

      Array.prototype.forEach.call(buttons, function (item, index) {
        if (!item.id) {
          item.id = tabsetId + "-tab-" + (index + 1);
        }

        item.setAttribute("aria-selected", item === button ? "true" : "false");
        item.setAttribute("tabindex", item === button ? "0" : "-1");
      });

      Array.prototype.forEach.call(panels, function (panel) {
        var owner = ownerForPanel(panel);

        if (owner && !panel.getAttribute("aria-labelledby")) {
          panel.setAttribute("aria-labelledby", owner.id);
        }

        panel.hidden = panel.id !== targetId;
      });

      if (settings.moveFocus) {
        button.focus();
      }
    }

    function focusTabByOffset(currentButton, offset) {
      var currentIndex = buttonIndex(currentButton);
      var nextIndex = (currentIndex + offset + buttons.length) % buttons.length;
      var nextButton = buttons[nextIndex];

      activateTab(nextButton, { moveFocus: true });
    }

    function focusBoundaryTab(index) {
      var targetButton = buttons[index];

      if (!targetButton) {
        return;
      }

      activateTab(targetButton, { moveFocus: true });
    }

    Array.prototype.forEach.call(buttons, function (button) {
      button.addEventListener("click", function () {
        activateTab(button);
      });

      button.addEventListener("keydown", function (event) {
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          event.preventDefault();
          focusTabByOffset(button, 1);
          return;
        }

        if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          event.preventDefault();
          focusTabByOffset(button, -1);
          return;
        }

        if (event.key === "Home") {
          event.preventDefault();
          focusBoundaryTab(0);
          return;
        }

        if (event.key === "End") {
          event.preventDefault();
          focusBoundaryTab(buttons.length - 1);
        }
      });
    });

    Array.prototype.forEach.call(buttons, function (button, index) {
      if (!button.id) {
        button.id = tabsetId + "-tab-" + (index + 1);
      }
    });

    Array.prototype.forEach.call(panels, function (panel) {
      var owner = ownerForPanel(panel);

      if (owner && !panel.getAttribute("aria-labelledby")) {
        panel.setAttribute("aria-labelledby", owner.id);
      }
    });

    Array.prototype.some.call(buttons, function (button) {
      if (button.getAttribute("aria-selected") === "true") {
        activateTab(button);
        return true;
      }

      return false;
    });

    if (buttons.length && !Array.prototype.some.call(buttons, function (button) {
      return button.getAttribute("aria-selected") === "true";
    })) {
      activateTab(buttons[0]);
    }
  });
}());
