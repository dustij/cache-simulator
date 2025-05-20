import CPU from "./parts/CPU";
import Cache from "./parts/Cache";
import Details from "./parts/Details";
import RAM from "./parts/RAM";

export default function FullyAssociative() {
  return (
    <>
      <CPU />
      <Cache />
      <RAM />
      <Details variant="fifo" />
    </>
  );
}
