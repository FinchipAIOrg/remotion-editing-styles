import React from "react";
import {
  AbsoluteFill,
  Easing,
  OffthreadVideo,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type {StyleId} from "./styles";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const styleOrder: StyleId[] = [
  "natural-retro-geometric",
  "xiaohongshu-poster",
  "relaxed-handwritten",
  "american-vintage",
  "cyber-brutalism",
];

const labels: Record<StyleId, string> = {
  "natural-retro-geometric": "NATURAL RETRO",
  "xiaohongshu-poster": "XIAOHONGSHU POSTER",
  "relaxed-handwritten": "RELAXED HANDWRITTEN",
  "american-vintage": "AMERICAN VINTAGE",
  "cyber-brutalism": "CYBER BRUTALISM",
};

const Footage: React.FC = () => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 359], [1.015, 1.055], clamp);
  const translateX = interpolate(frame, [0, 359], [-4, 8], clamp);

  return (
    <AbsoluteFill style={{overflow: "hidden", background: "#111"}}>
      <OffthreadVideo
        name="Original footage and audio"
        src={staticFile("text-to-video-1.mp4")}
        volume={1}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          scale,
          translate: `${translateX}px 0`,
        }}
      />
    </AbsoluteFill>
  );
};

const OverlayTransition: React.FC<{
  durationInFrames: number;
  children: React.ReactNode;
}> = ({durationInFrames, children}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, 9, durationInFrames - 9, durationInFrames - 1],
    [0, 1, 1, 0],
    clamp,
  );
  const translateY = interpolate(frame, [0, 14], [18, 0], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill style={{opacity, translate: `0 ${translateY}px`}}>
      {children}
    </AbsoluteFill>
  );
};

