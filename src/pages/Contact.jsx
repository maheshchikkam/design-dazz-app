import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaLinkedin, FaInstagram, FaPinterest } from 'react-icons/fa';

export default function Contact() {
  return (
    <div className="min-h-screen bg-secondary">
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4">
            Get In Touch
          </h1>
          <p className="text-brown text-lg md:text-xl max-w-2xl mx-auto">
            Ready to transform your space? Let's discuss your interior design project and bring your vision to life.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
                Contact Information
              </h2>
              
              {/* Contact Items */}
              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="bg-primary p-3 rounded-full">
                    <FaPhone className="text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-brown text-lg">Phone</h3>
                    <p className="text-brown">+1 (555) 123-4567</p>
                    <p className="text-brown text-sm">Available Mon-Fri, 9 AM - 6 PM</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="bg-primary p-3 rounded-full">
                    <FaEnvelope className="text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-brown text-lg">Email</h3>
                    <p className="text-brown">hello@designdazz.com</p>
                    <p className="text-brown text-sm">We'll respond within 24 hours</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="bg-primary p-3 rounded-full">
                    <FaMapMarkerAlt className="text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-brown text-lg">Studio Address</h3>
                    <p className="text-brown">123 Design Street</p>
                    <p className="text-brown">Creative District, NY 10001</p>
                    <p className="text-brown text-sm">By appointment only</p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start space-x-4">
                  <div className="bg-primary p-3 rounded-full">
                    <FaClock className="text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-brown text-lg">Business Hours</h3>
                    <p className="text-brown">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-brown">Saturday: 10:00 AM - 4:00 PM</p>
                    <p className="text-brown">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-xl font-bold text-primary mb-4">Follow Us</h3>
              <div className="flex space-x-4">
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
                <a 
                  href="#" 
                  className="bg-primary p-3 rounded-full hover:bg-brown transition-colors duration-300"
                  aria-label="Pinterest"
                >
                  <FaPinterest className="text-white text-lg" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
              Start Your Project
            </h2>
            
            <form className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-brown font-medium mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-brown font-medium mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                    placeholder="Your last name"
                  />
                </div>
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-brown font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-brown font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              {/* Project Type */}
              <div>
                <label htmlFor="projectType" className="block text-brown font-medium mb-2">
                  Project Type *
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                >
                  <option value="">Select a project type</option>
                  <option value="residential">Residential Design</option>
                  <option value="commercial">Commercial Design</option>
                  <option value="consultation">Design Consultation</option>
                  <option value="renovation">Home Renovation</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Budget Range */}
              <div>
                <label htmlFor="budget" className="block text-brown font-medium mb-2">
                  Budget Range
                </label>
                <select
                  id="budget"
                  name="budget"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                >
                  <option value="">Select budget range</option>
                  <option value="under-10k">Under $10,000</option>
                  <option value="10k-25k">$10,000 - $25,000</option>
                  <option value="25k-50k">$25,000 - $50,000</option>
                  <option value="50k-100k">$50,000 - $100,000</option>
                  <option value="over-100k">Over $100,000</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-brown font-medium mb-2">
                  Project Details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 resize-vertical"
                  placeholder="Tell us about your project, timeline, and any specific requirements..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-primary text-white font-semibold py-4 px-6 rounded-lg hover:bg-brown transition-colors duration-300 focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 text-center">
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold text-primary mb-4">
              What Happens Next?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="text-center">
                <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                  1
                </div>
                <h4 className="font-semibold text-brown mb-2">Initial Consultation</h4>
                <p className="text-brown text-sm">We'll discuss your vision, needs, and project scope</p>
              </div>
              <div className="text-center">
                <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                  2
                </div>
                <h4 className="font-semibold text-brown mb-2">Design Proposal</h4>
                <p className="text-brown text-sm">Receive a detailed proposal with timeline and budget</p>
              </div>
              <div className="text-center">
                <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                  3
                </div>
                <h4 className="font-semibold text-brown mb-2">Project Kickoff</h4>
                <p className="text-brown text-sm">Begin transforming your space into something extraordinary</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
