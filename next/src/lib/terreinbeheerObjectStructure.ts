import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export type TerreinbeheerObjectImage = {
  src: string;
  alt: string;
  caption: string;
};

export type TerreinbeheerObjectConcept = {
  label: string;
  definition: string;
  description: string;
  sourceLabel: string;
  sourceUrl?: string;
  matchType: "exact" | "broader" | "closest" | "local";
  note?: string;
};

export type TerreinbeheerObjectNode = {
  id: string;
  title: string;
  slug: string;
  relativeSlug: string;
  href: string;
  kind: "family" | "group" | "object";
  familyId: string;
  familyTitle: string;
  parentTitle?: string;
  parentHref?: string;
  summary: string;
  concept?: TerreinbeheerObjectConcept;
  children: TerreinbeheerObjectNode[];
  images: TerreinbeheerObjectImage[];
  previewImage?: TerreinbeheerObjectImage;
  trail: {
    title: string;
    href: string;
  }[];
};

type FamilyConfig = {
  folder: string;
  id: string;
  title: string;
  summary: string;
  excludeFolders?: string[];
};

type BuildFolderContext = {
  absolutePath: string;
  publicPath: string;
  title: string;
  slugParts: string[];
  familyId: string;
  familyTitle: string;
  kind: "family" | "group";
  parentTitle?: string;
  parentHref?: string;
  parentTrail: TerreinbeheerObjectNode["trail"];
  familySummary?: string;
  excludeFolderKeys: Set<string>;
};

const OBJECTENHANDBOEK_IMAGE_ROOT = fileURLToPath(
  new URL("../../public/images/objectenhandboek", import.meta.url)
);
const DISCIPLINE_BASE = "/datastandaard/objectenhandboek/discipline/terreinbeheer-openbare-ruimte";
const IMAGE_EXTENSIONS = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".webp"]);
const collator = new Intl.Collator("nl", { numeric: true, sensitivity: "base" });
const requiredChildFoldersByRelativeSlug = new Map<string, string[]>([
  ["vegetatie", ["Boom", "Gras", "Haag", "Kruidachtige", "Riet", "Struik"]]
]);
const imborViewerHref = (uri: string) =>
  `https://begrippen.crow.nl/imbor/nl/page/?uri=${encodeURIComponent(uri)}`;
const imbor2025 = "IMBOR 2025";
const imbor2022 = "IMBOR 2022";
const wlImbor = "IMBOR begrippen / Waterschap Limburg kennisbank";

function concept(
  label: string,
  definition: string,
  description: string,
  sourceLabel: string,
  sourceUri: string | undefined,
  matchType: TerreinbeheerObjectConcept["matchType"] = "exact",
  note?: string
): TerreinbeheerObjectConcept {
  return {
    label,
    definition: definition.trim(),
    description,
    sourceLabel,
    sourceUrl: sourceUri ? imborViewerHref(sourceUri) : undefined,
    matchType,
    note
  };
}

const boomDefinition =
  "Een overblijvend houtige gewas, met een wortelgestel en een enkele of meervoudige houtige stam die is vertakt in takken en twijgen en een boomkroonvolume en een naamgeving volgens de naamlijst houtige gewassen (www.internationalplantnames.com).";
const toegangspoortDefinition =
  "Draaiende constructie die (elektrisch) mechanisch om een verticale as draait of over een oppervlak rolt om een afsluitbare doorgang te realiseren in een muur of terreinafscheiding.";
const toegangspoortVariantNote =
  "Geen eigen IMBOR-definitie aangetroffen; de WL-kennisbank koppelt dit begrip als specifieker begrip onder toegangspoort.";
const vormboomNoDefinitionNote =
  "In IMBOR 2025 aangetroffen als domeinwaarde zonder aparte definitietekst; de pagina gebruikt de IMBOR 2022-definitie voor de bijbehorende boomvorm waar beschikbaar.";

