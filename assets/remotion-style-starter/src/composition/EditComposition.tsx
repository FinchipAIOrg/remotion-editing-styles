import React from "react";
import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {STYLE_PRESETS, type StyleId, type StylePreset} from "./styles";

type EditCompositionProps = {
  styleId: StyleId;
  title: string;
  titleAccent: string;
  sectionLabel: string;
  cta: string;
};

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const Grid: React.FC<{theme: StylePreset}> = ({theme}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 24], [0, 0.24], {
    ...clamp,
    easing: Easing.out(Easing.quad),
  });

  return (
    <AbsoluteFill
      style={{
        opacity,
        backgroundImage: `linear-gradient(${theme.accent}33 1px, transparent 1px), linear-gradient(90deg, ${theme.accent}33 1px, transparent 1px)`,
        backgroundSize: "90px 90px",
        maskImage:
          "radial-gradient(circle at 50% 42%, transparent 0 250px, black 520px)",
      }}
    />
  );
};

const HudCorners: React.FC<{theme: StylePreset}> = ({theme}) => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame, [6, 32], [0, 1], clamp);
  const corners = [
    {
      position: {top: 96, left: 72},
      edges: {top: true, left: true},
    },
    {
      position: {top: 96, right: 72},
      edges: {top: true, right: true},
    },
    {
      position: {bottom: 96, left: 72},
      edges: {bottom: true, left: true},
    },
    {
      position: {bottom: 96, right: 72},
      edges: {bottom: true, right: true},
    },
  ];

  return (
    <>
      {corners.map((corner, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            width: 86 * reveal,
            height: 86 * reveal,
            borderColor: theme.accent,
            borderStyle: "solid",
            borderWidth: 0,
            borderTopWidth: corner.edges.top ? 4 : 0,
            borderBottomWidth: corner.edges.bottom ? 4 : 0,
            borderLeftWidth: corner.edges.left ? 4 : 0,
            borderRightWidth: corner.edges.right ? 4 : 0,
            ...corner.position,
          }}
        />
      ))}
    </>
  );
};

const SpeakerProof: React.FC<{theme: StylePreset}> = ({theme}) => {
  const frame = useCurrentFrame();
  const float = Math.sin(frame / 16) * 6;

  return (
    <div
      style={{
        position: "absolute",
        top: 420 + float,
        left: 290,
        width: 500,
        height: 720,
        border: `3px solid ${theme.accent}`,
        borderRadius: 260,
        overflow: "hidden",
        background: `linear-gradient(160deg, ${theme.muted}55, ${theme.background})`,
        boxShadow: `0 0 80px ${theme.accent}22`,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 210,
          height: 210,
          borderRadius: "50%",
          background: theme.foreground,
          opacity: 0.9,
          left: 145,
          top: 118,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 380,
          height: 390,
          borderRadius: "50% 50% 20% 20%",
          background: theme.foreground,
          opacity: 0.88,
          left: 60,
          bottom: -80,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 126,
          top: 28,
          padding: "12px 16px",
          color: theme.background,
          background: theme.accent,
          font: `700 18px ${theme.bodyFont}`,
          letterSpacing: 2,
        }}
      >
        SOURCE FRAME
      </div>
    </div>
  );
};

const Hook: React.FC<{
  theme: StylePreset;
  title: string;
  titleAccent: string;
}> = ({theme, title, titleAccent}) => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 24], [80, 0], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const accentWidth = interpolate(frame, [18, 52], [0, 760], clamp);

  return (
    <AbsoluteFill style={{padding: "160px 84px"}}>
      <div
        style={{
          color: theme.muted,
          font: `700 26px ${theme.bodyFont}`,
          letterSpacing: 8,
          marginBottom: 40,
        }}
      >
        EDIT SYSTEM / 01
      </div>
      <div
        style={{
          color: theme.foreground,
          font: `900 112px/0.9 ${theme.displayFont}`,
          letterSpacing: -6,
          translate: `${enter}px 0`,
          maxWidth: 900,
        }}
      >
        {title}
      </div>
      <div
        style={{
          position: "relative",
          display: "inline-block",
          color: theme.background,
          font: `900 96px/1 ${theme.displayFont}`,
          letterSpacing: -4,
          marginTop: 36,
          padding: "18px 28px 24px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: accentWidth,
            background: theme.accent,
          }}
        />
        <span style={{position: "relative"}}>{titleAccent}</span>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 180,
          left: 84,
          right: 84,
          borderTop: `2px solid ${theme.muted}`,
          paddingTop: 28,
          color: theme.foreground,
          font: `500 28px/1.4 ${theme.bodyFont}`,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>OBSERVE → CUT → PROVE</span>
        <span>00:00—00:02</span>
      </div>
    </AbsoluteFill>
  );
};

