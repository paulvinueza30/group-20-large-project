import React, { useState } from "react";
import useRegisterUser from "../../hooks/useRegisterUser";

const SignUpForm: React.FC = () => {
  const { register, loading, error, success } = useRegisterUser();
  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await register(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-start">
      <h2 className="ml-2 font-pixel text-2xl pb-2">Sign Up</h2>
      <input
        className="border-2 p-2 m-2"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        className="border-2 p-2 m-2"
        name="userName"
        value={formData.userName}
        onChange={handleChange}
        placeholder="Username"
        required
      />
      <input
        className="border-2 p-2 m-2"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        type="email"
        required
      />
      <input
        className="border-2 p-2 m-2"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        type="password"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-primary p-2 text-white rounded-xl px-4 mt-3 ml-2"
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </button>
      {error && (
        <div style={{ color: "red" }} className="pt-2 ml-2">
          {error}
        </div>
      )}
      {success && (
        <div style={{ color: "green" }} className="pt-2 ml-2">
          Registration successful!
        </div>
      )}
    </form>
  );
};

export default SignUpForm;
