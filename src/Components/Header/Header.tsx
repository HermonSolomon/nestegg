import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className=" bg-gray-900 p-4" data-testid="header">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-white font-bold text-xl">The Movie Tracker</div>

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
                className="text-white hover:text-white rounded-md px-3 py-2 text-sm font-medium block"
                aria-current="page"
              >
                Home
              </Link>
              <Link
                to="/favorites"
                type="button"
                className="relative rounded-full bg-black-800 p-1 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black-800"
              >
                Favorites
              </Link>
            </div>
          )}

          {/* Desktop menu */}
          <div className="md:flex items-center hidden">
            <Link
              to="/"
              className="text-white  hover:text-white rounded-md px-3 py-2 text-sm font-medium block"
              aria-current="page"
            >
              Home
            </Link>
            <Link
              to="/favorites"
              className="text-white  hover:text-white rounded-md px-3 py-2 text-sm font-medium block"
              aria-current="page"
            >
              Favorites
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Header;
