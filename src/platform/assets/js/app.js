(function () {
  var root = document.documentElement;
  var productSearchIndex = {
    woordenboek: [
      { label: "Watergang", href: "watersysteem-watergangen.html" },
      { label: "Watervlakte", href: "watersysteem-watervlakten.html" },
      { label: "Waterbuffer", href: "watersysteem-waterbuffers.html" },
      { label: "Kunstwerk", href: "watersysteem-kunstwerken.html" },
      { label: "Terrein", href: "watersysteem-terreinen.html" },
      { label: "Terreininrichting", href: "watersysteem-terreininrichting.html" },
      { label: "Vegetatieobject", href: "watersysteem-vegetatieobjecten.html" },
      { label: "Waterkering", href: "waterkeringensysteem-waterkeringen.html" },
      { label: "Constructie", href: "waterkeringensysteem-constructies.html" },
      { label: "Groenobject", href: "waterkeringensysteem-groenobjecten.html" },
      { label: "RWZI", href: "afvalwaterketen-rwzis.html" },
      { label: "Rioolgemaal", href: "afvalwaterketen-rioolgemalen.html" },
      { label: "Transportleiding", href: "afvalwaterketen-transportleidingen.html" }
    ],
    objectenhandboek: [
      { label: "Watergang", href: "watersysteem-watergangen.html" },
      { label: "Watergangsectie", href: "watersysteem-watergangsectie.html" },
      { label: "Intersectie", href: "watersysteem-intersectie.html" },
      { label: "Watervlakte", href: "watersysteem-watervlakten.html" },
      { label: "Waterbuffer", href: "watersysteem-waterbuffers.html" },
      { label: "Kunstwerk", href: "watersysteem-kunstwerken.html" },
      { label: "Terrein", href: "watersysteem-terreinen.html" },
      { label: "Terreininrichting", href: "watersysteem-terreininrichting.html" },
      { label: "Vegetatieobject", href: "watersysteem-vegetatieobjecten.html" },
      { label: "Waterkering", href: "waterkeringensysteem-waterkeringen.html" },
      { label: "Waterkeringsectie", href: "waterkeringensysteem-waterkeringsectie.html" },
      { label: "Constructie", href: "waterkeringensysteem-constructies.html" },
      { label: "Groenobject", href: "waterkeringensysteem-groenobjecten.html" },
      { label: "RWZI", href: "afvalwaterketen-rwzis.html" },
      { label: "Rioolgemaal", href: "afvalwaterketen-rioolgemalen.html" },
      { label: "Transportleiding", href: "afvalwaterketen-transportleidingen.html" },
      { label: "Transportleidingsectie", href: "afvalwaterketen-transportleidingsectie.html" },
      { label: "Knooppunt", href: "afvalwaterketen-knooppunt.html" }
    ]
  };

  function normalize(value) {
    return (value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function getPageScope(path) {
    var match = path.match(/\/pages\/([^/]+)\.html$/);
    var slug = match && match[1];
    var families = ["watersysteem", "waterkeringensysteem", "afvalwaterketen"];
    var family;

    if (!slug) {
      return "";
    }

    family = families.find(function (item) {
      return slug === item || slug.indexOf(item + "-") === 0;
    });

    return family ? family + "-" : "";
  }

  function buildPlaceholder(product, items) {
    var labels = (items || []).slice(0, 3).map(function (item) {
      return item.label;
    });

    if (!labels.length) {
      return product === "woordenboek"
        ? "Zoek direct naar een begrip"
        : "Zoek direct naar een objecttype";
    }

    return product === "woordenboek"
      ? "Zoek direct naar een begrip, bijvoorbeeld " + labels.join(", ")
      : "Zoek direct naar een objecttype, bijvoorbeeld " + labels.join(", ");
  }

  function ensureSkipLink() {
    var body = document.body;
    var main = document.querySelector("main");
    var skipLink;

    if (!body || !main || body.querySelector(".skip-link")) {
      return;
    }

    if (!main.id) {
      main.id = "main-content";
    }

    skipLink = document.createElement("a");
    skipLink.className = "skip-link";
    skipLink.href = "#" + main.id;
    skipLink.textContent = "Spring naar inhoud";

    body.insertBefore(skipLink, body.firstChild);
  }

  function buildQuickSearch() {
    var path = window.location.pathname.replace(/\\/g, "/");
    var shell = document.querySelector(".shell");
    var hero = shell && shell.querySelector(".hero");
    var product;
    var items;
    var datalistId;
    var panel;
    var form;
    var field;
    var input;
    var button;
    var help;

    if (!shell || !hero) {
      return;
    }

    if (path.indexOf("/woordenboek/pages/") !== -1) {
      product = "woordenboek";
    } else if (path.indexOf("/objectenhandboek/pages/") !== -1) {
      product = "objectenhandboek";
    } else {
      return;
    }

    items = productSearchIndex[product];
    if (!items || !items.length) {
      return;
    }

    (function () {
      var scopePrefix = getPageScope(path);
      var scopedItems;

      if (!scopePrefix) {
        return;
      }

      scopedItems = items.filter(function (item) {
        return item.href.indexOf(scopePrefix) === 0;
      });

      if (scopedItems.length) {
        items = scopedItems;
      }
    }());

    datalistId = "quick-search-options-" + product;
    panel = document.createElement("section");
    panel.className = "quick-search-panel";
    panel.innerHTML = '<p class="eyebrow">Zoeken</p>';

    form = document.createElement("form");
    form.className = "quick-search-form";
    form.setAttribute("role", "search");

    field = document.createElement("div");
    field.className = "quick-search-field";

    input = document.createElement("input");
    input.id = "quick-search-input-" + product;
    input.type = "search";
    input.name = "q";
    input.setAttribute("list", datalistId);
    input.setAttribute("autocomplete", "off");
    input.setAttribute("aria-label", product === "woordenboek" ? "Zoek direct naar een begrip" : "Zoek direct naar een objecttype");
    input.placeholder = buildPlaceholder(product, items);

    button = document.createElement("button");
    button.className = "button button-primary";
    button.type = "submit";
    button.textContent = "Zoek";

    help = document.createElement("p");
    help.className = "quick-search-help";
    help.textContent = "";

    field.appendChild(input);
    form.appendChild(field);
    form.appendChild(button);
    panel.appendChild(form);
    panel.appendChild(help);

    (function () {
      var datalist = document.createElement("datalist");
      datalist.id = datalistId;

      items.forEach(function (item) {
        var option = document.createElement("option");
        option.value = item.label;
        datalist.appendChild(option);
      });

      panel.appendChild(datalist);
    }());

    form.addEventListener("submit", function (event) {
      var query = normalize(input.value);
      var exactMatch;
      var partialMatch;

      event.preventDefault();

      if (!query) {
        input.focus();
        return;
      }

      exactMatch = items.find(function (item) {
        return normalize(item.label) === query;
      });

      partialMatch = exactMatch || items.find(function (item) {
        return normalize(item.label).indexOf(query) !== -1 || query.indexOf(normalize(item.label)) !== -1;
      });

      if (partialMatch) {
        window.location.href = partialMatch.href;
        return;
      }

      help.textContent = "Geen directe match gevonden. Probeer een begrip, objecttype of systeemnaam.";
      input.focus();
      input.select();
    });

    hero.insertAdjacentElement("afterend", panel);
  }

  root.className += root.className ? " js" : "js";

  document.body.setAttribute("data-js", "ready");
  ensureSkipLink();
  buildQuickSearch();
}());
