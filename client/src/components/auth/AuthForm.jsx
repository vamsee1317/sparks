import { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash, FaUser } from "react-icons/fa";

export default function AuthForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validateInputs = () => {
    const nameRegex = /^[A-Za-z ]{3,10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;

    const newErrors = {};

    if (isRegistering) {
      if (!nameRegex.test(user.name)) {
        newErrors.name = "Name must be 3 to 10 alphabetic characters.";
      }
    }

    if (!emailRegex.test(user.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!passwordRegex.test(user.password)) {
      newErrors.password =
        "Password must be 8–15 characters, include uppercase, lowercase, number & symbol.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    const storedUser = localStorage.getItem(user.email);

    if (isRegistering) {
      if (storedUser) {
        setErrors({ email: "User already exists. Please sign in." });
        setIsRegistering(false);
      } else {
        localStorage.setItem(user.email, JSON.stringify(user));
        alert("Registered successfully!");
        setIsRegistering(false);
        setUser({ name: "", email: "", password: "" });
        setErrors({});
      }
    } else {
      if (!storedUser) {
        setErrors({ email: "User not found. Please register first." });
      } else {
        const existing = JSON.parse(storedUser);
        if (existing.password === user.password) {
          alert("Login successful!");
          setUser({ name: "", email: "", password: "" });
          setErrors({});
        } else {
          setErrors({ password: "Incorrect password." });
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold">
            {isRegistering ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-gray-500 mt-2">
            {isRegistering
              ? "Register to start your journey"
              : "Sign in to continue learning"}
          </p>
        </div>

        {/* Intro Card */}
        <div className="bg-gray-50 rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold">
            {isRegistering ? "Sign Up" : "Sign In"}
          </h3>
          <p className="text-sm text-gray-500">
            {isRegistering
              ? "Create a new account to access Sparks"
              : "Enter your credentials to access your account"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegistering && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleInput}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 bg-gray-50"
                />
                <FaUser className="absolute right-3 top-3 text-gray-400" />
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInput}
                placeholder="Enter your email"
                className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 bg-gray-50"
              />
              <FaEnvelope className="absolute right-3 top-3 text-gray-400" />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={user.password}
                onChange={handleInput}
                placeholder="Enter your password"
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
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Sign In or Register Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:opacity-90"
          >
            {isRegistering ? "Register" : "Sign In"}
          </button>

          {!isRegistering && (
            <>
              <div className="text-center text-gray-500">Or continue with</div>
              <div className="flex gap-4">
                <button className="flex-1 border rounded-lg py-2 font-medium hover:bg-gray-100">
                  Google
                </button>
                <button className="flex-1 bg-blue-600 text-white rounded-lg py-2 font-medium hover:opacity-90">
                  Facebook
                </button>
              </div>
            </>
          )}
        </form>

        {/* Toggle Link */}
        <p className="text-center text-sm text-gray-600">
          {isRegistering ? (
            <>
              Already have an account?{" "}
              <button
                onClick={() => {
                  setIsRegistering(false);
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
                  setIsRegistering(true);
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
  