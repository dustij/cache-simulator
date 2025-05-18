import { JSX } from "react";
import Cache from "./parts/Cache";
import CPU from "./parts/CPU";
import Details from "./parts/Details";
import RAM from "./parts/RAM";

export default function DirectMapped() {
  const connectingLines: JSX.Element[] = [];
  return (
    <>
      <CPU />
      <Cache />
      {connectingLines}
      <RAM />
      <Details />
    </>
  );
}
