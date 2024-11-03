import NavBar from "../components/NavBar";

// TODO: Add picture, features, and teams
function Home() {
  return (
    <div className="grid grid-cols-6 grid-rows-10 gap-4">
      <div className="col-span-4 col-start-2">
        <NavBar />
      </div>
      <div className="col-span-2 row-span-6 col-start-2 row-start-2">
        <h1 className="text-8xl font-pixel">Level up your learning</h1>
        <br />
        <h3 className="text-lg pb-10">
          Master any subject with fun, interactive flashcards
        </h3>
        <a href="/signup" className="rounded bg-primary text-white p-3">
          Sign Up Now
        </a>
      </div>
      <div className="col-span-2 row-span-6 col-start-4 row-start-2 border-2">
        Image
      </div>
      <div className="col-span-6 row-start-8 bg-primary">5</div>
    </div>
  );
}

export default Home;
