import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice.js";
import { userService } from "../../api/userService.js";
import { Logo } from "../index.js";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signout = () => {
    userService
      .logOut()
      .then(() => {
        dispatch(logout());
        navigate("/");
        closeDropdown();
      })
      .catch((error) => {
        return error.message;
      });
  };

  const navItems = [
    {
      name: "Home",
      url: "/",
      active: true,
    },
    {
      name: "Blogs",
      url: "/all-blogs",
      active: true,
    },

    {
      name: "Contact",
      url: "/contact",
      active: true,
    },
    {
      name: "About",
      url: "/about  ",
      active: true,
    },
    {
      name: "Add Blogs",
      url: "/add-blogs",
      active: authStatus,
    },
  ];

  return (
    <>
      <nav className="bg-[#12263A]">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Logo width="w-14" height="h-14"/>
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              Blog-On
            </span>
          </Link>

          {authStatus && (
            <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded={isDropdownOpen}
                onClick={toggleDropdown}
              >
                <img
                  className="w-8 h-8 rounded-full"
                  src={userData.avatar}
                  alt="user photo"
                />
              </button>

              {isDropdownOpen && (
                <div
                  className="font-medium top-6 absolute right-0 z-10 my-4 text-base list-none bg-[#c5d8d1] divide-y divide-[#12263A] rounded-lg shadow"
                  id="user-dropdown"
                >
                  <div className="px-4 py-3">
                    <span className="block text-sm text-[#12263A]">
                      {userData.fullName}
                    </span>
                    <span className="block text-sm text-[#12263A] truncate">
                      {userData.email}
                    </span>
                  </div>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <Link
                        to="/profile"
                        onClick={closeDropdown}
                        className="block px-4 py-2 text-sm text-[#12263A] hover:bg-gray-100"
                      >
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={signout}
                        className="block w-full px-4 py-2 text-sm text-[#12263A] hover:bg-gray-100"
                      >
                        Sign out
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}

          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-user"
          >
            <ul className="flex flex-col items-center font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              {navItems.map((nav, index) => {
                return (
                  <li key={index}>
                    {nav.active ? (
                      <NavLink
                        to={nav.url}
                        className={({ isActive }) =>
                          isActive
                            ? " text-[#F4C89B]  hover:text-[#F4C89B]"
                            : "text-white hover:text-[#F4C89B]"
                        }
                      >
                        {nav.name}
                      </NavLink>
                    ) : null}
                  </li>
                );
              })}
              {!authStatus && (
                <div className="flex space-x-2 rtl:space-x-reverse mt-4 md:mt-0">
                  <button
                    onClick={() => navigate("/login")}
                    type="button"
                    className="bg-slate-400 rounded-lg px-6 py-2 text-sm font-bold uppercase hover:bg-slate-500"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/signup")}
                    type="button"
                    className="bg-slate-400 rounded-lg px-6 py-2 text-sm font-bold uppercase hover:bg-slate-500"
                  >
                    Sign up
                  </button>
                </div>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
