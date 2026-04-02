// ── DOM Refs ──────────────────────────────────────────
const speedGrid = document.getElementById('speedGrid');
const currentSpeedEl = document.getElementById('currentSpeed');
const buttons = speedGrid.querySelectorAll('.speed-btn');

// ── Initialise ────────────────────────────────────────
chrome.storage.local.get('crunchySpeed', ({ crunchySpeed }) => {
  const speed = crunchySpeed || 1.0;
  highlightButton(speed);
  currentSpeedEl.textContent = formatSpeed(speed);
});

// ── Button Clicks ─────────────────────────────────────
buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const speed = parseFloat(btn.dataset.speed);

    // Update UI
    highlightButton(speed);
    currentSpeedEl.textContent = formatSpeed(speed);

    // Persist
    chrome.storage.local.set({ crunchySpeed: speed });

    // Send to content script on the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (!tab?.id) return;

      // Try messaging the content script first
      chrome.tabs.sendMessage(tab.id, { type: 'SET_SPEED', speed })
        .catch(() => {
          // Content script not loaded yet — inject it programmatically
          chrome.scripting.executeScript({
            target: { tabId: tab.id, allFrames: true },
            func: (s) => {
              document.querySelectorAll('video').forEach((v) => {
                v.playbackRate = s;
              });
            },
            args: [speed]
          }).catch(() => {
            // Scripting also failed — ignore
          });
        });
    });
  });
});

// ── Helpers ───────────────────────────────────────────
function highlightButton(speed) {
  buttons.forEach((btn) => {
    const match = parseFloat(btn.dataset.speed) === speed;
    btn.classList.toggle('active', match);
  });
}

function formatSpeed(speed) {
  return speed.toFixed(2) + 'x';
}
