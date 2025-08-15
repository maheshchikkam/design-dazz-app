import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Logo from "./Logo";

export default function Header() {
  return (
    <div className="h-[130px] flex">
      <div className="h-full w-[30%] flex flex-row items-center justify-center bg-primary text-white p-4">
        <div>
          <Logo />
        </div>
        <div className="flex flex-col items-start justify-center ml-4 text-sm font-medium">
          <span>Design</span>
          <span>Dazz</span>
        </div>
      </div>
      <div className="h-full w-[70%] flex flex-row items-center justify-center bg-secondary text-white p-4">
        <div className="flex flex-col items-start justify-center ml-4 text-sm font-bold">
          <nav className="bg-gray-100 py-2 px-4 flex gap-4">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/portfolio" className="hover:underline">
              Portfolio
            </Link>
            <Link to="/about" className="hover:underline">
              About
            </Link>
            <Link to="/contact" className="hover:underline">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
