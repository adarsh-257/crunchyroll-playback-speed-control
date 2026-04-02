# Privacy Policy — Crunchyroll Playback Speed Control

**Last Updated:** April 2, 2026

## Overview

Crunchyroll Playback Speed Control is a browser extension that allows users to adjust the video playback speed on Crunchyroll.com. This privacy policy explains how the extension handles user data.

## Data Collection

**This extension does not collect, store, transmit, or share any personal data.**

Specifically, the extension does **not** collect:

- Personally identifiable information (name, email, address, etc.)
- Browsing history or web activity
- Authentication credentials
- Location data
- Financial or payment information
- Health information
- Personal communications
- Website content

## Local Storage

The extension uses `chrome.storage.local` solely to save your selected playback speed preference (e.g., `1.50x`) on your local device. This data:

- Never leaves your device
- Is not transmitted to any server
- Is not shared with any third party
- Can be cleared at any time by uninstalling the extension

## Permissions

The extension requests the following permissions, used exclusively for its core functionality:

| Permission | Purpose |
|---|---|
| `activeTab` | Communicate with the active Crunchyroll tab to change playback speed |
| `storage` | Save your preferred speed setting locally on your device |
| `scripting` | Apply playback speed to the video player as a fallback mechanism |
| Host (`crunchyroll.com`) | Inject the content script that interacts with the video player |

## Third-Party Services

This extension does not use any third-party services, analytics, tracking, or advertising.

## Changes to This Policy

If this policy is ever updated, the changes will be reflected on this page with an updated date.

## Contact

If you have any questions about this privacy policy, please open an issue on the [GitHub repository](https://github.com/adarsh-257/crunchyroll-playback-speed-control/issues).
