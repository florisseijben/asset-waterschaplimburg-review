# Migratiebasis

## Doel

Deze map bevat de basisdocumentatie voor de volgende fase na de huidige PoC-baseline.

Uitgangspunt:

- de huidige PoC blijft intact en is terughaalbaar via `poc-baseline-github`;
- de migratie gebeurt parallel;
- documentatie voor de nieuwe omgeving staat los van de PoC-publicatiebaseline.

## Documenten

1. [01-Richting-en-doelarchitectuur.md](</c:/Users/f.seijben/Develop/Asset.waterschaplimburg.nl/docs/migratie/01-Richting-en-doelarchitectuur.md>)
Dit document beschrijft de gekozen richting, architectuurprincipes en technologiekeuzes.

2. [02-Fasering-en-rollback.md](</c:/Users/f.seijben/Develop/Asset.waterschaplimburg.nl/docs/migratie/02-Fasering-en-rollback.md>)
Dit document beschrijft hoe we migreren zonder de huidige PoC kwijt te raken.

3. [03-Eerste-slice-en-backlog.md](</c:/Users/f.seijben/Develop/Asset.waterschaplimburg.nl/docs/migratie/03-Eerste-slice-en-backlog.md>)
Dit document beschrijft welke eerste verticale slice we migreren en welke concrete backlog daarbij hoort.

4. [04-PoC-freezebeleid.md](</c:/Users/f.seijben/Develop/Asset.waterschaplimburg.nl/docs/migratie/04-PoC-freezebeleid.md>)
Dit document beschrijft welke delen van de huidige PoC bevroren zijn en hoe die freeze praktisch bewaakt wordt.

## Werkafspraak

Totdat de nieuwe omgeving expliciet is gestart:

- blijft `src/` de bron van de huidige PoC;
- blijft `github-pages-upload/` de publicatiemirror van de huidige PoC;
- komt nieuwe migratiedocumentatie in `docs/migratie/`;
- en komt de nieuwe technische omgeving later naast de PoC, niet eroverheen.
