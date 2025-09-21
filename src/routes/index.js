import Home from '../pages/Home';
import Portfolio from '../pages/Portfolio';
import About from '../pages/About';
import Contact from '../pages/Contact';
import ProjectDetails from '../pages/ProjectDetails';

export const routes = [
  {
    path: '/',
    element: Home,
  },
  {
    path: '/portfolio',
    element: Portfolio,
  },
  {
    path: '/portfolio/:projectId',
    element: ProjectDetails,
  },
  {
    path: '/about',
    element: About,
  },
  {
    path: '/contact',
    element: Contact,
  },
];
