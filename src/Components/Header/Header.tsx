import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMoviesContext } from "../../context/MovieContext";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { toggleTheme, theme } = useMoviesContext();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={`font-mono bg-${
        theme === "light" ? "white" : "gray-900 "
      } text-${theme === "light" ? "grey-800" : "white"} `}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className=" font-bold text-xl">The Movie Tracker</div>

          {!isMobileMenuOpen ? (
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="text-black focus:outline-none"
                name="humburger"
                role="button"
                data-testid="humburger"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="white"
                >
                  <path d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
              </button>
            </div>
          ) : (
            <div
              className="close"
              onClick={() => setIsMobileMenuOpen(false)}
              data-testid="close-menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                color="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          )}

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div
              className="md:hidden absolute top-12 h-1/2 left-0 w-full bg-gray-800"
              data-testid="menu-panel-opened"
            >
              <Link
                to="/"
                className=" hover:text-white rounded-md px-3 py-2 text-sm font-medium block"
                aria-current="page"
              >
                Home
              </Link>
              <Link
                to="/favorites"
                type="button"
                className="relative rounded-full bg-black-800 p-1  hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black-800"
              >
                Favorites
              </Link>
            </div>
          )}

          {/* Desktop menu */}
          <div className="md:flex items-center hidden">
            <Link
              to="/"
              className="  hover:text-white rounded-md px-3 py-2 text-sm font-medium block"
              aria-current="page"
            >
              Home
            </Link>
            <Link
              to="/favorites"
              className=" hover:text-white rounded-md px-3 py-2 text-sm font-medium block"
              aria-current="page"
            >
              Favorites
            </Link>
            <button onClick={toggleTheme} className=" p-2 flex items-center">
              {theme === "light" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Header;
