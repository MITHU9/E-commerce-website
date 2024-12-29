import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";

import { setUser } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../redux/api/userApiSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setUser({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered");
      } catch (err) {
        //console.log(err);
        toast.error(err?.data);
      }
    }
  };

  return (
    <section className="flex flex-col md:flex-row items-center mt-16 py-2  md:py-4 lg:py-2 md:mt-0 md:items-start bg-[#000000eb] min-h-screen px-6 md:p-10">
      <div className="w-full md:ml-32  md:mt-12 md:w-1/2 lg:w-2/3 xl:w-1/3 mb-8 md:mb-0 md:mr-8 md:pl-12 lg:pl-0">
        <h1 className="text-2xl text-gray-200 font-semibold mb-4">Register</h1>

        <form onSubmit={submitHandler} className="w-full">
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-3 border border-gray-700 rounded bg-transparent text-white"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-gray-700 rounded bg-transparent text-white"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border border-gray-700 rounded bg-transparent text-white"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-white mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full p-3 border border-gray-700 rounded bg-transparent text-white"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-pink-500 text-white py-3 rounded hover:bg-pink-600 transition-colors"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>

          {isLoading && <Loader />}
        </form>

        <div className="mt-6">
          <p className="text-white">
            Already have an account?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="text-pink-500 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>

      <div className="w-full h-full md:w-1/2 lg:w-2/3 md:hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1576502200916-3808e07386a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80"
          alt="Register Visual"
          className="rounded-lg w-full lg:h-[100vh] object-cover"
        />
      </div>
    </section>
  );
};

export default Register;
