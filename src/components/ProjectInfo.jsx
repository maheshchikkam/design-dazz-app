import React from 'react';

const ProjectInfo = ({ location, category, year }) => (
  <div className="bg-white rounded-lg shadow p-6 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div>
      <div className="flex items-center mb-2">
        <span className="material-icons text-primary mr-2">place</span>
        <span className="font-semibold">Location:</span>&nbsp;{location}
      </div>
      <div className="flex items-center mb-2">
        <span className="material-icons text-primary mr-2">category</span>
        <span className="font-semibold">Category:</span>&nbsp;
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </div>
    </div>
    <div>
      <div className="flex items-center mb-2">
        <span className="material-icons text-primary mr-2">calendar_today</span>
        <span className="font-semibold">Year:</span>&nbsp;{year}
      </div>
    </div>
  </div>
);

export default ProjectInfo;