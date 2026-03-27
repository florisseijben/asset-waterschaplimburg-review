Je helpt mij om het project asset.waterschaplimburg.nl om te zetten naar een werkbare projectstructuur in Visual Studio op een streng beheerde bedrijfslaptop.

Context
- Ik werk op een bedrijfslaptop met beperkte rechten.
- Ik kan niets installeren.
- Er is geen Node.js, Python, npm, Vite of andere build tooling beschikbaar.
- Ik wil dus een oplossing die werkt zonder extra installaties.
- Werk daarom vanuit het principe: buildless, statisch, robuust en later uitbreidbaar.

Projectdoel
Ik wil een klikbaar en beheerbaar proof-of-concept bouwen voor asset.waterschaplimburg.nl, gebaseerd op de architectuur en prototypes die eerder zijn uitgewerkt.

Inhoudelijke basis van het project
De website heeft drie hoofdgroepen:
1. Assetregister
2. Assetmanagement
3. Datastandaard

De relevante projectonderdelen zijn:
- 00. Regie / Architectuur en standaarden
- 01. Design system & UX
- 10. Landingspagina asset.waterschaplimburg.nl
- 11. Assetregister
- 12. Assetmanagement
- 13. Datastandaard
- 13.1 Woordenboek
- 13.2 Objectenhandboek
- 13.3 OTL
- 13.4 Referentiedataset
- 13.5 Werkinstructies
- 14. overige gerelateerde productstructuren binnen deze lijn

Belangrijke inhoudelijke uitgangspunten
- Het project is één samenhangend platform, geen losse microsites.
- Gebruik een centrale platformstructuur met gedeelde header, footer, navigatie, breadcrumbs en componenten.
- Houd de architectuur scheidbaar in:
  1. platformlaag
  2. productlaag
  3. paginalaag
- Houd rekening met latere doorgroei naar een rijkere stack, maar implementeer nu zonder afhankelijk te zijn van Node, Python of andere tools.
- Richt het project vooral op HTML, CSS en JavaScript die direct in een browser kunnen draaien.
- Gebruik een mappenstructuur die later migreerbaar is naar bijvoorbeeld .NET, React of een CMS-gedreven front-end.

Jouw opdracht
Begeleid mij stap voor stap. Werk in fasen. Stel niet eerst allerlei vragen terug, maar doe een concreet voorstel en benoem waar ik expliciet een keuze moet maken.

Fase 1: technische nulmeting
Begin met een analyse van wat in mijn Visual Studio-omgeving waarschijnlijk wel en niet mogelijk is.
Controleer of een van de volgende routes realistisch is:
- pure statische HTML/CSS/JS
- statische HTML met JSON-data
- .NET / Razor zonder extra installaties
- andere ingebouwde opties binnen Visual Studio

Geef aan:
- welke aanpak het veiligst is
- welke aanpak het meest toekomstvast is
- welke beperkingen ik waarschijnlijk tegenkom op een bedrijfslaptop
- hoe ik lokaal kan testen zonder extra tooling

Fase 2: voorstel platformarchitectuur
Werk daarna een concreet voorstel uit voor de projectarchitectuur:
- mappenstructuur
- naamgeving
- scheiding tussen shared/platform/product/page
- routingstructuur op basis van de inhoudelijke sitemap
- componentstructuur
- plek voor statische voorbeelddata
- groeipad naar een rijkere technische stack

Fase 3: ontwerp van het buildless front-end model
Werk vervolgens uit hoe dit zonder build tooling moet worden opgezet:
- centrale CSS-opbouw
- design tokens
- layout-bestanden
- navigatie
- breadcrumbs
- kaarten
- tabbladen
- objectboom
- detailpagina’s
- tabellen
- documentweergave
- fallback als JSON of fetch lokaal niet werkt

Fase 4: stappenplan voor realisatie
Geef daarna een concreet uitvoeringsplan in kleine stappen.
Per stap:
- doel van de stap
- wat jij voorstelt dat er gemaakt wordt
- wat ik zelf expliciet moet kiezen
- wat de verwachte output is

Fase 5: eerste technische oplevering
Sluit af met een voorstel voor de eerste oplevering:
- minimale werkende projectstructuur
- welke pagina’s eerst aangemaakt moeten worden
- welke pagina’s eerst alleen skeleton zijn
- welke productlijn als eerste inhoudelijk uitgewerkt moet worden

Belangrijke werkwijze
- Werk praktisch en productiegericht.
- Neem mee dat dit project later doorontwikkeld kan worden.
- Vermijd afhankelijkheden die installaties vereisen.
- Denk als informatiearchitect én als front-end architect.
- Maak keuzes expliciet en leg kort uit waarom.
- Schrijf in helder Nederlands.
- Geef niet alleen principes, maar ook concrete mappen, bestandsnamen en werkafspraken.

Eindresultaat
Ik wil van jou:
1. een plan van aanpak,
2. een aanbevolen platformarchitectuur,
3. een voorstel voor de technische projectstructuur,
4. een stap-voor-stap implementatiepad binnen mijn beperkingen.