import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isEmailValid } from "../utils/isEmailValid";
import { useAuth } from "../context/AuthContext";
import InputField from "../components/InputField";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isEmailValid(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    setError(null);

    const success = await login(email, password);
    if (success) navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-5 md:px-0 bg-[#edf3f3]">
      <div className="w-full max-w-sm border p-4 md:p-8 space-y-3 bg-white border-gray-200 md:shadow-md">
        <h1 className="text-2xl font-bold">Login</h1>
        <form className="space-y-4" onSubmit={handleLogin}>
          <InputField
            label="Email"
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            isPassWordField={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
          {error && (
            <p className="text-red-500 bg-red-100 p-2 rounded-md">{error}</p>
          )}
          <button className="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-600 transition duration-200 cursor-pointer">
            {isLoading ? "Loading..." : "Login"}
          </button>
          <p className="text-center text-gray-500">
            Don't have an account?{" "}
            <Link to="/signUp" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
