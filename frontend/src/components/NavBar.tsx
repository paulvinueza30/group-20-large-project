import { Link, useLocation } from "react-router-dom";

function NavBar() {
  const location = useLocation(); // Get the current location

  return (
    <nav className="bg-white border-gray-200 pt-5">
      <div className="min-w-screen flex flex-wrap items-center justify-between mx-auto py-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-pixel whitespace-nowrap hue-rotate-[210deg]">
            Atama
          </span>
        </a>
        <div className="lock w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link
                to="/"
                className={`block py-2 px-3 rounded mr-4 md:p-0 ${
                  location.pathname === "/"
                    ? "text-blue" // Active state for Home
                    : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700"
                }`}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className={`block px-6 rounded-md md:border-0 md:hover:text-blue-700 ${
                  location.pathname === "/login"
                    ? "bg-blue text-white"
                    : "bg-secondary hover:bg-primary text-white"
                }`}
              >
                Log In
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
