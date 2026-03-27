(function () {
  function toList(items, emptyText) {
    if (!items || !items.length) {
      return '<li>' + window.AssetPlatformData.escapeHtml(emptyText) + "</li>";
    }

    return items.map(function (item) {
      return '<li><span class="related-link"><strong>' +
        window.AssetPlatformData.escapeHtml(item.label || item.prefLabel || item.id || "") +
        "</strong><small>" +
        window.AssetPlatformData.escapeHtml(item.uri || item.type || "") +
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
      { label: "EDG graph", value: mapping.graph },
      { label: "EDG endpoint", value: mapping.endpoint }
    ];

    root.innerHTML = items.map(function (item) {
      return "<li><span class=\"source-label\">" +
        window.AssetPlatformData.escapeHtml(item.label) +
        "</span><span class=\"u-uri\">" +
        window.AssetPlatformData.escapeHtml(item.value || "Nog niet gekoppeld") +
        "</span></li>";
    }).join("");
  }

  function render() {
    var root = document.querySelector("[data-term-detail]");
    var detailData;
    var mappingData;
    var detail;
    var mapping;

    if (!root || !window.AssetPlatformData || !window.AssetLinkedDataPanel) {
      return;
    }

    detailData = window.AssetPlatformData.readJsonScript("term-detail-data");
    mappingData = window.AssetPlatformData.readJsonScript("term-mapping-data");
    detail = detailData && detailData.begrip ? detailData.begrip : null;
    mapping = mappingData || {};

    if (!detail) {
      return;
    }

    document.getElementById("term-title").textContent = detail.prefLabel || "Begrip";
    document.getElementById("term-summary").textContent = detail.definition || "";
    document.getElementById("term-status").textContent = detail.status || "Concept";
    document.getElementById("term-definition").textContent = detail.definition || "";
    document.getElementById("term-scope-note").textContent = detail.scopeNote || "Geen extra toelichting beschikbaar.";
    document.getElementById("term-edg-note").textContent = mapping.summary || "";

    renderMetaList(document.getElementById("term-meta"), detail);

    document.getElementById("term-broader").innerHTML = toList(detail.broader, "Geen bredere begrippen gekoppeld.");
    document.getElementById("term-narrower").innerHTML = toList(detail.narrower, "Geen nauwere begrippen gekoppeld.");
    document.getElementById("term-related").innerHTML = toList(detail.related, "Geen gerelateerde begrippen gekoppeld.");

    renderSources(document.getElementById("term-sources"), detail, mapping);
    window.AssetLinkedDataPanel.render(document.getElementById("term-linked-data"), detail);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
}());
