export type LayoutNode = {
  id: string;
  label: string;
  subtitle?: string;
  column: number;
  row: number;
  fill?: string;
  stroke?: string;
};

export type GraphEdge = {
  from: string;
  to: string;
  label: string;
};

type GraphConfig = {
  layoutNodes: LayoutNode[];
  edges: GraphEdge[];
};

const selectedFill = "#e4f7fa";
const relatedFill = "#eefafb";
const contextFill = "#ffffff";
const stroke = "#00a9c1";

function node(
  id: string,
  label: string,
  subtitle: string,
  column: number,
  row: number,
  fill: string
): LayoutNode {
  return { id, label, subtitle, column, row, fill, stroke };
}

export function createWatersysteemGraph(): GraphConfig {
  return {
    layoutNodes: [
      node("watersysteem", "Watersysteem", "Systeem", 1, 0, selectedFill),
      node("stroomgebied", "Stroomgebied", "Subsysteem", 1, 1, relatedFill),
      node("watergang", "Watergang", "Objectfamilie", 0, 2, relatedFill),
      node("regenwaterbuffer", "Regenwaterbuffer", "Objectfamilie", 2, 2, relatedFill),
      node("watergangsectie", "Watergangsectie", "Objecttype", 0, 3, contextFill),
      node("intersectie", "Intersectie", "Objecttype", 1, 3, contextFill)
    ],
    edges: [
      { from: "watersysteem", to: "stroomgebied", label: "Heeft stroomgebied" },
      { from: "stroomgebied", to: "watergang", label: "Bevat objectfamilie" },
      { from: "stroomgebied", to: "regenwaterbuffer", label: "Bevat objectfamilie" },
      { from: "watergang", to: "watergangsectie", label: "Heeft sectie" },
      { from: "watergang", to: "intersectie", label: "Heeft intersectie" }
    ]
  };
}

export function createStroomgebiedGraph(): GraphConfig {
  return {
    layoutNodes: [
      node("watersysteem", "Watersysteem", "Systeem", 1, 0, contextFill),
      node("stroomgebied", "Stroomgebied", "Subsysteem", 1, 1, selectedFill),
      node("watergang", "Watergang", "Objectfamilie", 0, 2, relatedFill),
      node("regenwaterbuffer", "Regenwaterbuffer", "Objectfamilie", 2, 2, relatedFill),
      node("watergangsectie", "Watergangsectie", "Objecttype", 0, 3, contextFill),
      node("intersectie", "Intersectie", "Objecttype", 1, 3, contextFill)
    ],
    edges: [
      { from: "watersysteem", to: "stroomgebied", label: "Heeft stroomgebied" },
      { from: "stroomgebied", to: "watergang", label: "Bevat objectfamilie" },
      { from: "stroomgebied", to: "regenwaterbuffer", label: "Bevat objectfamilie" },
      { from: "watergang", to: "watergangsectie", label: "Heeft sectie" },
      { from: "watergang", to: "intersectie", label: "Heeft intersectie" }
    ]
  };
}

export function createWatergangGraph(): GraphConfig {
  return {
    layoutNodes: [
      node("watergang", "Watergang", "Hoofdobject", 1, 0, selectedFill),
      node("watergangsectie", "Watergangsectie", "Onderdeel", 0, 1, relatedFill),
      node("intersectie", "Intersectie", "Onderdeel", 2, 1, relatedFill)
    ],
    edges: [
      { from: "watergang", to: "watergangsectie", label: "Heeft sectie" },
      { from: "watergang", to: "intersectie", label: "Heeft intersectie" }
    ]
  };
}

export function createWatergangsectieGraph(): GraphConfig {
  return {
    layoutNodes: [
      node("watergang", "Watergang", "Hoofdobject", 1, 0, contextFill),
      node("watergangsectie", "Watergangsectie", "Objecttype", 0, 1, selectedFill),
      node("intersectie", "Intersectie", "Parallel objecttype", 2, 1, relatedFill)
    ],
    edges: [
      { from: "watergang", to: "watergangsectie", label: "Heeft sectie" },
      { from: "watergang", to: "intersectie", label: "Heeft intersectie" }
    ]
  };
}

export function createIntersectieGraph(): GraphConfig {
  return {
    layoutNodes: [
      node("watergang", "Watergang", "Hoofdobject", 1, 0, contextFill),
      node("watergangsectie", "Watergangsectie", "Parallel objecttype", 0, 1, relatedFill),
      node("intersectie", "Intersectie", "Objecttype", 2, 1, selectedFill)
    ],
    edges: [
      { from: "watergang", to: "watergangsectie", label: "Heeft sectie" },
      { from: "watergang", to: "intersectie", label: "Heeft intersectie" }
    ]
  };
}

export function createRegenwaterbufferGraph(): GraphConfig {
  return {
    layoutNodes: [
      node("regenwaterbuffer", "Regenwaterbuffer", "Hoofdobject", 0, 0, selectedFill),
      node("regenwaterbuffercompartiment", "Regenwaterbuffercompartiment", "Onderdeel", 0, 1, relatedFill)
    ],
    edges: [{ from: "regenwaterbuffer", to: "regenwaterbuffercompartiment", label: "Bestaat uit" }]
  };
}

export function createRegenwaterbufferCompartimentGraph(): GraphConfig {
  return {
    layoutNodes: [
      node("regenwaterbuffer", "Regenwaterbuffer", "Bovenliggend object", 0, 0, relatedFill),
      node("regenwaterbuffercompartiment", "Regenwaterbuffercompartiment", "Objecttype", 0, 1, selectedFill)
    ],
    edges: [{ from: "regenwaterbuffer", to: "regenwaterbuffercompartiment", label: "Bestaat uit" }]
  };
}

export function createTaludGraph(): GraphConfig {
  return {
    layoutNodes: [
      node("watergang", "Watergang", "Hoofdobject", 1, 0, contextFill),
      node("watergangsectie", "Watergangsectie", "Bovenliggend object", 1, 1, relatedFill),
      node("talud", "Talud", "Objecttype", 1, 2, selectedFill),
      node("bekledingsconstructie", "Bekledingsconstructie", "Onderdeel", 0, 3, relatedFill),
      node("bodem", "Bodem", "Aangrenzend onderdeel", 2, 2, contextFill)
    ],
    edges: [
      { from: "watergang", to: "watergangsectie", label: "Heeft sectie" },
      { from: "watergangsectie", to: "talud", label: "Heeft talud" },
      { from: "talud", to: "bekledingsconstructie", label: "Heeft bekleding" },
      { from: "watergangsectie", to: "bodem", label: "Grenst aan" }
    ]
  };
}

export function createBekledingsconstructieGraph(): GraphConfig {
  return {
    layoutNodes: [
      node("watergangsectie", "Watergangsectie", "Bovenliggend object", 1, 0, contextFill),
      node("talud", "Talud", "Bovenliggend onderdeel", 1, 1, relatedFill),
      node("bekledingsconstructie", "Bekledingsconstructie", "Objecttype", 1, 2, selectedFill),
      node("toplaag", "Toplaag", "Onderdeel", 1, 3, relatedFill)
    ],
    edges: [
      { from: "watergangsectie", to: "talud", label: "Heeft talud" },
      { from: "talud", to: "bekledingsconstructie", label: "Heeft bekleding" },
      { from: "bekledingsconstructie", to: "toplaag", label: "Bestaat uit" }
    ]
  };
}
