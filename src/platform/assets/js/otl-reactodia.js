import React from "https://esm.sh/react@18.3.1";
import { createRoot } from "https://esm.sh/react-dom@18.3.1/client";
import * as Reactodia from "https://esm.sh/@reactodia/workspace@0.30.1?deps=react@18.3.1,react-dom@18.3.1";
import * as N3 from "https://esm.sh/n3@1.17.4";

const overlay = document.querySelector("[data-otl-reactodia-overlay]");
const stage = document.querySelector("[data-otl-reactodia-stage]");
const statusNode = document.querySelector("[data-otl-reactodia-status]");
const selectedNode = document.querySelector("[data-otl-reactodia-selected]");
const openButton = document.querySelector("[data-otl-reactodia-open]");
const closeButton = document.querySelector("[data-otl-reactodia-close]");

if (!overlay || !stage || !openButton || !closeButton) {
  throw new Error("Reactodia overlay kon niet worden geinitialiseerd.");
}

const OWL_CLASS = "http://www.w3.org/2002/07/owl#Class";
const OWL_OBJECT_PROPERTY = "http://www.w3.org/2002/07/owl#ObjectProperty";
const OWL_DATATYPE_PROPERTY = "http://www.w3.org/2002/07/owl#DatatypeProperty";

let root = null;
let currentSelection = window.__OTL_VIEWER_DATA__ || { nodes: [], selectedId: null };
window.__OTL_REACTODIA_READY__ = true;

