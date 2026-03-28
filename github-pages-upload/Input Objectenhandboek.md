# Input Objectenhandboek

## 1. Systeemstructuur

### Systeem
- Naam:
- Omschrijving:
- Heeft tussenlaag deelsysteem: ja/nee

### Deelsysteem
- Naam van tussenlaag:
- Meervoudsvorm:
- Omschrijving:
- Relatie met systeem:
  Bijvoorbeeld: `bestaat uit`, `is onderverdeeld in`

### Objecttypen binnen dit systeem
- Objecttype:
  Korte omschrijving:
  Hoort direct onder:
  Relatie met bovenliggend niveau:
- Objecttype:
  Korte omschrijving:
  Hoort direct onder:
  Relatie met bovenliggend niveau:

## 2. HiÃ«rarchie / boomstructuur

Beschrijf hier de boom zoals die functioneel gelezen moet worden.

Voorbeeldvorm:
- `Systeem > Deelsysteem > Objecttype > Subobjecttype > Component`

Invulling:
- 
- 
- 

## 3. Relatietypen

Welke soorten relaties willen we tonen op pagina's?

- Relatietype:
  Betekenis:
  Voorbeeld:
- Relatietype:
  Betekenis:
  Voorbeeld:
- Relatietype:
  Betekenis:
  Voorbeeld:

## 4. Objecttype-detailpagina

Welke blokken moeten op iedere objecttypepagina staan?

Verplicht:
- 
- 
- 

Optioneel:
- 
- 
- 

## 5. Productkoppelingen

Welke andere producten of onderdelen moeten op objecttypepagina's gekoppeld kunnen worden?

- Woordenboek: ja/nee
- OTL: ja/nee
- Referentiedataset: ja/nee
- Werkinstructies: ja/nee
- Assetregister: ja/nee
- Assetmanagement: ja/nee

Toelichting:
- 

## 6. semantische beheeromgeving / linked data voorbereiding

Welke velden moeten we nu al voorbereiden voor semantische beheeromgeving?

Minimaal bekend:
- URI:
- voorkeurslabel:
- definitie:
- bovenliggend object:
- onderliggende objecten:
- gerelateerde objecten:
- gekoppelde begrippen:
- shape / validatie:
- overige semantische velden:

Als je al propertynamen kent:
- 
- 
- 

## 7. Uitgewerkt voorbeeldpad

Werk 1 volledig voorbeeld uit van hoog naar laag.

### Voorbeeldpad
- Systeem:
- Deelsysteem:
- Objecttype:
- Subobjecttype:
- Component of onderdeel:

### Uitleg per niveau
- Niveau:
  Definitie:
  Relatie naar boven:
  Relatie naar beneden:
- Niveau:
  Definitie:
  Relatie naar boven:
  Relatie naar beneden:

### Wat moet zichtbaar zijn op de pagina van het hoofdobjecttype?
- 
- 
- 

### Welke gekoppelde producten moeten zichtbaar zijn?
- 
- 
- 

## 8. Open punten / onzekerheden

- 
- 
- 

---

# Voorzet Watersysteem

## 1. Systeemstructuur

### Systeem
- Naam: Watersysteem
- Omschrijving: Het Watersysteem omvat de objecttypen en gebiedsindeling die nodig zijn voor inrichting, beheer en beoordeling van watergangen, watervlakten, buffers, terreinen, kunstwerken, groenobjecten en terreininrichting.
- Heeft tussenlaag deelsysteem: ja

### Deelsysteem
- Naam van tussenlaag: Stroomgebied
- Meervoudsvorm: Stroomgebieden
- Omschrijving: Een stroomgebied is een gebiedsgerichte indeling van het areaal binnen het Watersysteem en fungeert als tussenlaag tussen systeemniveau en concrete objecttypen.
- Relatie met systeem:
  `is onderverdeeld in`

### Objecttypen binnen dit systeem
- Objecttype: Watergang
  Korte omschrijving: Lijnvormig waterlichaam voor afvoer, aanvoer of transport van water.
  Hoort direct onder: Stroomgebied
  Relatie met bovenliggend niveau: `ligt in`
- Objecttype: Watervlakte
  Korte omschrijving: Vlakvormig waterobject zoals plas, vijver of ander stilstaand of langzaam stromend water.
  Hoort direct onder: Stroomgebied
  Relatie met bovenliggend niveau: `ligt in`
- Objecttype: Waterbuffer
  Korte omschrijving: Object voor tijdelijke berging of buffering van water.
  Hoort direct onder: Stroomgebied
  Relatie met bovenliggend niveau: `ligt in`
