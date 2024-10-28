import Sidebar from "../components/Sidebar";

function Dashboard() {
  return (
    <>
      <div className="grid grid-cols-5 grid-rows-5 gap-4">
        <div className="row-span-5">
          <Sidebar />
        </div>
        <div className="col-span-4 row-span-3">
          <h1>Flashcard app using tailwind and vite</h1>
        </div>
        <div className="col-span-4 row-span-2 col-start-2 row-start-4">3</div>
      </div>
    </>
  );
}

export default Dashboard;