const Proof: React.FC<{theme: StylePreset; sectionLabel: string}> = ({
  theme,
  sectionLabel,
}) => {
  const frame = useCurrentFrame();
  const number = Math.min(5, Math.floor(frame / 34) + 1);
  const progress = interpolate(frame, [0, 180], [0, 100], clamp);
  const signals = [
    "Hidden retries",
    "Unowned handoffs",
    "Silent failures",
    "Context rebuilds",
    "No evidence trail",
  ];

  return (
    <AbsoluteFill>
      <Grid theme={theme} />
      <HudCorners theme={theme} />
      <div
        style={{
          position: "absolute",
          top: 160,
          left: 84,
          color: theme.accent,
          font: `800 34px ${theme.bodyFont}`,
          letterSpacing: 5,
        }}
      >
        {sectionLabel}
      </div>
      <div
        style={{
          position: "absolute",
          top: 210,
          left: 76,
          color: theme.foreground,
          font: `900 260px/1 ${theme.displayFont}`,
          opacity: 0.12,
        }}
      >
        0{number}
      </div>
      <SpeakerProof theme={theme} />
      <div
        style={{
          position: "absolute",
          left: 84,
          right: 84,
          bottom: 310,
          padding: "28px 32px",
          border: `2px solid ${theme.muted}`,
          background: `${theme.background}E8`,
          color: theme.foreground,
          font: `700 46px/1.16 ${theme.displayFont}`,
          textTransform: "uppercase",
        }}
      >
        {signals[number - 1]}
        <div
          style={{
            color: theme.accent,
            font: `600 23px ${theme.bodyFont}`,
            marginTop: 16,
            letterSpacing: 2,
          }}
        >
          ACTIVE SIGNAL / 0{number}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 84,
          right: 84,
          bottom: 190,
          height: 12,
          background: theme.muted,
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: theme.accent,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

const Cta: React.FC<{theme: StylePreset; cta: string}> = ({theme, cta}) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 18, 34], [0.84, 1.04, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const rotation = interpolate(frame, [0, 90], [-8, 4], clamp);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 84,
      }}
    >
      <div
        style={{
          width: 820,
          minHeight: 860,
          borderRadius: 54,
          background: theme.accent,
          color: theme.background,
          scale,
          padding: "90px 68px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: `24px 24px 0 ${theme.secondary}`,
        }}
      >
        <div style={{font: `800 28px ${theme.bodyFont}`, letterSpacing: 5}}>
          YOUR TURN / ACTION
        </div>
        <div
          style={{
            font: `900 94px/0.96 ${theme.displayFont}`,
            letterSpacing: -5,
          }}
        >
          {cta}
        </div>
        <div
          style={{
            alignSelf: "flex-end",
            width: 190,
            height: 190,
            borderRadius: "50%",
            border: `12px solid ${theme.background}`,
            display: "grid",
            placeItems: "center",
            font: `900 54px ${theme.displayFont}`,
            rotate: `${rotation}deg`,
          }}
        >
          START
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const EditComposition: React.FC<EditCompositionProps> = ({
  styleId,
  title,
  titleAccent,
  sectionLabel,
  cta,
}) => {
  const {durationInFrames} = useVideoConfig();
  const theme = STYLE_PRESETS[styleId];

  return (
    <AbsoluteFill
      style={{
        background: theme.background,
        fontFamily: theme.bodyFont,
        overflow: "hidden",
      }}
    >
      <Sequence name="Hook" from={0} durationInFrames={72}>
        <Hook theme={theme} title={title} titleAccent={titleAccent} />
      </Sequence>
      <Sequence name="Proof" from={72} durationInFrames={204}>
        <Proof theme={theme} sectionLabel={sectionLabel} />
      </Sequence>
      <Sequence
        name="CTA"
        from={276}
        durationInFrames={durationInFrames - 276}
      >
        <Cta theme={theme} cta={cta} />
      </Sequence>
    </AbsoluteFill>
  );
};