- Objecttype: Terrein
  Korte omschrijving: Gebiedsobject dat functioneel onderdeel is van het watersysteem en waar objecten of voorzieningen op liggen.
  Hoort direct onder: Stroomgebied
  Relatie met bovenliggend niveau: `ligt in`
- Objecttype: Kunstwerk
  Korte omschrijving: Civieltechnisch object met een waterstaatkundige functie binnen het systeem.
  Hoort direct onder: Stroomgebied
  Relatie met bovenliggend niveau: `ligt in`
- Objecttype: Groenobject
  Korte omschrijving: Beheerd groen element binnen het watersysteem.
  Hoort direct onder: Stroomgebied
  Relatie met bovenliggend niveau: `ligt in`
- Objecttype: Terreininrichting
  Korte omschrijving: Inrichtingselement dat onderdeel uitmaakt van het terrein of de functionele omgeving van watersysteemobjecten.
  Hoort direct onder: Stroomgebied
  Relatie met bovenliggend niveau: `ligt in`

## 2. HiÃ«rarchie / boomstructuur

Beschrijf hier de boom zoals die functioneel gelezen moet worden.

Voorbeeldvorm:
- `Systeem > Deelsysteem > Objecttype > Subobjecttype > Component`

Invulling:
- `Watersysteem > Stroomgebied > Watergang`
- `Watersysteem > Stroomgebied > Watergang > Watergangsectie`
- `Watersysteem > Stroomgebied > Watergang > Watergangsectie > Talud`
- `Watersysteem > Stroomgebied > Watergang > Watergangsectie > Bodem`
- `Watersysteem > Stroomgebied > Watergang > Watergangsectie > Bekledingsconstructie`
- `Watersysteem > Stroomgebied > Watervlakte`
- `Watersysteem > Stroomgebied > Waterbuffer`
- `Watersysteem > Stroomgebied > Terrein`
- `Watersysteem > Stroomgebied > Kunstwerk`
- `Watersysteem > Stroomgebied > Groenobject`
- `Watersysteem > Stroomgebied > Terreininrichting`

## 3. Relatietypen

Welke soorten relaties willen we tonen op pagina's?

- Relatietype: `is onderverdeeld in`
  Betekenis: Een hoger organisatieniveau bestaat uit onderliggende gebieden of objecttypen.
  Voorbeeld: `Watersysteem is onderverdeeld in Stroomgebieden`
- Relatietype: `ligt in`
  Betekenis: Een objecttype of concreet object hoort ruimtelijk of organisatorisch binnen een gebied.
  Voorbeeld: `Watergang ligt in Stroomgebied`
- Relatietype: `bestaat uit`
  Betekenis: Een objecttype heeft vaste onderdelen, secties of componenten.
  Voorbeeld: `Watergang bestaat uit Watergangsecties`
- Relatietype: `heeft onderdeel`
  Betekenis: Een object of sectie heeft benoemde fysieke of functionele onderdelen.
  Voorbeeld: `Watergangsectie heeft onderdeel Talud`
- Relatietype: `heeft constructie`
  Betekenis: Een objectonderdeel heeft een constructief element dat inhoudelijk apart beschreven wordt.
  Voorbeeld: `Talud heeft constructie Bekledingsconstructie`
- Relatietype: `grenst aan`
  Betekenis: Een object staat in ruimtelijke of functionele relatie tot een ander object.
  Voorbeeld: `Watergang grenst aan Terrein`

## 4. Objecttype-detailpagina

Welke blokken moeten op iedere objecttypepagina staan?

Verplicht:
- Definitie en functionele beschrijving
- Plek in de hiÃ«rarchie
- Bovenliggende en onderliggende relaties
- Gekoppelde objecttypen
- Gekoppelde producten
- Linked data / broninformatie

Optioneel:
- Eigenschappen of kenmerken
- Visuele boom of relatieoverzicht
- Voorbeeld van gekoppelde deelobjecten
- Kwaliteits- of validatiestatus

## 5. Productkoppelingen

Welke andere producten of onderdelen moeten op objecttypepagina's gekoppeld kunnen worden?

- Woordenboek: ja
- OTL: ja
- Referentiedataset: ja
- Werkinstructies: ja
- Assetregister: nee
- Assetmanagement: ja

