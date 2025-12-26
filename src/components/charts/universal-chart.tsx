"use client";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    RadialLinearScale,
    Title,
    Tooltip,
    Legend,
    Filler,
    ChartData,
    ChartOptions
} from "chart.js";
import { Line, Bar, Doughnut, Pie, Radar, PolarArea } from "react-chartjs-2";

interface UniversalChartProps {
    type: "line" | "bar" | "doughnut" | "pie" | "radar" | "polarArea";
    data: ChartData<any>;
    options?: ChartOptions<any>;
    className?: string;
}

export function UniversalChart({ type, data, options, className }: UniversalChartProps) {
    const defaultOptions: ChartOptions<any> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    usePointStyle: true,
                    font: { family: "Inter" },
                },
            },
            tooltip: {
                backgroundColor: "rgba(15, 23, 42, 0.9)",
                titleFont: { family: "Inter", size: 13 },
                bodyFont: { family: "Inter", size: 12 },
                padding: 10,
                cornerRadius: 4,
            },
        },
        ...options,
    };

    const ChartComponent = {
        line: Line,
        bar: Bar,
        doughnut: Doughnut,
        pie: Pie,
        radar: Radar,
        polarArea: PolarArea,
    }[type];

    return (
        <div className={className} style={{ width: "100%", height: "100%", minHeight: "300px" }}>
            <ChartComponent data={data} options={defaultOptions} />
        </div>
    );
}
