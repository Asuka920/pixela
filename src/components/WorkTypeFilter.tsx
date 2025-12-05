// src/components/WorkTypeFilter.tsx
import React from 'react';

interface WorkTypeFilterProps {
    selectedType: string;
    onTypeChange: (type: string) => void;
}

const WorkTypeFilter: React.FC<WorkTypeFilterProps> = ({ selectedType, onTypeChange }) => {
    const workTypes = [
        { value: 'all', label: 'すべて', icon: 'fas fa-th' },
        { value: 'image', label: '画像', icon: 'fas fa-image' },
        { value: 'video', label: '動画', icon: 'fas fa-video' },
        { value: 'game', label: 'ゲーム', icon: 'fas fa-gamepad' },
        { value: 'website', label: 'Webサイト', icon: 'fas fa-globe' },
        { value: 'zine', label: 'Zine', icon: 'fas fa-book' },
    ];

    return (
        <div className="work-type-filter">
            {workTypes.map((type) => (
                <button
                    key={type.value}
                    className={`work-type-button ${selectedType === type.value ? 'active' : ''}`}
                    onClick={() => onTypeChange(type.value)}
                >
                    <i className={type.icon}></i>
                    <span>{type.label}</span>
                </button>
            ))}
        </div>
    );
};

export default WorkTypeFilter;
