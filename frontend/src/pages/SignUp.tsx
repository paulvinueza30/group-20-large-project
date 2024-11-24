import SignUpForm from "../components/forms/SignUpForm";
import NavBar from "../components/NavBar";
import Image from "../assets/pageBG.png";

// TODO: add picture, improve signupform styling
function SignUp() {
  return (
    <div className="grid grid-cols-8 auto-rows-[100px] max-h-svh">
      <div className="col-span-6 col-start-2 row-span-1 row-start-1 z-50">
        <NavBar />
      </div>
      <div className="col-span-3 row-span-6 col-start-2 row-start-3 z-10">
        <SignUpForm />
      </div>
      <div className="col-span-4 row-span-6 col-start-4 row-start-3">
        <img src={Image} className="relative w-[60rem] h-[50rem] -top-10" />
      </div>
      <div className="col-span-8 row-start-10 row-span-4 bg-primary">5</div>
    </div>
  );
}

export default SignUp;
