# Remotion Implementation

## Project inspection

Before editing, locate:

- `package.json` and lockfile.
- Remotion entry point and registered compositions.
- Composition dimensions, fps, duration, and props.
- Existing asset and font conventions.
- Existing transcript, theme, and media components.
- Working preview, render, typecheck, and test commands.

Use installed versions. Add Remotion packages through the project's normal package manager and keep related package versions aligned.

## Data model

Prefer a small typed model:

```ts
type Beat = {
  id: string;
  from: number;
  durationInFrames: number;
  purpose: "hook" | "context" | "proof" | "turn" | "cta";
  headline?: string;
  caption?: string;
  visualMode: "a-roll" | "b-roll" | "graphic" | "split";
};
```

Keep style tokens separate:

```ts
type EditTheme = {
  background: string;
  foreground: string;
  accent: string;
  secondary: string;
  displayFont: string;
  bodyFont: string;
  cornerRadius: number;
  motif: "dots" | "mascot" | "doodle" | "stamp" | "hud";
};
```

## Timeline rules

- Convert seconds to frames from the composition fps.
- Use explicit beat ranges and verify that they do not unintentionally overlap or leave gaps.
- Use sequences for sections and local frame calculations inside a section.
- Clamp interpolations outside their intended ranges.
- Avoid browser-time CSS animation and transition behavior for rendered motion.
- Make the final planned frame equal to or earlier than the composition duration.

## Media rules

- Reference local public assets through the project's established Remotion pattern.
- Preserve original media and create normalized proxies separately.
- Derive trim and playback decisions from source metadata.
- Keep dialogue intelligible and avoid music clipping.
- Use appropriate Remotion media components for synchronized audio and video.

## Layout rules

- Design at the target composition size rather than a responsive webpage abstraction.
- Keep captions inside platform-safe areas and away from faces.
- Reserve full-screen cards for intentional beat changes.
- Measure or constrain long text. Do not rely on accidental overflow.
- Provide fallback fonts and check that the rendered glyphs exist.

## Component boundaries

Useful boundaries include:

- `EditComposition`
- `FootageLayer`
- `BeatSequence`
- `CaptionTrack`
- `SectionCard`
- `Callout`
- `ProgressMotif`
- `CtaCard`

Do not create a component for every decorative shape. Group elements by editorial responsibility.

## Starter asset

`assets/remotion-style-starter/` is an original minimal project that demonstrates:

- Five tokenized presets.
- Beat-driven sequencing.
- Editable headlines and captions.
- A recurring motif per preset.
- A representative vertical composition.
- Five real-footage style overlays and a sequential comparison composition.

Copy it only when no suitable project exists. Install dependencies, adapt the sample data, and remove placeholder copy before delivery.

The real-footage example expects a source at
`public/text-to-video-1.mp4`. Supply that file locally or change the
`staticFile()` reference before rendering the `Real*` and `FiveStyleEdit`
compositions. Source media is intentionally not bundled with the skill.
