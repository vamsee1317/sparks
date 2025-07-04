import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);

  const [user, setUser] = useState({
    firstName: "",
    mobileNumber: "",
    password: "",
    cpassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" })); // Clear error on change
  };

  const validateInputs = () => {
    const nameRegex = /^[A-Za-z]{3,10}$/;
    const mobileRegex = /^[6-9]\d{9}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;

    const newErrors = {};

    if (!nameRegex.test(user.firstName)) {
      newErrors.firstName =
        "First name must be 3 to 10 alphabetic characters.";
    }

    if (!mobileRegex.test(user.mobileNumber)) {
      newErrors.mobileNumber = "Enter a valid Indian mobile number.";
    }

    if (!passwordRegex.test(user.password)) {
      newErrors.password =
        "Password must be 8–15 characters, with uppercase, lowercase, number, and symbol.";
    }

    if (user.password !== user.cpassword) {
      newErrors.cpassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    const existingUser = localStorage.getItem(user.mobileNumber);

    if (existingUser) {
      setErrors({ mobileNumber: "User already exists. Please sign in." });
      setIsNewUser(false);
    } else {
      localStorage.setItem(user.mobileNumber, JSON.stringify(user));
      alert("Registered successfully!");
      setIsNewUser(false);
      setUser({ firstName: "", mobileNumber: "", password: "", cpassword: "" });
      setErrors({});
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold">
            {isNewUser ? "Register" : "Welcome Back"}
          </h2>
          <p className="text-gray-500 mt-2">
            {isNewUser
              ? "Create your Sparks account"
              : "Sign in to continue learning"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleInput}
              placeholder="Enter your first name"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50"
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
            )}
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <input
              type="tel"
              name="mobileNumber"
              value={user.mobileNumber}
              onChange={handleInput}
              placeholder="Enter mobile number"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50"
            />
            {errors.mobileNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleInput}
              placeholder="Enter password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="cpassword"
                value={user.cpassword}
                onChange={handleInput}
                placeholder="Confirm password"
                className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 bg-gray-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            {errors.cpassword && (
              <p className="text-red-500 text-xs mt-1">{errors.cpassword}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:opacity-90"
          >
            {isNewUser ? "Register" : "Sign In"}
          </button>
        </form>

        {/* Toggle */}
        <p className="text-center text-sm text-gray-600">
          {isNewUser ? (
            <>
              Already a user?{" "}
              <button
                onClick={() => {
                  setIsNewUser(false);
                  setErrors({});
                }}
                className="text-black font-medium hover:underline"
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <button
                onClick={() => {
                  setIsNewUser(true);
                  setErrors({});
                }}
                className="text-black font-medium hover:underline"
              >
                Register
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
