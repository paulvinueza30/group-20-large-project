import NavBar from "../components/NavBar";
import TeamCards from "../components/TeamCards";
import { IoExtensionPuzzle } from "react-icons/io5";
import { FaGamepad } from "react-icons/fa6";
import { FaBookOpen } from "react-icons/fa6";
import Image from "../assets/Large Project Home.svg";

// TODO: Add picture, features, and teams
function Home() {
  return (
    <div className="grid grid-cols-8 auto-rows-[100px] gap-4 relative">
      <div className="col-span-6 col-start-2">
        <NavBar />
      </div>
      <div className="col-span-3 row-span-5 col-start-2 row-start-2 pt-10 flex flex-col z-10">
        <h1 className="text-8xl font-pixel tracking-wide ">
          Level up your learning
        </h1>
        <br />
        <h3 className="text-2xl pb-10 font-sans text-gray-600 relative bottom-8 mb-2">
          Master any subject with fun, interactive
        </h3>
        <h3 className="text-2xl pb-5 font-sans relative bottom-20 text-gray-600">
          flashcards
        </h3>
        <a
          href="/signup"
          className="rounded-xl bg-primary text-white text-center p-4 px-6 w-[200px] text-2xl font-bold relative bottom-12  hover:bg-tertiary"
        >
          Sign Up Now
        </a>
      </div>
      <div className="col-span-4 row-span-5 col-start-4 row-start-2 relative left-20">
        <img src={Image} className="w-[700px] h-max pt-16" />
      </div>
      {/* Features Part */}
      <div className="col-span-8 row-span-5 row-start-7 bg-primary h-full col-start-1"></div>
      <div className="col-span-6 col-start-2 row-span-3 row-start-8 w-full ">
        <h2 className="text-4xl font-bold text-white mt-5 mb-5">Features</h2>
        <div className="flex justify-evenly pt-10 text-white">
          <div className="">
            <FaBookOpen className="text-white" size={30} />
            <h3 className="text-2xl font-bold">Spaced Repetition</h3>
            <p className="text-balance text-lg">
              Lorem ipsum odor amet, consectetuer adipiscing elit. Neque donec
              vitae ipsum facilisi cubilia dictumst.
            </p>
          </div>
          <div className="px-4">
            <IoExtensionPuzzle className="text-white" size={30} />
            <h3 className="text-2xl font-bold">Levels</h3>
            <p className="text-balance text-lg">
              Lorem ipsum odor amet, consectetuer adipiscing elit. Neque donec
              vitae ipsum facilisi cubilia dictumst.
            </p>
          </div>
          <div className="">
            <FaGamepad className="text-white relative" size={30} />
            <h3 className="text-2xl font-bold ">Streaks and Badges</h3>
            <p className="text-balance text-lg">
              Lorem ipsum odor amet, consectetuer adipiscing elit. Neque donec
              vitae ipsum facilisi cubilia dictumst.
            </p>
          </div>
        </div>
      </div>
      <div className="col-span-8 row-span-4 row-start-12">
        <h2 className="text-center text-5xl text-bold font-pixel pt-10 pb-20 hue-rotate-[210deg]">
          Team
        </h2>
        <TeamCards />
      </div>
      <div className="col-span-8 row-span-2 row-start-14 pt-20 text-center"></div>
    </div>
  );
}

export default Home;
