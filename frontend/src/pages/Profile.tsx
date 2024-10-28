import MakeSidebar from "../components/Sidebar";

// TODO: fix columns size when sidebar is not expanded
function Profile() {
  return (
    <>
      <div className="grid grid-cols-5 grid-rows-5 gap-4">
        <div className="row-span-5">
          <MakeSidebar />
        </div>
        <div className="col-span-4 row-span-3">
          <h1>Profile Page</h1>
        </div>
        <div className="col-span-4 row-span-2 col-start-2 row-start-4">3</div>
      </div>
    </>
  );
}

export default Profile;
