import { VehicleLashAndRescueGeneral } from "./general";

export default function Page({ children }: any) {
  return (
    <>
      <div className="flex h-min w-full flex-row gap-8">
        <div className="mb-8 flex w-full flex-col gap-8 px-24">
          <VehicleLashAndRescueGeneral />
        </div>
      </div>
    </>
  );
}
