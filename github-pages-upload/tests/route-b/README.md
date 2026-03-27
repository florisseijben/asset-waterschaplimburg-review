# Route B test

Open `index.html` direct in de browser.

Deze test controleert:

- inline `JSON-LD`;
- inline `JSON`;
- inline `GeoJSON`;
- losse `assets.json`;
- losse `assets.geojson`;
- HTML-fallback als `fetch()` lokaal wordt geblokkeerd.

Interpretatie:

- Als inline JSON en inline GeoJSON werken, dan is route B veilig uitvoerbaar zonder lokale server.
- Als losse JSON en GeoJSON ook laden, dan kunnen externe databestanden lokaal direct gebruikt worden.
- Als `fetch()` faalt maar inline data werkt, dan is een HTML-first aanpak met inline of server-geleverde data nodig.