const NaturalRetro: React.FC = () => {
  const frame = useCurrentFrame();
  const dots = Array.from({length: 12});
  const blockWidth = interpolate(frame, [0, 22], [0, 525], clamp);

  return (
    <AbsoluteFill style={{fontFamily: "Arial Black, Arial, sans-serif"}}>
      <div
        style={{
          position: "absolute",
          inset: "0 auto 0 0",
          width: 260,
          background: "#DEE9BFCC",
          mixBlendMode: "multiply",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 42,
          top: 42,
          color: "#111",
          fontSize: 16,
          letterSpacing: 4,
        }}
      >
        NATURAL / EVERYDAY / 01
      </div>
      <div
        style={{
          position: "absolute",
          left: 42,
          bottom: 72,
          width: blockWidth,
          padding: "18px 24px",
          background: "#FDCA57",
          color: "#111",
          fontSize: 48,
          lineHeight: 0.92,
          letterSpacing: -2,
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        HYDRATE / REPEAT
      </div>
      <div
        style={{
          position: "absolute",
          right: 38,
          bottom: 44,
          display: "grid",
          gridTemplateColumns: "repeat(4, 10px)",
          gap: 9,
        }}
      >
        {dots.map((_, index) => (
          <div
            key={index}
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: index % 3 === 0 ? "#BC4937" : "#4C9953",
              scale: 0.85 + Math.sin(frame / 8 + index) * 0.15,
            }}
          />
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          left: 86,
          top: 128,
          width: 128,
          height: 128,
          border: "14px solid #4C9953",
          borderRadius: "50% 50% 20% 50%",
          rotate: `${frame * 0.18}deg`,
        }}
      />
    </AbsoluteFill>
  );
};

const Xiaohongshu: React.FC = () => {
  const frame = useCurrentFrame();
  const bounce = 1 + Math.sin(frame / 7) * 0.025;

  return (
    <AbsoluteFill style={{fontFamily: "Arial Rounded MT Bold, Arial, sans-serif"}}>
      <div
        style={{
          position: "absolute",
          left: 34,
          top: 34,
          padding: "14px 22px",
          borderRadius: 999,
          background: "#FFF3D8",
          border: "4px solid #6B4A2F",
          color: "#6B4A2F",
          fontSize: 19,
          rotate: "-2deg",
        }}
      >
        ✿ 今日补水计划
      </div>
      <div
        style={{
          position: "absolute",
          right: 32,
          top: 40,
          width: 140,
          height: 140,
          borderRadius: "48% 52% 45% 55%",
          background: "#F79BB7",
          border: "5px solid #6B4A2F",
          scale: bounce,
          display: "grid",
          placeItems: "center",
          fontSize: 56,
        }}
      >
        ☺
      </div>
      <div
        style={{
          position: "absolute",
          left: 390,
          bottom: 36,
          padding: "18px 30px",
          background: "#FFF3D8F2",
          border: "5px solid #6B4A2F",
          borderRadius: 34,
          color: "#3BAFE3",
          fontSize: 44,
          lineHeight: 1,
          boxShadow: "10px 10px 0 #F79BB7",
        }}
      >
        Daily hydration!
        <span style={{color: "#65D46E", marginLeft: 18}}>随手喝水</span>
      </div>
      {["✦", "♥", "♪"].map((symbol, index) => (
        <div
          key={symbol}
          style={{
            position: "absolute",
            left: 55 + index * 95,
            bottom: 48 + (index % 2) * 45,
            color: ["#F79BB7", "#F4E84A", "#3BAFE3"][index],
            fontSize: 46,
            rotate: `${Math.sin(frame / 10 + index) * 8}deg`,
          }}
        >
          {symbol}
        </div>
      ))}
    </AbsoluteFill>
  );
};

const Handwritten: React.FC = () => {
  const frame = useCurrentFrame();
  const underline = interpolate(frame, [8, 32], [0, 340], clamp);

  return (
    <AbsoluteFill style={{fontFamily: "Marker Felt, Arial Black, sans-serif"}}>
      <div
        style={{
          position: "absolute",
          right: 42,
          top: 44,
          width: 370,
          padding: "26px 28px 34px",
          background: "#F7F1DFEE",
          color: "#EE1E25",
          fontSize: 48,
          lineHeight: 0.95,
          rotate: "2deg",
          boxShadow: "8px 10px 0 #16A7F2",
          clipPath:
            "polygon(0 3%, 8% 0, 17% 3%, 27% 0, 39% 3%, 50% 0, 63% 3%, 77% 0, 90% 3%, 100% 0, 98% 96%, 88% 100%, 74% 97%, 62% 100%, 49% 97%, 36% 100%, 23% 97%, 10% 100%, 0 97%)",
        }}
      >
        DRINK MORE
        <br />
        WATER!
        <div
          style={{
            height: 8,
            width: underline,
            background: "#FFD94D",
            marginTop: 12,
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 74,
          color: "#16A7F2",
          fontSize: 34,
          rotate: "-5deg",
        }}
      >
        this one ↑
      </div>
      <svg
        width="260"
        height="190"
        viewBox="0 0 260 190"
        style={{position: "absolute", left: 80, top: 120}}
      >
        <path
          d="M230 20 C160 40, 125 70, 70 145"
          fill="none"
          stroke="#EE1E25"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray="12 14"
        />
        <path
          d="M70 145 L105 137 M70 145 L83 111"
          fill="none"
          stroke="#EE1E25"
          strokeWidth="9"
          strokeLinecap="round"
        />
      </svg>
      <div
        style={{
          position: "absolute",
          left: 36,
          bottom: 38,
          padding: "10px 18px",
          background: "#FFD94D",
          color: "#1A1A1A",
          fontSize: 18,
          rotate: "-2deg",
        }}
      >
        relaxed notes / real routine
      </div>
    </AbsoluteFill>
  );
};

const AmericanVintage: React.FC = () => {
  const frame = useCurrentFrame();
  const stampRotation = -8 + Math.sin(frame / 15) * 3;

  return (
    <AbsoluteFill style={{fontFamily: "Rockwell, Georgia, serif"}}>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 74,
          background: "#22005AEE",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 34,
          top: 18,
          color: "#FFF4D4",
          fontSize: 27,
          fontWeight: 900,
          letterSpacing: 4,
        }}
      >
        BUILT FOR EVERY DAY
      </div>
      <div
        style={{
          position: "absolute",
          left: 36,
          bottom: 34,
          padding: "20px 32px",
          background: "#0FA6B8",
          borderRadius: 40,
          color: "#FFF4D4",
          fontSize: 43,
          fontWeight: 900,
          boxShadow: "11px 11px 0 #E95E3E",
        }}
      >
        HYDRATE IN STYLE
      </div>
      <div
        style={{
          position: "absolute",
          right: 45,
          top: 105,
          width: 170,
          height: 170,
          borderRadius: "50%",
          background: "#FFF4D4",
          border: "10px double #22005A",
          color: "#22005A",
          display: "grid",
          placeItems: "center",
          textAlign: "center",
          fontSize: 22,
          fontWeight: 900,
          lineHeight: 0.95,
          rotate: `${stampRotation}deg`,
        }}
      >
        DAILY
        <br />
        ESSENTIAL
      </div>
      <div
        style={{
          position: "absolute",
          right: 36,
          bottom: 35,
          padding: "12px 22px",
          borderRadius: 999,
          background: "#3F9C5A",
          color: "#FFF4D4",
          fontSize: 18,
          fontWeight: 900,
        }}
      >
        24H READY
      </div>
    </AbsoluteFill>
  );
};

