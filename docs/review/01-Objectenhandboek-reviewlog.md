# Reviewlog Objectenhandboek

Deze reviewlog is bedoeld voor de eerste inhoudelijke en visuele verbeterslag op de gemigreerde Objectenhandboek-lijn in `next`.

In scope:

- [Objectenhandboek landing](</c:/Users/f.seijben/Develop/Asset.waterschaplimburg.nl/next/src/pages/datastandaard/objectenhandboek/index.astro:1>)
- [Watersysteem](</c:/Users/f.seijben/Develop/Asset.waterschaplimburg.nl/next/src/pages/datastandaard/objectenhandboek/watersysteem/index.astro:1>)
- [Watergangen](</c:/Users/f.seijben/Develop/Asset.waterschaplimburg.nl/next/src/pages/datastandaard/objectenhandboek/watersysteem/watergangen/index.astro:1>)
- [Watergangsectie](</c:/Users/f.seijben/Develop/Asset.waterschaplimburg.nl/next/src/pages/datastandaard/objectenhandboek/watersysteem/watergangsectie/index.astro:1>)
- [Intersectie](</c:/Users/f.seijben/Develop/Asset.waterschaplimburg.nl/next/src/pages/datastandaard/objectenhandboek/watersysteem/intersectie/index.astro:1>)

## Reviewrubrieken

### 1. Inhoud

Gebruik deze rubriek voor:

- feitelijke onjuistheden
- te grove samenvattingen
- ontbrekende begrippen
- onlogische productrelaties

Open punten:

- Homepagina: `Platformlogica` en `Onderdelen` voelen dubbelop. De beschrijvingen in de kaarten onder `Platformlogica` kunnen waarschijnlijk worden samengevoegd met de kaarten in `Onderdelen`, zodat de home directer en minder herhalend wordt.
- Kaarten die doorverwijzen naar een onderdeel, product of pagina moeten als hele kaart interactief aanvoelen. Nu is vaak alleen de tekstlink klikbaar; gewenste richting is dat de volledige kaart als klikbare target herkenbaar is en visueel oplicht bij hover/focus.

### 2. Structuur

Gebruik deze rubriek voor:

- onduidelijke hiërarchie
- verkeerde volgorde van secties
- ontbrekende doorklik
- inconsistente breadcrumblogica

Open punten:

- Nog in te vullen
- Objectpagina's, subsystemen en systeempagina's moeten een vaste sectie `Samenhang` krijgen waarin decompositie en semantische relaties zichtbaar zijn. Die sectie hoort niet als losse kaart in `Uitwerking`, maar als eigen inhoudslaag dicht bij `Begrip`, gevoed vanuit de semantische modelleertool.
- Objectpagina's hebben geen aparte `Doorklik`-sectie meer nodig. Metadata hoort logischer in de hero en `Productlijn` werkt beter als afsluitende sectie onderaan de pagina.
- Onder `Talud` moet een extra constructief niveau zichtbaar worden, waarin `Bekledingsconstructie` als onderliggend object wordt uitgewerkt en doorloopt naar `Toplaag`.
- Binnen de generieke sectie `Vervolg` moeten terugverwijzingen links staan met een subtiele linkerpijl, terwijl verdieping of doorklik naar een lager niveau rechts moet staan met een subtiele rechterpijl.
- Begripssecties moeten rustiger worden: alleen `Definitie`, `Synoniemen`, `Gerelateerde termen` en `Typen`, sober als tekstregels met links naar het woordenboek en zonder kaartachtige presentatie.
- Binnen `Begrip` moeten `Synoniemen`, `Gerelateerde termen` en `Typen` standaard ingeklapt zijn en pas extra context tonen wanneer je ze uitklapt.
- De sectie met productrelaties moet als vaste standaardsectie herkenbaar zijn en niet per pagina een andere titel gebruiken.
- De productsectie op de Datastandaard-landing en systeemlandingen moet niet per pagina los worden opgebouwd, maar via één herbruikbare standaardcomponent werken.
- Productnamen moeten voluit en begrijpelijk zijn waar dat helpt. Voor `OTL` is de voorkeur om zichtbaar `Object Type Library` te tonen en de betekenis expliciet toe te lichten.

### 3. Vormgeving

Gebruik deze rubriek voor:

- pagina's die te plat ogen
- ongelijke kaarthoogtes
- te veel herhaling
- gebrek aan visuele hiërarchie

Open punten:

- Alle secties en blokken zijn nu volledig afgerond. Gewenste richting: blokken rechthoekig houden en alleen de rechterbovenhoek afronden.
- Kleurverlopen in secties en blokken verwijderen. Gewenste richting: alleen effen kleurvlakken of wit toepassen.
- Ook semi-transparante kleurvlakken vermijden als die alsnog als verloop of zachte waas lezen. Gewenste richting: volledig effen kleurtoepassing.
- Grote secties volledig rechthoekig maken. Alleen de kleinere blokken en kaarten mogen nog een afgeronde rechterbovenhoek houden.

### 4. Harmonisatie

Gebruik deze rubriek voor:

- verschillen tussen vergelijkbare pagina's
- afwijkende labels
- inconsistent gebruik van termen
- verschillende informatiedichtheid per pagina

Open punten:

- Visuele vormentaal aanscherpen: afgeronde panelen en kaarten vervangen door een consistenter hoekmodel met alleen een afgeronde rechterbovenhoek.
- Gebruik van kleurverlopen terugbrengen naar een consistente regel: geen gradients in secties en blokken, alleen effen kleur of wit.
- Ook transparante overlays en kleurvlakken normaliseren naar vaste effen kleuren, zodat de vormentaal overal gelijk blijft.
- Een duidelijk verschil aanbrengen tussen grote dragers en kleine elementen: grote secties rechthoekig, kleine kaarten en controls met een subtiele enkele afgeronde hoek.
- Homepagina harmoniseren door overlappende secties samen te voegen waar ze dezelfde navigatielaag beschrijven, zoals `Platformlogica` en `Onderdelen`.
- Klikbare kaarten overal hetzelfde laten werken: hele kaart klikbaar, duidelijke hover/focus-state en geen afhankelijkheid van alleen de tekstlink.

### 5. Beheerbaarheid

Gebruik deze rubriek voor:

- content die beter als data gemodelleerd moet worden
- componenten die te generiek of juist te specifiek zijn
- herhaling tussen markdown-bestanden
- structuur die straks lastig wordt voor meerdere product owners

Open punten:

- Nog in te vullen
- Decompositie hoort niet als gewone inhoudskaart in `Uitwerking` te blijven staan zodra een semantische samenhangsweergave beschikbaar is. Gewenste richting: een herbruikbare `Samenhang`-sectie die later vanuit API, Turtle of vergelijkbare bronbestanden kan worden gevoed.

## Voorstel voor de eerste verbeterslag

Zodra de eerste opmerkingen verzameld zijn, stel ik voor om ze te clusteren in drie uitvoerbare rondes:

1. Navigatie en hiërarchie
2. Inhoudelijke aanscherping
3. Visuele harmonisatie
