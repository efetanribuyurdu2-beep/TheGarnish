"use client";

import { useId } from "react";
import { usePrefs } from "@/lib/prefs";
import type { WorldId } from "@/lib/types";
import { GlassSvg, type GlassProps } from "./glassSvg";

export { GarnishIcon } from "./glassSvg";

export function GlassArt({ world: forced, ...props }: GlassProps & { world?: WorldId }) {
  const { world: current } = usePrefs();
  const uid = useId().replace(/:/g, "");
  return <GlassSvg {...props} world={forced ?? current ?? "maison"} uid={uid} />;
}
