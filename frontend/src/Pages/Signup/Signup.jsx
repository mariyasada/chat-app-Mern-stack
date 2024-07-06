import React, { useState } from "react";
import "./signup.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

const GENDER_OPTIONS = ["Female", "Male", "Other"];

const Signup = () => {
  const { loggedInUser, setLoggedInUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const [isPassword, setIsPassword] = useState({
    password: true,
    confirmpass: true,
  });

  //   functions
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const registerHanlder = async () => {
    try {
      const { fullName, username, email, gender, password, confirmPassword } =
        userData;
      if (
        [fullName, email, username, password, gender, confirmPassword].some(
          (field) => field?.trim() === ""
        )
      ) {
        toast.error("All fields are required!");
      }
      if (!email.includes("@")) {
        toast.error("Invalid email, please check your mail id!!");
      }

      if (password.length <= 6 || password.length >= 12) {
        toast.error("Password length must be between 6 to 12 characters");
      }
      if (password !== confirmPassword) {
        toast.error("Password and confirmpassword are not matched");
      }

      setLoading(true);
      const response = await axios.post("/api/v1/users/signup", userData);
      if (response?.status === 200) {
        const userData = response?.data?.data?.user;
        localStorage.setItem("loggedIn-user", JSON.stringify(data?.data?.user));
        setLoggedInUser(userData);
        setLoading(false);
        navigate("/home");
      } else {
        toast.error(response.data.message);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };
  return (
    <div className="flex bg-slate-50 flex-col gap-3 px-10 py-7 h-full w-full rounded-3xl shadow-lg relative max-[700px]:w-11/12 h-fit">
      <p className="text-2xl  text-fuchsia-800 font-bold text-center">
        Let's Go!!!
      </p>
      <div className="flex flex-col gap-1 items-start ">
        <label className="text-fuchsia-600  font-bold ">Full Name</label>
        <input
          className="w-full p-1 rounded-sm text-black border border-fuchsia-700 focus:outline  outline-fuchsia-800"
          value={userData.fullName}
          name="fullName"
          id="fullName"
          onChange={onChangeHandler}
        />
      </div>
      <div className="flex flex-col gap-1 items-start">
        <label className="text-fuchsia-600  font-bold">Username</label>
        <input
          className="w-full p-1 rounded-sm text-black border border-fuchsia-700 focus:outline  outline-fuchsia-800"
          value={userData.username}
          name="username"
          id="username"
          onChange={onChangeHandler}
        />
      </div>
      <div className="flex flex-col gap-1 items-start">
        <label className="text-fuchsia-600  font-bold">Email</label>
        <input
          className="w-full p-1 rounded-sm text-black border border-fuchsia-700 focus:outline  outline-fuchsia-800"
          value={userData.email}
          name="email"
          id="email"
          onChange={onChangeHandler}
        />
      </div>
      <div className="flex flex-col gap-1 relative items-start">
        <label className="text-fuchsia-600  font-bold">Password</label>
        <input
          className="w-full p-1 rounded-sm text-black border border-fuchsia-700 focus:outline  outline-fuchsia-800"
          value={userData.password}
          name="password"
          id="password"
          onChange={onChangeHandler}
          type={isPassword?.password ? "password" : "text"}
        />
      </div>
      <div className="flex flex-col gap-1 relative items-start">
        <label className="text-fuchsia-600  font-bold">Confirm Password</label>
        <input
          className="w-full p-1 rounded-sm text-black border border-fuchsia-700 focus:outline  outline-fuchsia-800"
          value={userData.confirmPassword}
          name="confirmPassword"
          id="confirmPassword"
          onChange={onChangeHandler}
          type={isPassword?.confirmpass ? "password" : "text"}
        />
      </div>

      <span
        className="passwordIcon1"
        onClick={() =>
          setIsPassword((prev) => ({ ...prev, password: !prev.password }))
        }
      >
        {isPassword?.password ? (
          <FaEyeSlash color="black" />
        ) : (
          <FaEye color="black" />
        )}
      </span>
      <span
        className="passwordIcon2"
        onClick={() =>
          setIsPassword((prev) => ({ ...prev, confirmpass: !prev.confirmpass }))
        }
      >
        {isPassword?.confirmpass ? (
          <FaEyeSlash color="black" />
        ) : (
          <FaEye color="black" />
        )}
      </span>
      <div className="flex flex-col gap-1 relative items-start">
        <label className="text-fuchsia-600 font-bold">Gender</label>
        <div className="flex items-center gap-3 ">
          {GENDER_OPTIONS.map((gender) => (
            <div className="flex gap-3 w-2/4 text-black" key={gender}>
              <label className="flex gap-2">
                <input
                  type="radio"
                  value={gender}
                  className="w-full p-1 rounded-sm cursor-pointer text-black"
                  name="gender"
                  id="gender"
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, gender: gender }))
                  }
                />
                <span>{gender}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-full justify-center gap-40 items-center max-sm:w-full flex-wrap max-[450px]:gap-2">
        <p className="text-sm text-fuchsia-600">Already have account?</p>
        <a
          className="text-fuchsia-500  font-bold cursor-pointer underline underline-offset-4"
          onClick={() => navigate("/")}
        >
          Login here
        </a>
      </div>

      <div className="flex flex-col gap-1 items-center justify-center w-full mt-2">
        <button
          onClick={registerHanlder}
          className="shadow-2xl bg-gradient-to-r from-pink-600 to-purple-400 hover:from-purple-500 hover:to-pink-400 p-2 text rounded-md w-full text-white font-bold"
        >
          {loading ? (
            <span className="loading loading-spinner "></span>
          ) : (
            "Sign Up"
          )}
        </button>
      </div>
    </div>
  );
};

export default Signup;
