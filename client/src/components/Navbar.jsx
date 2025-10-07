import React from "react";

import { Link } from "react-router";

const Navbar = () => {
  const menuItems = [
    { name: "New Book", url: "/add-book" },
    { name:  "New Comic", url: "/add-comic"},
    { name:  "New Journal", url: "/add-journal"},
    { name: "Home", url: "/" },
  ];

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {menuItems.map((item, i) => (
              <li key={i}>
                <Link to={item.url}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <img className="h-[50px]" src="https://png.pngtree.com/png-clipart/20230122/original/pngtree-book-icon-vector-image-png-image_8926794.png" />
        <Link to="/" className="btn btn-ghost text-xl">
          Book Store
        </Link>
      </div>

      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {menuItems.map((item, idx) => (
            <li key={idx}>
              <Link to={item.url}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      </div>
  );
};

export default Navbar;
