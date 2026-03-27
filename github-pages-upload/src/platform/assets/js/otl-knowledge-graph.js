const graphContainer = document.querySelector("[data-otl-graph]");
let graphStatus = document.querySelector("[data-otl-graph-status]");
const graphSelected = document.querySelector("[data-otl-graph-selected]");
const graphScope = document.querySelector("[data-otl-graph-scope]");

if (graphContainer && graphStatus) {
  const REACT_URL = "https://esm.sh/react@18.3.1";
  const REACT_DOM_URL = "https://esm.sh/react-dom@18.3.1/client";
  const REACTODIA_URL = "https://esm.sh/@reactodia/workspace@0.30.1?deps=react@18.3.1,react-dom@18.3.1";
  const N3_URL = "https://esm.sh/n3@1.17.4";
  const OWL_CLASS = "http://www.w3.org/2002/07/owl#Class";

  let root;
  let ReactLib;
  let ReactDOMLib;
  let ReactodiaLib;
  let N3Lib;

  function ensureStatusNode() {
    if (!graphStatus || !graphStatus.isConnected) {
      graphStatus = document.createElement("div");
      graphStatus.className = "otl-graph-status";
      graphStatus.setAttribute("data-otl-graph-status", "");
      graphContainer.appendChild(graphStatus);
    }

    return graphStatus;
  }

  function setStatus(message) {
    ensureStatusNode().textContent = message;
  }

  function getViewerData() {
    return window.__OTL_VIEWER_DATA__ || { nodes: [], selectedId: null };
  }

  function updateSelectionIndicators(data, subset) {
    if (graphSelected) {
      graphSelected.textContent = data.selectedId || "Geen selectie";
    }

    if (graphScope) {
      graphScope.textContent = subset.length ? subset.length + " gerelateerde knopen" : "Geen graphdata";
    }
  }

  function relatedSubset(nodes, selectedId) {
    const byId = Object.fromEntries(nodes.map((node) => [node.id, node]));
    const selected = byId[selectedId];
    const ids = new Set();

    if (!selected) {
      return [];
    }

    ids.add(selected.id);

    if (selected.parent && byId[selected.parent]) {
      ids.add(selected.parent);
    }

    nodes.forEach((node) => {
      if (node.parent === selected.id || selected.parent === node.id) {
        ids.add(node.id);
      }

      (node.relations || []).forEach((relation) => {
        if (node.id === selected.id || relation.target === selected.id) {
          ids.add(node.id);
          if (byId[relation.target]) {
            ids.add(relation.target);
          }
        }
      });
    });

    return Array.from(ids).map((id) => byId[id]).filter(Boolean);
  }

  function escapeLiteral(value) {
    return String(value || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  }

  function buildTurtle(nodes, selectedId) {
    const subset = relatedSubset(nodes, selectedId);
    const subsetIds = new Set(subset.map((node) => node.id));
    const lines = [
      "@prefix ex: <https://asset.waterschaplimburg.nl/otl/> .",
      "@prefix owl: <http://www.w3.org/2002/07/owl#> .",
      "@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .",
      ""
    ];

    subset.forEach((node) => {
      const classId = node.id.replace(/[^A-Za-z0-9_]/g, "_");

      lines.push(
        `ex:${classId} a owl:Class ;`,
        `  rdfs:label "${escapeLiteral(node.label)}" ;`,
        `  rdfs:comment "${escapeLiteral(node.description || node.definition)}" ;`,
        `  ex:heeftPackage "${escapeLiteral(node.package)}" ;`,
        `  ex:heeftModeltype "${escapeLiteral(node.type)}" .`
      );

      if (node.parent && subsetIds.has(node.parent)) {
        lines.push(`ex:${classId} rdfs:subClassOf ex:${node.parent.replace(/[^A-Za-z0-9_]/g, "_")} .`);
      }

      (node.relations || []).forEach((relation) => {
        if (!subsetIds.has(relation.target)) {
          return;
        }

        const predicate = relation.name.replace(/[^A-Za-z0-9_]/g, "_");
        lines.push(`ex:${classId} ex:${predicate} ex:${relation.target.replace(/[^A-Za-z0-9_]/g, "_")} .`);
        lines.push(`ex:${predicate} a owl:ObjectProperty ; rdfs:label "${escapeLiteral(relation.name)}" .`);
      });

      (node.properties || []).forEach((property) => {
        const propertyId = (node.id + "_" + property.name).replace(/[^A-Za-z0-9_]/g, "_");
        lines.push(`ex:${propertyId} a owl:DatatypeProperty ; rdfs:label "${escapeLiteral(property.name)}" .`);
        lines.push(`ex:${classId} ex:heeftAttribuut ex:${propertyId} .`);
      });

      if (node.id === selectedId) {
        lines.push(`ex:${classId} ex:isGeselecteerd ex:${classId} .`);
      }
      lines.push("");
    });

    return {
      text: lines.join("\n"),
      subset: subset
    };
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderFallbackGraph(data, subset) {
    var selectedId = data.selectedId;
    var edges = [];
    var positions = {};
    var width = 920;
    var height = Math.max(320, subset.length * 90);
    var centerX = width / 2;
    var leftX = 150;
    var rightX = width - 300;
    var propertyX = width - 180;
    var selected = subset.find(function (node) { return node.id === selectedId; });
    var parent = selected && selected.parent ? subset.find(function (node) { return node.id === selected.parent; }) : null;
    var children = subset.filter(function (node) { return node.parent === selectedId; });
    var relationTargets = subset.filter(function (node) {
      if (node.id === selectedId) {
        return false;
      }

      return (selected && selected.relations || []).some(function (relation) {
        return relation.target === node.id;
      }) || (node.relations || []).some(function (relation) {
        return relation.target === selectedId;
      });
    });
    var uniqueRelationTargets = relationTargets.filter(function (node, index, array) {
      return array.findIndex(function (item) { return item.id === node.id; }) === index;
    });
    var properties = selected ? selected.properties || [] : [];

    graphContainer.innerHTML = "";
    graphContainer.insertAdjacentHTML("beforeend",
      '<svg class="otl-fallback-graph" viewBox="0 0 ' + width + " " + height + '" role="img" aria-label="Knowledge graph">' +
      '<defs><marker id="otl-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#007f91"></path></marker></defs>' +
      "</svg>"
    );

    var svg = graphContainer.querySelector("svg");

    function placeNode(node, x, y, kind, label) {
      positions[node.id] = { x: x, y: y, width: 220, height: 52, label: label || node.label };
      var fill = node.id === selectedId ? "#e4f7fa" : "#ffffff";
      var stroke = node.id === selectedId ? "#00a9c1" : "#dde2d7";

      svg.insertAdjacentHTML("beforeend",
        '<rect x="' + x + '" y="' + y + '" width="220" height="52" rx="0" ry="0" fill="' + fill + '" stroke="' + stroke + '"></rect>' +
        '<text x="' + (x + 14) + '" y="' + (y + 21) + '" fill="#102321" font-size="14" font-weight="700">' + escapeHtml(label || node.label) + '</text>' +
        '<text x="' + (x + 14) + '" y="' + (y + 38) + '" fill="#66746d" font-size="11">' + escapeHtml(kind || node.type) + '</text>'
      );
    }

    function placeProperty(property, index) {
      var id = "property_" + index;
      positions[id] = { x: propertyX, y: 40 + index * 58, width: 150, height: 40, label: property.name };
      svg.insertAdjacentHTML("beforeend",
        '<rect x="' + propertyX + '" y="' + (40 + index * 58) + '" width="150" height="40" fill="#faf4cc" stroke="#d7b600"></rect>' +
        '<text x="' + (propertyX + 10) + '" y="' + (66 + index * 58) + '" fill="#102321" font-size="12" font-weight="700">' + escapeHtml(property.name) + '</text>'
      );
      edges.push({ from: selectedId, to: id, label: "attribuut" });
    }

    if (!selected) {
      ensureStatusNode().hidden = false;
      setStatus("Geen graphdata voor de huidige selectie.");
      return;
    }

    placeNode(selected, centerX - 110, (height / 2) - 26, selected.type, selected.label);

    if (parent) {
      placeNode(parent, leftX, 40, parent.type, parent.label);
      edges.push({ from: parent.id, to: selected.id, label: "subClassOf" });
    }

    children.forEach(function (child, index) {
      placeNode(child, leftX, 130 + index * 70, child.type, child.label);
      edges.push({ from: selected.id, to: child.id, label: "decompositie" });
    });

    uniqueRelationTargets.forEach(function (target, index) {
      placeNode(target, rightX, 40 + index * 70, target.type, target.label);
      edges.push({ from: selected.id, to: target.id, label: "relatie" });
    });

    properties.forEach(placeProperty);

    edges.forEach(function (edge) {
      var from = positions[edge.from];
      var to = positions[edge.to];
      if (!from || !to) {
        return;
      }

      var startX = from.x + from.width;
      var startY = from.y + (from.height / 2);
      var endX = to.x;
      var endY = to.y + (to.height / 2);

      if (to.x < from.x) {
        startX = from.x;
        endX = to.x + to.width;
      }

      var midX = (startX + endX) / 2;
      svg.insertAdjacentHTML("beforeend",
        '<path d="M ' + startX + " " + startY + " C " + midX + " " + startY + ", " + midX + " " + endY + ", " + endX + " " + endY + '" fill="none" stroke="#00a9c1" stroke-width="2" marker-end="url(#otl-arrow)"></path>' +
        '<text x="' + midX + '" y="' + ((startY + endY) / 2 - 6) + '" fill="#007f91" font-size="11" text-anchor="middle">' + escapeHtml(edge.label) + "</text>"
      );
    });
  }

  async function loadLibraries() {
    if (ReactLib && ReactDOMLib && ReactodiaLib && N3Lib) {
      return;
    }

    const [reactModule, reactDomModule, reactodiaModule, n3Module] = await Promise.all([
      import(REACT_URL),
      import(REACT_DOM_URL),
      import(REACTODIA_URL),
      import(N3_URL)
    ]);

    ReactLib = reactModule;
    ReactDOMLib = reactDomModule;
    ReactodiaLib = reactodiaModule;
    N3Lib = n3Module;
  }

  async function mountGraph() {
    const data = getViewerData();
    const graphPayload = buildTurtle(data.nodes, data.selectedId);

    updateSelectionIndicators(data, graphPayload.subset);
    renderFallbackGraph(data, graphPayload.subset);
    ensureStatusNode().hidden = false;
    setStatus("Lokale knowledge graph wordt getoond.");

    try {
      setStatus("Lokale knowledge graph wordt getoond. Reactodia wordt daarnaast geprobeerd te laden.");
      await loadLibraries();

      const React = ReactLib;
      const { createRoot } = ReactDOMLib;
      const Reactodia = ReactodiaLib;
      const N3 = N3Lib;

      if (root) {
        root.unmount();
        root = null;
      }
      root = createRoot(graphContainer);

      const layoutWorkerUrl = "https://esm.sh/@reactodia/workspace@0.30.1/layout.worker";
      const Layouts = Reactodia.defineLayoutWorker(() => new Worker(layoutWorkerUrl, { type: "module" }));

      function GraphApp(props) {
        const graphData = React.useMemo(() => new N3.Parser().parse(props.graphText), [props.graphText]);
        const { defaultLayout } = Reactodia.useWorker(Layouts);

        const { onMount } = Reactodia.useLoadedWorkspace(async ({ context, signal }) => {
          const { model, performLayout } = context;
          const dataProvider = new Reactodia.RdfDataProvider({ acceptBlankNodes: false });
          dataProvider.addGraph(graphData);

          await model.createNewDiagram({ dataProvider, signal });
          for (const typeId of [
            OWL_CLASS,
            "http://www.w3.org/2002/07/owl#ObjectProperty",
            "http://www.w3.org/2002/07/owl#DatatypeProperty"
          ]) {
            for (const { element } of await dataProvider.lookup({ elementTypeId: typeId })) {
              model.createElement(element);
            }
          }
          await model.requestLinks();
          await performLayout({ signal });
        }, [graphData]);

        return React.createElement(
          Reactodia.Workspace,
          { ref: onMount, defaultLayout, className: "otl-reactodia-workspace", key: props.selectedId },
          React.createElement(Reactodia.DefaultWorkspace, null)
        );
      }

      root.render(React.createElement(GraphApp, {
        selectedId: data.selectedId,
        graphText: graphPayload.text
      }));
      if (graphStatus && graphStatus.isConnected) {
        graphStatus.hidden = true;
      }
    } catch (error) {
      console.error(error);
      ensureStatusNode().hidden = false;
      setStatus("Reactodia kon niet geladen worden; de lokale knowledge graph-weergave wordt getoond.");
    }
  }

  window.addEventListener("otl:selected", function () {
    mountGraph();
  });

  mountGraph();
}
