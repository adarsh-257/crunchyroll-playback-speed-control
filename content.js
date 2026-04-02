// ── Content Script — Crunchyroll Speed Control ───────

(function () {
  'use strict';

  let targetSpeed = 1;

  // Apply persisted speed on page load
  chrome.storage.local.get('crunchySpeed', ({ crunchySpeed }) => {
    if (crunchySpeed) {
      targetSpeed = crunchySpeed;
      applySpeed(targetSpeed);
    }
  });

  // Listen for speed changes from the popup
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === 'SET_SPEED') {
      targetSpeed = msg.speed;
      applySpeed(targetSpeed);
      sendResponse({ success: true });
    }
    return true; // keep channel open for async response
  });

  /**
   * Apply speed to all videos found on the page,
   * including those inside iframes and shadow DOMs.
   */
  function applySpeed(speed) {
    targetSpeed = speed;
    findAndSetVideos(speed);
    startObserver();
    // Retry a few times since Crunchyroll loads the player dynamically
    setTimeout(() => findAndSetVideos(speed), 500);
    setTimeout(() => findAndSetVideos(speed), 1500);
    setTimeout(() => findAndSetVideos(speed), 3000);
  }

  /**
   * Find all <video> elements — in the main document,
   * in same-origin iframes, and in shadow DOMs.
   */
  function findAndSetVideos(speed) {
    // Main document videos
    setVideos(document, speed);

    // Videos inside same-origin iframes
    try {
      const iframes = document.querySelectorAll('iframe');
      iframes.forEach((iframe) => {
        try {
          const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
          if (iframeDoc) {
            setVideos(iframeDoc, speed);
          }
        } catch (e) {
          // Cross-origin iframe — can't access
        }
      });
    } catch (e) {
      // Ignore errors
    }

    // Walk shadow DOMs
    walkShadowRoots(document.body, speed);
  }

  /**
   * Recursively walk elements with shadowRoot to find videos
   */
  function walkShadowRoots(root, speed) {
    if (!root) return;
    const elements = root.querySelectorAll('*');
    elements.forEach((el) => {
      if (el.shadowRoot) {
        setVideos(el.shadowRoot, speed);
        walkShadowRoots(el.shadowRoot, speed);
      }
    });
  }

  /**
   * Set playbackRate on all <video> elements within a root
   * and guard against the player resetting it.
   */
  function setVideos(root, speed) {
    const videos = root.querySelectorAll('video');
    videos.forEach((video) => {
      video.playbackRate = speed;

      // Guard: if Crunchyroll's player resets the rate, re-apply ours
      if (!video._crunchySpeedGuarded) {
        video._crunchySpeedGuarded = true;
        video.addEventListener('ratechange', () => {
          if (video.playbackRate !== targetSpeed) {
            video.playbackRate = targetSpeed;
          }
        });
        // Also re-apply on play (player may reset on play)
        video.addEventListener('play', () => {
          video.playbackRate = targetSpeed;
        });
        video.addEventListener('loadeddata', () => {
          video.playbackRate = targetSpeed;
        });
      }
    });
  }

  // ── MutationObserver ─────────────────────────────────
  let observer = null;

  function startObserver() {
    if (observer) return;

    observer = new MutationObserver(() => {
      findAndSetVideos(targetSpeed);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }
})();
