(function () {
  var root = document.documentElement;

  function normalize(value) {
    return (value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function getSearchPageHref(path) {
    var marker = "/products/datastandaard/";
    var markerIndex = path.indexOf(marker);

    if (markerIndex === -1) {
      return "/pages/zoeken.html";
    }

    return path.slice(0, markerIndex) + "/pages/zoeken.html";
  }

  function getBreadcrumbTrail() {
    return Array.prototype.slice.call(document.querySelectorAll(".breadcrumb li")).map(function (item) {
      return String(item.textContent || "").replace(/\s+/g, " ").trim();
    }).filter(function (value) {
      return value && value !== "Home";
    });
  }

  function getQuickSearchConfig(path, trail) {
    var current = trail[trail.length - 1] || "asset.waterschaplimburg.nl";
    var contextItems = trail.slice(-3);
    var fallbackContext = contextItems.join(", ");

    if (path.indexOf("/pages/index.html") !== -1) {
      return {
        placeholder: "Zoek binnen asset.waterschaplimburg.nl, bijvoorbeeld watergang, AMP, OTL of governance",
        scope: ""
      };
    }

    if (path.indexOf("/pages/over-asset-waterschaplimburg.html") !== -1) {
      return {
        placeholder: "Zoek binnen Over deze website, bijvoorbeeld architectuur, roadmap of governance",
        scope: "Over deze website"
      };
    }

    if (path.indexOf("/products/datastandaard/pages/index.html") !== -1) {
      return {
        placeholder: "Zoek binnen Datastandaard, bijvoorbeeld watergang, objecttype, OTL of werkinstructie",
        scope: "Datastandaard"
      };
    }

    if (path.indexOf("/products/assetregister/pages/index.html") !== -1) {
      return {
        placeholder: "Zoek binnen Assetregister, bijvoorbeeld watergang, detail of locatie",
        scope: "Assetregister"
      };
    }

    if (path.indexOf("/products/assetmanagement/pages/index.html") !== -1) {
      return {
        placeholder: "Zoek binnen Assetmanagement, bijvoorbeeld AMP, proces, kader of rol",
        scope: "Assetmanagement"
      };
    }

    if (path.indexOf("/products/datastandaard/pages/over-de-datastandaard.html") !== -1) {
      return {
        placeholder: "Zoek binnen Over de datastandaard, bijvoorbeeld productvisie, OTL of governance",
        scope: "Over deze website > Over de datastandaard"
      };
    }

    if (path.indexOf("/products/datastandaard/woordenboek/pages/index.html") !== -1) {
      return {
        placeholder: "Zoek binnen Woordenboek, bijvoorbeeld watergang, watervlakte of rioolgemaal",
        scope: "Datastandaard > Woordenboek"
      };
    }

    if (path.indexOf("/products/datastandaard/objectenhandboek/pages/index.html") !== -1) {
      return {
        placeholder: "Zoek binnen Objectenhandboek, bijvoorbeeld watergangsectie, intersectie of kunstwerk",
        scope: "Datastandaard > Objectenhandboek"
      };
    }

    if (path.indexOf("/products/datastandaard/otl/pages/index.html") !== -1) {
      return {
        placeholder: "Zoek binnen OTL, bijvoorbeeld klasse, attribuut, package of watergang",
        scope: "Datastandaard > OTL"
      };
    }

    if (path.indexOf("/products/datastandaard/referentiedataset/pages/index.html") !== -1) {
      return {
        placeholder: "Zoek binnen Referentiedataset, bijvoorbeeld watergang, dataset of voorbeelddata",
        scope: "Datastandaard > Referentiedataset"
      };
    }

    if (path.indexOf("/products/datastandaard/werkinstructies/pages/index.html") !== -1) {
      return {
        placeholder: "Zoek binnen Werkinstructies, bijvoorbeeld meting, invulinstructie of codering",
        scope: "Datastandaard > Werkinstructies"
      };
    }

    return {
      placeholder: fallbackContext
        ? "Zoek binnen " + fallbackContext
        : "Zoek binnen " + current,
      scope: trail.join(" > ")
    };
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
    var trail = getBreadcrumbTrail();
    var config;
    var panel;
    var form;
    var field;
    var input;
    var button;

    if (!shell || !hero || path.indexOf("/pages/zoeken.html") !== -1 || shell.querySelector(".quick-search-panel")) {
      return;
    }

    config = getQuickSearchConfig(path, trail);
    panel = document.createElement("section");
    panel.className = "quick-search-panel";
    panel.innerHTML = '<p class="eyebrow">Zoeken</p>';

    form = document.createElement("form");
    form.className = "quick-search-form";
    form.setAttribute("role", "search");

    field = document.createElement("div");
    field.className = "quick-search-field";

    input = document.createElement("input");
    input.id = "quick-search-input";
    input.type = "search";
    input.name = "q";
    input.setAttribute("autocomplete", "off");
    input.setAttribute("aria-label", config.placeholder);
    input.placeholder = config.placeholder;

    button = document.createElement("button");
    button.className = "button button-primary";
    button.type = "submit";
    button.textContent = "Zoek";

    field.appendChild(input);
    form.appendChild(field);
    form.appendChild(button);
    panel.appendChild(form);

    form.addEventListener("submit", function (event) {
      var query = normalize(input.value);
      var searchHref;
      var targetUrl;

      event.preventDefault();

      if (!query) {
        input.focus();
        return;
      }

      searchHref = getSearchPageHref(path);
      targetUrl = new URL(searchHref, window.location.origin);
      targetUrl.searchParams.set("q", input.value);
      if (config.scope) {
        targetUrl.searchParams.set("scope", config.scope);
      }
      window.location.href = targetUrl.pathname + targetUrl.search;
    });

    hero.insertAdjacentElement("afterend", panel);
  }

  root.className += root.className ? " js" : "js";

  document.body.setAttribute("data-js", "ready");
  ensureSkipLink();
  buildQuickSearch();
}());
