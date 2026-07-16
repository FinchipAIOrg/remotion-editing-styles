# Editing Workflow

Use this reference for full edits and implementation work.

## 1. Inspect

Establish the source of truth before proposing an edit:

- Inventory media with exact paths and file types.
- Determine duration, dimensions, frame rate, codecs, audio tracks, and rotation metadata when tools permit.
- Inspect the existing Remotion entry point, compositions, package versions, scripts, public assets, and font loading.
- Locate transcript or caption data and determine whether its timing is real, inferred, or missing.
- Note dirty worktree changes and avoid overwriting unrelated work.

## 2. Define the editorial spine

Write one sentence for each:

- Audience: who must keep watching?
- Promise: what will they learn, feel, or do?
- Hook: why should the first three seconds earn attention?
- Proof: what makes the message credible?
- Turn: where does the edit change energy or perspective?
- CTA: what should happen after the video?

Then divide the content into beats. A beat is a change in purpose, not merely a sentence boundary.

## 3. Choose footage treatment

For every beat, choose one primary visual mode:

- A-roll: preserve the speaker or primary action.
- Punch-in/reframe: emphasize a claim without changing source.
- B-roll: replace or complement A-roll with evidence or context.
- Graphic takeover: use for definitions, section changes, lists, or CTA.
- Split layout: connect speaker and evidence simultaneously.

Do not cover weak source footage with constant graphics. If the source cannot support the requested result, state the limitation.

## 4. Design the rhythm

Use content density to set pace:

- Reflective or emotional: longer holds, fewer cuts, restrained motion.
- Tutorial or explanation: cuts on idea boundaries, visual proof after claims.
- Promotional: fast hook, clear product proof, deliberate CTA hold.
- Tech/data: structured section markers, precise reveals, fewer ornamental transitions.

Create breathing room. A high-energy style still needs stable frames for reading.

## 5. Plan text

Separate four text roles:

- Captions: spoken-language comprehension.
- Headlines: editorial framing.
- Labels: context, source, category, or progress.
- CTA: the requested action.

Do not turn every spoken word into a headline. Segment captions by meaning and reading speed. Use emphasis sparingly and consistently.

## 6. Plan audio

Define:

- Dialogue priority and cleanup needs.
- Music function: pulse, emotion, tension, or neutral bed.
- Ducking behavior under dialogue.
- SFX sync points tied to specific visual actions.
- Intentional silence or music drop.

Never place an effect merely because a transition exists.

## 7. Map to Remotion

Represent:

- Global format and duration in composition metadata.
- Narrative beats as data with frame ranges.
- Visual system as theme tokens.
- Captions as timed data.
- Footage choices as asset references and trim ranges.
- Reusable graphics as components.
- Beat ownership with sequences.

Keep mutable editorial data out of deeply nested component logic.

## 8. Verify

Run the gates in `quality-gates.md`. Save evidence from real commands and real rendered frames. If the task requests a finished video, a source-only result is incomplete.
