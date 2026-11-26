"use client";

import Image from "next/image";
import { useState } from "react";
import type { ToolSummary } from "@/lib/types";
import { FALLBACK_LOGO, getToolLogoSrc } from "@/lib/toolLinks";

/** Logotipo de una herramienta con el favicon de WikipeIA como respaldo si no carga. */
export default function ToolLogo({
  tool,
  size,
  className = "",
}: {
  tool: Pick<ToolSummary, "imagen" | "enlace">;
  size: number;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <Image
      src={failed ? FALLBACK_LOGO : getToolLogoSrc(tool)}
      alt=""
      width={size}
      height={size}
      unoptimized
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