const conceptByTitleKey = new Map<string, TerreinbeheerObjectConcept>(
  [
    [
      "constructie",
      concept(
        "Constructie",
        "Gebouwd object dat direct of indirect met de bodem is verbonden en bedoeld is om ter plaatse te functioneren.",
        "Constructie is de objectfamilie voor gebouwde terreinobjecten, met civieltechnische kunstwerken buiten deze discipline-ingang.",
        imbor2025,
        "https://data.crow.nl/imbor/term/13fd95af-ba1e-41cc-8603-f9a6aa4a885d"
      )
    ],
    [
      "hek",
      concept(
        "Hek",
        "Een scheiding of schutting, typisch ten behoeve van erfafscheiding.",
        "Hek ordent de hekwerktypen waarmee terrein of percelen worden afgeschermd, gescheiden of geleid.",
        imbor2025,
        "https://data.crow.nl/imbor/term/de1511e9-026a-4f33-807e-dee670b69196"
      )
    ],
    [
      "poort",
      concept(
        "Toegangspoort",
        toegangspoortDefinition,
        "Poort is hier gekoppeld aan de IMBOR-term Toegangspoort: de afsluitbare doorgang in een muur of terreinafscheiding.",
        imbor2025,
        "https://data.crow.nl/imbor/term/17202112-50ae-483a-84b4-db0185f31b3a",
        "closest",
        "IMBOR 2025 bevat geen exact prefLabel 'Poort' in de geraadpleegde bron; Toegangspoort is de inhoudelijke match voor deze objectgroep."
      )
    ],
    [
      "boerenhekwerk",
      concept(
        "Toegangspoort",
        `Boerenhekwerk is in de IMBOR/WL-begrippenstructuur een specifieker begrip onder toegangspoort. De bovenliggende definitie is: ${toegangspoortDefinition}`,
        "Boerenhekwerk wordt als poortvariant onder Toegangspoort beschreven.",
        wlImbor,
        "https://data.crow.nl/imbor/term/17202112-50ae-483a-84b4-db0185f31b3a",
        "broader",
        toegangspoortVariantNote
      )
    ],
    [
      "combinatiepoort",
      concept(
        "Toegangspoort",
        `Combinatiepoort is in de IMBOR/WL-begrippenstructuur een specifieker begrip onder toegangspoort. De bovenliggende definitie is: ${toegangspoortDefinition}`,
        "Combinatiepoort wordt als poortvariant onder Toegangspoort beschreven.",
        wlImbor,
        "https://data.crow.nl/imbor/term/17202112-50ae-483a-84b4-db0185f31b3a",
        "broader",
        toegangspoortVariantNote
      )
    ],
    [
      "draaihek",
      concept(
        "Draaihek",
        "Poort of die volgens de as aan het ene uiteinde naar binnen toe kan draaien.",
        "Draaihek is een poortvariant waarbij het hekdeel rond een verticale as draait.",
        imbor2025,
        "https://data.crow.nl/imbor/term/66821edc-d2b7-4499-8319-2517a14b1994"
      )
    ],
    [
      "gaashek",
      concept(
        "Gaashek",
        "Scheiding gemaakt van een nauwe gaasconstructie.",
        "Gaashek is een hekwerkvariant met gaas als scheidend materiaal.",
        imbor2025,
        "https://data.crow.nl/imbor/term/7b087fef-c58f-44b3-a52c-f9c3e59e60a9"
      )
    ],
    [
      "grootveehek",
      concept(
        "Toegangspoort",
        `Grootveehek is in de IMBOR/WL-begrippenstructuur een specifieker begrip onder toegangspoort. De bovenliggende definitie is: ${toegangspoortDefinition}`,
        "Grootveehek wordt als poortvariant onder Toegangspoort beschreven.",
        wlImbor,
        "https://data.crow.nl/imbor/term/17202112-50ae-483a-84b4-db0185f31b3a",
        "broader",
        toegangspoortVariantNote
      )
    ],
    [
      "klaphek",
      concept(
        "Klaphek",
        "Een poort die een persoon tegelijk toegang biedt, vaak gemaakt van houten planken en middels scharnieren bevestigd in een hek of omheiningsconstructie, al dan niet van een andere soort dan het hek zelf.",
        "Klaphek is een voetgangerspoort binnen een hek- of omheiningsconstructie.",
        imbor2025,
        "https://data.crow.nl/imbor/term/59a621a1-c7c7-4178-afb5-6f99e13d9227"
      )
    ],
    [
      "kleinveehek",
      concept(
        "Toegangspoort",
        `Kleinveehek is in de IMBOR/WL-begrippenstructuur een specifieker begrip onder toegangspoort. De bovenliggende definitie is: ${toegangspoortDefinition}`,
        "Kleinveehek wordt als poortvariant onder Toegangspoort beschreven.",
        wlImbor,
        "https://data.crow.nl/imbor/term/17202112-50ae-483a-84b4-db0185f31b3a",
        "broader",
        toegangspoortVariantNote
      )
    ],
    [
      "laag-raster",
      concept(
        "Laag faunaraster",
        "Een afscheiding van circa 50 tot 100 cm hoog.",
        "Laag raster is gekoppeld aan de IMBOR-domeinwaarde Laag faunaraster.",
        imbor2025,
        "https://data.crow.nl/imbor/term/2ae99735-2c6e-4cb8-bfe4-4af19effb354",
        "closest",
        "IMBOR 2025 bevat geen exact prefLabel 'Laag raster' in de geraadpleegde bron; Laag faunaraster is de inhoudelijke match."
      )
    ],
    [
      "schrikdraad",
      concept(
        "Schrikdraad",
        "Hekwerk met schrikdraad, soms ook wel schrikkeldraad genoemd, is een geleidende draad waar elektrische spanning op staat en die gebruikt wordt in een hekwerk.",
        "Schrikdraad is een hekwerkvariant met een geleidende draad onder elektrische spanning.",
        imbor2025,
        "https://data.crow.nl/imbor/term/c77ea50f-d4c4-40a9-a7f5-776d7c3cef93"
      )
    ],
    [
      "schuifhek",
      concept(
        "Schuifhek",
        "Een poort die voorzien is van een schuifmechanisme.",
        "Schuifhek is een poortvariant die opent en sluit met een schuifmechanisme.",
        imbor2025,
        "https://data.crow.nl/imbor/term/d6408d8b-6728-4933-99fd-677ba416ebed"
      )
    ],
    [
      "sierhek",
      concept(
        "Sierhek",
        "Hekwerk dat naast het scheiden van ruimte voornamelijk de verfraaiing van de omgeving dient.",
        "Sierhek combineert terreinafscheiding met een verfraaiende functie.",
        imbor2025,
        "https://data.crow.nl/imbor/term/183873c2-7763-4d7e-bd3c-92591888e33f"
      )
    ],
    [
      "spijlenhek",
      concept(
        "Spijlenhek",
        "Een afscheiding bestaande uit een serie van dunne stangen die in verticale rijen zijn geplaatst om open ruimten, zoals stoelruggen, op te vullen.",
        "Spijlenhek is een hekwerkvariant met verticale spijlen.",
        imbor2025,
        "https://data.crow.nl/imbor/term/415c703b-94e7-4e81-aa72-6fe6ab8b3bef"
      )
    ],
    [
      "v-werk",
      concept(
        "Toegangspoort",
        `V-werk is in de IMBOR/WL-begrippenstructuur een specifieker begrip onder toegangspoort. De bovenliggende definitie is: ${toegangspoortDefinition}`,
        "V-werk wordt als poortvariant onder Toegangspoort beschreven.",
        wlImbor,
        "https://data.crow.nl/imbor/term/17202112-50ae-483a-84b4-db0185f31b3a",
        "broader",
        toegangspoortVariantNote
      )
    ],
    [
      "terreindeel",
      concept(
        "Terreindeel",
        "Objectfamilie voor begroeide en onbegroeide delen van een terrein.",
        "Terreindeel ordent de IMBOR-termen BegroeidTerreindeel en Onbegroeid terreindeel.",
        "Afgeleid uit IMBOR 2025-termen voor begroeid en onbegroeid terreindeel",
        undefined,
        "local",
        "Geen afzonderlijk IMBOR 2025-prefLabel 'Terreindeel' aangetroffen in de geraadpleegde vocabulaire; de onderliggende IMBOR-termen zijn wel gematcht."
      )
    ],
    [
      "begroeid-terreindeel",
      concept(
        "BegroeidTerreindeel",
        "Kleinste functioneel onafhankelijk stukje van een terrein dat er binnen het objecttype Terrein van NEN 3610 wordt onderscheiden, met aaneengesloten vegetatie.",
        "Begroeid terreindeel is een terreindeel met aaneengesloten vegetatie.",
        imbor2025,
        "https://data.crow.nl/imbor/term/bcf9e943-7b96-4d11-98b4-09b8b3e41509"
      )
    ],
    [
      "onbegroeid-terreindeel",
      concept(
        "Onbegroeid terreindeel",
        "Kleinste functioneel onafhankelijk stukje van een terrein, dat er binnen het objecttype Terrein van NEN 3610 wordt onderscheiden, zonder aaneengesloten vegetatie.",
        "Onbegroeid terreindeel is een functioneel zelfstandig terreindeel zonder aaneengesloten vegetatie.",
        imbor2025,
        "https://data.crow.nl/imbor/term/d3539561-84a9-41e1-8913-ac9929288709"
      )
    ],
    [
      "bloemrijk-gras",
      concept(
        "Bloemrijk grasland",
        "Een groen oppervlak waarvan het fysieke voorkomen wordt bepaald door grassoorten en meerjarige bloemen, waar de bodem niet of nauwelijks verstoord wordt en jaarlijks een tot twee keer wordt gemaaid. (Bron: Cruydthoek)",
        "Bloemrijk gras is gekoppeld aan de IMBOR-term Bloemrijk grasland.",
        imbor2025,
        "https://data.crow.nl/imbor/term/736f2715-4442-4783-a9a9-ac2b1ac5fc41",
        "closest",
        "IMBOR 2025 bevat geen exact prefLabel 'Bloemrijk gras' in de geraadpleegde bron; Bloemrijk grasland is de inhoudelijke match."
      )
    ],
    [
      "gazon",
      concept(
        "Gazon",
        "Verschijningsvorm: grasterrein met relatief uniform grasmengsel zonder onkruid, met een maximale hoogte van 70 mm, Functie: verfraaiing, onderdeel van de groenstructuur zoals vastgelegd in beleid, Beheer: Wordt veelal intensief gemaaid.",
        "Gazon is een intensief beheerd grasterrein met relatief uniform grasmengsel.",
        imbor2025,
        "https://data.crow.nl/imbor/term/ab60e210-71f5-4e07-bfe6-6ceb3f232f7e"
      )
    ],
    [
      "grasveld",
      concept(
        "Grasveld",
        "Verschijningsvorm: grasterrein met relatief uniform grasmengsel met beperkt bedekkingspercentage onkruid), met een maximale hoogte van 100 mm, Functie: onder meer verfraaiing recreatief (mede)gebruik, zoals spelen, recreeren, lopen, picknicken.",
        "Grasveld is een grasterrein voor verfraaiing en recreatief medegebruik.",
        imbor2025,
        "https://data.crow.nl/imbor/term/51578117-b784-468f-a973-20482d2eec35"
      )
    ],
    [
      "ruigte",
      concept(
        "Ruigte",
        "Verschijningsvorm: gevarieerd grasmengsel met beperkt aantal soorten van hoog opgaande, meerjarige (overblijvende) algemeen voorkomende kruidachtige planten zoals distels, gewone berenklauw, brandnetels, bramen en diverse grassoorten; Functie: verschillende functies, bijvoorbeeld onderdeel ecologische structuur, begrazingsgebied. Ook: Beheer: zeer extensief, veelal ecologisch.",
        "Ruigte is een extensief beheerd, hoog opgaand kruiden- en grasmengsel.",
        imbor2025,
        "https://data.crow.nl/imbor/term/bbd2eed3-db38-4762-9f93-287ae8671b92"
      )
    ],
    [
      "struweel",
      concept(
        "Struweel",
        "Een vorm van begroeiing waarbij struiken het beeld overheersen.",
        "Struweel is begroeiing waarin struiken beeldbepalend zijn.",
        imbor2025,
        "https://data.crow.nl/imbor/term/5e64421b-8352-4ede-b457-3f094cc32320"
      )
    ],
    [
      "vegetatie",
      concept(
        "Vegetatieobject",
        "Solitaire vorm van begroeiing of een lijn- of vlakvormige groep gelijksoortige begroeiingsobjecten met een beperkte omvang.",
        "Vegetatie is hier gekoppeld aan de IMBOR-objectfamilie Vegetatieobject.",
        imbor2025,
        "https://data.crow.nl/imbor/term/54c784e0-420b-48ac-8798-18eb7fc9a861",
        "closest",
        "IMBOR 2025 bevat geen exact prefLabel 'Vegetatie' in de geraadpleegde bron; Vegetatieobject is de objecttype-match."
      )
    ],
    [
      "boom",
      concept(
        "Boom",
        boomDefinition,
        "Boom ordent de boomtypen en boomvormen binnen de vegetatiestructuur.",
        imbor2025,
        "https://data.crow.nl/imbor/term/eecb9687-2dc9-43d3-b6f2-2c5ff35da666"
      )
    ],
    [
      "boom-niet-vrij-uitgroeiend",
      concept(
        "Niet vrij uitgroeiend",
        "Boom waarbij de omgeving voorwaarden stelt aan het eindbeeld en waarbij een takvrije zone of een takvrije stam wordt voorgeschreven. Eindbeeld: vorm van een boom in volgroeide staat, omschreven door middel van takvrije zone en/of takvrije stam.",
        "Boom - niet vrij uitgroeiend is gekoppeld aan de IMBOR-domeinwaarde Niet vrij uitgroeiend.",
        imbor2025,
        "https://data.crow.nl/imbor/term/e1a1279c-122f-4f55-8088-71629587e3f7"
      )
    ],
    [
      "boom-vrij-uitgroeiend",
      concept(
        "Vrij uitgroeiend",
        "Boom waarbij de omgeving geen voorwaarden stelt aan het eindbeeld en waarbij geen takvrije zone of takvrije stam wordt voorgeschreven. Eindbeeld: vorm van een boom in volgroeide staat, omschreven door middel van takvrije zone en/of takvrije stam.",
        "Boom - vrij uitgroeiend is gekoppeld aan de IMBOR-domeinwaarde Vrij uitgroeiend.",
        imbor2025,
        "https://data.crow.nl/imbor/term/4552306e-224c-4a7e-8f29-f57cc6ff060c"
      )
    ],
    [
      "fruitboom",
      concept(
        "Fruitboom",
        "Boom waarbij het beheer (de snoei) gericht is op de fruitproductie. Geen 'sierfruit'. Bijvoorbeeld aanwezig in gemeenten in traditionele fruitgebieden, waar oude hoogstamfruitbomen in de openbare ruimte worden behouden of nieuw aangeplant.",
        "Fruitboom is gekoppeld aan de IMBOR 2022-term Fruitboom.",
        imbor2022,
        "https://data.crow.nl/imbor/term/4f650a9c-6834-4316-beda-7958c684d705"
      )
    ],
    [
      "gekandelaberde-boom",
      concept(
        "Gekandelaberde boom",
        "Boom die gekandelaberd is. Kandelaberen is het op latere leeftijd sterk inkorten van de gesteltakken van een boom, met als doel het wijzigen van het eindbeeld.",
        "Gekandelaberde boom is gekoppeld aan de IMBOR 2022-term Gekandelaberde boom en aan de IMBOR 2025-domeinwaarde Vormboom gekandelaberd.",
        imbor2022,
        "https://data.crow.nl/imbor/term/1df858f1-d9f0-4cc8-8266-efe5a36db2b6",
        "exact",
        vormboomNoDefinitionNote
      )
    ],
    [
      "knotboom",
      concept(
        "Knotboom",
        "Boom die wordt beheerd door periodiek knotten. Knotten is het verwijderen van het hout, staande op en rond de knot.",
        "Knotboom is een beheervorm waarbij periodiek rond de knot wordt verwijderd.",
        imbor2025,
        "https://data.crow.nl/imbor/term/561a4864-40cf-490b-9f8f-9742820cf8e0"
      )
    ],
    [
      "leiboom",
      concept(
        "Leiboom",
        "Boom die wordt beheerd door periodiek leiden. Leiden is het selecteren, buigen en aanbinden van gesteltakken en het verwijderen van niet-gewenste takken en twijgen.",
        "Leiboom is gekoppeld aan de IMBOR 2022-term Leiboom en aan de IMBOR 2025-domeinwaarde Vormboom geleid.",
        imbor2022,
        "https://data.crow.nl/imbor/term/a268338d-014a-4262-ac28-c51eea3416da",
        "exact",
        vormboomNoDefinitionNote
      )
    ],
    [
      "stobbe",
      concept(
        "Stobbe",
        "Ter hoogte van boompunt alleen stobbe aangetroffen.",
        "Stobbe beschrijft de situatie waarin op het boompunt alleen de stobbe is aangetroffen.",
        imbor2025,
        "https://data.crow.nl/imbor/term/18eab775-1e5f-4b65-8d38-3f0b45702a10"
      )
    ],
    [
      "vormboom",
      concept(
        "Vormboom",
        "Boom, anders dan knot-, lei- of gekandelaberde boom, die wordt beheerd door periodiek snoeien of scheren met als doel de boom een specifieke vorm te geven en te laten behouden. Een vormboom is een boom met een groeiwijze waarbij het snoeien is gericht op het behouden van de vorm van de kroon.",
        "Vormboom is gekoppeld aan de IMBOR 2022-term Vormboom.",
        imbor2022,
        "https://data.crow.nl/imbor/term/0b3cc189-8422-4edc-a5a0-be81ab01fb78"
      )
    ],
    [
      "gras",
      concept(
        "Gras- en kruidachtigen",
        "Gras: terrein met grasvegetatie, niet primair in gebruik voor grasproductie. Kruidachtige: Door inheemse kruidensoorten bepaalde grasachtige vegetatie. Grond met) een laagblijvende, aaneengesloten kruidachtige vegetatie. (Bron: definities.geostandaarden.nl)",
        "Gras is gekoppeld aan de IMBOR-term Gras- en kruidachtigen.",
        imbor2025,
        "https://data.crow.nl/imbor/term/5f4a60c9-e4fd-4c5f-8810-30be99d289fe",
        "closest",
        "IMBOR 2025 bevat geen exact prefLabel 'Gras' in de geraadpleegde bron; Gras- en kruidachtigen is de objecttype-match."
      )
    ],
    [
      "haag",
      concept(
        "Haag",
        "Gesloten lijnvormige beplanting, waarvan de hoogte en breedte door middel van knippen in stand wordt gehouden.",
        "Haag is een geknipte lijnvormige beplanting.",
        imbor2025,
        "https://data.crow.nl/imbor/term/d5bf4c61-3cc6-4378-86d9-d92c1bee04dd"
      )
    ],
    [
      "kruidachtige",
      concept(
        "Kruidachtig",
        "Onderbegroeiing van onverhoute vaatplanten.",
        "Kruidachtige is gekoppeld aan de IMBOR-domeinwaarde Kruidachtig.",
        imbor2025,
        "https://data.crow.nl/imbor/term/15a5e2e5-4300-45ac-8b58-35cc68dde7d7",
        "closest"
      )
    ],
    [
      "riet",
      concept(
        "Rietvegetatie",
        "Een vegetatie met als hoofdsoort een of meerdere soorten riet, kan zowel een natte als een droge ondergrond hebben.",
        "Riet is gekoppeld aan de IMBOR-term Rietvegetatie.",
        imbor2025,
        "https://data.crow.nl/imbor/term/371bcb9e-bdee-4978-9720-f27dfe2be515",
        "closest",
        "IMBOR 2025 bevat geen exact prefLabel 'Riet' in de geraadpleegde bron; Rietvegetatie is de objecttype-match."
      )
    ],
    [
      "struik",
      concept(
        "Struiken",
        "Terreindeel bedekt met niet-gecultiveerde (natuurlijke), lage, houtachtige, overblijvende planten gekenmerkt door verschillende vertakkingen dicht bij de wortel en afwezigheid van opvallende stammen.",
        "Struik is gekoppeld aan de IMBOR-term Struiken.",
        imbor2025,
        "https://data.crow.nl/imbor/term/f741aad8-9813-4ffd-9d42-58bbc4a14573",
        "closest",
        "IMBOR 2025 bevat geen exact prefLabel 'Struik' in de geraadpleegde bron; Struiken is de objecttype-match."
      )
    ]
  ].map(([key, value]) => [normalizeKey(key), value] as [string, TerreinbeheerObjectConcept])
);

