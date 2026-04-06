(function () {
  var items = window.__SEARCH_INDEX__ || [];
  var form = document.querySelector("[data-search-form]");
  var queryInput = document.querySelector("[data-search-query]");
  var personaSelect = document.querySelector("[data-search-persona]");
  var onderdeelSelect = document.querySelector("[data-search-onderdeel]");
  var laagSelect = document.querySelector("[data-search-laag]");
  var systeemSelect = document.querySelector("[data-search-systeem]");
  var disciplineSelect = document.querySelector("[data-search-discipline]");
  var opgaveSelect = document.querySelector("[data-search-opgave]");
  var countNode = document.querySelector("[data-search-count]");
  var resultsNode = document.querySelector("[data-search-results]");

  function normalize(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function matchesQuery(item, query) {
    var haystack;

    if (!query) {
      return true;
    }

    haystack = [
      item.title,
      item.summary,
      item.onderdeel,
      item.product,
      item.informatielaag
    ].concat(item.tags || []).join(" ");

    return normalize(haystack).indexOf(query) !== -1;
  }

  function matchesValue(list, value) {
    if (!value) {
      return true;
    }

    return (list || []).indexOf(value) !== -1;
  }

  function ensureOptions(select, values, label) {
    var options;

    if (!select) {
      return;
    }

    options = ['<option value="">' + label + '</option>'].concat(values.map(function (value) {
      return '<option value="' + value + '">' + value + '</option>';
    }));

    select.innerHTML = options.join("");
  }

  function applyQueryParams() {
    var params = new URLSearchParams(window.location.search);
    var query = params.get("q");
    var persona = params.get("persona");
    var onderdeel = params.get("onderdeel");
    var laag = params.get("laag");
    var systeem = params.get("systeem");
    var discipline = params.get("discipline");
    var opgave = params.get("opgave");
    var scope = params.get("scope");

    if (query) {
      queryInput.value = query;
    }

    if (persona) {
      personaSelect.value = persona;
    }

    if (onderdeel) {
      onderdeelSelect.value = onderdeel;
    }

    if (laag) {
      laagSelect.value = laag;
    }

    if (systeem) {
      systeemSelect.value = systeem;
    }

    if (discipline) {
      disciplineSelect.value = discipline;
    }

    if (opgave) {
      opgaveSelect.value = opgave;
    }

    return {
      scope: scope || ""
    };
  }

  function matchesScope(item, scope) {
    if (!scope) {
      return true;
    }

    return item.zoekpad === scope || item.zoekpad.indexOf(scope + " > ") === 0;
  }

  function uniqueValues(key) {
    var values = [];

    items.forEach(function (item) {
      (item[key] || []).forEach(function (value) {
        if (values.indexOf(value) === -1) {
          values.push(value);
        }
      });
    });

    return values.sort();
  }

  function scoreItem(item, query, filters) {
    var score = 0;
    var normalizedTitle = normalize(item.title);
    var normalizedSummary = normalize(item.summary);
    var normalizedTags = normalize((item.tags || []).join(" "));

    if (query) {
      if (normalizedTitle === query) {
        score += 100;
      } else if (normalizedTitle.indexOf(query) !== -1) {
        score += 60;
      }

      if (normalizedSummary.indexOf(query) !== -1) {
        score += 25;
      }

      if (normalizedTags.indexOf(query) !== -1) {
        score += 15;
      }
    }

    if (filters.persona && matchesValue(item.persona, filters.persona)) {
      score += 20;
    }

    if (filters.systeem && matchesValue(item.systeem, filters.systeem)) {
      score += 20;
    }

    if (filters.discipline && matchesValue(item.discipline, filters.discipline)) {
      score += 20;
    }

    if (filters.opgave && matchesValue(item.opgave, filters.opgave)) {
      score += 20;
    }

    if (filters.onderdeel && item.onderdeel === filters.onderdeel) {
      score += 10;
    }

    if (filters.laag && item.informatielaag === filters.laag) {
      score += 10;
    }

    return score;
  }

  function renderResults(filtered) {
    var grouped;

    countNode.textContent = String(filtered.length);

    if (!filtered.length) {
      resultsNode.innerHTML = '<article class="callout stack"><h3>Geen resultaten</h3><p>Probeer een andere zoekterm of verwijder een filter.</p></article>';
      return;
    }

    grouped = filtered.reduce(function (accumulator, item) {
      var onderdeelGroup = accumulator[item.onderdeel];
      var productGroup;

      if (!onderdeelGroup) {
        onderdeelGroup = {
          count: 0,
          products: {}
        };
        accumulator[item.onderdeel] = onderdeelGroup;
      }

      productGroup = onderdeelGroup.products[item.product];
      if (!productGroup) {
        productGroup = [];
        onderdeelGroup.products[item.product] = productGroup;
      }

      onderdeelGroup.count += 1;
      productGroup.push(item);
      return accumulator;
    }, {});

    resultsNode.innerHTML = Object.keys(grouped).map(function (onderdeel) {
      var onderdeelGroup = grouped[onderdeel];
      var productNames = Object.keys(onderdeelGroup.products);

      return '' +
        '<section class="search-results-section stack">' +
          '<header class="search-results-section-header stack">' +
            '<p class="eyebrow">Onderdeel</p>' +
            '<h3>' + onderdeel + '</h3>' +
            '<p class="quick-search-help">' + onderdeelGroup.count + ' resultaten</p>' +
          '</header>' +
          productNames.map(function (product) {
            return '' +
              '<section class="search-results-group stack">' +
                '<div class="search-results-group-header">' +
                  '<h4>' + product + '</h4>' +
                  '<p class="quick-search-help">' + onderdeelGroup.products[product].length + ' resultaten</p>' +
                '</div>' +
                '<div class="architecture-grid">' +
                  onderdeelGroup.products[product].map(function (item) {
                    var tags = [
                      item.informatielaag
                    ].concat(item.systeem || [], item.discipline || [], item.opgave || []).slice(0, 6);
                    var pathLine = item.zoekpad
                      ? '<p class="quick-search-help">' + item.zoekpad + '</p>'
                      : '';

                    return '' +
                      '<a class="architecture-card" href="' + item.href + '">' +
                        '<p class="eyebrow">' + onderdeel + ' / ' + product + '</p>' +
                        '<h5>' + item.title + '</h5>' +
                        pathLine +
                        '<p>' + item.summary + '</p>' +
                        '<div class="tag-row">' +
                          tags.map(function (tag) {
                            return '<span class="tag">' + tag + '</span>';
                          }).join("") +
                        '</div>' +
                      '</a>';
                  }).join("") +
                '</div>' +
              '</section>';
          }).join("") +
        '</section>';
    }).join("");
  }

  function applyFilters() {
    var query = normalize(queryInput.value);
    var params = new URLSearchParams(window.location.search);
    var filters = {
      persona: personaSelect.value,
      onderdeel: onderdeelSelect.value,
      laag: laagSelect.value,
      systeem: systeemSelect.value,
      discipline: disciplineSelect.value,
      opgave: opgaveSelect.value,
      scope: params.get("scope") || ""
    };
    var filtered = items.filter(function (item) {
      return matchesQuery(item, query) &&
        matchesScope(item, filters.scope) &&
        matchesValue(item.persona, filters.persona) &&
        (!filters.onderdeel || item.onderdeel === filters.onderdeel) &&
        (!filters.laag || item.informatielaag === filters.laag) &&
        matchesValue(item.systeem, filters.systeem) &&
        matchesValue(item.discipline, filters.discipline) &&
        matchesValue(item.opgave, filters.opgave);
    }).map(function (item) {
      return {
        data: item,
        score: scoreItem(item, query, filters)
      };
    }).sort(function (a, b) {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return a.data.title.localeCompare(b.data.title);
    }).map(function (entry) {
      return entry.data;
    });

    renderResults(filtered);
  }

  if (!form || !queryInput || !personaSelect || !onderdeelSelect || !laagSelect || !systeemSelect || !disciplineSelect || !opgaveSelect || !countNode || !resultsNode) {
    return;
  }

  ensureOptions(personaSelect, uniqueValues("persona"), "Alle persona's");
  ensureOptions(systeemSelect, uniqueValues("systeem"), "Alle systemen");
  ensureOptions(disciplineSelect, uniqueValues("discipline"), "Alle disciplines");
  ensureOptions(opgaveSelect, uniqueValues("opgave"), "Alle opgaven");
  applyQueryParams();

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    applyFilters();
  });

  [queryInput, personaSelect, onderdeelSelect, laagSelect, systeemSelect, disciplineSelect, opgaveSelect].forEach(function (field) {
    field.addEventListener("input", applyFilters);
    field.addEventListener("change", applyFilters);
  });

  applyFilters();
}());
