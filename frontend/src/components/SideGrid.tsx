import { useState } from "react";
import MakeSidebar from "./Sidebar";

function SideGrid() {
  const [sidebarSize, setSidebarSize] = useState(true);

  const getSizeChange = (sizedata: boolean) => {
    setSidebarSize(sizedata);
  };

  return (
    <aside className="min-h-screen">
      <div
        className={`min-h-screen shadow-lg ${
          sidebarSize ? "w-56" : "w-20"
        } duration-300 ease-in-out`}
      >
        <MakeSidebar sendSizeChange={getSizeChange} />
      </div>
    </aside>
  );
}

export default SideGrid;
