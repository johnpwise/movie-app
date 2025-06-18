import React, { useEffect, useState } from "react";
import { useMotionValue, animate, useAnimationFrame } from "framer-motion";

type TorusGaugeProps = {
    value: number; // 0-100 (percentage)
    lowerThreshold?: number; // e.g. 30
    upperThreshold?: number; // e.g. 70
    colors?: string[]; // e.g. ["#2e7d32", "#fbc02d", "#c62828"]
    backgroundColor?: string; // e.g. "#e5e7eb"
    size?: number; // px diameter
    thickness?: number; // px stroke width
    scale?: number; // scale factor for the gauge>
    label?: string | ((val: number) => React.ReactNode);
    duration?: number; // animation duration (s)
    demoMode?: boolean;
};

const DEFAULT_COLORS = [
    "#2e7d32", // green
    "#fbc02d", // yellow
    "#c62828", // red
];

export const TorusGauge: React.FC<TorusGaugeProps> = ({
    value,
    lowerThreshold = 30,
    upperThreshold = 70,
    colors,
    backgroundColor = "#e5e7eb",
    size = 140,
    thickness = 18,
    scale = 1.0,
    label,
    duration = 1.1,
    demoMode = false,
}) => {
    // State
    const [demoValue, setDemoValue] = useState(0);

    // Set the safeValue
    const safeValue = demoMode ? demoValue : value;

    // Math helpers
    const pct = Math.max(0, Math.min(100, safeValue));
    const radius = (size - thickness) / 2;
    const circumference = 2 * Math.PI * radius;

    // Use props colors or DEFAULTS
    const bandColors = colors && colors.length === 3 ? colors : DEFAULT_COLORS;

    // Animated value using Framer Motion
    const animated = useMotionValue(0);

    // function to randomly update the state value of demoValue 0-100
    const updatedemoValue = () => {
        const randomValue = Math.floor(Math.random() * 101);
        setDemoValue(randomValue);
    };

    // useEffect to update the demoValue every 10 seconds
    useEffect(() => {
        const interval = setInterval(updatedemoValue, Math.floor(Math.random() * 10000) + 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        animate(animated, pct, { duration, ease: "easeInOut" });
    }, [pct, animated, duration]);

    // Get current animated percent each frame
    const [animatedPct, setAnimatedPct] = React.useState(0);
    useAnimationFrame(() => {
        setAnimatedPct(animated.get());
    });

    // For SVG, 0 is at 3 o’clock; rotate -90° to start at top
    const dash = circumference * (1 - animatedPct / 100);

    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="block"
            style={{ 
                display: "inline-block", 
                transform: `scale(${scale})`,
                marginLeft: "auto",
                marginRight: "auto", 
            }}
        >
            {/* Background ring */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={backgroundColor}
                strokeWidth={thickness}
                fill="none"
            />
            {/* Foreground ring (progress) */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={safeValue < lowerThreshold ? bandColors[2] : safeValue < upperThreshold ? bandColors[1] : bandColors[0]}
                strokeWidth={thickness}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={dash}
                strokeLinecap="round"
                style={{
                    transition: "stroke 0.2s"
                }}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
            {/* Centered label */}
            <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize={size * 0.23}
                fontWeight={500}
                fill="#434343"
                className="dark:fill-gray-100"
                style={{ userSelect: "none" }}
            >
                {label
                    ? typeof label === "function"
                        ? label(animatedPct)
                        : label
                    : `${Math.round(animatedPct)}%`}
            </text>
        </svg>
    );
};

export default TorusGauge;
