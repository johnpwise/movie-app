import React, { useMemo, useEffect, useState } from "react";
import { useMotionValue, animate, useAnimationFrame } from "framer-motion";

// CSS
import "./speedometer.css";

const arcBgClass =
    "stroke-gray-200 dark:stroke-gray-700";
const tickClass = "stroke-gray-400 dark:stroke-gray-500";
const labelClass = "fill-gray-800 dark:fill-gray-200";
const valueClass = "fill-gray-800 dark:fill-gray-200";
const gaugeTextClass = "text-gray-800 dark:text-gray-200";

type SpeedometerProps = {
    value: number;
    min?: number;
    max?: number;
    width?: number;
    height?: number;
    tickCount?: number;
    labelStep?: number;
    scale?: number;
    gaugeText?: string;
    demoMode?: boolean;
};

const Speedometer: React.FC<SpeedometerProps> = ({
    value,
    min = 0,
    max = 10,
    width = 220,
    height = 190,
    tickCount = 11, // Ticks for 0-10
    labelStep = 1,
    scale = 1.0,
    gaugeText,
    demoMode = false, // Optional prop for demo mode
}) => {
    // Arc config: start at 210°, end at 330°
    const arcStart = -110;
    const arcEnd = 110;
    const arcAngle = arcEnd - arcStart;

    // Sizing
    const cx = width / 2;
    const cy = height * 0.72;
    const r = Math.min(width, height) * 0.42;
    const needleLength = r * 1.04;

    const [demoValue, setDemoValue] = useState(0);

    // Update demoValue every 1-10s if demoMode is true
    useEffect(() => {
        if (!demoMode) return;
        const updatedemoValue = () => setDemoValue(Math.floor(Math.random() * 10) + 1);
        updatedemoValue(); // Show first random value immediately
        const interval = setInterval(
            updatedemoValue,
            Math.floor(Math.random() * 30000) + 1000 // 1–10s
        );
        return () => clearInterval(interval);
    }, [demoMode]);

    // Clamp value and calculate angle
    const clamp = (v: number) => Math.max(min, Math.min(max, v));
    const safeValue = clamp(demoMode ? demoValue : value);
    const norm = (safeValue - min) / (max - min);
    const targetAngle = arcStart + norm * arcAngle;

    // Framer Motion value and animation
    const animatedAngle = useMotionValue(arcStart);

    // Animate needle from current angle to target
    useEffect(() => {
        animate(animatedAngle, targetAngle, {
            type: "spring",
            stiffness: 120,
            damping: 14,
            mass: 0.7,
        });
    }, [targetAngle, animatedAngle]);

    // Calculate needle position each frame
    const [needleXY, setNeedleXY] = useState<[number, number]>(() => {
        const rad = ((arcStart - 90) * Math.PI) / 180;
        return [cx + needleLength * Math.cos(rad), cy + needleLength * Math.sin(rad)];
    });

    useAnimationFrame(() => {
        const currentAngle = animatedAngle.get();
        const rad = ((currentAngle - 90) * Math.PI) / 180;
        setNeedleXY([cx + needleLength * Math.cos(rad), cy + needleLength * Math.sin(rad)]);
    });

    // Helpers for arc and ticks
    const rad = (a: number) => ((a - 90) * Math.PI) / 180;
    const polar = (angle: number, radius: number) => [
        cx + radius * Math.cos(rad(angle)),
        cy + radius * Math.sin(rad(angle)),
    ];

    function describeArc(startAngle: number, endAngle: number) {
        const [startX, startY] = polar(startAngle, r);
        const [endX, endY] = polar(endAngle, r);
        const arcSweep = endAngle - startAngle <= 180 ? 0 : 1;
        return [
            "M",
            startX,
            startY,
            "A",
            r,
            r,
            0,
            arcSweep,
            1,
            endX,
            endY,
        ].join(" ");
    }

    // Ticks
    const majorTicks = useMemo(
        () =>
            Array.from({ length: tickCount }, (_, i) => {
                const tickNorm = i / (tickCount - 1);
                const angle = arcStart + tickNorm * arcAngle;
                const [x1, y1] = polar(angle, r * 0.92);
                const [x2, y2] = polar(angle, needleLength);
                const valueAtTick = Math.round(min + tickNorm * (max - min));
                return { angle, x1, y1, x2, y2, value: valueAtTick };
            }),
        [arcStart, arcAngle, tickCount, min, max, r, needleLength, cx, cy]
    );

    // Labels at each tick
    const labels = useMemo(
        () =>
            majorTicks
                .filter((_, i) => i % labelStep === 0)
                .map((tick) => {
                    const [x, y] = polar(tick.angle, r * 1.18);
                    return { ...tick, x, y };
                }),
        [majorTicks, r, labelStep, polar]
    );

    return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            className="speedometer-gauge"
            style={{ 
                transform: `scale(${scale})`,
                marginLeft: "auto",
                marginRight: "auto", 
            }}
        >
            {/* Arc background */}
            <defs>
                <linearGradient id="arc-gradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#e5e7eb" />
                    <stop offset="100%" stopColor="#d1d5db" />
                </linearGradient>
            </defs>
            <path
                d={describeArc(arcStart, arcEnd)}
                stroke="url(#arc-gradient)"
                strokeWidth={16}
                fill="none"
                className={arcBgClass}
            />

            {/* Ticks */}
            {majorTicks.map((tick, i) => (
                <line
                    key={i}
                    x1={tick.x1}
                    y1={tick.y1}
                    x2={tick.x2}
                    y2={tick.y2}
                    strokeWidth={6}
                    className={tickClass}
                    strokeLinecap="round"
                />
            ))}

            {/* Labels */}
            {labels.map((label, i) => (
                <text
                    key={i}
                    x={label.x}
                    y={label.y + 8}
                    textAnchor="middle"
                    fontSize={20}
                    fontWeight={600}
                    className={labelClass}
                >
                    {label.value}
                </text>
            ))}

            {/* Value */}
            <text
                x={cx}
                y={cy - r * 0.3}
                textAnchor="middle"
                fontWeight={700}
                fontSize={38}
                className={valueClass}
                style={{ userSelect: "none" }}
            >
                {safeValue}
            </text>

            {/* Needle */}
            <line
                x1={cx}
                y1={cy}
                x2={needleXY[0]}
                y2={needleXY[1]}
                stroke="red"
                strokeWidth={5}
                strokeLinecap="round"
            />

            {/* Needle base */}
            <circle
                cx={cx}
                cy={cy}
                r={17}
                fill="#666"
                stroke="#fff"
                strokeWidth={4}
                className="dark:fill-gray-500"
            />

            {/* Gauge text */}
            {gaugeText && (
                <text
                    x={cx}
                    y={cy + r * 0.4}
                    textAnchor="middle"
                    fontSize={20}
                    className={gaugeTextClass}
                    fontWeight={500}
                >
                    {gaugeText}
                </text>
            )}

            {/* Demo mode indicator */}
        </svg>
    );
};

export default Speedometer;
