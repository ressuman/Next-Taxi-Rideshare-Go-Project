"use client";

import { useState, useEffect } from "react";

export function useScreenHeight(): number {
  const [screenHeight, setScreenHeight] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setScreenHeight(window.innerHeight * 0.72);
    }
  }, []);

  return screenHeight;
}
