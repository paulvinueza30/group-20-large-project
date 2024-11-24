import React, { useState, useEffect } from "react";
import useRegisterUser from "../../hooks/user/useRegisterUser";
import { useNavigate } from "react-router-dom";

const SignUpForm: React.FC = () => {
  const { register, loading, error, success } = useRegisterUser();
  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await register(formData);
  };

  // Redirect to dashboard if registration is successful
  useEffect(() => {
    if (success) {
      navigate("/dashboard");
    }
  }, [success, navigate]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-start w-3/5">
      <h1 className="ml-2 font-pixel text-5xl pb-2">Sign Up</h1>

      <h3 className="ml-2 text-xl text-gray-700 mt-5">Name</h3>
      <input
        className="border-2 p-2 m-2"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="First Last name"
        required
      />
      <h3 className="ml-2 text-xl text-gray-700 mt-2">Username</h3>
      <input
        className="border-2 p-2 m-2"
        name="userName"
        value={formData.userName}
        onChange={handleChange}
        placeholder="e.g., atamaLover"
        required
      />
      <h3 className="ml-2 text-xl text-gray-700 mt-2">Email</h3>
      <input
        className="border-2 p-2 m-2"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="e.g., newuser@atama.com"
        type="email"
        required
      />
      <h3 className="ml-2 text-xl text-gray-700 mt-2">Password</h3>
      <input
        className="border-2 p-2 m-2"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="p@ssw0rd"
        type="password"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-primary p-2 text-white rounded-xl px-5 py-3 mt-3 ml-2 text-xl"
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