const familyConfigs: FamilyConfig[] = [
  {
    folder: "Constructie",
    id: "constructie",
    title: "Constructie",
    summary:
      "Constructie bevat de terreinobjecten voor afbakening en toegang, zoals hekken en poorten. Civieltechnische kunstwerken zijn hier bewust uitgezonderd.",
    excludeFolders: ["Civieltechnisch kunstwerk"]
  },
  {
    folder: "Terreindeel",
    id: "terreindeel",
    title: "Terreindeel",
    summary:
      "Terreindeel ordent de objecttypen waarmee begroeide en onbegroeide delen van een terrein worden vastgelegd."
  },
  {
    folder: "Vegetatie",
    id: "vegetatie",
    title: "Vegetatie",
    summary:
      "Vegetatie bevat de objecttypen voor bomen, gras, hagen, kruidachtige vegetatie, riet en struiken binnen de openbare ruimte."
  }
];

function normalizeKey(value: string) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " en ")
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getConceptForTitle(title: string) {
  return conceptByTitleKey.get(normalizeKey(title));
}

function cleanImageStem(value: string) {
  return value.replace(/_\d+$/g, "").trim();
}

function displayTitle(value: string) {
  const normalized = String(value || "")
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!normalized) {
    return "Objecttype";
  }

  return normalized
    .split(" ")
    .map((part) => {
      if (!part || /[A-Z]/.test(part.slice(1))) {
        return part;
      }

      return `${part.charAt(0).toUpperCase()}${part.slice(1)}`;
    })
    .join(" ");
}

