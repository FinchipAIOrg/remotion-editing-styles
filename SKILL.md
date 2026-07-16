---
name: remotion-editing-styles
description: Plan, implement, and verify style-directed video edits in Remotion. Use when Codex needs to turn footage, audio, a transcript, or a script into an editable Remotion project; add pacing, cuts, captions, b-roll, transitions, sound cues, or motion graphics; choose among retro geometric, Xiaohongshu illustrated poster, relaxed handwritten poster, American vintage color-block, and cyber brutalism presets; adapt an existing Remotion composition; or render a finished vertical or horizontal video.
---

# Remotion Editing Styles

Turn content into an editorial plan first, then express that plan as deterministic Remotion code. Treat a style as a coherent editing system—cut rhythm, typography, layout, transitions, overlays, footage treatment, and sound—not as a color filter.

## Route the request

1. Inspect the current directory before creating files.
2. Identify the requested delivery level:
   - **Direction only:** return an edit brief, style recommendation, and timeline.
   - **Project work:** create or modify Remotion source files and preserve editability.
   - **Finished media:** preview, render, inspect, and report the output path.
3. If a Remotion project exists, preserve its package manager, composition structure, asset conventions, and working commands.
4. If no project exists and implementation is requested, copy `assets/remotion-style-starter/` into a new project directory, then adapt it. Do not overwrite unrelated files.
5. Read `references/editing-workflow.md` for any implementation or full edit.

## Gather the minimum inputs

Proceed with sensible defaults when details are missing, but distinguish assumptions from user-provided facts.

- Source footage, audio, images, or script.
- Target platform and aspect ratio.
- Desired duration or source duration.
- Audience, message, and call to action.
- Named style, brand rules, or examples.
- Delivery target: plan, editable project, preview, or rendered media.

If footage is unavailable, build a representative motion-design proof from the script and label it as such. Never imply that unseen footage was edited.

## Select a style

Read `references/style-selection.md` when the user has not chosen a style, requests a comparison, or asks to mix styles.

Load only the selected preset:

| Style or common aliases | Reference |
|---|---|
| Natural retro, Bauhaus, modular geometric type | `references/style-natural-retro-geometric.md` |
| Xiaohongshu, cute illustrated poster, sticker style | `references/style-xiaohongshu-poster.md` |
| Relaxed handwritten, big-character poster, rough notes | `references/style-relaxed-handwritten.md` |
| American vintage, 1970s advertising, color-block | `references/style-american-vintage.md` |
| Cyber brutalism, HUD, neon-lime pitch deck | `references/style-cyber-brutalism.md` |

Use one dominant preset. A secondary preset may contribute at most two named traits. Do not average multiple styles into an incoherent look.

## Build the edit plan

Before coding a non-trivial edit, create an edit plan containing:

- `project`: format, fps, duration, platform, and delivery.
- `creative`: audience, message, dominant style, optional secondary traits.
- `source`: known assets, transcript status, and assumptions.
- `beats`: ordered time ranges with narrative purpose and footage choice.
- `captions`: placement, segmentation, emphasis, and safe-area rules.
- `audio`: dialogue treatment, music role, and intentional sound cues.
- `validation`: required checks and unresolved risks.

Use `assets/edit-plan.example.json` as the shape. Validate a JSON plan with:

```bash
python3 scripts/validate_edit_plan.py path/to/edit-plan.json
```

Do not invent transcript timestamps. Derive them from supplied timed text or transcription output; otherwise mark timing as provisional.

## Implement in Remotion

Read `references/remotion-implementation.md` before changing code.

Preserve these invariants:

- Drive visible motion from Remotion's frame timeline.
- Keep timing, style tokens, copy, and asset references editable data.
- Separate narrative beats from reusable visual components.
- Use sequences for temporal ownership and explicit layer names where supported.
- Keep source footage visible unless a planned full-screen card or b-roll beat replaces it.
- Apply face-safe and caption-safe regions for talking-head footage.
- Prefer a few recurring motifs over constant decorative motion.
- Make transitions serve a beat change; do not add one at every cut.
- Use sound effects only where the visual action has a clear sync point.

For raw media preparation, use the available media tools or FFmpeg when installed. Do not silently recompress the user's only source file; write derived media to a separate path.

## Preview and verify

Read `references/quality-gates.md` before declaring completion.

At minimum:

1. Run the project's typecheck or build command.
2. List compositions.
3. Render representative stills from opening, body, and CTA/end.
4. Render the requested media when the environment permits it.
5. Inspect actual frames for overflow, missing fonts/assets, face obstruction, low contrast, and accidental blank periods.
6. Report what was rendered, what was only statically checked, and any unverified dependency.

Do not call a render successful based only on source inspection or a running preview server.

## Output contract

For a direction-only request, deliver:

1. Style decision with rationale.
2. Edit brief and beat timeline.
3. Caption, transition, b-roll, and sound rules.
4. Assumptions, risks, and next required assets.

For an implementation request, deliver:

1. Editable Remotion source.
2. Edit-plan data or equivalent typed configuration.
3. Preview or rendered output when requested.
4. Validation results and exact output paths.

## Safety and rights

- Use only assets the user supplied, generated assets the user authorized, or assets with compatible rights.
- Preserve attribution and license notices for third-party packages and media.
- Do not imitate a living creator's identity or claim endorsement; translate references into general visual characteristics.
- Read `references/licensing.md` before redistributing Remotion-derived code or packaging this skill commercially.
