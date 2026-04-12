# Tijdelijk vs structureel

Dit document markeert welke keuzes in de huidige `next`-omgeving bewust tijdelijk zijn en welke keuzes onderdeel zijn van de beoogde doelarchitectuur.

Doel:

- migratieversnelling mogelijk maken zonder architectuurvervuiling te normaliseren;
- expliciet maken wat later opgeschoond moet worden;
- en onderscheid houden tussen eindbeeld en overbrugging.

## Structureel

Deze keuzes passen bij de doelarchitectuur en mogen blijven:

- publicatie in een parallelle `next/`-omgeving naast de bevroren PoC
- centrale layouts en componenten zoals `BaseLayout`, `Hero`, `InfoCard`, `CardGrid`
- contentgedreven pagina's vanuit `next/src/content`
- eenduidige kaartcomponenten voor navigatie en doorklik
- aparte landingspagina's per product, systeem en discipline
- GitHub Actions als externe build- en previewstraat

## Tijdelijk

Deze keuzes zijn nu bewust acceptabel, maar zijn geen gewenste eindsituatie:

- de route [`next/src/pages/in-migratie/[...slug].astro`](</c:/Users/f.seijben/Develop/Asset.waterschaplimburg.nl/next/src/pages/in-migratie/%5B...slug%5D.astro:1>) als generieke tussenlaag voor nog niet uitgewerkte routes
- discipline- en systeempagina's die nog grotendeels generiek zijn opgebouwd
- contentkaarten die al wel klikbaar zijn maar nog naar placeholder-achtige migratieroutes wijzen
- samengestelde contentteksten die voorlopig zijn samengevoegd om de informatiestructuur testbaar te maken

## Waarom dit nu toch verantwoord is

Deze tijdelijke keuzes zijn op dit moment verdedigbaar omdat ze:

- de gebruikerservaring consistenter maken dan dode of half-klikbare kaarten;
- buildbare preview's mogelijk maken zonder lokale Node-afhankelijkheid;
- en migratie per slice ondersteunen zonder de PoC aan te tasten.

Belangrijk:

- tijdelijke routes mogen de eindarchitectuur niet gaan vervangen;
- placeholders zijn een overbrugging, geen contentmodel;
- nieuwe generieke routes moeten later worden ingeruild voor echte domeinroutes.

## Opruimvolgorde

De aanbevolen volgorde voor opschoning is:

1. vervang `in-migratie`-routes die vaak gebruikt worden door echte landings- of detailpagina's
2. maak discipline- en systeempagina's inhoudelijk onderscheidender
3. verplaats tijdelijke samengestelde teksten naar een definitiever contentmodel
4. verklein het aantal generieke tussenlagen totdat alleen echte informatiepaden overblijven

## Praktische beslisregel

Gebruik de volgende vuistregel:

- als een route vooral bestaat om doorklikgedrag tijdelijk werkend te houden, is hij tijdelijk;
- als een route een herkenbare informatie-ingang vormt voor gebruikers en product owners, is hij structureel kandidaat;
- als een component op meerdere plekken dezelfde interactie en presentatie verzorgt, is hij structureel;
- als een oplossing alleen nodig is omdat onderliggende content nog ontbreekt, moet hij later verdwijnen.

## Huidige conclusie

De huidige architectuur is nog netjes genoeg voor een migratiefase.

Dat oordeel rust op drie voorwaarden:

- standaardcomponenten blijven leidend;
- tijdelijke tussenlagen blijven expliciet herkenbaar;
- en placeholders worden iteratief vervangen door echte domeinpagina's.
