function SignUpForm() {
  const inputStyle = "border-2 rounded p-2";

  const inputs = [
    { type: "email", placeholder: "Email" },
    { type: "text", placeholder: "First Name" },
    { type: "text", placeholder: "Last Name" },
    { type: "password", placeholder: "Password" },
    {
      type: "password",
      label: "Confirm Password",
      placeholder: "Confirm Password",
    },
  ];

  return (
    <form className="max-w-sm mx-auto">
      <h2>Sign Up</h2>
      {inputs.map(({ placeholder, type }) => (
        <div className="mb-5">
          <input type={type} placeholder={placeholder} className={inputStyle} />
        </div>
      ))}
      <a href="/dashboard" className="rounded p-4 bg-primary text-white">
        Sign Up
      </a>
    </form>
  );
}

export default SignUpForm;
