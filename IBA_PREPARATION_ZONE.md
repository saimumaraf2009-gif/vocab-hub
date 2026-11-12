# IBA Preparation Zone

The IBA zone is an additive module in VocabHub. It uses a separate `localStorage` key (`vocabhub.iba.v1`) and does not overwrite general vocabulary progress (`vocabhub.v2`).

## Included source data
- `data/iba-questions.json` contains 345 numbered records parsed from the user-provided `DU_IBA_English_MCQ_Only.txt`.
- Original question text, original number and available source-year labels are retained.
- Only explicitly identified answer keys are marked as recorded; other records remain unverified and are not scored in mock tests.
- Extracted vocabulary has blank Bengali/English definitions until enriched. Source references are retained.

## Importing future data
Open **IBA Zone → Import Data** and upload JSON, CSV or PDF-extracted TXT. JSON may be an array or `{\"records\":[...]}`. CSV columns: `question,year,source,options,correctAnswer,explanation,topic,difficulty`; separate options with `|`. TXT imports each non-empty line as an unverified record. Review imported answers before treating them as verified. Use Export IBA backup to download IBA-only data.

## Storage and deployment
All IBA progress is device-local in `vocabhub.iba.v1`. The static site remains compatible with GitHub Pages. No backend or build step is required.
