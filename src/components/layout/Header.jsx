import { NavLink } from 'react-router-dom';
import { FaAlignJustify } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';

import Logo from '../common/Logo';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [iconClicked, setIconClicked] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const handleMenuToggle = () => {
    setIconClicked(true);
    setMenuOpen(true);
    setTimeout(() => setIconClicked(false), 300);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };
  return (
    <>
      {/* Desktop Header */}
      <div className="hidden md:h-[130px] md:flex">
        <div className="h-full w-[30%] flex flex-row items-center justify-start bg-primary text-white pl-8">
          <NavLink to="/">
            <Logo />
          </NavLink>
          <NavLink to="/" className="flex flex-col items-start justify-center ml-4">
            <span className="font-bold">DESIGN</span>
            <span className="font-bold">DAZZ</span>
          </NavLink>
        </div>
        <div className="h-full w-[70%] flex flex-row items-center justify-between bg-secondary font-normal px-[10%]">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'text-primary font-semibold'
                : 'text-brown hover:text-primary transition-colors duration-200'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/portfolio"
            className={({ isActive }) =>
              isActive
                ? 'text-primary font-semibold'
                : 'text-brown hover:text-primary transition-colors duration-200'
            }
          >
            Portfolio
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? 'text-primary font-semibold'
                : 'text-brown hover:text-primary transition-colors duration-200'
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? 'text-primary font-semibold'
                : 'text-brown hover:text-primary transition-colors duration-200'
            }
          >
            Contact
          </NavLink>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="flex h-[80px] md:hidden">
        <div className="h-full w-full flex flex-row items-center justify-between bg-primary text-white px-4">
          <div className="flex flex-row items-center">
            <NavLink to="/">
              <Logo />
            </NavLink>
            <NavLink to="/" className="flex flex-col items-start ml-3 text-sm font-bold">
              <span>DESIGN</span>
              <span>DAZZ</span>
            </NavLink>
          </div>
          <div>
            <FaAlignJustify
              className={`text-2xl text-white cursor-pointer transition-transform duration-300 hover:scale-110 ${
                iconClicked ? 'rotate-90 scale-110' : ''
              }`}
              onClick={handleMenuToggle}
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-secondary animate-in fade-in duration-300">
          <div className="h-full flex flex-col">
            {/* Close button header */}
            <div className="flex justify-end p-4">
              <IoClose
                className="text-4xl text-primary cursor-pointer hover:scale-110 transition-transform duration-200"
                onClick={closeMenu}
              />
            </div>

            {/* Navigation menu */}
            <div className="flex-1 flex flex-col items-center justify-center">
              <nav className="flex flex-col gap-8 text-2xl font-semibold text-center animate-in slide-in-from-top duration-500">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-primary font-bold'
                      : 'text-brown hover:text-primary transition-colors duration-200'
                  }
                  onClick={closeMenu}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/portfolio"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-primary font-bold'
                      : 'text-brown hover:text-primary transition-colors duration-200'
                  }
                  onClick={closeMenu}
                >
                  Portfolio
                </NavLink>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-primary font-bold'
                      : 'text-brown hover:text-primary transition-colors duration-200'
                  }
                  onClick={closeMenu}
                >
                  About
                </NavLink>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-primary font-bold'
                      : 'text-brown hover:text-primary transition-colors duration-200'
                  }
                  onClick={closeMenu}
                >
                  Contact
                </NavLink>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
