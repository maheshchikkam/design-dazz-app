import React from 'react';

const ProjectInfo = ({ location, category, year, budget }) => (
  <div className="bg-white rounded-lg shadow p-6 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-4">
    <div>
      <div className="flex items-center mb-2">
        <span className="font-semibold">Location:</span>&nbsp;{location}
      </div>
      <div className="flex items-center mb-2">
        <span className="font-semibold">Category:</span>&nbsp;
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </div>
    </div>
    <div>
      <div className="flex items-center mb-2">
        <span className="font-semibold">Year:</span>&nbsp;{year}
      </div>
      <div className="flex items-center mb-2">
        <span className="font-semibold">Budget:</span>&nbsp;
        {budget}
      </div>
    </div>
  </div>
);

export default ProjectInfo;
