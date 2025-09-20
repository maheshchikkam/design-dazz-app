import React from 'react';

const ProjectTags = ({ tags }) => (
  <div className="mb-2 flex flex-wrap gap-2">
    {tags.map((tag, idx) => (
      <span
        key={idx}
        className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium border border-primary/20"
      >
        #{tag}
      </span>
    ))}
  </div>
);

export default ProjectTags;