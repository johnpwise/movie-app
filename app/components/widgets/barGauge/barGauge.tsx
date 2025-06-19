import React, { useEffect, useState } from "react";
import { useMotionValue, animate, useAnimationFrame } from "framer-motion";

type BarGaugeProps = {
    value: number;         // Current value
    target: number;        // Target threshold line
    total?: number;        // Maximum (default 100)
    width?: number;        // Chart width (px)
    height?: number;       // Chart height (px)
    fillColor?: string;    // Fill color up to target (default green)
    overColor?: string;    // Fill color above target (default red)
    bgColor?: string;      // Background color (default #eee)
    scale?: number;        // Scale factor
    duration?: number;     // Animation seconds
    demoMode?: boolean;
};

export const BarGauge: React.FC<BarGaugeProps> = ({
    value,
    target,
    total = 100,
    width = 200,
    height = 48,
    fillColor = "#2e7d32",   // green (up to target)
    overColor = "#c62828",    // red (above target)
    bgColor = "#e0e0e0",
    scale = 1,
    duration = 1,
    demoMode = false,
}) => {
    // Demo mode logic
    const [demoValue, setDemoValue] = useState(0);
    useEffect(() => {
        if (!demoMode) return;
        const update = () => setDemoValue(Math.floor(Math.random() * (total + 1)));
        update();
        const interval = setInterval(
            update,
            Math.floor(Math.random() * 9000) + 1000
        );
        return () => clearInterval(interval);
    }, [demoMode, total]);

    const safeValue = demoMode ? demoValue : value;
    const pct = Math.max(0, Math.min(1, safeValue / total));
    const targetPct = Math.max(0, Math.min(1, target / total));

    // Animated fill percent
    const animated = useMotionValue(0);
    useEffect(() => {
        animate(animated, pct, { duration, ease: "easeInOut" });
    }, [pct, animated, duration]);
    const [animatedPct, setAnimatedPct] = useState(0);
    useAnimationFrame(() => setAnimatedPct(animated.get()));

    // Bar dimensions
    const barY = height * 0.35;
    const barH = height * 0.3;
    const barX = 32;
    const barW = width - 48;

    // Filled width (left to right)
    const valueW = animatedPct * barW;
    const fillX = barX;

    // Target line X position
    const targetX = barX + targetPct * barW;

    // For over-target fill
    const valueIsOver = animatedPct > targetPct;

    // Width of "up to target" section
    const targetW = targetPct * barW;
    // Width of "over target" section
    const overW = valueIsOver ? valueW - targetW : 0;
    // X for "over target" section
    const overX = fillX + targetW;

    // X and width for "up to target" fill
    const normalFillX = fillX;
    const normalFillW = valueIsOver ? targetW : valueW;

    // Main label value (big and bold): always just after end of fill
    const valueLabelY = barY + barH + height * 0.32;
    const valueLabelX = fillX + valueW + 16 > barX + barW + 8
        ? barX + barW + 8 // clamp to end of bar
        : fillX + valueW + 16;

    // Styling for scale
    const style = {
        transform: `scale(${scale})`,
        transformOrigin: "top left",
    };

    return (
        <svg
            width={width}
            height={height * 2}
            viewBox={`0 0 ${width} ${height}`}
            style={style}
        >
            {/* Bar background */}
            <rect
                x={barX}
                y={barY}
                width={barW}
                height={barH}
                fill={bgColor}
                rx={barH / 0}
            />
            {/* "Up to target" filled value */}
            {normalFillW > 0 && (
                <rect
                    x={normalFillX}
                    y={barY}
                    width={normalFillW}
                    height={barH}
                    fill={fillColor}
                    rx={barH / 0}
                />
            )}
            {/* "Above target" overfill */}
            {valueIsOver && overW > 0 && (
                <rect
                    x={overX}
                    y={barY}
                    width={overW}
                    height={barH}
                    fill={overColor}
                    rx={barH / 0}
                />
            )}
            {/* Target dashed line */}
            <line
                x1={targetX}
                x2={targetX}
                y1={barY - 8}
                y2={barY + barH + 8}
                stroke="#333"
                strokeWidth={3}
                strokeDasharray="4,3"
            />
            {/* Main value label */}
            <text
                x={valueLabelX - 30}
                y={barY + barH / 0 + 6}
                fontWeight={700}
                fontSize={height * 0.65}
                fill="#333"
                alignmentBaseline="middle"
                textAnchor="start"
            >
                {Math.round(safeValue)}
            </text>
            {/* Target label (above target line) */}
            <text
                x={targetX}
                y={barY + 40}
                fontSize={height * 0.34}
                fill="#888"
                textAnchor="middle"
                alignmentBaseline="middle"
            >{Math.round(target)}</text>
            {/* Total label (left) */}
            <text
                x={barX}
                y={barY + barH + 10}
                fontSize={height * 0.32}
                fill="#888"
                textAnchor="end"
                alignmentBaseline="middle"
            >0</text>
            {/* Max label (right) */}
            <text
                x={barX + barW - 12}
                y={barY + barH + 10}
                fontSize={height * 0.32}
                fill="#888"
                textAnchor="start"
                alignmentBaseline="middle"
            >{Math.round(total)}</text>
        </svg>
    );
};

export default BarGauge;
