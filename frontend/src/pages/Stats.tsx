import SideGrid from "../components/sidebar/SideGrid";

// TODO: Add components
function Stats() {
  return (
    <>
      <div className="flex">
        <SideGrid />

        <div className="flex w-full ml-20">
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="border-2 h-full w-full">Stats Page</div>
            <div className="border-2 h-full grid grid-rows-2">
              <div className="border">grid col 2 container</div>
              <div className="border flex-grow">grid col2 container 2</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Stats;
