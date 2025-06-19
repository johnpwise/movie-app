import React, { useEffect, useState } from "react";
import { useMotionValue, animate, useAnimationFrame } from "framer-motion";

// CSS
import "./arcGauge.css"; // Import your CSS styles for the gauge

type ArcGaugeProps = {
    value: number; // 0-100
    size?: number; // px (diameter)
    thickness?: number; // px
    scale?: number; // scale factor for the gauge
    color?: string; // arc color (hex)
    backgroundColor?: string; // unfilled arc color
    label?: string | ((val: number) => React.ReactNode);
    duration?: number; // animation seconds
    demoMode?: boolean;
};

export const ArcGauge: React.FC<ArcGaugeProps> = ({
    value,
    size = 200,
    thickness = 48,
    scale = 1.0,
    color = "#42a5f5", // blue
    backgroundColor = "#e0e0e0",
    label,
    duration = 1,
    demoMode = false,
}) => {
    // Add demo value state
    const [demoValue, setDemoValue] = useState(0);

    // Update demoValue every 1-10s if demoMode is true
    useEffect(() => {
        if (!demoMode) return;
        const updatedemoValue = () => setDemoValue(Math.floor(Math.random() * 101));
        updatedemoValue(); // Show first random value immediately
        const interval = setInterval(
            updatedemoValue,
            Math.floor(Math.random() * 30000) + 1000 // 1–10s
        );
        return () => clearInterval(interval);
    }, [demoMode]);

    // Use demoValue or actual value
    const safeValue = demoMode ? demoValue : value;
    const pct = Math.max(0, Math.min(100, safeValue));
    const radius = (size - thickness) / 2;
    const cx = size / 2;
    const cy = size / 2;
    const circumference = Math.PI * radius;

    // Animated fill percent (framer-motion)
    const animated = useMotionValue(0);
    useEffect(() => {
        animate(animated, pct, { duration, ease: "easeInOut" });
    }, [pct, animated, duration]);
    const [animatedPct, setAnimatedPct] = useState(0);
    useAnimationFrame(() => setAnimatedPct(animated.get()));

    // Arc dash math: full arc is 180°, so use half the circle circumference
    const arcLen = Math.PI * radius;
    const filledLen = (animatedPct / 100) * arcLen;
    // const emptyLen = arcLen - filledLen;

    // Center label y
    const labelY = cy + thickness * 0.3;

    return (
        <svg width={size} height={size / 1} 
             viewBox={`0 0 ${size} ${size / 1}`}
             className="semi-circular-gauge"
             style={{transform: `scale(${scale}) translateY(${size * 0.5}px)`,}}>
            {/* Background semi-arc */}
            <circle
                cx={cx}
                cy={cy}
                r={radius}
                fill="none"
                stroke={backgroundColor}
                strokeWidth={thickness}
                strokeDasharray={`${arcLen} ${circumference}`}
                strokeDashoffset={0}
                strokeLinecap="butt"
                transform={`rotate(-180 ${cx} ${cy})`}
            />
            {/* Foreground (value) semi-arc */}
            <circle
                cx={cx}
                cy={cy}
                r={radius}
                fill="none"
                stroke={color}
                strokeWidth={thickness}
                strokeDasharray={`${filledLen} ${arcLen - filledLen + circumference}`}
                strokeDashoffset={0}
                strokeLinecap="butt"
                transform={`rotate(-180 ${cx} ${cy})`}
            />
            {/* Center label */}
            <text
                x={cx}
                y={labelY}
                fontSize={size * 0.15}
                textAnchor="middle"
                dominantBaseline="top"
                fontWeight={600}
                fill="#222"
                className="dark:fill-pink-100"
                style={{ userSelect: "none" }}
            >
                {label
                    ? typeof label === "function"
                        ? label(parseFloat(animatedPct.toFixed(1)))
                        : label
                    : `${animatedPct.toFixed(1)}%`}
            </text>
            {/* 0% and 100% axis labels */}
            <text
                x={thickness / 4 + 4}
                y={cy + radius * 0.3}
                textAnchor="start"
                fontSize={size * 0.085}
                fill="#888"
                className="dark:fill-gray-400"
            >0</text>
            <text
                x={size - thickness / 4}
                y={cy + radius * 0.3}
                textAnchor="end"
                fontSize={size * 0.085}
                fill="#888"
                className="dark:fill-gray-400"
            >100</text>
        </svg>
    );
};

export default ArcGauge;
