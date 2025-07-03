import { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash, FaUser } from "react-icons/fa";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md space-y-6">
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

        {/* AUTH FORM */}
        <form className="space-y-4">
          {isRegistering && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
                />
                <FaUser className="absolute right-3 top-3 text-gray-400" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <FaEnvelope className="absolute right-3 top-3 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>

          {!isRegistering && (
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox rounded" />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-blue-500 hover:underline">
                Forgot Password?
              </a>
            </div>
          )}

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

        {/* TOGGLE LINK */}
        <p className="text-center text-sm text-gray-600">
          {isRegistering ? (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setIsRegistering(false)}
                className="text-black font-medium hover:underline"
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <button
                onClick={() => setIsRegistering(true)}
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
