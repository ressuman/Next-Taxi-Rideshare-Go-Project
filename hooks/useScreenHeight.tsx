// "use client";

// import { useState, useEffect } from "react";

// export function useScreenHeight(): number {
//   const [screenHeight, setScreenHeight] = useState<number>(0);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       setScreenHeight(window.innerHeight * 0.72);
//     }
//   }, []);

//   return screenHeight;
// }

// export function useScreenHeight(): number {
//   const [screenHeight, setScreenHeight] = useState<number>(
//     window.innerHeight * 0.72
//   );

//   useEffect(() => {
//     const updateScreenHeight = () => setScreenHeight(window.innerHeight * 0.72);
//     window.addEventListener("resize", updateScreenHeight);

//     return () => window.removeEventListener("resize", updateScreenHeight);
//   }, []);

//   return screenHeight;
// }

// export function useScreenHeight(): number {
//   const [screenHeight, setScreenHeight] = useState<number>(0);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       setScreenHeight(window.innerHeight * 0.85); // Adjusted height percentage
//     }
//   }, []);

//   return screenHeight;
// }