function toPublicImageSrc(publicPath: string, fileName: string) {
  return `/${path.posix.join(publicPath, fileName).replace(/\\/g, "/")}`;
}

function isImageFile(fileName: string) {
  return IMAGE_EXTENSIONS.has(path.extname(fileName).toLowerCase());
}

function readDirectoryEntries(absolutePath: string) {
  if (!existsSync(absolutePath)) {
    return [];
  }

  return readdirSync(absolutePath, { withFileTypes: true });
}

function getChildFolders(context: BuildFolderContext) {
  const relativeSlug = context.slugParts.join("/");
  const folders = new Map<
    string,
    {
      name: string;
      absolutePath: string;
      publicPath: string;
    }
  >();

  readDirectoryEntries(context.absolutePath)
    .filter((entry) => entry.isDirectory())
    .filter((entry) => !context.excludeFolderKeys.has(normalizeKey(entry.name)))
    .forEach((entry) => {
      folders.set(normalizeKey(entry.name), {
        name: entry.name,
        absolutePath: path.join(context.absolutePath, entry.name),
        publicPath: path.posix.join(context.publicPath, entry.name)
      });
    });

  (requiredChildFoldersByRelativeSlug.get(relativeSlug) || [])
    .filter((name) => !context.excludeFolderKeys.has(normalizeKey(name)))
    .forEach((name) => {
      const key = normalizeKey(name);

      if (!folders.has(key)) {
        folders.set(key, {
          name,
          absolutePath: path.join(context.absolutePath, name),
          publicPath: path.posix.join(context.publicPath, name)
        });
      }
    });

  return [...folders.values()].sort((left, right) => collator.compare(left.name, right.name));
}

