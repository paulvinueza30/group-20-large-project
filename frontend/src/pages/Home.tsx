import NavBar from "../components/NavBar";
import Placholder from "../assets/Placeholder.png";
import team from "../assets/Transhumans - Astro.png";

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
          className="w-max h-max relative left-20 z-0 pt-5"
        />
      </div>
      {/* Features Part */}
      <div className="col-span-6 row-span-3 row-start-7 bg-primary h-full col-start-1"></div>
      <div className="col-span-4 col-start-2 row-span-3 row-start-7 border-2">
        <h2 className="text-2xl font-bold text-white mt-10">Feature</h2>
        <div className="flex justify-between pt-10 text-white">
          <div>
            <h3 className="text-xl  font-bold">Various learning modes</h3>
            <p>
              Lorem ipsum odor amet, consectetuer adipiscing elit. Neque donec
              vitae ipsum facilisi cubilia dictumst.
            </p>
          </div>
          <div>
            <h3 className="text-xl  font-bold">Streaks and Badged</h3>
            <p>
              Lorem ipsum odor amet, consectetuer adipiscing elit. Neque donec
              vitae ipsum facilisi cubilia dictumst.
            </p>
          </div>
          <div className="">
            <h3 className="text-xl  font-bold">Challenges</h3>
            <p>
              Lorem ipsum odor amet, consectetuer adipiscing elit. Neque donec
              vitae ipsum facilisi cubilia dictumst.
            </p>
          </div>
        </div>
      </div>
      <div className="col-span-6 row-span-4 row-start-10 border-2">
        <h2 className="text-center text-4xl text-bold font-pixel py-4 pb-10">
          Team
        </h2>
        <div className="flex justify-evenly">
          <div className="bg-tertiary border-2 w-[250px] p-0 rounded-2xl overflow-hidden">
            <img src={team} alt="" className="self-end  relative top-4" />
            <p className="bg-white">Project Manager</p>
          </div>
          <div className="bg-tertiary border-2 w-[250px] p-0 rounded-2xl overflow-hidden">
            <img src={team} alt="" className="self-end  relative top-4" />
            <p className="bg-white">Back end</p>
          </div>
          <div className="bg-tertiary border-2 w-[250px] p-0 rounded-2xl overflow-hidden">
            <img src={team} alt="" className="self-end  relative top-4" />
            <p className="bg-white">Front End</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
