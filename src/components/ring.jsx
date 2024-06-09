import React, { useState, useEffect } from 'react';

export const Ring = ({ progress }) => {
    const radius = 72;
    const circumference = 2 * Math.PI * radius;
    const [animatedProgress, setAnimatedProgress] = useState(progress);
    const progressOffset = circumference - (animatedProgress / 100) * circumference;

    useEffect(() => {
        // Animation frame id
        let frameId;
        
        // Function to update progress
        const updateProgress = (start, from, to) => {
            const now = Date.now();
            const progress = Math.min((now - start) / 600, 1); // 300ms animation
            const currentProgress = progress * (to - from) + from;
            
            setAnimatedProgress(currentProgress);
            
            if (progress < 1) {
                frameId = requestAnimationFrame(() => updateProgress(start, from, to));
            }
        };
        
        const startAnimation = () => {
            const startTime = Date.now();
            frameId = requestAnimationFrame(() => updateProgress(startTime, animatedProgress, progress));
        };
        
        startAnimation();
        
        return () => {
            cancelAnimationFrame(frameId);
        };
    }, [progress]);

    return (
        <div className="flex justify-center items-center">
            <svg className="transform -rotate-90 duration-300" width="12rem" height="12rem">
                <circle cx="50%" cy="50%" r={radius} stroke="#BBC4DA" strokeWidth="14" fill="transparent" />
                <circle cx="50%" cy="50%" r={radius} stroke="#07042A" strokeWidth="14" fill="transparent"
                    strokeDasharray={circumference} strokeDashoffset={progressOffset} strokeLinecap="round" />
            </svg>
        </div>
    );
};