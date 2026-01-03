/**
 * Utility functions for managing className combinations
 */

/**
 * Conditionally combines classNames
 * @param  {...any} classes - Classes to combine
 * @returns {string} Combined className string
 */
export const cn = (...classes) => {
  return classes
    .flat()
    .filter((x) => typeof x === 'string' && x.length > 0)
    .join(' ');
};

/**
 * Gets category badge styles
 * @param {string} category - Project category
 * @returns {string} Tailwind classes
 */
export const getCategoryBadgeClass = (category) => {
  const baseClass = 'px-3 py-1 rounded-full text-sm font-medium text-white';
  return category === 'residential' ? cn(baseClass, 'bg-primary') : cn(baseClass, 'bg-brown');
};

/**
 * Gets nav link active state classes
 * @param {boolean} isActive - Whether link is active
 * @returns {string} Tailwind classes
 */
export const getNavLinkClass = (isActive) => {
  return isActive
    ? 'text-primary font-semibold'
    : 'text-brown hover:text-primary transition-colors duration-200';
};
