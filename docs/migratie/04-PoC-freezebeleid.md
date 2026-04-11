# PoC freezebeleid

## Doel

De huidige PoC is bevroren als referentieversie voor de migratie.

Dat betekent:

- de PoC blijft functioneel leidend;
- de PoC wordt niet verder ontwikkeld;
- de nieuwe omgeving wordt parallel opgebouwd in `next/`;
- wijzigingen aan de PoC zijn alleen nog toegestaan als expliciete uitzondering.

## Bevroren scope

De volgende delen van de repository gelden als bevroren PoC:

- `index.html`
- `src/**`
- `github-pages-upload/**`
- `static/**`
- `tests/**`
- `logo-waterschap-limburg.jpg`
- `PoC-publicatie-baseline.md`

## Toegestane uitzonderingen

Wijzigingen aan de bevroren PoC zijn alleen toegestaan bij:

- aantoonbare productiestoring;
- kapotte navigatie of dode links in de live PoC;
- noodzakelijke correctie voor publicatie of rollback;
- expliciet besluit om de freeze tijdelijk op te heffen.

## Niet toegestaan zonder expliciet besluit

- doorontwikkeling van bestaande PoC-pagina's;
- nieuwe features in `src/`;
- nieuwe styling in de PoC-structuur;
- inhoudelijke uitbreidingen in de PoC als onderdeel van de migratie.

## Werkafspraak

Nieuwe ontwikkeling gebeurt vanaf nu in:

- `docs/migratie/` voor ontwerp en besluitvorming;
- `next/` voor de nieuwe omgeving.

## Handhaving

De freeze wordt praktisch ondersteund door:

1. dit beleidsdocument;
2. `CODEOWNERS` voor review op bevroren paden;
3. een lokale git pre-commit guard die wijzigingen aan de bevroren PoC standaard blokkeert.

## Opheffen of tijdelijk overrulen

Als een wijziging aan de PoC toch nodig is, moet die wijziging:

- bewust en expliciet zijn;
- klein en herleidbaar blijven;
- en als uitzondering herkenbaar zijn in de commitgeschiedenis.
