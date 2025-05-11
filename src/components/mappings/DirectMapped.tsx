import { Arrow } from "../Arrow";

export function DirectMapped() {
  return (
    <>
      <div className="absolute top-[1.5rem] w-[53px]">
        <p className="text-center">CPU</p>
        <div className="h-[97px] w-[53px] border-1 border-black"></div>
      </div>
      <div className="absolute top-[70px] left-[53px]">
        <Arrow direction="right" />
      </div>
      <div className="absolute left-[123px]">
        <p className="text-center">Cache</p>
        <div className="grid grid-cols-3">
          <p>Tag</p>
          <p>V</p>
          <p>Data</p>
          <div className="h-28 border-1 border-black"></div>
        </div>
      </div>
    </>
  );
}