const CyberBrutalism: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, 359], [0, 100], clamp);
  const scanY = (frame * 4) % 720;

  return (
    <AbsoluteFill style={{fontFamily: "Menlo, monospace"}}>
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(#B8FF2C16 1px, transparent 1px), linear-gradient(90deg, #B8FF2C16 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(circle at 68% 42%, transparent 0 150px, black 360px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 40,
          top: 35,
          color: "#B8FF2C",
          fontSize: 19,
          fontWeight: 800,
          letterSpacing: 3,
        }}
      >
        HYDRATION SYSTEM / ONLINE
      </div>
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 110,
          width: 330,
          height: 490,
          border: "3px solid #B8FF2C",
          boxShadow: "0 0 40px #B8FF2C33",
        }}
      >
        {[
          {top: -3, left: -3},
          {top: -3, right: -3},
          {bottom: -3, left: -3},
          {bottom: -3, right: -3},
        ].map((position, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              width: 35,
              height: 35,
              background: "#B8FF2C",
              ...position,
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            left: 18,
            bottom: 16,
            padding: "8px 12px",
            background: "#B8FF2C",
            color: "#080808",
            fontSize: 15,
            fontWeight: 900,
          }}
        >
          OBJECT LOCKED
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: scanY,
          height: 2,
          background: "#B8FF2C55",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 35,
          bottom: 36,
          width: 390,
          padding: "18px 22px",
          border: "2px solid #F5F5F5",
          background: "#080808DD",
          color: "#F5F5F5",
        }}
      >
        <div style={{fontSize: 35, fontWeight: 900}}>STAY HYDRATED</div>
        <div
          style={{
            height: 8,
            marginTop: 14,
            background: "#555",
          }}
        >
          <div
            style={{height: "100%", width: `${progress}%`, background: "#B8FF2C"}}
          />
        </div>
        <div
          style={{
            marginTop: 9,
            color: "#B8FF2C",
            fontSize: 14,
            letterSpacing: 2,
          }}
        >
          DAILY PROTOCOL / ACTIVE
        </div>
      </div>
    </AbsoluteFill>
  );
};

const StyleOverlay: React.FC<{
  styleId: StyleId;
  durationInFrames: number;
  showLabel?: boolean;
}> = ({styleId, durationInFrames, showLabel = false}) => {
  const overlay = {
    "natural-retro-geometric": <NaturalRetro />,
    "xiaohongshu-poster": <Xiaohongshu />,
    "relaxed-handwritten": <Handwritten />,
    "american-vintage": <AmericanVintage />,
    "cyber-brutalism": <CyberBrutalism />,
  }[styleId];

  return (
    <OverlayTransition durationInFrames={durationInFrames}>
      {overlay}
      {showLabel ? (
        <div
          style={{
            position: "absolute",
            right: 24,
            top: 20,
            padding: "9px 12px",
            background: "#000D",
            color: "#FFF",
            font: "700 13px Menlo, monospace",
            letterSpacing: 2,
          }}
        >
          {labels[styleId]}
        </div>
      ) : null}
    </OverlayTransition>
  );
};

export const RealFootageEdit: React.FC<{styleId: StyleId}> = ({styleId}) => {
  const {durationInFrames} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Footage />
      <StyleOverlay styleId={styleId} durationInFrames={durationInFrames} />
    </AbsoluteFill>
  );
};

export const FiveStyleEdit: React.FC = () => {
  return (
    <AbsoluteFill>
      <Footage />
      {styleOrder.map((styleId, index) => (
        <Sequence
          key={styleId}
          name={labels[styleId]}
          from={index * 72}
          durationInFrames={72}
        >
          <StyleOverlay
            styleId={styleId}
            durationInFrames={72}
            showLabel
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
