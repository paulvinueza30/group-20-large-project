function NavBar() {
  return (
    <nav className="bg-white border-gray-200 pt-5">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-3xl font-pixel whitespace-nowrap ">
            {/* Just a placeholder */}
            FlashGame
          </span>
        </a>
        <div className="hidden w-full md:block md:w-auto " id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white ">
            <li>
              <a
                href="/"
                className="block py-2 px-3 text-blue bg-blue-700 mr-4 rounded md:bg-transparent md:text-blue-700 md:p-0 "
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 mr-4  md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 "
              >
                About
              </a>
            </li>

            <li>
              <a
                href="/login"
                className="block px-6 text-white rounded-md hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 bg-secondary"
              >
                Log In
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
