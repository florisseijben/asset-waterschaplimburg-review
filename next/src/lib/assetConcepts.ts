import assetConcepts from "../data/concepts/asset-concepts.json";

type JsonValue = {
  lex?: string;
  lang?: string;
  uri?: string;
  label?: string;
};

type Binding = {
  ID?: JsonValue | null;
  label?: JsonValue | null;
  taxID?: JsonValue | null;
  prop?: JsonValue | null;
  targetID?: JsonValue | null;
  propLabel?: JsonValue | null;
  verschijningsvormenLabel?: JsonValue | null;
  taxDef?: JsonValue | null;
};

type TermItem = {
  title: string;
  text: string;
  href?: string;
};

type SectionItem = {
  title: string;
  text: string;
  href?: string;
};

type LayoutNode = {
  id: string;
  label: string;
  subtitle?: string;
  column: number;
  row: number;
  fill?: string;
  stroke?: string;
};

const bindings = ((assetConcepts as { bindings?: Binding[] }).bindings || []) as Binding[];

function asLex(value?: JsonValue | null) {
  return value?.lex || "";
}

function asUri(value?: JsonValue | null) {
  return value?.uri || "";
}

function fromUriLabel(value?: JsonValue | null) {
  const uri = asUri(value);
  if (!uri) {
    return "";
  }

  const raw = uri.split(/[#/]/).pop() || "";
  try {
    return decodeURIComponent(raw).replace(/[-_]+/g, " ");
  } catch {
    return raw.replace(/[-_]+/g, " ");
  }
}

function normalizeId(label: string) {
  return label.toLowerCase().replace(/\s+/g, "");
}

function uniqueByTitle(items: TermItem[]) {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = item.title.toLowerCase();
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function uniqueByKey<T>(items: T[], getKey: (item: T) => string) {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = getKey(item);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function getObjectRoute(label: string) {
  const routes: Record<string, string> = {
    stroomgebied: "/datastandaard/objectenhandboek/watersysteem/stroomgebied",
    watergang: "/datastandaard/objectenhandboek/watersysteem/watergangen",
    watergangsectie: "/datastandaard/objectenhandboek/watersysteem/watergangsectie",
    intersectie: "/datastandaard/objectenhandboek/watersysteem/intersectie",
    talud: "/datastandaard/objectenhandboek/watersysteem/watergangsectie/talud",
    bekledingsconstructie:
      "/datastandaard/objectenhandboek/watersysteem/watergangsectie/talud/bekledingsconstructie",
    toplaag:
      "/in-migratie/datastandaard/objectenhandboek/watersysteem/watergangsectie/talud/toplaag",
    bodem: "/in-migratie/datastandaard/objectenhandboek/watersysteem/watergangsectie/bodem",
    berm: "/in-migratie/datastandaard/objectenhandboek/watersysteem/watergangsectie/berm",
    werkpad: "/in-migratie/datastandaard/objectenhandboek/watersysteem/watergangsectie/werkpad"
  };

  return routes[normalizeId(label)] || "/datastandaard/woordenboek";
}

export function getConceptFromAssetJson(label: string) {
  const conceptRows = bindings.filter((item) => asLex(item.label) === label);
  if (!conceptRows.length) {
    return null;
  }

  const definition = conceptRows.map((item) => asLex(item.taxDef)).find(Boolean) || "";
  const taxLabel = fromUriLabel(conceptRows[0].taxID);
  const synonyms = uniqueByTitle(
    taxLabel && taxLabel.toLowerCase() !== label.toLowerCase()
      ? [
          {
            title: taxLabel,
            text: `Voorkeursbegrip uit de gekoppelde taxonomiebron voor ${label}.`,
            href: "/datastandaard/woordenboek"
          }
        ]
      : []
  );

  const relatedTerms = uniqueByTitle(
    conceptRows
      .filter((item) => asLex(item.targetID?.label) || fromUriLabel(item.targetID))
      .map((item) => ({
        title: fromUriLabel(item.targetID),
        text: asLex(item.propLabel) || "Gerelateerd begrip uit de dummy conceptbron.",
        href: "/datastandaard/woordenboek"
      }))
      .filter((item) => item.title)
  );

  const types = uniqueByTitle(
    conceptRows
      .filter((item) => asLex(item.verschijningsvormenLabel))
      .map((item) => ({
        title: asLex(item.verschijningsvormenLabel),
        text: "Verschijningsvorm uit de dummy conceptbron.",
        href: "/datastandaard/woordenboek"
      }))
  );

  const relationRows = conceptRows
    .filter((item) => asLex(item.targetID?.label) || fromUriLabel(item.targetID))
    .map((item) => ({
      source: label,
      sourceId: normalizeId(label),
      sourceUri: asUri(item.ID),
      target: fromUriLabel(item.targetID),
      targetId: normalizeId(fromUriLabel(item.targetID)),
      targetUri: asUri(item.targetID),
      relation: asLex(item.propLabel) || "heeft relatie met",
      predicateId: normalizeId(asLex(item.propLabel) || fromUriLabel(item.prop) || "heeft-relatie"),
      predicateLabel: asLex(item.propLabel) || fromUriLabel(item.prop) || "heeft relatie met"
    }))
    .filter((item) => item.target);

  return {
    label,
    definition,
    synonyms,
    relatedTerms,
    types,
    relationRows
  };
}

export function getDecompositionFromAssetJson(label: string) {
  const concept = getConceptFromAssetJson(label);
  if (!concept) {
    return null;
  }

  const decompositionRelations = concept.relationRows.filter((item) => item.relation.toLowerCase().startsWith("heeft "));
  const items: SectionItem[] = uniqueByTitle(
    decompositionRelations.map((item) => ({
      title: item.target,
      text: `${item.relation} binnen de ontologische decompositie van ${label}.`,
      href: getObjectRoute(item.target)
    }))
  );

  if (!items.length) {
    return null;
  }

  return {
    summary: `De onderdelen hieronder worden direct afgeleid uit de ontologische relaties van ${label}.`,
    items
  };
}

export function createWatergangSamenhangFromAssetJson() {
  const concept = getConceptFromAssetJson("Watergang");
  if (!concept) {
    return null;
  }

  const relevantRelations = concept.relationRows.filter((item) =>
    item.relation.toLowerCase().startsWith("heeft ")
  );

  if (!relevantRelations.length) {
    return null;
  }

  const childNodes = uniqueByKey(relevantRelations, (item) => item.targetId);
  const layoutNodes: LayoutNode[] = [
    {
      id: concept.relationRows[0]?.sourceId || "watergang",
      label: concept.label,
      subtitle: "Hoofdobject",
      column: childNodes.length > 1 ? Math.floor(childNodes.length / 2) : 0,
      row: 0,
      fill: "#e4f7fa",
      stroke: "#00a9c1"
    },
    ...childNodes.map((item, index) => ({
      id: item.targetId,
      label: item.target,
      subtitle: item.predicateLabel,
      column: index,
      row: 1,
      fill: "#eefafb",
      stroke: "#00a9c1"
    }))
  ];

  const turtleLines = [
    '@prefix object: <https://data.waterschaplimburg.nl/id/objecttype/> .',
    '@prefix relatie: <https://data.waterschaplimburg.nl/def/relatie/> .',
    '@prefix owl: <http://www.w3.org/2002/07/owl#> .',
    '@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .',
    "",
    `object:${concept.relationRows[0]?.sourceId || "watergang"} a owl:Class ;`,
    `  rdfs:label "${concept.label}" .`,
    ""
  ];

  childNodes.forEach((item) => {
    turtleLines.push(`object:${item.targetId} a owl:Class ;`);
    turtleLines.push(`  rdfs:label "${item.target}" .`);
    turtleLines.push("");
  });

  uniqueByKey(relevantRelations, (item) => item.predicateId).forEach((item) => {
    turtleLines.push(`relatie:${item.predicateId} a owl:ObjectProperty ;`);
    turtleLines.push(`  rdfs:label "${item.predicateLabel}" .`);
    turtleLines.push("");
  });

  relevantRelations.forEach((item) => {
    turtleLines.push(`object:${item.sourceId} relatie:${item.predicateId} object:${item.targetId} .`);
  });

  return {
    layoutNodes,
    turtle: turtleLines.join("\n"),
    sourceLabel: "Dummy JSON-export uit de begrippen- en objectbron in next/src/data/concepts/asset-concepts.json."
  };
}
