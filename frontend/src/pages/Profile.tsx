import { useState } from "react";
import MakeSidebar from "../components/Sidebar";

// TODO: Refactor code
function Profile() {
  const [sidebarSize, setSidebarSize] = useState(true);

  const getSizeChange = (sizedata: boolean | ((prevState: boolean) => boolean)) => {
    setSidebarSize(sizedata);
  };

  return (
    <>
      <div className="flex">
        <aside className="min-h-screen">
          <div className={`min-h-screen shadow-lg ${sidebarSize? "w-56" : "w-20"} duration-300 ease-in-out`}>
            <MakeSidebar sendSizeChange={getSizeChange}/>
          </div>
        </aside>

        <div className="flex w-full ml-20">
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="border-2 h-full w-full">
              Profile Page
            </div>
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

export default Profile;
