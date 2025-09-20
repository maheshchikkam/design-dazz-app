import { FaLinkedin, FaInstagram } from 'react-icons/fa';

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-secondary text-brown py-8 px-4 mt-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        {/* Logo and Address */}
        <div className="flex flex-row items-center gap-2">
          <img src="/favicon-brown.svg" alt="Design Dazz Logo" className="w-12 h-12 mb-2" />{' '}
          <p className="font-semibold">Design Dazz</p>
        </div>
        {/* Address Info */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <p className="font-semibold">Address</p>
          <a href="tel:+1234567890" className="hover:underline">
            Miyapur, Hyderabad
          </a>
          <a href="mailto:info@designdazz.com" className="hover:underline">
            Telangana, India - 500049
          </a>
        </div>
        {/* Contact Info */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <p className="font-semibold">Contact</p>
          <a href="tel:+917993136717" className="hover:underline">
            +91 799-313-6717
          </a>
          <a href="mailto:hellodesigndazz@gmail.com" className="hover:underline">
            hellodesigndazz@gmail.com
          </a>
        </div>
        {/* Social Links */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <p className="font-semibold">Follow Us</p>
          <div className="flex gap-4">
            <a
              href="#"
              className="bg-primary p-3 rounded-full hover:bg-brown transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="text-white text-lg" />
            </a>
            <a
              href="#"
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
