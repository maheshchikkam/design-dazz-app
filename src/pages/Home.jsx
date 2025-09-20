import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="bg-secondary">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row">
        {/* Brand/Title Section - 30% width on desktop */}
        <div className="w-full md:w-[30%] bg-primary">
          <div className="flex flex-row items-center justify-center bg-primary text-white h-full min-h-[300px] md:min-h-[500px]">
            <div className="flex flex-col text-center md:text-left px-6 md:px-8">
              <span className="text-4xl md:text-5xl font-bold">Design</span>
              <span className="text-4xl md:text-5xl font-bold">Dazz</span>
              <span className="text-lg md:text-xl mt-2">Interior Design Studio</span>
            </div>
          </div>
        </div>

        {/* Hero Image - 70% width on desktop */}
        <div className="w-full md:w-[70%] flex justify-center items-center bg-gray-50">
          <img
            src="https://static.wixstatic.com/media/c837a6_dd175849cd9f4e3db86a04ab14f9f617~mv2.jpg/v1/crop/x_0,y_1120,w_4480,h_4480/fill/w_628,h_628,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/shutterstock_1922829893.jpg"
            alt="Design Dazz Interior Design"
            loading="lazy"
            className="w-full h-full object-cover min-h-[300px] md:min-h-[500px]"
          />
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brown mb-6">About</h2>
          <div className="w-24 h-1 bg-brown mx-auto mb-8"></div>
        </div>

        <div className="text-center">
          <p className="text-lg md:text-xl text-brown leading-relaxed max-w-3xl mx-auto">
            Welcome to Design Dazz, where imagination meets innovation through the power of 3D
            design. As a specialized interior designer, I focus exclusively on creating stunning
            three-dimensional visualizations that transform your space before a single piece of
            furniture is moved.
          </p>
        </div>
      </div>

      {/* Portfolio Image Section */}
      <div className="px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          <img
            src="https://static.wixstatic.com/media/c837a6_7c584dbe8daf4cbfab69251295b930fb~mv2.jpg/v1/fill/w_1996,h_1462,al_b,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/c837a6_7c584dbe8daf4cbfab69251295b930fb~mv2.jpg"
            alt="Design Dazz Portfolio"
            loading="lazy"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* View Portfolio Link */}
      <div className="text-center pb-12">
        <Link
          to="/portfolio"
          className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-brown transition-colors duration-300 text-lg shadow-md"
        >
          View Portfolio
        </Link>
      </div>
    </div>
  );
}
