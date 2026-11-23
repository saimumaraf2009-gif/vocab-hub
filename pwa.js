/* VocabHub PWA helper — service worker registration + "Install app" button */
(function () {
  'use strict';

  // ---- service worker -------------------------------------------------
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').then(function (reg) {
        reg.addEventListener('updatefound', function () {
          var nw = reg.installing;
          if (!nw) return;
          nw.addEventListener('statechange', function () {
            if (nw.state === 'installed' && navigator.serviceWorker.controller) {
              showToast('New version ready — it will load next time you open the app.');
            }
          });
        });
      }).catch(function () { /* offline install not available */ });
    });
  }

  function showToast(msg) {
    try { if (typeof window.toast === 'function') return window.toast(msg); } catch (e) {}
  }

  // ---- install UI -----------------------------------------------------
  var deferred = null;
  var DISMISS_KEY = 'vocabhub-install-dismissed';

  function isStandalone() {
    return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  }
  function isIOS() {
    return /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  }
  function dismissedRecently() {
    try {
      var t = parseInt(localStorage.getItem(DISMISS_KEY) || '0', 10);
      return t && Date.now() - t < 7 * 24 * 3600 * 1000;
    } catch (e) { return false; }
  }
  function remember() { try { localStorage.setItem(DISMISS_KEY, String(Date.now())); } catch (e) {} }

  function removeBar() {
    var el = document.getElementById('pwa-install');
    if (el) el.remove();
  }

  function buildBar(html, onInstall) {
    if (document.getElementById('pwa-install') || isStandalone() || dismissedRecently()) return;
    var bar = document.createElement('div');
    bar.id = 'pwa-install';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-label', 'Install VocabHub');
    bar.innerHTML =
      '<img src="assets/icons/icon-192.png" alt="" width="40" height="40">' +
      '<div class="pwa-text"><b>Install VocabHub</b><span>' + html + '</span></div>' +
      (onInstall ? '<button type="button" class="pwa-go">Install</button>' : '') +
      '<button type="button" class="pwa-x" aria-label="Dismiss">×</button>';
    document.body.appendChild(bar);
    if (onInstall) bar.querySelector('.pwa-go').addEventListener('click', onInstall);
    bar.querySelector('.pwa-x').addEventListener('click', function () { remember(); removeBar(); });
  }

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferred = e;
    setTimeout(function () {
      buildBar('Add it to your home screen — opens full-screen and works offline.', function () {
        if (!deferred) return;
        deferred.prompt();
        deferred.userChoice.then(function () { deferred = null; removeBar(); });
      });
    }, 4000);
  });

  window.addEventListener('appinstalled', function () {
    deferred = null;
    removeBar();
    showToast('VocabHub installed 🎉');
  });

  // iOS Safari has no install prompt — show a short hint instead
  window.addEventListener('load', function () {
    if (isIOS() && !isStandalone() && /safari/i.test(navigator.userAgent) && !/crios|fxios/i.test(navigator.userAgent)) {
      setTimeout(function () {
        buildBar('Tap <b>Share</b> then <b>Add to Home Screen</b>.', null);
      }, 5000);
    }
  });

  // allow other code (e.g. a Settings button) to trigger install
  window.vocabhubInstall = function () {
    if (deferred) { deferred.prompt(); return true; }
    return false;
  };
})();
