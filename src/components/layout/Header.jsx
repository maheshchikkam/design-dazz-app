import { NavLink } from 'react-router-dom';
import { FaAlignJustify } from 'react-icons/fa';
import { useState, useEffect, useCallback } from 'react';
import { IoClose } from 'react-icons/io5';

import Logo from '../common/Logo';
import { ROUTES } from '../../constants';
import { getNavLinkClass } from '../../utils/classNameUtils';

/**
 * Navigation item configuration
 * Centralized navigation structure for DRY principle
 */
const NAV_ITEMS = [
  { path: ROUTES.HOME, label: 'Home' },
  { path: ROUTES.PORTFOLIO, label: 'Portfolio' },
  { path: ROUTES.ABOUT, label: 'About' },
  { path: ROUTES.CONTACT, label: 'Contact' },
];

/**
 * DesktopNav Component
 * Renders navigation for desktop screens
 */
const DesktopNav = () => (
  <div className="hidden md:h-[130px] md:flex">
    {/* Logo Section */}
    <div className="h-full w-[30%] flex flex-row items-center justify-start bg-primary text-white pl-8">
      <NavLink to={ROUTES.HOME} className="flex flex-row">
        <Logo />
        <div className="flex flex-col items-start justify-center ml-2">
          <span className="font-bold">DESIGN</span>
          <span className="font-bold">DAZZ</span>
        </div>
      </NavLink>
    </div>

    {/* Navigation Links */}
    <div className="h-full w-[70%] flex flex-row items-center justify-between bg-secondary font-normal px-[10%]">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => getNavLinkClass(isActive)}
        >
          {item.label}
        </NavLink>
      ))}
    </div>
  </div>
);

/**
 * MobileHeader Component
 * Renders mobile header with hamburger menu
 */
const MobileHeader = ({ onMenuToggle, isIconClicked }) => (
  <div className="flex h-[80px] md:hidden">
    <div className="h-full w-full flex flex-row items-center justify-between bg-primary text-white px-4">
      <div className="flex flex-row items-center">
        <NavLink to={ROUTES.HOME}>
          <Logo />
        </NavLink>
        <NavLink to={ROUTES.HOME} className="flex flex-col items-start ml-2 text-sm font-bold">
          <span>DESIGN</span>
          <span>DAZZ</span>
        </NavLink>
      </div>
      <button
        onClick={onMenuToggle}
        className="text-2xl text-white cursor-pointer transition-transform duration-300 hover:scale-110"
        aria-label="Toggle menu"
        aria-expanded="false"
      >
        <FaAlignJustify className={`${isIconClicked ? 'rotate-90 scale-110' : ''}`} />
      </button>
    </div>
  </div>
);

/**
 * MobileMenu Component
 * Renders mobile navigation menu overlay
 */
const MobileMenu = ({ isOpen, onClose }) => {
  useEffect(() => {
    // Prevent body scroll when menu is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-secondary animate-in fade-in duration-300">
      <div className="h-full flex flex-col">
        {/* Close button header */}
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-4xl text-primary cursor-pointer hover:scale-110 transition-transform duration-200"
            aria-label="Close menu"
          >
            <IoClose />
          </button>
        </div>

        {/* Navigation menu */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <nav className="flex flex-col gap-8 text-2xl font-semibold text-center animate-in slide-in-from-top duration-500">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? 'text-primary font-bold'
                    : 'text-brown hover:text-primary transition-colors duration-200'
                }
                onClick={onClose}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

/**
 * Header Component
 * Main header component with responsive design
 */
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [iconClicked, setIconClicked] = useState(false);

  const handleMenuToggle = useCallback(() => {
    setIconClicked(true);
    setMenuOpen(true);
    setTimeout(() => setIconClicked(false), 300);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  return (
    <>
      <DesktopNav />
      <MobileHeader onMenuToggle={handleMenuToggle} isIconClicked={iconClicked} />
      <MobileMenu isOpen={menuOpen} onClose={closeMenu} />
    </>
  );
}
