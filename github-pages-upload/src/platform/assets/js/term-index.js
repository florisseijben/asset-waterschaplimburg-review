(function () {
  function readParams() {
    var params = new URLSearchParams(window.location.search);

    return {
      q: params.get("q") || "",
      systeem: params.get("systeem") || "",
      discipline: params.get("discipline") || "",
      familie: params.get("familie") || "",
      bron: params.get("bron") || ""
    };
  }

  function writeParams(filters) {
    var params = new URLSearchParams();

    if (filters.q) {
      params.set("q", filters.q);
    }
    if (filters.systeem) {
      params.set("systeem", filters.systeem);
    }
    if (filters.discipline) {
      params.set("discipline", filters.discipline);
    }
    if (filters.familie) {
      params.set("familie", filters.familie);
    }
    if (filters.bron) {
      params.set("bron", filters.bron);
    }

    window.history.replaceState({}, "", window.location.pathname + (params.toString() ? "?" + params.toString() : ""));
  }

  function inferSystem(term) {
    if ((term.conceptScheme || "").indexOf("Watersysteem") !== -1) {
      return "Watersysteem";
    }

    return "Onbekend";
  }

  function inferFamily(term) {
    var page = term.familyPage || "";

    if (page.indexOf("watergangen") !== -1) {
      return "Watergangen";
    }
    if (page.indexOf("kunstwerken") !== -1) {
      return "Kunstwerken";
    }
    if (page.indexOf("meet-en-karteerbegrippen") !== -1) {
      return "Meet- en karteerbegrippen";
    }

    return "Overig";
  }

  function normalizeTerm(term, metadata) {
    return {
      id: term.id,
      slug: term.slug,
      prefLabel: term.prefLabel,
      altLabels: term.altLabels || [],
      definition: term.definition || "",
      scopeNote: term.scopeNote || "",
      sourceSystem: term.sourceSystem || "Onbekend",
      conceptScheme: term.conceptScheme || "",
      status: term.status || "",
      familyPage: term.familyPage || "./alle-begrippen.html",
      system: term.system || metadata.system || inferSystem(term),
      family: term.family || metadata.family || inferFamily(term),
      disciplines: term.disciplines || metadata.disciplines || [],
      tags: term.tags || []
    };
  }

  function readInlineTerms() {
    var data = window.AssetPlatformData.readJsonScript("term-index-data");

    if (!data) {
      return [];
    }

    if (data.begrippen && data.begrippen.length) {
      return data.begrippen.map(function (term) {
        return normalizeTerm(term, {});
      });
    }

    if (data.datasets && data.datasets.length) {
      return data.datasets.reduce(function (all, item) {
        var metadata = item.metadata || {};

        return all.concat((item.begrippen || []).map(function (term) {
          return normalizeTerm(term, metadata);
        }));
      }, []);
    }

    return [];
  }

  function fetchTerms(files) {
    return Promise.all(files.map(function (file) {
      return fetch(file).then(function (response) {
        return response.ok ? response.json() : { begrippen: [] };
      }).catch(function () {
        return { begrippen: [] };
      });
    })).then(function (items) {
      return items.reduce(function (all, item) {
        var metadata = item.metadata || {};

        return all.concat((item.begrippen || []).map(function (term) {
          return normalizeTerm(term, metadata);
        }));
      }, []);
    });
  }

  function uniqueValues(items, key) {
    return items.reduce(function (values, item) {
      if (values.indexOf(item[key]) === -1) {
        values.push(item[key]);
      }
      return values;
    }, []).sort();
  }

  function uniqueNestedValues(items, key) {
    return items.reduce(function (values, item) {
      (item[key] || []).forEach(function (entry) {
        if (values.indexOf(entry) === -1) {
          values.push(entry);
        }
      });
      return values;
    }, []).sort();
  }

  function renderOptions(select, values, emptyLabel) {
    select.innerHTML = ['<option value="">' + emptyLabel + "</option>"].concat(values.map(function (value) {
      return '<option value="' + window.AssetPlatformData.escapeHtml(value) + '">' + window.AssetPlatformData.escapeHtml(value) + "</option>";
    })).join("");
  }

  function termMatches(term, filters) {
    var haystack;

    haystack = [
      term.prefLabel,
      term.definition,
      term.scopeNote,
      term.sourceSystem,
      term.system,
      term.family
    ].concat(term.altLabels || []).concat(term.disciplines || []).concat(term.tags || []).join(" ").toLowerCase();

    return (!filters.q || haystack.indexOf(filters.q.toLowerCase()) !== -1) &&
      (!filters.systeem || term.system === filters.systeem) &&
      (!filters.discipline || (term.disciplines || []).indexOf(filters.discipline) !== -1) &&
      (!filters.familie || term.family === filters.familie) &&
      (!filters.bron || term.sourceSystem === filters.bron);
  }

  function renderActiveFilters(root, filters) {
    var chips = [];

    if (filters.systeem) {
      chips.push(filters.systeem);
    }
    if (filters.discipline) {
      chips.push(filters.discipline);
    }
    if (filters.familie) {
      chips.push(filters.familie);
    }
    if (filters.bron) {
      chips.push(filters.bron);
    }

    root.innerHTML = chips.length ? chips.map(function (chip) {
      return '<span class="filter-chip">' + window.AssetPlatformData.escapeHtml(chip) + "</span>";
    }).join("") : '<span class="quick-search-help">Geen filters actief</span>';
  }

  function renderResults(root, countNode, items) {
    countNode.textContent = String(items.length);

    if (!items.length) {
      root.innerHTML = '<article class="empty-state stack"><h3>Geen begrippen gevonden</h3><p>Pas je zoekterm of metadatafilters aan.</p></article>';
      return;
    }

    root.innerHTML = items.map(function (term) {
      var altLabels = term.altLabels.length
        ? '<p class="quick-search-help"><strong>Alternatieve termen:</strong> ' + window.AssetPlatformData.escapeHtml(term.altLabels.join(", ")) + "</p>"
        : "";
      var disciplineChips = (term.disciplines || []).map(function (discipline) {
        return '<span class="filter-chip">' + window.AssetPlatformData.escapeHtml(discipline) + "</span>";
      }).join("");

      return '<article class="card stack">' +
        '<p class="eyebrow">Begrip</p>' +
        '<h3><a href="./begrip-detail.html?term=' + window.AssetPlatformData.escapeHtml(term.slug) + '">' + window.AssetPlatformData.escapeHtml(term.prefLabel) + "</a></h3>" +
        '<p>' + window.AssetPlatformData.escapeHtml(term.definition) + "</p>" +
        altLabels +
        '<div class="filter-bar">' +
          '<span class="filter-chip">' + window.AssetPlatformData.escapeHtml(term.system) + "</span>" +
          '<span class="filter-chip">' + window.AssetPlatformData.escapeHtml(term.family) + "</span>" +
          disciplineChips +
          '<span class="filter-chip">' + window.AssetPlatformData.escapeHtml(term.sourceSystem) + "</span>" +
        "</div>" +
      "</article>";
    }).join("");
  }

  function render() {
    var root = document.querySelector("[data-term-index]");
    var files;
    var queryInput;
    var systemSelect;
    var disciplineSelect;
    var familySelect;
    var sourceSelect;
    var activeFilters;
    var resultsNode;
    var countNode;

    if (!root || !window.AssetPlatformData) {
      return;
    }

    files = (root.getAttribute("data-term-data-files") || "").split(",").map(function (item) {
      return item.trim();
    }).filter(Boolean);

    queryInput = document.querySelector("[data-term-query]");
    systemSelect = document.querySelector("[data-term-system]");
    disciplineSelect = document.querySelector("[data-term-discipline]");
    familySelect = document.querySelector("[data-term-family]");
    sourceSelect = document.querySelector("[data-term-source]");
    activeFilters = document.querySelector("[data-term-active-filters]");
    resultsNode = document.querySelector("[data-term-results]");
    countNode = document.querySelector("[data-term-count]");

    var inlineTerms = readInlineTerms();
    var termsPromise = inlineTerms.length ? Promise.resolve(inlineTerms) : fetchTerms(files);

    termsPromise.then(function (terms) {
      var initialFilters = readParams();

      renderOptions(systemSelect, uniqueValues(terms, "system"), "Alle systemen");
      renderOptions(disciplineSelect, uniqueNestedValues(terms, "disciplines"), "Alle disciplines");
      renderOptions(familySelect, uniqueValues(terms, "family"), "Alle families");
      renderOptions(sourceSelect, uniqueValues(terms, "sourceSystem"), "Alle bronvermeldingen");

      queryInput.value = initialFilters.q;
      systemSelect.value = initialFilters.systeem;
      disciplineSelect.value = initialFilters.discipline;
      familySelect.value = initialFilters.familie;
      sourceSelect.value = initialFilters.bron;

      function update() {
        var filters = {
          q: queryInput.value.trim(),
          systeem: systemSelect.value,
          discipline: disciplineSelect.value,
          familie: familySelect.value,
          bron: sourceSelect.value
        };
        var filtered = terms.filter(function (term) {
          return termMatches(term, filters);
        }).sort(function (left, right) {
          return left.prefLabel.localeCompare(right.prefLabel, "nl");
        });

        writeParams(filters);
        renderActiveFilters(activeFilters, filters);
        renderResults(resultsNode, countNode, filtered);
      }

      queryInput.addEventListener("input", update);
      systemSelect.addEventListener("change", update);
      disciplineSelect.addEventListener("change", update);
      familySelect.addEventListener("change", update);
      sourceSelect.addEventListener("change", update);

      update();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
}());