function escapeLiteral(value) {
  return String(value || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function buildGraphText(data) {
  const semantic = data.semanticGraphData;
  const nodes = semantic
    ? [
        ...(semantic.ancestors || []),
        ...(semantic.selected ? [semantic.selected] : []),
        ...(semantic.children || []),
        ...(semantic.contexts || []).map((entry) => entry.node),
        ...(semantic.outgoingRelations || []),
        ...(semantic.incomingRelations || []),
      ].filter((node, index, array) => node && array.findIndex((item) => item.id === node.id) === index)
    : (data.nodes || []);
  const lines = [
    "@prefix ex: <https://asset.waterschaplimburg.nl/otl/> .",
    "@prefix owl: <http://www.w3.org/2002/07/owl#> .",
    "@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .",
    ""
  ];

  nodes.forEach((node) => {
    const classId = node.id.replace(/[^A-Za-z0-9_]/g, "_");

    lines.push(
      `ex:${classId} a owl:Class ;`,
      `  rdfs:label "${escapeLiteral(node.label)}" ;`,
      `  rdfs:comment "${escapeLiteral(node.description || node.definition)}" ;`,
      `  ex:package "${escapeLiteral(node.package)}" ;`,
      `  ex:modeltype "${escapeLiteral(node.type)}" .`
    );

    if (node.parent) {
      lines.push(`ex:${classId} rdfs:subClassOf ex:${node.parent.replace(/[^A-Za-z0-9_]/g, "_")} .`);
    }

    (node.relations || []).forEach((relation) => {
      const predicate = relation.name.replace(/[^A-Za-z0-9_]/g, "_");
      lines.push(`ex:${classId} ex:${predicate} ex:${relation.target.replace(/[^A-Za-z0-9_]/g, "_")} .`);
      lines.push(`ex:${predicate} a owl:ObjectProperty ; rdfs:label "${escapeLiteral(relation.name)}" .`);
    });

    (node.properties || []).forEach((property) => {
      const propertyId = (node.id + "_" + property.name).replace(/[^A-Za-z0-9_]/g, "_");
      lines.push(`ex:${propertyId} a owl:DatatypeProperty ; rdfs:label "${escapeLiteral(property.name)}" .`);
      lines.push(`ex:${classId} ex:heeftAttribuut ex:${propertyId} .`);
    });

    (node.documents || []).forEach((documentNode, index) => {
      const documentId = (node.id + "_document_" + index).replace(/[^A-Za-z0-9_]/g, "_");
      lines.push(`ex:${documentId} a owl:Class ; rdfs:label "${escapeLiteral(documentNode.title)}" .`);
      lines.push(`ex:${classId} ex:heeftDocument ex:${documentId} .`);
    });

    lines.push("");
  });

  if (semantic && semantic.selected) {
    const selectedId = semantic.selected.id.replace(/[^A-Za-z0-9_]/g, "_");

    (semantic.contexts || []).forEach((entry) => {
      const targetId = entry.node.id.replace(/[^A-Za-z0-9_]/g, "_");
      const predicate = entry.label.replace(/[^A-Za-z0-9_]/g, "_");
      lines.push(`ex:${selectedId} ex:${predicate} ex:${targetId} .`);
      lines.push(`ex:${predicate} a owl:ObjectProperty ; rdfs:label "${escapeLiteral(entry.label)}" .`);
    });

    (semantic.children || []).forEach((node) => {
      const targetId = node.id.replace(/[^A-Za-z0-9_]/g, "_");
      const label = (semantic.semantics && semantic.semantics.childLabels && semantic.semantics.childLabels[node.id]) || "heeft deelobject";
      const predicate = label.replace(/[^A-Za-z0-9_]/g, "_");
      lines.push(`ex:${selectedId} ex:${predicate} ex:${targetId} .`);
      lines.push(`ex:${predicate} a owl:ObjectProperty ; rdfs:label "${escapeLiteral(label)}" .`);
    });

    (semantic.properties || []).forEach((property, index) => {
      const propertyId = (semantic.selected.id + "_property_" + index).replace(/[^A-Za-z0-9_]/g, "_");
      lines.push(`ex:${propertyId} a owl:DatatypeProperty ; rdfs:label "${escapeLiteral(property.name)}" .`);
      lines.push(`ex:${selectedId} ex:heeftAttribuut ex:${propertyId} .`);
    });

    (semantic.documents || []).forEach((documentNode, index) => {
      const documentId = (semantic.selected.id + "_document_" + index).replace(/[^A-Za-z0-9_]/g, "_");
      lines.push(`ex:${documentId} a owl:Class ; rdfs:label "${escapeLiteral(documentNode.title)}" .`);
      lines.push(`ex:${selectedId} ex:heeftDocument ex:${documentId} .`);
    });
  }

  return lines.join("\n");
}

const layoutWorkerUrl = "https://esm.sh/@reactodia/workspace@0.30.1/layout.worker";
const Layouts = Reactodia.defineLayoutWorker(() => new Worker(layoutWorkerUrl, { type: "module" }));

function WorkspaceApp(props) {
  const graphText = React.useMemo(() => buildGraphText(props.data), [props.data]);
  const graphData = React.useMemo(() => new N3.Parser().parse(graphText), [graphText]);
  const { defaultLayout } = Reactodia.useWorker(Layouts);

  const { onMount } = Reactodia.useLoadedWorkspace(async ({ context, signal }) => {
    const { model, performLayout } = context;
    const dataProvider = new Reactodia.RdfDataProvider({ acceptBlankNodes: false });

    dataProvider.addGraph(graphData);
    await model.createNewDiagram({ dataProvider, signal });

    for (const typeId of [OWL_CLASS, OWL_OBJECT_PROPERTY, OWL_DATATYPE_PROPERTY]) {
      for (const { element } of await dataProvider.lookup({ elementTypeId: typeId })) {
        model.createElement(element);
      }
    }

    await model.requestLinks();
    await performLayout({ signal });
  }, [graphData]);

  return React.createElement(
    Reactodia.Workspace,
    { ref: onMount, defaultLayout, className: "otl-reactodia-workspace" },
    React.createElement(Reactodia.DefaultWorkspace, null)
  );
}

function renderWorkspace() {
  if (!root) {
    root = createRoot(stage);
  }

  if (selectedNode) {
    selectedNode.textContent = currentSelection.selectedId || "Geen selectie";
  }

  root.render(React.createElement(WorkspaceApp, {
    data: currentSelection,
    key: currentSelection.selectedId || "otl"
  }));
}

function openOverlay() {
  overlay.hidden = false;
  if (statusNode) {
    statusNode.hidden = true;
  }
  renderWorkspace();
}

function closeOverlay() {
  overlay.hidden = true;
}

openButton.addEventListener("click", openOverlay);
closeButton.addEventListener("click", closeOverlay);
window.addEventListener("otl:reactodia-open", openOverlay);

window.addEventListener("otl:selected", (event) => {
  currentSelection = event.detail;
  if (!overlay.hidden) {
    renderWorkspace();
  }
});