function createImage(src: string, title: string, index: number): TerreinbeheerObjectImage {
  return {
    src,
    alt: `${title} in de afbeeldingenstructuur van het Objectenhandboek.`,
    caption: `Beeldvoorbeeld ${index}. ${title}.`
  };
}

function findPreviewImage(node: Pick<TerreinbeheerObjectNode, "images" | "children">): TerreinbeheerObjectImage | undefined {
  return node.images[0] || node.children.find((child) => child.previewImage)?.previewImage;
}

function createObjectSummary(title: string, parentTitle: string, familyTitle: string) {
  return `${title} is als objecttype opgenomen onder ${parentTitle}, binnen de objectfamilie ${familyTitle}.`;
}

function createGroupSummary(title: string, familyTitle: string, childCount: number, imageCount: number) {
  if (childCount > 0) {
    return `${title} bevat ${childCount} onderliggende objecttype${childCount === 1 ? "" : "n"} binnen de objectfamilie ${familyTitle}.`;
  }

  if (imageCount > 0) {
    return `${title} bevat beeldvoorbeelden binnen de objectfamilie ${familyTitle}.`;
  }

  return `${title} is onderdeel van de objectfamilie ${familyTitle}; de onderliggende objecttypen volgen zodra er foto's in deze map zijn toegevoegd.`;
}