Toelichting:
- `Woordenboek` voor definities en begrippen.
- `OTL` voor klassering, relaties en semantische structuur.
- `Referentiedataset` voor voorbeeld- of toetsdata.
- `Werkinstructies` voor beheer- en gebruiksinstructies.
- `Assetmanagement` voor beheercontext, rollen of processen waar relevant.
- `Assetregister` lijkt eerder het niveau van concrete assets dan objecttypen te raken en kan daarom voorlopig optioneel blijven.

## 6. semantische beheeromgeving / linked data voorbereiding

Welke velden moeten we nu al voorbereiden voor semantische beheeromgeving?

Minimaal bekend:
- URI: unieke identifier van systeem, deelsysteem, objecttype of onderdeel
- voorkeurslabel: officiÃ«le naam van het objecttype
- definitie: inhoudelijke beschrijving
- bovenliggend object: directe parent in de hiÃ«rarchie
- onderliggende objecten: child-objecttypen of onderdelen
- gerelateerde objecten: functioneel of ruimtelijk verbonden typen
- gekoppelde begrippen: verwijzingen naar Woordenboek
- shape / validatie: verwijzing naar SHACL-shape of andere validatieregel
- overige semantische velden: type, status, bron, versie, domein, systeem, deelsysteem

Als je al propertynamen kent:
- `prefLabel`
- `definition`
- `broader` / `narrower`
- `related`
- `inScheme`
- `rdf:type`
- `shaclShape`

## 7. Uitgewerkt voorbeeldpad

Werk 1 volledig voorbeeld uit van hoog naar laag.

### Voorbeeldpad
- Systeem: Watersysteem
- Deelsysteem: Stroomgebied
- Objecttype: Watergang
- Subobjecttype: Watergangsectie
- Component of onderdeel: Talud

### Uitleg per niveau
- Niveau: Watersysteem
  Definitie: Hoofdniveau voor de objectstructuur van waterstaatskundige objecten binnen dit domein.
  Relatie naar boven: geen
  Relatie naar beneden: `is onderverdeeld in Stroomgebied`
- Niveau: Stroomgebied
  Definitie: Gebiedsindeling waarmee het areaal binnen het Watersysteem logisch wordt opgedeeld.
  Relatie naar boven: `onderdeel van Watersysteem`
  Relatie naar beneden: `bevat Watergang, Watervlakte, Waterbuffer, Terrein, Kunstwerk, Groenobject en Terreininrichting`
- Niveau: Watergang
  Definitie: Lijnvormig waterobject voor transport, afvoer of aanvoer van water.
  Relatie naar boven: `ligt in Stroomgebied`
  Relatie naar beneden: `bestaat uit Watergangsecties`
- Niveau: Watergangsectie
  Definitie: Afgebakend deel van een watergang waarvoor kenmerken, onderhoud en constructieve onderdelen specifieker beschreven kunnen worden.
  Relatie naar boven: `onderdeel van Watergang`
  Relatie naar beneden: `heeft onderdeel Talud en Bodem`
- Niveau: Talud
  Definitie: Schuine zijkant van een watergangsectie met functionele en constructieve kenmerken.
  Relatie naar boven: `onderdeel van Watergangsectie`
  Relatie naar beneden: `kan Bekledingsconstructie hebben`

### Wat moet zichtbaar zijn op de pagina van het hoofdobjecttype?
- Beschrijving van `Watergang` als objecttype
- Plek van `Watergang` binnen `Watersysteem > Stroomgebied`
- Onderliggende structuur met `Watergangsectie`, `Talud` en `Bodem`
- Relaties naar andere objecttypen zoals `Kunstwerk`, `Terrein` of `Watervlakte` als dat relevant is
- Verwijzingen naar begrippen, OTL-klassen en instructies

### Welke gekoppelde producten moeten zichtbaar zijn?
- Woordenboekbegrippen zoals `Watergang`, `Watergangsectie`, `Talud`
- OTL-relaties of klassen voor de objectstructuur
- Referentiedataset met voorbeeldstructuur of voorbeeldobjecten
- Werkinstructies voor beheer of registratie
- Eventueel Assetmanagement-processen of rollen

## 8. Open punten / onzekerheden

- Moet `Watergangsectie` een eigen objecttypepagina krijgen of alleen als onderliggend onderdeel zichtbaar zijn?
- Moeten `Talud`, `Bodem` en `Bekledingsconstructie` als volwaardige objecttypen gemodelleerd worden of als componenten binnen een objecttype?
- Welke objectrelaties zijn puur hiÃ«rarchisch en welke moeten ook als functionele of ruimtelijke relatie getoond worden?

