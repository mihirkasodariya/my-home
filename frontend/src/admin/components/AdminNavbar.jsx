import React, { useState } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import growinfinity from "../../assets/img/Grow Infinity Logo White.png";

export const AdminNavbar = ({ mobileMenu, setMobileMenu }) => {
  const [profile, setProfile] = useState(true);

  const navigate = useNavigate();

  const handleProfile = () => {
    setProfile(!profile);
  };

  const signOut = () => {
    Cookies.remove("adminToken");
    navigate("/admin");
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <Link to="/admin/dashboard" className="flex ms-2 md:me-24">
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:block hidden">
                <img src={growinfinity} alt="" className="h-[50px]" />
              </span>
              <span className="self-center text-xl font-medium sm:text-2xl whitespace-nowrap dark:hidden block">
                <p>GrowInfinity Realtors</p>
              </span>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="flex items-center ms-3">
              <div>
                <button
                  onClick={handleProfile}
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  aria-expanded="false"
                  data-dropdown-toggle="dropdown-user"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    alt="user photo"
                  />
                </button>
              </div>
              <div
                className={
                  profile
                    ? "hidden"
                    : `absolute z-50  my-4 text-base list-none bg-white divide-y right-[9px] top-[40px] divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600`
                }
                id="dropdown-user"
              >
                <ul className="py-1" role="none">
                  <li>
                    <button
                      onClick={signOut}
                      href="#"
                      className="block px-4 py-1 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem"
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