function buildImageObjectNodes(
  context: BuildFolderContext,
  parentHref: string,
  trail: TerreinbeheerObjectNode["trail"]
): TerreinbeheerObjectNode[] {
  const imageGroups = new Map<
    string,
    {
      title: string;
      files: string[];
    }
  >();

  readDirectoryEntries(context.absolutePath)
    .filter((entry) => entry.isFile() && isImageFile(entry.name))
    .forEach((entry) => {
      const parsed = path.parse(entry.name);
      const title = displayTitle(cleanImageStem(parsed.name));
      const key = normalizeKey(title);
      const group = imageGroups.get(key) || { title, files: [] };

      group.files.push(entry.name);
      imageGroups.set(key, group);
    });

  return [...imageGroups.entries()]
    .sort(([, left], [, right]) => collator.compare(left.title, right.title))
    .map(([slug, group]) => {
      const slugParts = [...context.slugParts, slug];
      const relativeSlug = slugParts.join("/");
      const href = `${DISCIPLINE_BASE}/${relativeSlug}`;
      const objectConcept = getConceptForTitle(group.title);
      const images = group.files
        .sort((left, right) => collator.compare(left, right))
        .map((fileName, index) => createImage(toPublicImageSrc(context.publicPath, fileName), group.title, index + 1));

      return {
        id: relativeSlug,
        title: group.title,
        slug,
        relativeSlug,
        href,
        kind: "object",
        familyId: context.familyId,
        familyTitle: context.familyTitle,
        parentTitle: context.title,
        parentHref,
        summary: objectConcept?.description || createObjectSummary(group.title, context.title, context.familyTitle),
        concept: objectConcept,
        children: [],
        images,
        previewImage: images[0],
        trail: [...trail, { title: group.title, href }]
      };
    });
}

