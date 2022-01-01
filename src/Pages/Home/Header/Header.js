import React, { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "./../../../Hooks/useAuth";

const Header = () => {
  const [isClicked, setIsClicked] = useState(false);
  const { user, logout } = useAuth();

  const handelLogout = () => {
    Swal.fire({
      title: "Do you want to Logout?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        logout();
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Ok", "", "info");
      }
    });
  };

  const hamburger = () => {
    setIsClicked(!isClicked);
  };
  return (
    <header className="bg-black border-b shadow-sm">
      <nav className="lg:max-w-6xl lg:mx-auto  max-w-3xl mx-4 py-3 ">
        <div className="flex justify-between items-center">
          {/* left side */}
          <div>
            <Link to="">
              <h1 className="text-2xl text-white">Hero Rider</h1>
            </Link>
          </div>

          {/* Mobile menu */}
          {/* Mobile menubar */}
          <ul
            className={
              isClicked
                ? "fixed top-0 right-0 z-10 transition-all ease-in-out bg-white h-screen md:w-full w-full flex flex-col justify-center items-center space-y-8 shadow-2xl lg:hidden"
                : "-right-full flex flex-col justify-center items-center space-y-8 lg:hidden fixed top-0 z-10 transition-all h-screen w-full"
            }
          >
            <li>
              <NavLink
                activeStyle={{
                  fontWeight: "text-base",
                  color: "red",
                }}
                className="font-medium text-3xl md:text-7xl"
                to="/home"
                onClick={() => {
                  setIsClicked(!isClicked);
                  window.scrollTo(0, 0);
                }}
              >
                Dashboard
              </NavLink>
            </li>
            <li className="flex items-center space-x-2 cursor-pointer">
              <div>
                <img
                  className="w-10 h-10 rounded-full"
                  src={user.photoURL}
                  alt=""
                />
              </div>
              <p>Raiyan</p>
              <button
                onClick={handelLogout}
                className="text-2xl hover:scale-110 transition-all"
              >
                <FiLogOut />
              </button>
            </li>
          </ul>

          {/* Hamburger menu */}

          <div
            className="hamburger-main lg:hidden cursor-pointer z-20"
            onClick={hamburger}
          >
            <div
              className={
                isClicked
                  ? "w-8 bg-red-400 h-0.5 rounded mb-2 transform rotate-45 translate-y-3.5 transition-all"
                  : "w-8 bg-black h-0.5 rounded mb-2 transition-all"
              }
            ></div>
            <div
              className={
                isClicked
                  ? "w-8 bg-red-400 h-0.5 rounded mb-2 opacity-0 transition-all"
                  : "w-8 bg-black h-0.5 rounded mb-2 transition-all"
              }
            ></div>
            <div
              className={
                isClicked
                  ? "w-8 bg-red-400 h-0.5 rounded mb-2 transform -translate-y-1.5 -rotate-45  transition-all"
                  : "w-8 bg-black h-0.5 rounded mb-2 transition-all"
              }
            ></div>
          </div>

          {/* right side */}
          <div className="hidden lg:inline-flex">
            <ul className="flex items-center space-x-8">
              <li className="header-menu">
                <Link to="">Dashboard</Link>
              </li>
              {user?.email ? (
                <li className="flex items-center space-x-2 cursor-pointer">
                  <div>
                    <img
                      className="w-10 h-10 rounded-full"
                      src={user.photoURL}
                      alt=""
                    />
                  </div>
                  <p className="text-white">{user.displayName}</p>
                  <button
                    onClick={handelLogout}
                    className="text-2xl hover:scale-110 text-white transition-all"
                  >
                    <FiLogOut />
                  </button>
                </li>
              ) : (
                <>
                  <li className="header-menu">
                    <Link to="/login">Sign In</Link>
                  </li>
                  <li className="header-menu">
                    <Link to="/register">Sign Up</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
