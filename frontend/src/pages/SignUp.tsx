import SignUpForm from "../components/forms/SignUpForm";
import NavBar from "../components/NavBar";

// TODO: add picture, improve signupform styling
function SignUp() {
  return (
    <div className="grid grid-cols-8 grid-rows-6 gap-4 h-screen">
      <div className="col-span-6 col-start-2">
        <NavBar />
      </div>
      <div className="col-span-3 row-span-4 col-start-2 row-start-2">
        <SignUpForm />
      </div>
      <div className="col-span-3 row-span-4 col-start-5 row-start-2">Image</div>
      <div className="col-span-8 row-start-6 bg-primary">5</div>
    </div>
  );
}

export default SignUp;
