import React from 'react';

/**
 * NavLink Component
 * Reusable navigation link with active state styling
 */
const NavLinkItem = ({ to: href, isActive = false, children, onClick = null, className = '' }) => {
  const baseClass = 'transition-colors duration-200 cursor-pointer hover:text-primary';
  const activeClass = isActive ? 'text-primary font-semibold' : 'text-brown';

  return (
    <a
      href={href}
      onClick={onClick}
      className={`${baseClass} ${activeClass} ${className}`}
      role="link"
    >
      {children}
    </a>
  );
};

export default NavLinkItem;
