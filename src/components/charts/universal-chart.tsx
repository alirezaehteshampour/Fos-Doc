"use client";

import 'chart.js/auto';
import type { ChartData, ChartOptions } from 'chart.js';
import { Chart } from 'react-chartjs-2';

type SupportedChart = 'line' | 'bar' | 'doughnut' | 'pie' | 'radar' | 'polarArea';

interface UniversalChartProps<T extends SupportedChart> {
    type: T;
    data: ChartData<T>;
    options?: ChartOptions<T>;
    className?: string;
}

export function UniversalChart<T extends SupportedChart>({ type, data, options, className }: UniversalChartProps<T>) {
    const defaultOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: { usePointStyle: true, font: { family: 'Inter' } },
            },
            tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                titleFont: { family: 'Inter', size: 13 },
                bodyFont: { family: 'Inter', size: 12 },
                padding: 10,
                cornerRadius: 4,
            },
        },
        ...options,
    } as ChartOptions<T>;

    return (
        <div className={className} style={{ width: '100%', height: '100%', minHeight: '300px' }}>
            <Chart<T> type={type} data={data} options={defaultOptions} />
        </div>
    );
}
