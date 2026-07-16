# Quality Gates

Use the applicable gates and report skipped items.

## Gate A — Source integrity

Pass when:

- Inputs and derived files are distinguishable.
- The user's only source media was not overwritten.
- Timings are traced to real timed data or labeled provisional.
- Asset rights and attribution needs are known.

## Gate B — Code and timeline

Pass when:

- Typecheck/build succeeds.
- Remotion can enumerate the target composition.
- Beat ranges are valid and within duration.
- No render-critical browser CSS animation is used.
- Required packages and assets resolve.

## Gate C — Visual

Inspect real rendered frames from at least three moments:

- Opening/hook.
- Body/proof.
- CTA/end.

Pass when:

- Text does not overflow or collide.
- Captions remain readable on mobile.
- Faces and primary action remain clear.
- Style motifs are consistent and not overused.
- Fonts and media render without missing glyphs or blank layers.

## Gate D — Audio

When audio exists, pass when:

- Dialogue is intelligible.
- Music and SFX do not clip.
- Ducking is consistent.
- Sync events land on the intended frame.
- The end does not cut audio unintentionally.

## Gate E — Delivery

Pass when:

- Requested dimensions, fps, codec/container, and duration are met.
- The output opens successfully.
- The editable source and rendered output paths are reported.
- Any unverified platform upload or external dependency is disclosed.

## Status vocabulary

Use only:

- **Verified:** observed from a command, rendered frame, or opened output.
- **Partially verified:** some gates passed, others could not run.
- **Unverified:** planned or source-inspected only.
- **Failed:** a gate ran and did not pass.

Do not collapse these states into a single confidence score.
