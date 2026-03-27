(function () {
  function readJsonScript(id) {
    var node = document.getElementById(id);

    if (!node) {
      return null;
    }

    try {
      return JSON.parse(node.textContent);
    } catch (error) {
      return null;
    }
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  window.AssetPlatformData = {
    readJsonScript: readJsonScript,
    escapeHtml: escapeHtml
  };
}());
