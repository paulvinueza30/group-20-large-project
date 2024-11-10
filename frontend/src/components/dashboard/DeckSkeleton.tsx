import React from "react";

function DeckSkeleton() {
  return (
    <div
      role="status"
      className="flex items-center justify-center w-2/5 h-10 p-16 mt-2 bg-gray-400 rounded-lg animate-pulse dark:bg-gray-600"
    ></div>
  );
}

export default DeckSkeleton;
