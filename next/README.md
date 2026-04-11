# Next omgeving

## Doel

Deze map is de parallelle technische startomgeving voor de migratie na de huidige PoC.

Belangrijke afspraak:

- de huidige PoC blijft leidend in `src/`;
- deze map vervangt de PoC nog niet;
- deze map is bedoeld voor de eerste migratieslice.

## Eerste scope

De eerste scope van `next/` is:

1. gedeelde layout
2. home
3. Datastandaard landing
4. Woordenboek landing

## Structuur

```text
/next
  /src
    /components
    /content
    /data
    /features
    /layouts
    /pages
    /styles
```

## Werkafspraken

- content wordt hier content-first opgezet;
- gedeelde layout en navigatie worden centraal gemodelleerd;
- interactieve features komen later als gerichte islands;
- niets uit de huidige PoC wordt hier direct overschreven.

## Externe build

Deze omgeving kan buiten de lokale laptop gebouwd worden via:

- `.github/workflows/next-build.yml`

Doel van deze workflow:

- Astro-build van `next/` draaien op GitHub;
- buildproblemen vroeg zichtbaar maken;
- het resultaat als artifact opslaan zonder de huidige PoC-publicatie te vervangen.
