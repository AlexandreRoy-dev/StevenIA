/**
 * Meta Pixel stub.
 * Replace META_PIXEL_ID below when the client provides a Pixel ID.
 */
export const META_PIXEL_ID = "REPLACE_ME_META_PIXEL_ID";

function hasPixel() {
  return Boolean(META_PIXEL_ID && !META_PIXEL_ID.startsWith("REPLACE_ME"));
}

export function initAnalytics() {
  if (!hasPixel()) return;

  if (window.fbq) return;

  /* eslint-disable */
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  /* eslint-enable */

  window.fbq("init", META_PIXEL_ID);
  window.fbq("track", "PageView");
}

export function trackLead() {
  if (!hasPixel() || !window.fbq) return;
  window.fbq("track", "Lead");
}
