import React from "react";
import { Link } from "react-router-dom";

const Header = ({login}) => {
  return (
    <header className="bg-[#E2B94F] flex items-center justify-between px-4 sm:px-8 md:px-16 lg:px-20 xl:px-32 py-6">
      {login ? (
        <>
          <Link className="flex items-center gap-3" to="/">
            <CheckCircleIcon className="h-10 w-10 text-black" />
            <span
              className="text-4xl font-semibold"
              style={{
                backgroundImage:
                  "-webkit-linear-gradient(left, #8E0E00, #1F1C18)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Task Manager
            </span>
          </Link>
          <Link to="/signupPage">
            <button
              className="w-full  bg-[#181938] text-[#aeaaea] rounded-full px-5 py-2.5 text-center mb-2"
            >
              Create Account
            </button>
          </Link>
        </>
      ) : (
        <>
          <Link className="flex items-center gap-3" to="/">
            <CheckCircleIcon className="h-10 w-10 text-black" />
            <span
              className="text-4xl font-semibold"
              style={{
                backgroundImage:
                  "-webkit-linear-gradient(left, #8E0E00, #1F1C18)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Task Manager
            </span>
          </Link>
          <Link to="/loginPage">
            <button
              className="w-full  bg-[#181938] text-[#aeaaea] rounded-full px-5 py-2.5 text-center mb-2"
            >
              Login
            </button>
          </Link>
        </>
      )}
    </header>
  );
};

function CheckCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

export default Header;
