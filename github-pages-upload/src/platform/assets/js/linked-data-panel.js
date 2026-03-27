(function () {
  function createCodeBlock(value) {
    return '<pre class="inline-code-block"><code>' +
      window.AssetPlatformData.escapeHtml(value || "Geen data beschikbaar.") +
      "</code></pre>";
  }

  function renderLinkedDataPanel(root, payload) {
    if (!root || !payload) {
      return;
    }

    var summaryNode = root.querySelector("[data-linked-summary]");
    var rdfNode = root.querySelector("[data-linked-rdf]");
    var owlNode = root.querySelector("[data-linked-owl]");
    var shaclNode = root.querySelector("[data-linked-shacl]");

    if (summaryNode) {
      summaryNode.innerHTML =
        '<dl class="description-list">' +
          "<div><dt>URI</dt><dd class=\"u-uri\">" + window.AssetPlatformData.escapeHtml(payload.uri || "") + "</dd></div>" +
          "<div><dt>Conceptschema</dt><dd>" + window.AssetPlatformData.escapeHtml(payload.conceptScheme || "") + "</dd></div>" +
          "<div><dt>RDF-type</dt><dd>" + window.AssetPlatformData.escapeHtml(payload.rdfType || "") + "</dd></div>" +
          "<div><dt>OWL-classificatie</dt><dd>" + window.AssetPlatformData.escapeHtml(payload.owlClass || "") + "</dd></div>" +
          "<div><dt>SHACL-shape</dt><dd>" + window.AssetPlatformData.escapeHtml(payload.shaclShape || "") + "</dd></div>" +
        "</dl>";
    }

    if (rdfNode) {
      rdfNode.innerHTML = createCodeBlock(payload.rdf);
    }

    if (owlNode) {
      owlNode.innerHTML = createCodeBlock(payload.owl);
    }

    if (shaclNode) {
      shaclNode.innerHTML = createCodeBlock(payload.shacl);
    }
  }

  window.AssetLinkedDataPanel = {
    render: renderLinkedDataPanel
  };
}());
