# Crunchyroll Playback Speed Control

A sleek, modern Chrome extension that allows precise control over video playback speed on Crunchyroll. 

Features a beautiful **"Liquid Glass"** (Glassmorphism) UI aesthetic designed for a premium user experience.

![UI Preview](background_theme.jpg)

## Features
- **Speed Control:** Incrementally adjust playback from `0.25x` (Slowest) up to `2.00x` (Maximum).
- **Persistent Preferences:** Automatically saves your last selected playback speed using local storage and applies it seamlessly to new episodes.
- **Dynamic Player Support:** Uses `MutationObservers` and Shadow DOM traversal to deeply integrate with Crunchyroll's lazy-loaded and iframe-based video player, ensuring speed changes are never overridden by the site.
- **Modern Glassmorphism UI:** Features a high-quality frosted glass popup interface with interactive hover states and glowing active indicators.

## Installation 

1. Download or clone this repository to your local machine.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable **"Developer mode"** using the toggle switch in the top right corner.
4. Click the **"Load unpacked"** button in the top left.
5. Select the repository directory (`crunchyroll-playback-speed-control`).
6. Pin the extension to your toolbar and enjoy!

## Technical Implementation
- **Manifest V3** compliant.
- Utilizes `chrome.storage.local` for preference persistence.
- Content scripts injected with `all_frames: true` to handle embedded Crunchyroll video players seamlessly.
- Pure Vanilla CSS (`backdrop-filter`) and JavaScript — no frameworks required.
