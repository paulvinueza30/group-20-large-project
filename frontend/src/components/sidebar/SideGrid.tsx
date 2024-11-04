import { useState } from "react";
import MakeSidebar from "./Sidebar";

function SideGrid({ color }: any) {
  const [sidebarSize, setSidebarSize] = useState(true);

  const getSizeChange = (sizedata: boolean) => {
    setSidebarSize(sizedata);
  };

  return (
    <aside className="h-screen md:h-[1000px] dark:bg-gray-900">
      <div
        className={`min-h-screen shadow-lg ${
          sidebarSize ? "w-56" : "w-10"
        } duration-300 ease-in-out dark:bg-gray-800`}
      >
        <MakeSidebar sendSizeChange={getSizeChange} color={color} />
      </div>
    </aside>
  );
}

export default SideGrid;
