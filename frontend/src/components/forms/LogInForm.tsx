import React, { useState } from "react";
import useLoginUser from "../../hooks/useLoginUser"; // Adjust the import path accordingly
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const { login, loading, error, success } = useLoginUser();
  const [formData, setFormData] = useState({ login: "", password: "" });
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(formData);
    } catch (err) {
      // Handle errors here if necessary
    }
  };

  if (success) {
    navigate("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-start">
      <h2 className=" font-pixel text-2xl pb-2">Log In</h2>
      <input
        className="border-2 p-2 my-2"
        name="login"
        value={formData.login}
        onChange={handleChange}
        placeholder="Login"
        required
      />
      <input
        className="border-2 p-2 my-2"
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
        className="bg-primary p-2 text-white rounded-xl px-4 mt-3"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
};

export default LoginForm;
