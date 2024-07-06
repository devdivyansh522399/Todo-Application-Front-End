import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import banner from "../assets/banner.png";
import { useSelector } from "react-redux";
export default function Home() {
  const token = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col min-h-screen bg-[#E2B94F]">
      <Header />
      <main className="flex flex-col items-center justify-start  px-4 sm:px-8 md:px-16 lg:px-20 xl:px-32 ">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Your Tasks.{" "}
            <span
              style={{
                backgroundImage:
                  "-webkit-linear-gradient(left, #8E0E00, #1F1C18)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Organized.
            </span>
          </h1>
          <p
            className="text-md md:text-lg"
            style={{
              backgroundImage:
                "-webkit-linear-gradient(left, #8E0E00, #1F1C18)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            The only to-do list you'll ever need.
          </p>
        </div>
        {token ? (
          <div className="flex justify-center mt-10">
            <div className="flex flex-col items-center gap-4">
              <Link to="signupPage">
                <button className="w-full bg-[#181938] text-[#aeaaea] rounded-full px-5 py-2.5 text-center mb-2">
                  Sign in to create task
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex justify-center mt-10">
            <div className="flex flex-col items-center gap-4">
              <Link to="main-page">
                <button className="w-full bg-[#181938] text-[#aeaaea] rounded-full px-5 py-2.5 text-center mb-2">
                  Create your first todo
                </button>
              </Link>
            </div>
          </div>
        )}
        <img src={banner} alt="" className="" />
      </main>
    </div>
  );
}
