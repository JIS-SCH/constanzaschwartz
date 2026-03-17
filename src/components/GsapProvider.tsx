"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(useGSAP, Flip);

export function GsapProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
