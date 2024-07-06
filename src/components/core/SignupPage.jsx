import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../services/operations/authAPI";
import Header from "../../pages/Header";


const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    dispatch(signUp(
        data.firstName,
        data.lastName,
        data.email,
        data.password,
        navigate)) // Store signup data in the slice
  };

  return (
    <>
      <Header login={false}/>
      <section className="bg-[#E2B94F] flex flex-col justify-center items-center ">
        <div className="bg-[#181939] flex flex-col md:flex-row items-center justify-center p-4 rounded-md m-3 sm:w-1/2 md:w-1/3">
          <div className=" p-4  rounded-2xl w-full md:max-w-md shadow-lg-purple">
            <h2 className="font-bold text-white text-4xl mb-10">Sign Up</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <input
                type="text"
                {...register("firstName", { required: true })}
                placeholder="Enter your first name"
                className="w-full px-4 py-3 mb-5   border border-pure-greys-5 rounded-md focus:outline-none"
                style={{ borderWidth: ".1px" }}
              />
              {errors.firstName && (
                <span className="text-white">First Name is required</span>
              )}
              <input
                type="text"
                {...register("lastName", { required: true })}
                placeholder="Enter your last name"
                className="w-full px-4 py-3 mb-5   border border-pure-greys-5 rounded-md focus:outline-none"
                style={{ borderWidth: ".1px" }}
              />
              {errors.lastName && (
                <span className="text-white">Last Name is required</span>
              )}
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Enter you email"
                className="w-full px-4 py-3 mb-5   border border-pure-greys-5 rounded-md focus:outline-none"
                style={{ borderWidth: ".1px" }}
              />
              {errors.email && (
                <span className="text-white">Email is required</span>
              )}
              <input
                type="password"
                {...register("password", { required: true })}
                placeholder="Enter your password"
                className="w-full px-4 py-3 mb-5  border border-pure-greys-5 rounded-md focus:outline-none"
                style={{ borderWidth: ".1px" }}
              />
              {errors.password && (
                <span className="text-white">Password is required</span>
              )}
              <input
                type="password"
                {...register("confirmPassword", { required: true })}
                placeholder="Please confirm the password"
                className="w-full px-4 py-3 mb-7   border border-pure-greys-5 rounded-md focus:outline-none"
                style={{ borderWidth: ".1px" }}
              />
              {errors.confirmPassword && (
                <span className="text-white">Confirm Password is required</span>
              )}
              <button
                type="submit"
                className=" w-full text-[#181938] bg-[#aeaaea] rounded-lg px-5 py-2.5 text-center mb-2"

              >
                Sign Up
              </button>
              <p className="text-center my-2 text-white py-2">or</p>
              <h2 className="text-center text-white mb-6">
                Already have an account?
                <Link to="/loginPage">
                  <span
                    style={{
                      background: "linear-gradient(to right, #667EEA, #764BA2)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {" "}
                    Login
                  </span>
                </Link>
              </h2>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignupPage;
