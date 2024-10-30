function LogInForm() {
  const inputStyle = "border-2 rounded p-2";

  const inputs = [
    { type: "text", placeholder: "Username" },
    { type: "password", placeholder: "Password" },
  ];

  return (
    <form className="max-w-sm mx-auto">
      <h2>Log In</h2>
      {inputs.map(({ placeholder, type }) => (
        <div className="mb-5">
          <input type={type} placeholder={placeholder} className={inputStyle} />
        </div>
      ))}
      <a href="#" className="text-sm">
        Forgot Password?
      </a>
      <a href="/dashboard" className="rounded p-4 bg-purple-600 text-white">
        Log In
      </a>
    </form>
  );
}

export default LogInForm;
