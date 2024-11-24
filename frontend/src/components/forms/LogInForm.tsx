import React, { useState, useEffect } from "react";
import useLoginUser from "../../hooks/user/useLoginUser";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  // Gets the info from useLoginUser hook
  const { login, loading, error, success } = useLoginUser();
  // Form variables
  const [formData, setFormData] = useState({ login: "", password: "" });

  // Updates the formData variable when the user types in the input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Sends the data back to the login hook
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(formData);
    } catch (err) {
      // Handle errors here if necessary
    }
  };

  // Router-dom hook used to change to another page
  const navigate = useNavigate();

  // Use useEffect to handle navigation after successful login
  useEffect(() => {
    if (success) {
      navigate("/dashboard");
    }
  }, [success, navigate]); // Run effect only when success changes

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-start w-3/5">
      <h2 className="ml-2 font-pixel text-5xl pb-2">Log In</h2>
      <h3 className="ml-2 text-xl text-gray-700 mt-2">Email (or Username) </h3>
      <input
        className="border-2 p-2 m-2"
        name="login"
        value={formData.login}
        onChange={handleChange}
        placeholder="Login"
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
        {/* Text changes while the API loads */}
        {loading ? "Logging in..." : "Login"}
      </button>
      {/* Displays an error message */}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
};

export default LoginForm;
