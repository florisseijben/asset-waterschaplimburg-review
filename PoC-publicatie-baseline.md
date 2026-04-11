# PoC publicatiebaseline

## Doel

Deze repository bevat de huidige publiceerbare baseline van de PoC voor `asset.waterschaplimburg.nl`.

Deze baseline heeft twee doelen:

- de huidige PoC veilig en reproduceerbaar op GitHub publiceren;
- een vast terugvalpunt behouden voordat de migratie naar een nieuwe omgeving start.

## Baseline-afspraak

Voor deze fase geldt:

- de huidige PoC blijft functioneel leidend;
- publicatie gebeurt vanaf de repository-root;
- `src/` bevat de bronstructuur van de huidige PoC;
- `github-pages-upload/` blijft beschikbaar als publicatiemirror van dezelfde PoC;
- migratie naar een nieuwe stack gebeurt pas na deze baseline, in een aparte vervolgfase.

## Aanbevolen GitHub Pages-configuratie

Publiceer deze baseline vanaf:

- branch: `main`
- folder: `/(root)`

Reden:

- de repository-root bevat al een geldige `index.html`;
- de root verwijst correct naar `./src/...`;
- deze route is eenvoudiger en veiliger dan nu al een alternatieve publicatiestructuur afdwingen.

## Publicatiechecklist

Voer voor de baseline deze checks uit:

1. `index.html` in de repository-root opent de PoC.
2. `src/pages/index.html` opent de platform-home.
3. hoofdnavigatie naar Datastandaard, Assetregister en Assetmanagement werkt.
4. nieuwe detail- en woordenboekpagina's zijn aanwezig in zowel `src/` als `github-pages-upload/`.
5. de baseline wordt getagd voordat migratiewerk start.

## Tagvoorstel

Gebruik voor deze stand een tag zoals:

`poc-baseline-github`

of:

`poc-baseline-2026-04`

## Afspraken voor de volgende fase

Na deze baseline:

- blijft deze PoC de referentieversie;
- komt de migratiebasis in aparte markdownbestanden;
- en start de nieuwe omgeving parallel, zonder de PoC direct te vervangen.
