(function () {
  var overlay = document.querySelector("[data-object-reactodia-overlay]");
  var stage = document.querySelector("[data-object-reactodia-stage]");
  var statusNode = document.querySelector("[data-object-reactodia-status]");
  var selectedNode = document.querySelector("[data-object-reactodia-selected]");
  var titleNode = document.querySelector("[data-object-reactodia-title]");
  var descriptionNode = document.querySelector("[data-object-reactodia-description]");
  var closeButton = document.querySelector("[data-object-reactodia-close]");
  var root = null;
  var currentGraph = null;
  var reactReady = false;
  var reactLib = null;
  var reactDomClient = null;
  var reactodiaLib = null;
  var n3Lib = null;
  var layouts = null;

  if (!overlay || !stage || !closeButton) {
    return;
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function escapeLiteral(value) {
    return String(value || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  }

  function sanitizeId(value) {
    return String(value || "").replace(/[^A-Za-z0-9_]/g, "_");
  }

  function findGraph(graphId) {
    var detail = window.__OBJECT_DETAIL_REACTODIA_DATA__ || {};
    var sections = detail.contentSections || [];
    var found = null;

    sections.some(function (section) {
      var selectedId;
      var selectedNodeEntry;

      if (section && section.conceptMap && section.conceptMap.reactodia && section.conceptMap.reactodia.id === graphId) {
        selectedId = section.conceptMap.reactodia.selectedId || null;
        selectedNodeEntry = (section.conceptMap.nodes || []).find(function (node) {
          return node.id === selectedId;
        });
        found = {
          sectionTitle: section.title || "Knowledge graph",
          sectionDescription: section.body || section.definition || "",
          selectedId: selectedNodeEntry ? selectedNodeEntry.label : selectedId,
          nodes: section.conceptMap.nodes || [],
          edges: section.conceptMap.edges || []
        };
        return true;
      }

      return false;
    });

    return found;
  }

  function renderFallbackGraph(graph) {
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

    if (!graph || !graph.nodes || !graph.nodes.length) {
      stage.innerHTML = '<div class="otl-graph-status">Geen graphdata beschikbaar.</div>';
      return;
    }

    columns = graph.nodes.reduce(function (max, node) {
      return Math.max(max, Number(node.column) || 0);
    }, 0) + 1;
    rows = graph.nodes.reduce(function (max, node) {
      return Math.max(max, Number(node.row) || 0);
    }, 0) + 1;
    width = padding * 2 + (columns * nodeWidth) + ((columns - 1) * colGap);
    height = padding * 2 + (rows * nodeHeight) + ((rows - 1) * rowGap);

    graph.nodes.forEach(function (node) {
      positions[node.id] = {
        x: padding + ((Number(node.column) || 0) * (nodeWidth + colGap)),
        y: padding + ((Number(node.row) || 0) * (nodeHeight + rowGap))
      };
    });

    function renderNode(node) {
      var position = positions[node.id];
      var fill = node.fill || "#eefafb";
      var stroke = node.stroke || "#00a9c1";
      var subtitle = node.subtitle || "";

      return '' +
        '<g class="concept-map-node">' +
          '<rect x="' + position.x + '" y="' + position.y + '" width="' + nodeWidth + '" height="' + nodeHeight + '" fill="' + fill + '" stroke="' + stroke + '" stroke-width="2"></rect>' +
          '<text x="' + (position.x + 12) + '" y="' + (position.y + 24) + '" fill="#102321" font-size="14" font-weight="700">' + escapeHtml(node.label) + '</text>' +
          (subtitle ? '<text x="' + (position.x + 12) + '" y="' + (position.y + 43) + '" fill="#66746d" font-size="11">' + escapeHtml(subtitle) + '</text>' : '') +
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
        '<path d="M ' + startX + ' ' + startY + ' C ' + startX + ' ' + midY + ', ' + endX + ' ' + midY + ', ' + endX + ' ' + endY + '" fill="none" stroke="' + tone + '" stroke-width="2" marker-end="url(#object-reactodia-arrow)"></path>' +
        (edge.label
          ? '<text x="' + Math.round((startX + endX) / 2) + '" y="' + (midY - 6) + '" fill="' + tone + '" font-size="11" text-anchor="middle">' + escapeHtml(edge.label) + '</text>'
          : "");
    }

    svg = '' +
      '<div class="concept-map-wrap concept-map-wrap-overlay">' +
        '<svg class="concept-map-graph concept-map-graph-overlay" viewBox="0 0 ' + width + ' ' + height + '" role="img" aria-label="Knowledge graph">' +
          '<defs><marker id="object-reactodia-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#007f91"></path></marker></defs>';

    (graph.edges || []).forEach(function (edge) {
      svg += renderEdge(edge);
    });

    graph.nodes.forEach(function (node) {
      svg += renderNode(node);
    });

    svg += '</svg></div>';
    stage.innerHTML = svg;
  }

  function buildGraphData(graph) {
    var lines = [
      "@prefix ex: <https://asset.waterschaplimburg.nl/objectenhandboek/> .",
      "@prefix owl: <http://www.w3.org/2002/07/owl#> .",
      "@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .",
      ""
    ];
    var seenPredicates = {};

    (graph.nodes || []).forEach(function (node) {
      var nodeId = sanitizeId(node.id);
      lines.push(
        'ex:' + nodeId + ' a owl:Class ;',
        '  rdfs:label "' + escapeLiteral(node.label) + '" ;',
        '  rdfs:comment "' + escapeLiteral(node.subtitle || "") + '" .',
        ""
      );
    });

    (graph.edges || []).forEach(function (edge) {
      var fromId = sanitizeId(edge.from);
      var toId = sanitizeId(edge.to);
      var predicateId = sanitizeId(edge.label || "heeftDeelobject");

      lines.push('ex:' + fromId + ' ex:' + predicateId + ' ex:' + toId + ' .');

      if (!seenPredicates[predicateId]) {
        seenPredicates[predicateId] = true;
        lines.push('ex:' + predicateId + ' a owl:ObjectProperty ; rdfs:label "' + escapeLiteral(edge.label || "heeft deelobject") + '" .');
      }
    });

    return new n3Lib.Parser().parse(lines.join("\n"));
  }

  async function ensureReactodia() {
    var layoutWorkerUrl;

    if (reactReady) {
      return true;
    }

    try {
      reactLib = await import("https://esm.sh/react@18.3.1");
      reactDomClient = await import("https://esm.sh/react-dom@18.3.1/client");
      reactodiaLib = await import("https://esm.sh/@reactodia/workspace@0.30.1?deps=react@18.3.1,react-dom@18.3.1");
      n3Lib = await import("https://esm.sh/n3@1.17.4");
      layoutWorkerUrl = "https://esm.sh/@reactodia/workspace@0.30.1/layout.worker";
      layouts = reactodiaLib.defineLayoutWorker(function () {
        return new Worker(layoutWorkerUrl, { type: "module" });
      });
      reactReady = true;
      return true;
    } catch (error) {
      if (statusNode) {
        statusNode.hidden = false;
        statusNode.textContent = "Reactodia kon niet geladen worden; de lokale fullscreen graph blijft zichtbaar.";
      }
      return false;
    }
  }

  function createWorkspaceApp(graph) {
    var React = reactLib;
    var Reactodia = reactodiaLib;
    var graphData = buildGraphData(graph);

    return function WorkspaceApp() {
      var defaultLayout = Reactodia.useWorker(layouts).defaultLayout;
      var onMount = Reactodia.useLoadedWorkspace(async function (args) {
        var context = args.context;
        var signal = args.signal;
        var model = context.model;
        var performLayout = context.performLayout;
        var dataProvider = new Reactodia.RdfDataProvider({ acceptBlankNodes: false });
        var lookups;
        var i;
        var entries;

        dataProvider.addGraph(graphData);
        await model.createNewDiagram({ dataProvider: dataProvider, signal: signal });

        lookups = [
          "http://www.w3.org/2002/07/owl#Class",
          "http://www.w3.org/2002/07/owl#ObjectProperty"
        ];

        for (i = 0; i < lookups.length; i += 1) {
          entries = await dataProvider.lookup({ elementTypeId: lookups[i] });
          entries.forEach(function (entry) {
            model.createElement(entry.element);
          });
        }

        await model.requestLinks();
        await performLayout({ signal: signal });
      }, [graphData]).onMount;

      return React.createElement(
        Reactodia.Workspace,
        { ref: onMount, defaultLayout: defaultLayout, className: "otl-reactodia-workspace" },
        React.createElement(Reactodia.DefaultWorkspace, null)
      );
    };
  }

  async function renderReactodia(graph) {
    var ready = await ensureReactodia();
    var WorkspaceApp;

    if (!ready) {
      return;
    }

    if (!root) {
      root = reactDomClient.createRoot(stage);
    }

    WorkspaceApp = createWorkspaceApp(graph);
    root.render(reactLib.createElement(WorkspaceApp, {
      key: graph.sectionTitle || "object-detail-reactodia"
    }));

    if (statusNode) {
      statusNode.hidden = true;
    }
  }

  function openOverlay(graphId) {
    currentGraph = findGraph(graphId);

    if (!currentGraph) {
      return;
    }

    overlay.hidden = false;

    if (selectedNode) {
      selectedNode.textContent = currentGraph.selectedId || "Geen selectie";
    }

    if (titleNode) {
      titleNode.textContent = currentGraph.sectionTitle || "Beeldvullende knowledge graph";
    }

    if (descriptionNode) {
      descriptionNode.textContent = currentGraph.sectionDescription || "De objectrelaties uit deze sectie worden hier als interactieve workspace geladen.";
    }

    if (statusNode) {
      statusNode.hidden = false;
      statusNode.textContent = "Reactodia wordt geladen. Intussen is de lokale graph al beschikbaar.";
    }

    renderFallbackGraph(currentGraph);
    renderReactodia(currentGraph);
  }

  function closeOverlay() {
    overlay.hidden = true;
  }

  document.addEventListener("click", function (event) {
    var openTrigger = event.target.closest("[data-object-reactodia-open]");
    var closeTrigger = event.target.closest("[data-object-reactodia-close]");

    if (openTrigger) {
      event.preventDefault();
      openOverlay(openTrigger.getAttribute("data-object-reactodia-open"));
    }

    if (closeTrigger) {
      event.preventDefault();
      closeOverlay();
    }
  });

  closeButton.addEventListener("click", closeOverlay);
}());
