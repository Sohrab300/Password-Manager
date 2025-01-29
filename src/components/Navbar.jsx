import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-900 text-white">
      <div className="my-container flex justify-between items-center px-4 py-5 h-14">
        <div className="logo font-bold">
          <span className="text-green-600">&lt;</span>
          PassMG<span className="text-green-600">/&gt;</span>
        </div>
        <ul>
          <li className="flex gap-4">
            <a className="hover:font-bold" href="/">
              Home
            </a>
            <a className="hover:font-bold" href="#">
              About Us
            </a>
            <a className="hover:font-bold" href="#">
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
