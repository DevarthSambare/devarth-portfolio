/* Sound layer. Quiet, sparse, and only after the visitor interacts.
   <script src="sfx.js" data-sounds="click:.2,hover:.06" data-click="click" data-hover="hover">
   - [data-sfx="name"] on an element plays that sound on click instead of the default click.
   - [data-sound-toggle] toggles sound; the choice is remembered.
   - window.SFX = { play(name, vol?), on(), unlocked(), unlock(), set(bool), stop(name) } */
(function () {
  var tag = document.currentScript;
  var base = (tag && tag.src || '').replace(/sfx\.js.*$/, 'sfx/');
  var vol = {};
  ((tag && tag.getAttribute('data-sounds')) || '').split(',').forEach(function (p) {
    var kv = p.split(':'); if (kv[0]) vol[kv[0].trim()] = parseFloat(kv[1]) || 0.2;
  });
  var clickName = tag && tag.getAttribute('data-click');
  var hoverName = tag && tag.getAttribute('data-hover');
  var cache = {}, live = {};
  var on = true, unlocked = false;
  try { on = localStorage.getItem('dvs-sound') !== 'off'; } catch (e) {}
  var canHover = window.matchMedia && matchMedia('(hover:hover) and (pointer:fine)').matches;

  Object.keys(vol).forEach(function (n) {
    var a = new Audio(); a.preload = 'auto'; a.src = base + n + '.mp3'; a.volume = vol[n]; cache[n] = a;
  });

  function play(n, v) {
    if (!on || !unlocked || !cache[n]) return null;
    try {
      var a = cache[n].cloneNode();
      a.volume = Math.max(0, Math.min(1, v == null ? vol[n] : v));
      a.play().catch(function () {});
      live[n] = a;
      return a;
    } catch (e) { return null; }
  }
  function stop(n) { var a = live[n]; if (a) { try { a.pause(); } catch (e) {} live[n] = null; } }
  function paint() {
    document.documentElement.classList.toggle('snd-off', !on);
    document.querySelectorAll('[data-sound-toggle]').forEach(function (b) {
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.classList.toggle('is-off', !on);
      var l = b.querySelector('.snd-label'); if (l) l.textContent = on ? 'Sound on' : 'Sound off';
    });
  }
  function set(v) {
    on = !!v;
    try { localStorage.setItem('dvs-sound', on ? 'on' : 'off'); } catch (e) {}
    if (!on) Object.keys(live).forEach(stop);
    paint();
    document.dispatchEvent(new CustomEvent('sfx:change', { detail: { on: on } }));
  }
  function unlock() { unlocked = true; }

  window.addEventListener('pointerdown', unlock, { capture: true });
  window.addEventListener('keydown', unlock, { capture: true });

  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-sound-toggle]');
    if (t) { set(!on); if (on) { unlocked = true; play(clickName); } return; }
    var s = e.target.closest('[data-sfx]');
    if (s) { var n = s.getAttribute('data-sfx'); if (n !== 'none') play(n); return; }
    if (clickName && e.target.closest('a, button, [role="button"], summary')) play(clickName);
  });

  if (hoverName && canHover) {
    var lastEl = null, lastT = 0;
    document.addEventListener('mouseover', function (e) {
      var el = e.target.closest('a, button, [data-hover]');
      if (!el || el === lastEl) { if (!el) lastEl = null; return; }
      lastEl = el;
      var now = performance.now(); if (now - lastT < 90) return; lastT = now;
      play(hoverName);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', paint); else paint();
  window.SFX = { play: play, stop: stop, on: function () { return on; }, unlocked: function () { return unlocked; }, unlock: unlock, set: set };
})();
