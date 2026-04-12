# Doorgevoerde besluiten

Dit document legt ontwerp- en interactiekeuzes vast die al zijn doorgevoerd in de nieuwe `next`-omgeving.

Doel:

- zicht houden op wat niet alleen besproken, maar ook echt aangepast is;
- reviewopmerkingen scheiden van uitgevoerde besluiten;
- en latere harmonisatie beter navolgbaar maken.

## Vormgeving

Doorgevoerd:

- grote secties zijn rechthoekig gemaakt
- kleinere kaarten en controls houden een enkele afgeronde rechterbovenhoek
- gradients zijn verwijderd uit de `next`-vormgeving
- transparante kleurvlakken zijn genormaliseerd naar effen kleuren

## Homepagina

Doorgevoerd:

- `Platformlogica` is als aparte sectie verwijderd van de home
- beschrijvingen zijn samengebracht in de kaarten onder `Onderdelen`
- kaarten op de home reageren nu als volledige klikbare kaart

## Kaartinteractie

Doorgevoerd:

- klikbare kaarten gebruiken één standaardcomponent: [`InfoCard.astro`](</c:/Users/f.seijben/Develop/Asset.waterschaplimburg.nl/next/src/components/InfoCard.astro:1>)
- kaarten met een route reageren als volledige kliktarget
- hover- en focusgedrag zijn zichtbaar gemaakt op kaartniveau
- waar nog geen definitieve eindpagina beschikbaar is, wordt tijdelijk een expliciete migratieroute gebruikt

## Datastandaard-benaderingen

Doorgevoerd:

- systeemkaarten op de Datastandaard-landing verwijzen naar systeemlandingen
- disciplinekaarten op de Datastandaard-landing verwijzen naar disciplinelandingen
- de Datastandaard heeft daarmee een explicietere tussenlaag gekregen tussen landing en product

## Begripsverwijzingen

Doorgevoerd:

- landings- en objectpagina's krijgen een vaste begripsverwijzing naar het woordenboek
- hiervoor is de standaardcomponent [`ConceptReference.astro`](</c:/Users/f.seijben/Develop/Asset.waterschaplimburg.nl/next/src/components/ConceptReference.astro:1>) toegevoegd
- dit patroon is nu gekoppeld aan systeem-, discipline- en objectpagina's binnen de huidige slice
- objectpagina's in de watersysteemlijn gebruiken nu een gezamenlijke begripsopbouw met `Objectdefinitie`, `Vergelijkbare termen` en `Typen` onder één sectie `Begrip`
- objectpagina's in de watersysteemlijn tonen hun metadata nu in de hero in plaats van in een apart zijblok
- `Doorklik` is verwijderd van de objectpagina's in de watersysteemlijn
- `Productlijn` staat nu als afsluitende sectie onderaan de objectpagina's

## Semantische samenhang

Doorgevoerd:

- voor `Watergang` is een eerste herbruikbare sectie [`SemanticSamenhangSection.astro`](</c:/Users/f.seijben/Develop/Asset.waterschaplimburg.nl/next/src/components/SemanticSamenhangSection.astro:1>) toegevoegd
- deze sectie is bedoeld als basispatroon voor systeem-, subsysteem- en objectpagina's
- de eerste vulling komt uit een dummy Turtle-bron: [watergang-samenhang.ttl](</c:/Users/f.seijben/Develop/Asset.waterschaplimburg.nl/next/src/data/semantic/watergang-samenhang.ttl:1>)
- in `Watergang` is de kaart `Decompositie` uit `Uitwerking` verwijderd en vervangen door een eigen sectie `Samenhang` direct onder `Begrip`
- de eerste visualisatie gebruikt Reactodia waar mogelijk en valt terug op een vaste graphweergave als de workspace niet beschikbaar is
- `Watersysteem` volgt nu hetzelfde sectieritme als de objectpagina's: `Begrip`, `Samenhang`, `Uitwerking`, `Productlijn`, `Vervolg`
- `Stroomgebied`, `Watergang`, `Watergangsectie` en `Intersectie` zijn nu op hetzelfde ritme gebracht, inclusief `Samenhang` en een afsluitende sectie `Vervolg`
- binnen `Uitwerking` gebruiken systeem- en objectpagina's nu minimaal dezelfde vier blokken: `Overzicht / Samenhang`, `Afbakening`, `Onderdelen` en `Geometrie`
- deze minimale uitwerkingsblokken gelden nu ook expliciet voor `Stroomgebied` als subsysteempagina

## Architectuur

Doorgevoerd en vastgelegd:

- tijdelijke migratiekeuzes versus structurele keuzes zijn apart beschreven in [05-Tijdelijk-vs-structureel.md](</c:/Users/f.seijben/Develop/Asset.waterschaplimburg.nl/docs/migratie/05-Tijdelijk-vs-structureel.md:1>)

## Gebruik

Beslisregel voor vervolg:

- nieuwe wensen eerst in de reviewlog
- doorgevoerde generieke keuzes ook in dit document
- tijdelijke oplossingen daarnaast expliciet in de migratiedocumentatie
