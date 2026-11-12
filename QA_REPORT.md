# QA Report — VocabHub GitHub database integration

- [x] Confirmed the configured GitHub Raw JSON URL is reachable and returns JSON with a top-level `words` array.
- [x] Set GitHub-hosted JSON as the primary runtime vocabulary source.
- [x] Startup renders saved/bundled data before the remote request, preserving offline and `file://` fallback.
- [x] Matching remote words update core vocabulary fields; local-only words and local enrichment metadata are retained.
- [x] Learning progress remains in the existing `D` state and is not cleared during vocabulary refresh.
- [x] Admin reload action now refreshes from the GitHub source.
- [x] Existing bundled JSON, UI, game modes, review logic, and storage key are retained.
- [ ] Full browser interaction testing still requires opening the ZIP on GitHub Pages or a local web server.

Primary source: https://raw.githubusercontent.com/saimumaraf2009-gif/vocab-hub/main/vocabulary.json
