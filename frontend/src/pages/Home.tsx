import NavBar from "../components/NavBar";
import Placholder from "../assets/Placeholder.png";
import TeamCards from "../components/TeamCards";
import { IoExtensionPuzzle } from "react-icons/io5";
import { FaGamepad } from "react-icons/fa6";
import { FaBookOpen } from "react-icons/fa";

// TODO: Add picture, features, and teams
function Home() {
  return (
    <div className="grid grid-cols-6 auto-rows-[100px] gap-4">
      <div className="col-span-4 col-start-2">
        <NavBar />
      </div>
      <div className="col-span-2 row-span-5 col-start-2 row-start-2 z-10 pt-10">
        <h1 className="text-8xl font-pixel">Level up your learning</h1>
        <br />
        <h3 className="text-lg pb-10">
          Master any subject with fun, interactive flashcards
        </h3>
        <a href="/signup" className="rounded-xl bg-primary text-white p-4 px-6">
          Sign Up Now
        </a>
      </div>
      <div className="col-span-3 row-span-5 col-start-3 row-start-2">
        <img
          src={Placholder}
          className="w-max h-max relative -right-40 z-0 pt-5"
        />
      </div>
      {/* Features Part */}
      <div className="col-span-6 row-span-3 row-start-7 bg-primary h-full col-start-1"></div>
      <div className="col-span-4 col-start-2 row-span-3 row-start-7 w-full">
        <h2 className="text-2xl font-bold text-white mt-10">Features</h2>
        <div className="flex justify-evenly pt-10 text-white">
          <div className="">
            <FaBookOpen className="text-white" size={30} />
            <h3 className="text-xl font-bold">Various learning modes</h3>
            <p className="text-balance">
              Lorem ipsum odor amet, consectetuer adipiscing elit. Neque donec
              vitae ipsum facilisi cubilia dictumst.
            </p>
          </div>
          <div className="px-4">
            <IoExtensionPuzzle className="text-white" size={30} />
            <h3 className="text-xl font-bold">Challenges</h3>
            <p className="text-balance">
              Lorem ipsum odor amet, consectetuer adipiscing elit. Neque donec
              vitae ipsum facilisi cubilia dictumst.
            </p>
          </div>
          <div className="">
            <FaGamepad className="text-white relative" size={30} />
            <h3 className="text-xl font-bold ">Streaks and Badges</h3>
            <p className="text-balance">
              Lorem ipsum odor amet, consectetuer adipiscing elit. Neque donec
              vitae ipsum facilisi cubilia dictumst.
            </p>
          </div>
        </div>
      </div>
      <div className="col-span-6 row-span-4 row-start-10">
        <h2 className="text-center text-4xl text-bold font-pixel py-4 pb-10">
          Team
        </h2>
        <TeamCards />
      </div>
      <div className="col-span-6 row-span-2 row-start-14 pt-20 text-center">
        {" "}
        Possible Footer
      </div>
    </div>
  );
}

export default Home;
