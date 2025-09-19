export default function About() {
  return (
    <div className="bg-secondary">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">About Design Dazz</h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Bringing Your Vision to Life in Three Dimensions
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Welcome to Design Dazz, where imagination meets innovation through the power of 3D
              design. As a specialized interior designer, I focus exclusively on creating stunning
              three-dimensional visualizations that transform your space before a single piece of
              furniture is moved.
            </p>

            <p className="text-gray-600 leading-relaxed">
              With cutting-edge 3D modeling technology, I bring your interior design dreams to
              reality through photorealistic renderings. Every texture, lighting detail, and spatial
              relationship is meticulously crafted to give you a complete preview of your
              transformed space.
            </p>

            <p className="text-gray-600 leading-relaxed">
              My passion lies in helping clients visualize the impossible and make confident design
              decisions. From residential homes to commercial spaces, I specialize in creating
              immersive 3D experiences that eliminate guesswork and ensure your complete
              satisfaction with the final result.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800">50+</h3>
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
