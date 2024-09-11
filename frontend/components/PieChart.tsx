import React from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, TooltipProps } from 'recharts';

// Define interfaces for data structures
interface PieChartData {
    labels: string[];
    data: number[];
}

interface PieChartProps {
    data: PieChartData;
}

interface ChartDataPoint {
    name: string;
    value: number;
    color: string;
}

// Hard-coded color map
const COLOR_MAP: { [key: string]: string } = {
    "Red": "#FF6B6B",     // Lighter shade of red
    "Blue": "#4D96FF",    // Lighter shade of blue
    "Yellow": "#FFD93D",  // Lighter shade of yellow
    "Green": "#6BCB77",   // Lighter shade of green
    "Purple": "#B39DDB",  // Lighter shade of purple
    "Orange": "#FFA500",  // Orange
    "Pink": "#FF69B4",    // Hot Pink
    "Cyan": "#00CED1",    // Dark Turquoise
    "Lime": "#32CD32",    // Lime Green
    "Brown": "#A52A2A",   // Brown
};

// Default color for any label not in the map
const DEFAULT_COLOR = "#CCCCCC";  // Light gray

/**
 * PieChart component for rendering a pie chart
 * @param {PieChartProps} props - The properties for the chart
 */
const PieChart: React.FC<PieChartProps> = ({ data }) => {
    /**
     * Prepares the data for the PieChart
     * @param {PieChartData} rawData - The raw pie chart data
     * @returns {ChartDataPoint[]} The prepared data for the chart
     */
    const prepareChartData = (rawData: PieChartData): ChartDataPoint[] => {
        return rawData.labels.map((label, index) => ({
            name: label,
            value: rawData.data[index],
            color: COLOR_MAP[label] || DEFAULT_COLOR,
        }));
    };

    const chartData = prepareChartData(data);

    /**
     * Custom label for pie slices
     * @param {Object} props - The label properties
     * @returns {string} The formatted label
     */
    const renderCustomLabel = ({ name, percent }: { name: string; percent: number }): string => 
        `${name} ${(percent * 100).toFixed(0)}%`;

    /**
     * Custom tooltip content
     * @param {TooltipProps<number, string>} props - The tooltip properties
     * @returns {React.ReactNode} The tooltip content
     */
    const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload as ChartDataPoint;
            const total = chartData.reduce((sum, item) => sum + item.value, 0);
            const percentage = ((data.value / total) * 100).toFixed(2);
            return (
                <div className="bg-white p-2 border border-gray-300 shadow-md">
                    <p className="font-bold">{data.name}</p>
                    <p>{`Value: ${data.value}`}</p>
                    <p>{`Percentage: ${percentage}%`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full h-[400px] flex flex-col items-center justify-center">
            <h3 className="text-xl font-semibold mb-4 text-center">
                Pie Chart
            </h3>
            <div className="w-full h-[300px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius="80%"
                            fill="#8884d8"
                            dataKey="value"
                            label={renderCustomLabel}
                        >
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.color}
                                />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                    </RechartsPieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PieChart;