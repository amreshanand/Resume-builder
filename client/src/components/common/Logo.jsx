import React from 'react';

export default function Logo({ size = 'md', className = '' }) {
    const dimensions = {
        xs: 'w-6 h-6',
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-16 h-16',
        xl: 'w-24 h-24'
    };

    return (
        <div className={`shrink-0 flex items-center justify-center rounded-xl overflow-hidden shadow-lg shadow-indigo-500/20 ${dimensions[size]} ${className}`}>
            <img 
                src="/logo.png" 
                alt="ResumeAI Logo" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
        </div>
    );
}
