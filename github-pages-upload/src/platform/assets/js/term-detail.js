(function () {
  function toList(items, emptyText) {
    if (!items || !items.length) {
      return '<li>' + window.AssetPlatformData.escapeHtml(emptyText) + "</li>";
    }

    return items.map(function (item) {
      var label = window.AssetPlatformData.escapeHtml(item.label || item.prefLabel || item.id || "");
      var uri = window.AssetPlatformData.escapeHtml(item.uri || item.type || "");
      var link = item.uri ? '<a href="' + uri + '">' + label + "</a>" : label;

      return '<li><span class="related-link"><strong>' +
        link +
        "</strong><small>" +
        uri +
        "</small></span></li>";
    }).join("");
  }

  function renderMetaList(root, detail) {
    root.innerHTML =
      "<dt>Status</dt><dd>" + window.AssetPlatformData.escapeHtml(detail.status || "") + "</dd>" +
      "<dt>Voorkeurslabel</dt><dd>" + window.AssetPlatformData.escapeHtml(detail.prefLabel || "") + "</dd>" +
      "<dt>Alternatieve labels</dt><dd>" + window.AssetPlatformData.escapeHtml((detail.altLabels || []).join(", ") || "Geen") + "</dd>" +
      "<dt>Bronsysteem</dt><dd>" + window.AssetPlatformData.escapeHtml(detail.sourceSystem || "") + "</dd>" +
      "<dt>Laatst bijgewerkt</dt><dd>" + window.AssetPlatformData.escapeHtml(detail.lastUpdated || "") + "</dd>";
  }

  function renderSources(root, detail, mapping) {
    var items = [
      { label: "URI", value: detail.uri },
      { label: "Conceptschema", value: detail.conceptScheme },
      { label: "Semantische graph", value: mapping.graph },
      { label: "Bronendpoint", value: mapping.endpoint }
    ];

    root.innerHTML = items.map(function (item) {
      return "<li><span class=\"source-label\">" +
        window.AssetPlatformData.escapeHtml(item.label) +
        "</span><span class=\"u-uri\">" +
        window.AssetPlatformData.escapeHtml(item.value || "Nog niet gekoppeld") +
        "</span></li>";
    }).join("");
  }

  function fetchTerms(root, detailData) {
    var files = (root.getAttribute("data-term-data-files") || "").split(",").map(function (item) {
      return item.trim();
    }).filter(Boolean);

    if (detailData && (detailData.begrip || detailData.begrippen)) {
      return Promise.resolve(detailData);
    }

    if (!files.length) {
      return Promise.resolve(detailData);
    }

    return Promise.all(files.map(function (file) {
      return fetch(file).then(function (response) {
        return response.ok ? response.json() : { begrippen: [] };
      }).catch(function () {
        return { begrippen: [] };
      });
    })).then(function (items) {
      return {
        begrippen: items.reduce(function (all, item) {
          return all.concat(item.begrippen || []);
        }, [])
      };
    });
  }

  function inferFamily(detail) {
    var page = detail.familyPage || "";

    if (page.indexOf("watergangen") !== -1) {
      return "Watergangen";
    }
    if (page.indexOf("kunstwerken") !== -1) {
      return "Kunstwerken";
    }
    if (page.indexOf("meet-en-karteerbegrippen") !== -1) {
      return "Meet- en karteerbegrippen";
    }

    return "";
  }

  function render() {
    var root = document.querySelector("[data-term-detail]");
    var detailData;
    var mappingData;
    var detail;
    var terms;
    var selectedSlug;
    var mapping;

    if (!root || !window.AssetPlatformData || !window.AssetLinkedDataPanel) {
      return;
    }

    detailData = window.AssetPlatformData.readJsonScript("term-detail-data");
    mappingData = window.AssetPlatformData.readJsonScript("term-mapping-data");
    mapping = mappingData || {};

    fetchTerms(root, detailData).then(function (resolvedData) {
      terms = resolvedData && resolvedData.begrippen ? resolvedData.begrippen : null;
      selectedSlug = new URLSearchParams(window.location.search).get("term");
      detail = resolvedData && resolvedData.begrip ? resolvedData.begrip : null;

      if (!detail && terms && terms.length) {
        detail = terms.find(function (item) {
          return item.slug === selectedSlug;
        }) || terms[0];
      }

      if (!detail) {
        return;
      }

      document.getElementById("term-title").textContent = detail.prefLabel || "Begrip";
      document.getElementById("term-summary").textContent = detail.definition || "";
      document.getElementById("term-status").textContent = detail.status || "Concept";
      document.getElementById("term-definition").textContent = detail.definition || "";
      document.getElementById("term-scope-note").textContent = detail.scopeNote || "Geen extra toelichting beschikbaar.";
      document.getElementById("term-edg-note").textContent = mapping.summary || "";
      document.title = (detail.prefLabel || "Begrip") + " | Woordenboek | Datastandaard | asset.waterschaplimburg.nl";

      if (detail.familyPage) {
        var overviewHref = "./index.html";
        var family = inferFamily(detail);

        if ((detail.conceptScheme || "").indexOf("Watersysteem") !== -1 || family) {
          overviewHref += "?systeem=Watersysteem";
          if (family) {
            overviewHref += "&familie=" + encodeURIComponent(family);
          }
        }

        document.querySelector(".breadcrumb li:last-child span").textContent = detail.prefLabel || "Begripdetail";
        document.querySelector(".detail-actions .button-primary").setAttribute("href", overviewHref);
        document.querySelector(".detail-actions .button-primary").textContent = "Terug naar begrippenlijst";
      }

      renderMetaList(document.getElementById("term-meta"), detail);
      document.getElementById("term-broader").innerHTML = toList(detail.broader, "Geen bredere begrippen gekoppeld.");
      document.getElementById("term-narrower").innerHTML = toList(detail.narrower, "Geen nauwere begrippen gekoppeld.");
      document.getElementById("term-related").innerHTML = toList(detail.related, "Geen gerelateerde begrippen gekoppeld.");
      renderSources(document.getElementById("term-sources"), detail, mapping);
      window.AssetLinkedDataPanel.render(document.getElementById("term-linked-data"), detail);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
}());

