export default function About() {
  return (
    <div className="bg-secondary">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-16 flex flex-col items-center">
          <img
            src="/founder.jpeg"
            alt="Sandhya Puppala"
            className="w-80 h-[40rem] md:w-[32rem] md:h-[60rem] rounded-2xl object-cover object-top shadow-2xl mb-8 border-8 border-white"
          />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">Sandhya Puppala</h1>
          <p className="text-xl text-primary font-medium mb-6">Founder & Lead Designer</p>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Bringing Your Vision to Life in Three Dimensions
            </h2>

            <p className="text-gray-600 leading-relaxed">
              At Design Dazz, we transform ideas into visually captivating spaces through the art of
              3D design and visualization. As a 3D Interior and Architectural Visualizer, I
              specialize in bringing design concepts to life through detailed, realistic, and
              immersive visual experiences.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Using advanced 3D modeling and rendering techniques, I create lifelike representations
              of residential interiors, commercial spaces, villas, and architectural elevations.
              Every element, from material textures and color combinations to lighting and spatial
              details, is carefully crafted to reflect the vision behind each project.
            </p>

            <p className="text-gray-600 leading-relaxed">
              My passion is to help clients see, experience, and understand their spaces before they
              become reality. By combining creativity, precision, and functionality, I aim to make
              every design journey clearer, more confident, and inspiring.
              <br />
              <br />
              <b>At Design Dazz, we don't just visualize spaces; we bring possibilities to life.</b>
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800">20+</h3>
                <p className="text-sm text-gray-600">3D Projects Completed</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800">100%</h3>
                <p className="text-sm text-gray-600">3D Visualization Focus</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Why Choose 3D Design?</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Visualize your space before any construction begins
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Experiment with different layouts and color schemes
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Make informed decisions with photorealistic previews
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Save time and money by avoiding costly mistakes
                </li>
              </ul>
            </div>

            <div className="text-center">
              <p className="text-lg font-medium text-gray-800 mb-2">"Every space tells a story."</p>
              <p className="text-gray-600 italic">
                Let me help you write yours in three dimensions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
