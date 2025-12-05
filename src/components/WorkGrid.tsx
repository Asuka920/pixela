// src/components/WorkGrid.tsx
import React from 'react';
import WorkCard from './WorkCard';
import { Work } from '../types';

interface WorkGridProps {
  works: Work[];
  emptyMessage?: string;
}

const WorkGrid: React.FC<WorkGridProps> = ({ works, emptyMessage = "作品はありません。" }) => {
  if (!works || works.length === 0) {
    return <p>{emptyMessage}</p>;
  }

  return (
    <div className="works-grid"> {/* */}
      {works.map(work => (
        <WorkCard work={work} key={work.id} />
      ))}
    </div>
  );
};

export default WorkGrid;