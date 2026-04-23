import { FaLinkedin, FaInstagram } from 'react-icons/fa';

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-secondary text-brown py-8 px-4 mt-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        {/* Logo and Address */}
        <div className="flex flex-row items-center gap-2">
          <img
            src="/favicon-brown.svg"
            alt="Design Dazz Logo"
            loading="lazy"
            className="w-12 h-12 mb-2"
          />{' '}
          <p className="font-semibold">Design Dazz</p>
        </div>
        {/* Founder Profile */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <p className="font-semibold">Founder</p>
          <div className="flex flex-col items-center md:items-start gap-3 mt-1 cursor-default">
            <div className="shrink-0 mt-1">
              {/* Big Passport Size Image */}
              <img
                src="/founder.jpg"
                alt="Sai Sandhya Puppala"
                className="w-36 h-48 rounded-xl border border-primary/30 object-cover object-center shadow-md bg-white"
              />
            </div>
            <div className="flex flex-col items-center md:items-start">
              <span className="font-bold text-[1.1rem]">Sai Sandhya Puppala</span>
            </div>
          </div>
        </div>

        {/* Address & Contact Info */}
        <div className="flex flex-col items-center md:items-start gap-2 text-sm">
          <p className="font-semibold text-base mb-1">Contact</p>
          <div className="flex flex-col items-center md:items-start space-y-1">
            <a
              href="tel:+917993136717"
              className="hover:underline transition-colors hover:text-primary"
            >
              +91 799-313-6717
            </a>
            <a
              href="mailto:hellodesigndazz@gmail.com"
              className="hover:underline transition-colors hover:text-primary"
            >
              hellodesigndazz@gmail.com
            </a>
          </div>
          <div className="flex flex-col items-center md:items-start mt-2">
            <span className="opacity-90">Miyapur, Hyderabad</span>
            <span className="opacity-90">Telangana, India - 500049</span>
          </div>
        </div>
        {/* Social Links */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <p className="font-semibold">Follow Us</p>
          <div className="flex flex-row items-center gap-4">
            <a
              href="https://www.instagram.com/design.dazz"
              target="_blank"
              className="bg-primary p-3 rounded-full hover:bg-brown transition-colors duration-300"
              aria-label="Instagram"
            >
              <FaInstagram className="text-white text-lg" />
            </a>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className="mt-8 text-center text-xs text-brown-400">
        © {currentYear} All rights reserved, Powered and secured by Design Dazz.
      </div>
    </footer>
  );
}
