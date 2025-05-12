import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { IoArrowBackSharp } from "react-icons/io5";
import { TbUserSquareRounded } from "react-icons/tb";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      const { token, user } = response.data;

      if (token && user?.role) {
        localStorage.setItem(
          "user",
          JSON.stringify({ role: user.role, token })
        );

        console.log("Login Successful:", response.data);

        switch (user.role) {
          case "vendor":
            navigate("/vendor");
            break;
          case "customer":
            navigate("/customer");
            break;
          case "admin":
            navigate("/admin");
            break;
          default:
            navigate("/");
        }
      } else {
        setError("Invalid Login response");
      }
    } catch (err) {
      console.error(err);
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='py-8 bg-gradient-to-b from-blue-100 to-green-100 min-h-screen flex items-center justify-center'>
      <div className='w-full max-w-md bg-white rounded-lg shadow-lg px-6 py-8'>
        <div className='flex items-center justify-between mb-6'>
          <IoArrowBackSharp
            className='w-6 h-6 text-blue-600 hover:text-blue-800 cursor-pointer'
            onClick={() => navigate(-1)}
          />
          <TbUserSquareRounded className='w-10 h-10 text-green-600' />
          <FiHome
            className='w-6 h-6 text-blue-600 hover:text-blue-800 cursor-pointer'
            onClick={() => navigate("/")}
          />
        </div>

        <h1 className='text-2xl font-bold text-center text-gray-800 mb-6'>
          Login To Your Account
        </h1>

        {error && (
          <p className='text-red-600 font-semibold mb-4 text-center'>{error}</p>
        )}

        <form onSubmit={handleSubmit} className='space-y-5'>
          <div className='relative'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Email Address
            </label>
            <span className='absolute left-3 top-10 text-gray-400'>
              <FiHome className='w-5 h-5' />
            </span>
            <input
              type='email'
              className='pl-10 pr-3 py-2 border border-gray-300 rounded-md w-full focus:ring-green-500 focus:border-green-500'
              placeholder='name@example.com'
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div className='relative'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Password
            </label>
            <span className='absolute left-3 top-10 text-gray-400'>
              <IoArrowBackSharp className='w-5 h-5 rotate-180' />
            </span>
            <input
              type='password'
              className='pl-10 pr-3 py-2 border border-gray-300 rounded-md w-full focus:ring-green-500 focus:border-green-500'
              placeholder='••••••••'
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>

          <button
            type='submit'
            className={`w-full flex justify-center items-center px-4 py-2 text-white font-semibold rounded-md transition duration-200 ${
              loading ? "bg-green-400" : "bg-green-600 hover:bg-green-700"
            }`}
            disabled={loading}
          >
            {loading ? (
              <>
                <svg
                  className='animate-spin mr-2 h-5 w-5 text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8v8z'
                  ></path>
                </svg>
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className='mt-6 text-center text-sm text-gray-600'>
          Don't have an account?{" "}
          <span
            className='text-blue-600 hover:underline cursor-pointer font-medium'
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </p>
      </div>
    </section>
  );
};

export default Login;
