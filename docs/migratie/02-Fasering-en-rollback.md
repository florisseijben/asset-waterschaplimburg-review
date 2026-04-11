# Fasering en rollback

## Doel

Deze migratie moet veilig verlopen. Dat betekent:

- de huidige PoC blijft beschikbaar;
- rollback moet altijd eenvoudig zijn;
- en de nieuwe omgeving wordt parallel opgebouwd.

## Basisafspraak

De huidige PoC is vastgezet als baseline:

- branch: `main`
- tag: `poc-baseline-github`

Dat is het vaste terugvalpunt voor deze migratie.

## Migratieprincipe

De migratie gebeurt **naast** de PoC, niet **in plaats van** de PoC.

Dat betekent:

- de huidige PoC blijft in de bestaande structuur staan;
- de nieuwe omgeving komt in een aparte map, bijvoorbeeld `next/`;
- publicatie van de PoC en opbouw van de nieuwe omgeving worden gescheiden gehouden.

## Fasering

### Fase 1: documentatie en doelstructuur

Doel:

- richting vastleggen;
- rollback veilig houden;
- doelstructuur en eerste slice definiëren.

Output:

- migratiedocumentatie;
- doelmappenstructuur;
- eerste backlog.

### Fase 2: technische opstart van de nieuwe omgeving

Doel:

- nieuwe mapstructuur opzetten;
- basale layouts en componenten neerzetten;
- eerste contentcollections definiëren.

Output:

- parallelle technische omgeving;
- nog zonder vervanging van de PoC.

### Fase 3: eerste verticale slice

Doel:

- één representatieve slice van begin tot eind migreren.

Voorgestelde slice:

- home;
- gedeelde layout;
- Datastandaard landing;
- Woordenboek landing.

Output:

- eerste werkende parallelle omgeving;
- vergelijkbare navigatie, layout en contentmodellering.

### Fase 4: gecontroleerde uitbreiding

Doel:

- product voor product migreren;
- eigenaarschap formaliseren;
- publicatieproces van de nieuwe omgeving volwassen maken.

## Rollbackstrategie

### Tijdens de migratie

Rollback is eenvoudig omdat:

- de PoC niet vervangen wordt;
- de PoC-livevariant op de huidige baseline blijft;
- de nieuwe omgeving pas later een eigen publicatiemoment krijgt.

### Als een slice niet slaagt

Dan geldt:

- de PoC blijft leidend;
- de slice blijft in ontwikkeling;
- er is geen noodzaak om de PoC terug te draaien.

### Als de nieuwe omgeving ooit live gaat

Dan moet rollback mogelijk blijven via:

- vaste release-tags;
- preview deployments;
- een expliciete omschakelbeslissing;
- en behoud van de PoC-baseline in git.

## Branch- en releaseafspraken

Advies:

- korte feature branches;
- pull requests per slice of onderdeel;
- duidelijke review-eigenaren;
- en tags op belangrijke migratiemijlpalen.

Niet doen:

- directe vervanging van de PoC in één stap;
- handmatige publicatie zonder terugvalpunt;
- de nieuwe omgeving opbouwen in dezelfde bronbestanden als de PoC.

## Wat dit betekent voor de repo

Voorlopig:

- `src/` blijft PoC-bron;
- `github-pages-upload/` blijft PoC-publicatiemirror;
- `docs/migratie/` bevat de migratiebasis;
- `next/` of een vergelijkbare map wordt later de nieuwe technische omgeving.

## Externe validatie tijdens de migratie

Omdat de huidige laptop geen Node.js-installatie toelaat, wordt de nieuwe omgeving voorlopig gevalideerd via GitHub Actions.

Dat betekent:

- de PoC blijft lokaal controleerbaar;
- `next/` wordt extern gebouwd;
- en buildresultaten worden gecontroleerd zonder de PoC-publicatie over te nemen.
