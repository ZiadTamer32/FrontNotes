import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isEmailValid } from "../utils/isEmailValid";
import { useAuth } from "../context/AuthContext";
import InputField from "../components/InputField";
function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { signUp, isLoading } = useAuth();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (name.length < 3) {
      setError("Name must be at least 3 characters long.");
      return;
    }
    if (!isEmailValid(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    setError(null);

    const success = await signUp(name, email, password);
    if (success) navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-5 md:px-0 bg-[#edf3f3]">
      <div className="w-full max-w-sm border p-4 md:p-8 space-y-3 border-gray-200 md:shadow-md bg-white">
        <h1 className="text-2xl font-bold">Sign Up</h1>
        <form className="space-y-4" onSubmit={handleSignUp}>
          <InputField
            label="Name"
            type="text"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            {isLoading ? "Loading..." : "Sign Up"}
          </button>
          <p className="text-center text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
