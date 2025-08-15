import { NavLink } from "react-router-dom";
import { FaAlignJustify } from "react-icons/fa";
import { useState } from "react";

import Logo from "./Logo";

export default function Header() {
  return (
    <>
      {/* Desktop Header */}
      <div className="hidden sm:h-[130px] sm:flex">
        <div className="h-full w-[30%] flex flex-row items-center justify-center bg-primary text-white p-4">
          <div>
            <Logo />
          </div>
          <div className="flex flex-col items-start justify-center ml-4 text-sm font-medium">
            <span>DESIGN</span>
            <span>DAZZ</span>
          </div>
        </div>
        <div className="h-full w-[70%] flex flex-row items-center justify-between bg-secondary font-normal px-[15%]">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-primary" : "text-primary-color"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/portfolio"
            className={({ isActive }) =>
              isActive ? "text-primary" : "text-primary-color"
            }
          >
            Portfolio
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-primary" : "text-primary-color"
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-primary" : "text-primary-color"
            }
          >
            Contact
          </NavLink>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="flex h-[90px] xs:h-[80px] sm:hidden">
        <div className="h-full w-[100%] flex flex-row items-center space-between bg-primary text-white p-4">
          <div className="h-full w-[100%] flex flex-row items-center">
            <div>
              <Logo />
            </div>
            <div className="flex flex-col items-start ml-4 text-sm font-medium">
              <span>DESIGN</span>
              <span>DAZZ</span>
            </div>
          </div>
          <div>
            <FaAlignJustify className="text-2xl text-white cursor-pointer" onClick={() => setMenuOpen(true)} />
          </div>
        </div>
      </div>
    </>
  );
}
