(function () {
  function readJsonScript(id) {
    var node = document.getElementById(id);

    if (!node) {
      return null;
    }

    try {
      return JSON.parse(node.textContent);
    } catch (error) {
      return null;
    }
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  var platformData = window.AssetPlatformData || {
    readJsonScript: readJsonScript,
    escapeHtml: escapeHtml
  };

  if (!window.AssetPlatformData) {
    window.AssetPlatformData = platformData;
  }

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

    if (!root || !platformData) {
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
    nav.setAttribute("aria-label", "Paginanavigatie");
    nav.innerHTML =
      '<p class="eyebrow">Navigatie</p>' +
      "<h2>Paginanavigatie</h2>" +
      '<p class="object-tree-note">Ga direct naar de onderdelen van ' + platformData.escapeHtml(detail.label || "dit object") + " op deze pagina.</p>" +
      '<nav class="object-tree-links" aria-label="Paginanavigatie">' +
          links.map(function (link) {
            return '<a class="object-tree-link" href="' + platformData.escapeHtml(link.href) + '">' +
              platformData.escapeHtml(link.label) +
            "</a>";
          }).join("") +
      "</nav>";

    article.insertAdjacentElement("beforebegin", nav);
  }

  function renderVisualization(item) {
    if (!item || !item.src) {
      return "";
    }

    return '<figure class="content-visual">' +
      '<img class="content-visual-image" src="' + platformData.escapeHtml(item.src) + '" alt="' + platformData.escapeHtml(item.alt || "") + '">' +
      (item.caption ? '<figcaption class="content-visual-caption">' + platformData.escapeHtml(item.caption) + "</figcaption>" : "") +
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
      return platformData.escapeHtml(value || "");
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
      '<div class="desktop-preferred concept-map-wrap">' +
        '<svg class="concept-map-graph" viewBox="0 0 ' + width + ' ' + height + '" role="img" aria-label="' + escapeSvg(map.ariaLabel || "Conceptmap") + '">' +
          '<defs><marker id="concept-map-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#007f91"></path></marker></defs>';

    (map.edges || []).forEach(function (edge) {
      svg += renderEdge(edge);
    });

    map.nodes.forEach(function (node) {
      svg += renderNode(node);
    });

    svg += '</svg></div>' +
      '<div class="mobile-only mobile-support-note">' +
        'Deze decompositie of knowledge graph is op telefoon niet de hoofdweergave. Gebruik tablet of desktop voor de volledige graph.' +
      '</div>';
    return svg;
  }

  function renderConceptMapActions(map) {
    if (!map || !map.reactodia) {
      return "";
    }

    return '<div class="detail-actions">' +
      '<button class="button button-secondary desktop-preferred" type="button" data-object-reactodia-open="' + platformData.escapeHtml(map.reactodia.id || "concept-map") + '">' +
        'Open beeldvullende knowledge graph' +
      "</button>" +
    "</div>";
  }

  function renderExamples(items) {
    if (!items || !items.length) {
      return "";
    }

    return '<div class="example-grid">' + items.map(function (item) {
      var cardInner = "<p class=\"eyebrow\">Voorbeeld</p>" +
        renderVisualization(item.visualization) +
        "<h4>" + platformData.escapeHtml(item.title || "") + "</h4>" +
        "<p>" + platformData.escapeHtml(item.description || "") + "</p>";

      return '<article class="example-card">' +
        (item.href
          ? '<a class="example-card-link" href="' + platformData.escapeHtml(item.href) + '" target="_blank" rel="noreferrer">' + cardInner + "</a>"
          : cardInner) +
        '</article>';
    }).join("") + "</div>";
  }

  function renderTerms(items) {
    if (!items || !items.length) {
      return '<div class="empty-state">Nog geen termen beschikbaar.</div>';
    }

    return '<ul class="term-list">' + items.map(function (item) {
      var label = typeof item === "string" ? item : (item.label || "");
      var href = typeof item === "string" ? "" : (item.href || "");

      return "<li>" + (href
        ? '<a href="' + platformData.escapeHtml(href) + '">' + platformData.escapeHtml(label) + "</a>"
        : platformData.escapeHtml(label)) + "</li>";
    }).join("") + "</ul>";
  }

  function renderSectionText(item) {
    var parts = [];

    if (item.summary) {
      parts.push(item.summary);
    } else {
      if (item.definition) {
        parts.push(item.definition);
      }

      if (item.body) {
        parts.push(item.body);
      }
    }

    if (!parts.length) {
      return "";
    }

    if (item.cleanLayout) {
      return parts.map(function (part, index) {
        return '<p class="' + (index === 0 ? "content-section-summary" : "content-section-note") + '">' +
          platformData.escapeHtml(part) +
        "</p>";
      }).join("");
    }

    if (item.compactIntro) {
      return '<div class="content-section-intro"><p>' + platformData.escapeHtml(parts[0] || "") + '</p>' +
        (parts[1] ? '<p>' + platformData.escapeHtml(parts[1]) + '</p>' : '') +
        '</div>';
    }

    return '<div class="definition-block"><p>' + platformData.escapeHtml(parts[0] || "") + "</p></div>" +
      (parts[1] ? "<p>" + platformData.escapeHtml(parts[1]) + "</p>" : "");
  }

  function renderContentSections(items) {
    if (!items || !items.length) {
      return '<div class="empty-state">Nog geen inhoudssecties beschikbaar.</div>';
    }

    return items.map(function (item) {
      var introBlock = renderSectionText(item);

      return '<section class="content-section-card stack" id="section-' + platformData.escapeHtml(slugify(item.title || "")) + '">' +
        "<h3>" + platformData.escapeHtml(item.title || "") + "</h3>" +
        introBlock +
        ((item.links && item.links.length)
          ? '<div class="content-section-actions">' +
              '<nav class="section-nav" aria-label="Doorklik vanuit sectie">' +
              item.links.map(function (link) {
                return '<a href="' + platformData.escapeHtml(link.href || "#") + '">' +
                  platformData.escapeHtml(link.label || "Open detail") +
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

    if (!root || !platformData) {
      return;
    }

    data = platformData.readJsonScript("object-detail-data");
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
      "<dt>Systeem</dt><dd>" + platformData.escapeHtml(detail.system || "") + "</dd>" +
      "<dt>Deelsysteem</dt><dd>" + platformData.escapeHtml(detail.subsystem || "") + "</dd>" +
      "<dt>Objecttype</dt><dd>" + platformData.escapeHtml(detail.objectType || "") + "</dd>" +
      "<dt>Bronsysteem</dt><dd>" + platformData.escapeHtml(detail.sourceSystem || "") + "</dd>" +
      "<dt>URI</dt><dd class=\"u-uri\">" + platformData.escapeHtml(detail.uri || "") + "</dd>";

    document.getElementById("object-content-sections").innerHTML = renderContentSections(detail.contentSections);
    if (document.getElementById("object-edg-note")) {
      document.getElementById("object-edg-note").textContent = detail.edgNote || "";
    }
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
