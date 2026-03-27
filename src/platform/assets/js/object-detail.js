(function () {
  function slugify(value) {
    return (value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function renderObjectTree(root, detail) {
    var layout;
    var article;
    var conceptSection;
    var subtypeSection;
    var contentSections;
    var links;
    var nav;

    if (!root || !window.AssetPlatformData) {
      return;
    }

    layout = root.querySelector(".detail-layout");
    article = layout && layout.querySelector("article");

    if (!layout || !article) {
      return;
    }

    if (!detail || layout.querySelector(".object-tree-panel")) {
      return;
    }

    conceptSection = article.querySelector(".detail-section");
    subtypeSection = article.querySelectorAll(".detail-section")[1] || null;
    contentSections = (detail.contentSections || []).map(function (item) {
      return {
        label: item.title || "",
        href: "#section-" + slugify(item.title || "")
      };
    });

    if (conceptSection) {
      conceptSection.id = "section-concept";
    }

    if (subtypeSection && subtypeSection.querySelector("h2") && /subtypen/i.test(subtypeSection.querySelector("h2").textContent || "")) {
      subtypeSection.id = "section-subtypen";
    } else {
      subtypeSection = null;
    }

    links = [
      { label: "Concept", href: "#section-concept" }
    ];

    if (subtypeSection && subtypeSection.querySelector("h2")) {
      links.push({ label: subtypeSection.querySelector("h2").textContent || "Subtypen", href: "#section-subtypen" });
    }

    links = links.concat(contentSections);

    layout.classList.add("detail-layout-with-nav");
    nav = document.createElement("aside");
    nav.className = "panel detail-section stack object-tree-panel";
    nav.setAttribute("aria-label", "Objectenboom");
    nav.innerHTML =
      '<p class="eyebrow">Navigatie</p>' +
      "<h2>Objectenboom</h2>" +
      '<p class="object-tree-note">Ga direct naar de onderdelen van ' + window.AssetPlatformData.escapeHtml(detail.label || "dit object") + " op deze pagina.</p>" +
      '<details class="object-tree-group" open>' +
        "<summary>" + window.AssetPlatformData.escapeHtml(detail.label || "Object") + "</summary>" +
        '<div class="object-tree-links">' +
          links.map(function (link) {
            return '<a class="object-tree-link" href="' + window.AssetPlatformData.escapeHtml(link.href) + '">' +
              window.AssetPlatformData.escapeHtml(link.label) +
            "</a>";
          }).join("") +
        "</div>" +
      "</details>";

    article.insertAdjacentElement("beforebegin", nav);
  }

  function renderVisualization(item) {
    if (!item || !item.src) {
      return "";
    }

    return '<figure class="content-visual">' +
      '<img class="content-visual-image" src="' + window.AssetPlatformData.escapeHtml(item.src) + '" alt="' + window.AssetPlatformData.escapeHtml(item.alt || "") + '">' +
      (item.caption ? '<figcaption class="content-visual-caption">' + window.AssetPlatformData.escapeHtml(item.caption) + "</figcaption>" : "") +
      "</figure>";
  }

  function renderConceptMap(map) {
    var nodeWidth = 220;
    var nodeHeight = 60;
    var colGap = 42;
    var rowGap = 72;
    var padding = 24;
    var columns;
    var rows;
    var width;
    var height;
    var positions = {};
    var svg;

    if (!map || !map.nodes || !map.nodes.length) {
      return "";
    }

    columns = map.nodes.reduce(function (max, node) {
      return Math.max(max, Number(node.column) || 0);
    }, 0) + 1;
    rows = map.nodes.reduce(function (max, node) {
      return Math.max(max, Number(node.row) || 0);
    }, 0) + 1;
    width = padding * 2 + (columns * nodeWidth) + ((columns - 1) * colGap);
    height = padding * 2 + (rows * nodeHeight) + ((rows - 1) * rowGap);

    map.nodes.forEach(function (node) {
      positions[node.id] = {
        x: padding + ((Number(node.column) || 0) * (nodeWidth + colGap)),
        y: padding + ((Number(node.row) || 0) * (nodeHeight + rowGap))
      };
    });

    function escapeSvg(value) {
      return window.AssetPlatformData.escapeHtml(value || "");
    }

    function renderNode(node) {
      var position = positions[node.id];
      var fill = node.fill || "#eefafb";
      var stroke = node.stroke || "#00a9c1";
      var subtitle = node.subtitle || "";

      return '' +
        '<g class="concept-map-node" data-node-id="' + escapeSvg(node.id) + '">' +
          '<rect x="' + position.x + '" y="' + position.y + '" width="' + nodeWidth + '" height="' + nodeHeight + '" fill="' + fill + '" stroke="' + stroke + '" stroke-width="2"></rect>' +
          '<text x="' + (position.x + 12) + '" y="' + (position.y + 24) + '" fill="#102321" font-size="14" font-weight="700">' + escapeSvg(node.label) + '</text>' +
          (subtitle ? '<text x="' + (position.x + 12) + '" y="' + (position.y + 43) + '" fill="#66746d" font-size="11">' + escapeSvg(subtitle) + '</text>' : '') +
        '</g>';
    }

    function renderEdge(edge) {
      var from = positions[edge.from];
      var to = positions[edge.to];
      var startX;
      var startY;
      var endX;
      var endY;
      var midY;
      var tone = edge.color || "#007f91";

      if (!from || !to) {
        return "";
      }

      startX = from.x + Math.round(nodeWidth / 2);
      startY = from.y + nodeHeight;
      endX = to.x + Math.round(nodeWidth / 2);
      endY = to.y;
      midY = Math.round((startY + endY) / 2);

      return '' +
        '<path d="M ' + startX + ' ' + startY + ' C ' + startX + ' ' + midY + ', ' + endX + ' ' + midY + ', ' + endX + ' ' + endY + '" fill="none" stroke="' + tone + '" stroke-width="2" marker-end="url(#concept-map-arrow)"></path>' +
        (edge.label
          ? '<text x="' + (Math.round((startX + endX) / 2)) + '" y="' + (midY - 6) + '" fill="' + tone + '" font-size="11" text-anchor="middle">' + escapeSvg(edge.label) + '</text>'
          : '');
    }

    svg = '' +
      '<div class="concept-map-wrap">' +
        '<svg class="concept-map-graph" viewBox="0 0 ' + width + ' ' + height + '" role="img" aria-label="' + escapeSvg(map.ariaLabel || "Conceptmap") + '">' +
          '<defs><marker id="concept-map-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#007f91"></path></marker></defs>';

    (map.edges || []).forEach(function (edge) {
      svg += renderEdge(edge);
    });

    map.nodes.forEach(function (node) {
      svg += renderNode(node);
    });

    svg += '</svg></div>';
    return svg;
  }

  function renderConceptMapActions(map) {
    if (!map || !map.reactodia) {
      return "";
    }

    return '<div class="detail-actions">' +
      '<button class="button button-secondary" type="button" data-object-reactodia-open="' + window.AssetPlatformData.escapeHtml(map.reactodia.id || "concept-map") + '">' +
        'Open beeldvullende knowledge graph' +
      "</button>" +
    "</div>";
  }

  function renderExamples(items) {
    if (!items || !items.length) {
      return '<div class="empty-state">Nog geen visuele voorbeelden beschikbaar.</div>';
    }

    return '<div class="example-grid">' + items.map(function (item) {
      var cardInner = "<p class=\"eyebrow\">Voorbeeld</p>" +
        renderVisualization(item.visualization) +
        "<h4>" + window.AssetPlatformData.escapeHtml(item.title || "") + "</h4>" +
        "<p>" + window.AssetPlatformData.escapeHtml(item.description || "") + "</p>";

      return '<article class="example-card">' +
        (item.href
          ? '<a class="example-card-link" href="' + window.AssetPlatformData.escapeHtml(item.href) + '" target="_blank" rel="noreferrer">' + cardInner + "</a>"
          : cardInner) +
        '</article>';
    }).join("") + "</div>";
  }

  function renderTerms(items) {
    if (!items || !items.length) {
      return '<div class="empty-state">Nog geen termen beschikbaar.</div>';
    }

    return '<ul class="term-list">' + items.map(function (item) {
      return "<li>" + window.AssetPlatformData.escapeHtml(item) + "</li>";
    }).join("") + "</ul>";
  }

  function renderContentSections(items) {
    if (!items || !items.length) {
      return '<div class="empty-state">Nog geen inhoudssecties beschikbaar.</div>';
    }

    return items.map(function (item) {
      var introBlock = item.compactIntro
        ? '<div class="content-section-intro"><p>' + window.AssetPlatformData.escapeHtml(item.definition || "") + '</p>' +
          (item.body ? '<p>' + window.AssetPlatformData.escapeHtml(item.body) + '</p>' : '') +
          '</div>'
        : '<div class="definition-block"><p>' + window.AssetPlatformData.escapeHtml(item.definition || "") + "</p></div>" +
          (item.body ? "<p>" + window.AssetPlatformData.escapeHtml(item.body) + "</p>" : "");

      return '<section class="content-section-card stack" id="section-' + window.AssetPlatformData.escapeHtml(slugify(item.title || "")) + '">' +
        "<div>" +
          "<h3>" + window.AssetPlatformData.escapeHtml(item.title || "") + "</h3>" +
        "</div>" +
        introBlock +
        ((item.links && item.links.length)
          ? '<div class="content-section-actions">' +
              '<nav class="section-nav" aria-label="Doorklik vanuit sectie">' +
              item.links.map(function (link) {
                return '<a href="' + window.AssetPlatformData.escapeHtml(link.href || "#") + '">' +
                  window.AssetPlatformData.escapeHtml(link.label || "Open detail") +
                "</a>";
              }).join("") +
              "</nav>" +
            "</div>"
          : "") +
        renderConceptMapActions(item.conceptMap) +
        renderConceptMap(item.conceptMap) +
        renderVisualization(item.visualization) +
        renderExamples(item.examples) +
        "</section>";
    }).join("");
  }

  function simplifySectionHeaders(root) {
    var sectionEyebrows;

    if (!root) {
      return;
    }

    sectionEyebrows = root.querySelectorAll(".detail-layout > article .detail-section > .eyebrow");
    sectionEyebrows.forEach(function (item) {
      item.remove();
    });
  }

  function render() {
    var root = document.querySelector("[data-object-detail]");
    var data;
    var detail;

    if (!root || !window.AssetPlatformData) {
      return;
    }

    data = window.AssetPlatformData.readJsonScript("object-detail-data");
    detail = data && data.object ? data.object : null;

    if (!detail) {
      return;
    }

    document.getElementById("object-title").textContent = detail.label || "Object";
    document.getElementById("object-summary").textContent = detail.summary || "";
    document.getElementById("object-status").textContent = detail.status || "Concept";
    document.getElementById("object-definition").textContent = detail.dictionaryDefinition || "";
    document.getElementById("object-context").textContent = detail.contextNote || "";
    document.getElementById("object-definition-source").textContent = detail.definitionSource || "";
    document.getElementById("object-terms").innerHTML = renderTerms(detail.terms);

    document.getElementById("object-meta").innerHTML =
      "<dt>Systeem</dt><dd>" + window.AssetPlatformData.escapeHtml(detail.system || "") + "</dd>" +
      "<dt>Deelsysteem</dt><dd>" + window.AssetPlatformData.escapeHtml(detail.subsystem || "") + "</dd>" +
      "<dt>Objecttype</dt><dd>" + window.AssetPlatformData.escapeHtml(detail.objectType || "") + "</dd>" +
      "<dt>Bronsysteem</dt><dd>" + window.AssetPlatformData.escapeHtml(detail.sourceSystem || "") + "</dd>" +
      "<dt>URI</dt><dd class=\"u-uri\">" + window.AssetPlatformData.escapeHtml(detail.uri || "") + "</dd>";

    document.getElementById("object-content-sections").innerHTML = renderContentSections(detail.contentSections);
    document.getElementById("object-edg-note").textContent = detail.edgNote || "";
    window.__OBJECT_DETAIL_REACTODIA_DATA__ = {
      label: detail.label || "Object",
      contentSections: detail.contentSections || []
    };
    simplifySectionHeaders(root);
    renderObjectTree(root, detail);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
}());
