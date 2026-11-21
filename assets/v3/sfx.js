/* Tiny sound layer. Quiet, sparse, and only after the visitor interacts.
   Toggle with any element that has [data-sound-toggle]. Choice is remembered. */
(function () {
  var base = (document.currentScript && document.currentScript.src || '').replace(/sfx\.js.*$/, 'sfx/');
  var names = ['tick', 'charge', 'chime', 'whoosh'];
  var vol = { tick: 0.18, charge: 0.28, chime: 0.3, whoosh: 0.25 };
  var cache = {};
  var on = true;
  try { on = localStorage.getItem('dvs-sound') !== 'off'; } catch (e) {}
  var unlocked = false;

  function load() {
    names.forEach(function (n) {
      var a = new Audio(base + n + '.mp3');
      a.preload = 'auto';
      a.volume = vol[n];
      cache[n] = a;
    });
  }
  function play(n) {
    if (!on || !unlocked || !cache[n]) return;
    try {
      var a = cache[n].cloneNode();
      a.volume = vol[n];
      a.play().catch(function () {});
    } catch (e) {}
  }
  function paint() {
    document.querySelectorAll('[data-sound-toggle]').forEach(function (b) {
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.classList.toggle('is-off', !on);
      var l = b.querySelector('.snd-label');
      if (l) l.textContent = on ? 'Sound on' : 'Sound off';
    });
  }
  function unlock() { unlocked = true; }

  load();
  window.addEventListener('pointerdown', unlock, { once: true, capture: true });
  window.addEventListener('keydown', unlock, { once: true, capture: true });

  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-sound-toggle]');
    if (t) {
      on = !on;
      try { localStorage.setItem('dvs-sound', on ? 'on' : 'off'); } catch (err) {}
      paint();
      if (on) { unlocked = true; play('tick'); }
      return;
    }
    var s = e.target.closest('[data-sfx]');
    if (s) { play(s.getAttribute('data-sfx')); return; }
    if (e.target.closest('a, button')) play('tick');
  });

  document.addEventListener('DOMContentLoaded', paint);
  window.SFX = { play: play };
})();
