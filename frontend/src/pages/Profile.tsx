import SideGrid from "../components/sidebar/SideGrid";
import TodoList from "../components/todo/TodoList";

// TODO: Add components
function Profile() {
  return (
    <>
      <div className="flex">
        <SideGrid />
        <div className="flex w-full ml-20">
          <div className="grid grid-cols-5 grid-rows-5 gap-4 w-full">
            <div className="col-span-5">
              <h1>Profile</h1>
            </div>
            <div className="col-span-2 row-span-2 row-start-2">2</div>
            <div className="col-span-2 row-span-2 col-start-3 row-start-2">
              <TodoList />
            </div>
            <div className="row-span-2 col-start-5 row-start-2">4</div>
            <div className="col-span-3 row-span-2 row-start-4">5</div>
            <div className="col-span-2 row-span-2 col-start-4 row-start-4">
              6
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
