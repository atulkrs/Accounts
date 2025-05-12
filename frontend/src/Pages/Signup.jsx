import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { IoArrowBackSharp } from "react-icons/io5";
import axios from "axios";
import { TbUserSquareRounded } from "react-icons/tb";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateForm = () => {
    const { name, email, password, role } = formData;
    if (!name || !email || !password || !role) {
      setError("All fields are required.");
      return false;
    }
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      if (response.data) {
        alert("Registration successful!");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please try again.");
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
          Create an Account
        </h1>

        {error && (
          <p className='text-red-600 font-semibold mb-4 text-center'>{error}</p>
        )}

        <form onSubmit={handleRegister} className='space-y-5'>
          <div className='relative'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Name
            </label>
            <span className='absolute left-3 top-10 text-gray-400'>
              <TbUserSquareRounded className='w-5 h-5' />
            </span>
            <input
              type='text'
              className='pl-10 pr-3 py-2 border border-gray-300 rounded-md w-full focus:ring-green-500 focus:border-green-500'
              placeholder='John Doe'
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div className='relative'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Email Address
            </label>
            <span className='absolute left-3 top-10 text-gray-400'>
              <FiHome className='w-5 h-5' />{" "}
              {/* Replace with FiMail if preferred */}
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
              <IoArrowBackSharp className='w-5 h-5 rotate-180' />{" "}
              {/* Replace with a lock icon */}
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
          <div className='relative'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Select Role
            </label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className='pl-3 pr-3 py-2 border border-gray-300 rounded-md w-full focus:ring-green-500 focus:border-green-500'
            >
              <option value=''>Select a role</option>
              <option value='admin'>Admin</option>
              <option value='customer'>Customer</option>
              <option value='vendor'>Vendor</option>
            </select>
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
                Signing Up...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className='mt-6 text-center text-sm text-gray-600'>
          Already have an account?{" "}
          <span
            className='text-blue-600 hover:underline cursor-pointer font-medium'
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </div>
    </section>
  );
};

export default Signup;
