(function () {
  var statusList = document.getElementById("status-list");
  var jsonResult = document.getElementById("json-result");
  var geojsonResult = document.getElementById("geojson-result");
  var jsonldResult = document.getElementById("jsonld-result");
  var fallbackPreview = document.getElementById("fallback-preview");

  function setStatus(message, type) {
    var item = document.createElement("p");
    item.className = "status-item status-" + type;
    item.textContent = message;
    statusList.appendChild(item);
  }

  function clearWaitingStatus() {
    statusList.innerHTML = "";
  }

  function formatList(items, mapper) {
    return items.map(mapper).join("\n");
  }

  function readInlineJson(id) {
    var node = document.getElementById(id);
    return JSON.parse(node.textContent);
  }

  function renderFallback() {
    var fallback = readInlineJson("fallback-json");
    fallbackPreview.textContent = fallback.title + "\n" + formatList(fallback.items, function (item) {
      return "- " + item.code + " | " + item.naam;
    });
  }

  function renderJsonLd() {
    var jsonld = readInlineJson("jsonld-inline");
    jsonldResult.textContent =
      "Type: " + jsonld["@type"] + "\n" +
      "Naam: " + jsonld.name + "\n" +
      "Omschrijving: " + jsonld.description + "\n" +
      "Maker: " + jsonld.creator.name + "\n" +
      "Trefwoorden: " + jsonld.keywords.join(", ");
    setStatus("Inline JSON-LD is succesvol gelezen.", "success");
  }

  function renderJson(data) {
    jsonResult.textContent =
      "Bron: " + data.title + "\n" +
      formatList(data.items, function (item) {
        return "- " + item.code + " | " + item.naam + " | status: " + item.status;
      });
  }

  function renderGeoJson(data) {
    geojsonResult.textContent =
      "Feature type: " + data.type + "\n" +
      "Aantal features: " + data.features.length + "\n" +
      formatList(data.features, function (feature) {
        return "- " + feature.properties.code + " | " + feature.properties.naam +
          " | lon: " + feature.geometry.coordinates[0] +
          " | lat: " + feature.geometry.coordinates[1];
      });
  }

  function fetchJson(url, onSuccess, label) {
    return fetch(url)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("HTTP " + response.status);
        }
        return response.json();
      })
      .then(function (data) {
        onSuccess(data);
        setStatus(label + " succesvol geladen via fetch().", "success");
      })
      .catch(function (error) {
        setStatus(label + " niet geladen via fetch(): " + error.message, "error");
      });
  }

  clearWaitingStatus();
  renderFallback();
  renderJsonLd();
  renderJson(readInlineJson("inline-assets-json"));
  renderGeoJson(readInlineJson("inline-assets-geojson"));
  setStatus("Inline JSON is succesvol gelezen.", "success");
  setStatus("Inline GeoJSON is succesvol gelezen.", "success");

  fetchJson("./data/assets.json", renderJson, "JSON-bestand");
  fetchJson("./data/assets.geojson", renderGeoJson, "GeoJSON-bestand");
}());
