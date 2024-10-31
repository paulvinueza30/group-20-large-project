import SignUpForm from "../components/forms/SignUpForm";
import NavBar from "../components/NavBar";

function SignUp() {
  return (
    <div className="grid grid-cols-6 grid-rows-6 gap-4 h-screen">
      <div className="col-span-6">
        <NavBar />
      </div>
      <div className="col-span-2 row-span-4 col-start-2 row-start-2">
        <SignUpForm />
      </div>
      <div className="col-span-2 row-span-4 col-start-4 row-start-2">Image</div>
      <div className="col-span-6 row-start-6 bg-primary">5</div>
    </div>
  );
}

export default SignUp;
