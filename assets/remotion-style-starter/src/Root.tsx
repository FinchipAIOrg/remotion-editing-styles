import React from "react";
import {Composition} from "remotion";
import {EditComposition} from "./composition/EditComposition";
import {
  FiveStyleEdit,
  RealFootageEdit,
} from "./composition/RealFootageEdit";
import type {StyleId} from "./composition/styles";

const realStyles: Array<{id: string; styleId: StyleId}> = [
  {id: "RealNaturalRetro", styleId: "natural-retro-geometric"},
  {id: "RealXiaohongshu", styleId: "xiaohongshu-poster"},
  {id: "RealRelaxedHandwritten", styleId: "relaxed-handwritten"},
  {id: "RealAmericanVintage", styleId: "american-vintage"},
  {id: "RealCyberBrutalism", styleId: "cyber-brutalism"},
];

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CyberAudit"
        component={EditComposition}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          styleId: "cyber-brutalism" as const,
          title: "YOUR AI WORKFLOW",
          titleAccent: "IS LEAKING TIME",
          sectionLabel: "5 SIGNALS",
          cta: "AUDIT ONE WORKFLOW TODAY",
        }}
      />
      {realStyles.map(({id, styleId}) => (
        <Composition
          key={id}
          id={id}
          component={RealFootageEdit}
          durationInFrames={360}
          fps={30}
          width={1280}
          height={720}
          defaultProps={{styleId}}
        />
      ))}
      <Composition
        id="FiveStyleEdit"
        component={FiveStyleEdit}
        durationInFrames={360}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
