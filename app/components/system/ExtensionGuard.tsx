const EXTENSION_GUARD = `(function () {
  var attr = "bis_skin_checked";
  function clean() {
    var list = document.querySelectorAll("[" + attr + "]");
    for (var i = 0; i < list.length; i++) list[i].removeAttribute(attr);
  }
  if (typeof MutationObserver === "undefined") return;
  var mo = new MutationObserver(function () { clean(); });
  mo.observe(document.documentElement, {
    subtree: true,
    attributes: true,
    attributeFilter: [attr],
  });
  clean();
  setTimeout(function () { mo.disconnect(); }, 20000);
})();`;

const ExtensionGuard = () => (
  <script dangerouslySetInnerHTML={{ __html: EXTENSION_GUARD }} />
);

export default ExtensionGuard;