function buildFolderNode(context: BuildFolderContext): TerreinbeheerObjectNode {
  const relativeSlug = context.slugParts.join("/");
  const href = `${DISCIPLINE_BASE}/${relativeSlug}`;
  const trail = [...context.parentTrail, { title: context.title, href }];
  const folderChildren = getChildFolders(context)
    .map((entry) => {
      const title = displayTitle(entry.name);
      const slug = normalizeKey(title);

      return buildFolderNode({
        absolutePath: entry.absolutePath,
        publicPath: entry.publicPath,
        title,
        slugParts: [...context.slugParts, slug],
        familyId: context.familyId,
        familyTitle: context.familyTitle,
        kind: "group",
        parentTitle: context.title,
        parentHref: href,
        parentTrail: trail,
        excludeFolderKeys: context.excludeFolderKeys
      });
    });
  const objectChildren = buildImageObjectNodes(context, href, trail);
  const children = [...folderChildren, ...objectChildren];
  const images = readDirectoryEntries(context.absolutePath)
    .filter((entry) => entry.isFile() && isImageFile(entry.name))
    .sort((left, right) => collator.compare(left.name, right.name))
    .map((entry, index) => createImage(toPublicImageSrc(context.publicPath, entry.name), context.title, index + 1));
  const nodeConcept = getConceptForTitle(context.title);
  const fallbackSummary =
    context.kind === "family"
      ? context.familySummary || createGroupSummary(context.title, context.familyTitle, children.length, images.length)
      : createGroupSummary(context.title, context.familyTitle, children.length, images.length);
  const summary = nodeConcept?.description || fallbackSummary;
  const node: TerreinbeheerObjectNode = {
    id: relativeSlug,
    title: context.title,
    slug: context.slugParts[context.slugParts.length - 1],
    relativeSlug,
    href,
    kind: context.kind,
    familyId: context.familyId,
    familyTitle: context.familyTitle,
    parentTitle: context.parentTitle,
    parentHref: context.parentHref,
    summary,
    concept: nodeConcept,
    children,
    images,
    trail
  };

  node.previewImage = findPreviewImage(node);
  return node;
}

