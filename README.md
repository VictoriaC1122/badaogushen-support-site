# 股神養成 Support Site

Public bilingual privacy policy, copyright notice, and support page for the 股神養成 / Stock Mastery iOS app. The site is static and needs no JavaScript or build step.

Contact: victoriacheng1122@gmail.com

Developer / original-content rights holder: Yung Wen Cheng. Stock Mastery is the product name.

## Public Links

- Traditional Chinese: https://victoriac1122.github.io/badaogushen-support-site/
- English: https://victoriac1122.github.io/badaogushen-support-site/en/
- Both language roots retain `#support`, `#copyright`, and `#privacy` anchors for app and App Store Connect links.

## September 24, 2026 Update

- Added actual developer identity, support email topics, reporting instructions, privacy-safe attachment guidance, and native accessible FAQ controls.
- Added a scoped copyright notice, third-party rights attribution, no-endorsement clarification, and copyright-reporting channel.
- Clarified stock-symbol transmission, email support data, Gmail/GitHub hosting, retention/deletion requests, and local backup behavior.
- Refined mobile navigation, keyboard focus, light/dark contrast, wrapping, and 44px navigation targets. No tracking or third-party scripts added.

## October 2, 2026 Update

- Matched build 11 terminology: Review Reminders run on weekdays at 18:00 device-local time, including exchange holidays; they are not market-update or order-fill alerts.
- Explained user-entered custom fill prices and their separation from market quotes and position valuation.
- Documented local getting-started progress and custom prices, plus cookie-free market sessions without shared system credential storage.
- Kept third-party data and licensing disclosures unchanged; these copy corrections do not resolve pending provider permissions or the App Store privacy questionnaire.

## October 2, 2026 Build 12 Update

- Matched build 12: ten attributed Taiwan OpenAPI datasets only; no supplemental website reports or historical queries.
- U.S. practice now uses offline instrument names and user-entered fill prices. Cost is not market value; legacy pending U.S. orders can be cancelled but no longer fill automatically.
- Retained the historical test-build disclosure rather than suggesting earlier Yahoo/history requests never occurred.
- Kept the existing layout, contact address, local-data controls and bilingual privacy/support anchors. No tracking or new dependency was added.

## Compliance References

- [Apple platform metadata](https://developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information/): use the year and actual rights holder in the Copyright field; Apple supplies the symbol. Support URLs must expose genuine contact information.
- [Apple App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/): sections 1.5, 5.1.1, and 5.2 cover contact, privacy, and third-party rights.

These pages describe the current implementation, not Apple approval or proof of market-data licensing. Before release, confirm source terms, required provider protections and retention, and any distribution-region contact obligations. Private App Review phone details do not belong in this public repository. The developer must operationally honor the published support-data retention/deletion policy.

## Verification

Run `node tools/verify-site.cjs` with Playwright available on `NODE_PATH`. The script opens local HTML files without a dev server and checks both languages, light/dark modes, phone/tablet/desktop widths, anchors, email links, image loading, and horizontal overflow. Screenshots go to a temporary folder outside this repository.
