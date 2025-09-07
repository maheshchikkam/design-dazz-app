import { NavLink } from "react-router-dom";
import { FaAlignJustify } from "react-icons/fa";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

import Logo from "./Logo";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [iconClicked, setIconClicked] = useState(false);
  return (
    <>
      {/* Desktop Header */}
      <div className="hidden sm:h-[130px] sm:flex">
        <div className="h-full w-[30%] flex flex-row items-center justify-start bg-primary text-white pl-25">
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
            <FaAlignJustify
              className={`text-2xl text-white cursor-pointer transition-transform duration-300 ${
                iconClicked ? "rotate-90 scale-110" : ""
              }`}
              onClick={() => {
                setIconClicked(true);
                setMenuOpen(false);
                setTimeout(() => setIconClicked(false), 300);
              }}
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div>
          <div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center"
            style={{ background: "#f9f5f3" }}
          >
            <IoClose
              className="text-4xl text-primary cursor-pointer"
              onClick={() => setMenuOpen(false)}
            />
            <nav className="flex flex-col gap-8 text-2xl font-semibold">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-primary" : "text-primary-color"
                }
                onClick={() => setMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/portfolio"
                className={({ isActive }) =>
                  isActive ? "text-primary" : "text-primary-color"
                }
                onClick={() => setMenuOpen(false)}
              >
                Portfolio
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "text-primary" : "text-primary-color"
                }
                onClick={() => setMenuOpen(false)}
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "text-primary" : "text-primary-color"
                }
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </NavLink>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