function buildFamilies() {
  return familyConfigs
    .map((family) => {
      const folderPath = path.join(OBJECTENHANDBOEK_IMAGE_ROOT, family.folder);

      if (!existsSync(folderPath)) {
        return undefined;
      }

      return buildFolderNode({
        absolutePath: folderPath,
        publicPath: path.posix.join("images/objectenhandboek", family.folder),
        title: family.title,
        slugParts: [family.id],
        familyId: family.id,
        familyTitle: family.title,
        kind: "family",
        parentTrail: [],
        familySummary: family.summary,
        excludeFolderKeys: new Set((family.excludeFolders || []).map(normalizeKey))
      });
    })
    .filter(Boolean) as TerreinbeheerObjectNode[];
}

function flattenNodes(nodes: TerreinbeheerObjectNode[]): TerreinbeheerObjectNode[] {
  return nodes.flatMap((node) => [node, ...flattenNodes(node.children)]);
}

export function getTerreinbeheerObjectFamilies() {
  return buildFamilies();
}

export function getTerreinbeheerObjectNodes() {
  return flattenNodes(getTerreinbeheerObjectFamilies());
}

export function getTerreinbeheerLeafObjectNodes() {
  return getTerreinbeheerObjectNodes().filter((node) => node.kind === "object");
}

export function getTerreinbeheerNodeByRelativeSlug(relativeSlug: string) {
  const normalizedSlug = String(relativeSlug || "").replace(/^\/+|\/+$/g, "");

  return getTerreinbeheerObjectNodes().find((node) => node.relativeSlug === normalizedSlug);
}
