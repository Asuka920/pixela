// src/components/WorkGrid.tsx
import React from 'react';
import WorkCard from './WorkCard';
import { Work } from '../types';

interface WorkGridProps {
  works: Work[];
  emptyMessage?: string;
  isEditable?: boolean;
}

const WorkGrid: React.FC<WorkGridProps> = ({ works, emptyMessage = "作品はありません。", isEditable = false }) => {
  if (!works || works.length === 0) {
    return <p>{emptyMessage}</p>;
  }

  return (
    <div className="works-grid"> {/* */}
      {works.map(work => (
        <WorkCard work={work} key={work.id} isEditable={isEditable} />
      ))}
    </div>
  );
};

export default WorkGrid;