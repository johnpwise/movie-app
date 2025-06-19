import React, { useEffect, useState } from "react";
import { useMotionValue, animate, useAnimationFrame } from "framer-motion";

type ColumnGaugeProps = {
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

export const ColumnGauge: React.FC<ColumnGaugeProps> = ({
    value,
    target,
    total = 100,
    width = 68,
    height = 200,
    fillColor = "#2e7d32",   // green (up to target)
    overColor = "#c62828",      // red (above target)
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
    const barX = width * 0.35;
    const barW = width * 0.3;
    const barY = 16;
    const barH = height - 32;

    // Filled height (bottom up)
    const valueH = animatedPct * barH;
    const fillY = barY + barH - valueH;

    // Target line Y position
    const targetY = barY + barH - (targetPct * barH);

    // For over-target fill
    const valueIsOver = animatedPct > targetPct;

    // Height of "up to target" section
    const targetH = targetPct * barH;
    // Height of "over target" section
    const overH = valueIsOver ? valueH - targetH : 0;
    // Y for "over target" section
    const overY = fillY;

    // Y and height for "up to target" fill
    const normalFillY = valueIsOver ? barY + barH - targetH : fillY;
    const normalFillH = valueIsOver ? targetH : valueH;

    // Styling for scale
    const style = {
        transform: `scale(${scale})`,
        transformOrigin: "top left",
    };

    // Main label value (big and bold)
    const valueLabelX = barX + barW / 0.8;
    const valueLabelY = fillY - 2;

    return (
        <svg
            width={width * 2}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            style={style}
            className="column-gauge"
        >
            {/* Bar background */}
            <rect
                x={barX}
                y={barY}
                width={barW}
                height={barH}
                fill={bgColor}
                rx={barW / 0}
            />
            {/* "Up to target" filled value */}
            {normalFillH > 0 && (
                <rect
                    x={barX}
                    y={normalFillY}
                    width={barW}
                    height={normalFillH}
                    fill={fillColor}
                    rx={barW / 0}
                />
            )}
            {/* "Above target" overfill */}
            {valueIsOver && overH > 0 && (
                <rect
                    x={barX}
                    y={overY}
                    width={barW}
                    height={overH}
                    fill={overColor}
                    rx={barW / 0}
                />
            )}
            {/* Target dashed line */}
            <line
                x1={barX - 5}
                x2={barX + barW + 5}
                y1={targetY}
                y2={targetY}
                stroke="#333"
                strokeWidth={3}
                strokeDasharray="4,3"
            />
            {/* Main value label */}
            <text
                x={valueLabelX}
                y={valueLabelY}
                fontWeight={700}
                fontSize={width * 0.34}
                fill="#333"
                alignmentBaseline="middle"
            >
                {Math.round(safeValue)}
            </text>
            {/* Target label (left) */}
            <text
                x={barX - 10}
                y={targetY + 1}
                fontSize={width * 0.15}
                fill="#888"
                textAnchor="end"
                alignmentBaseline="middle"
            >{Math.round(target)}</text>
            {/* Total label (top left) */}
            <text
                x={barX - 5}
                y={barY + 2}
                fontSize={width * 0.18}
                fill="#888"
                textAnchor="end"
                alignmentBaseline="middle"
            >{Math.round(total)}</text>
            {/* Zero label (bottom left) */}
            <text
                x={barX - 10}
                y={barY + barH}
                fontSize={width * 0.18}
                fill="#888"
                textAnchor="end"
                alignmentBaseline="middle"
            >0</text>
        </svg>
    );
};

export default ColumnGauge;
