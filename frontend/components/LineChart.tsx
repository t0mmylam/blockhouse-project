import React from "react";
import {
    LineChart as RechartsLineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    TooltipProps,
} from "recharts";

// Define interfaces for data structures
interface LineChartData {
    labels: string[];
    data: number[];
}

interface LineChartProps {
    data: LineChartData;
}

interface ChartDataPoint {
    name: string;
    value: number;
}

/**
 * LineChart component for rendering a line chart
 * @param {LineChartProps} props - The properties for the chart
 */
const LineChart: React.FC<LineChartProps> = ({ data }) => {
    /**
     * Prepares the data for the LineChart
     * @param {LineChartData} rawData - The raw line chart data
     * @returns {ChartDataPoint[]} The prepared data for the chart
     */
    const prepareChartData = (rawData: LineChartData): ChartDataPoint[] => {
        return rawData.labels.map((label, index) => ({
            name: label,
            value: rawData.data[index],
        }));
    };

    const chartData = prepareChartData(data);

    /**
     * Custom tooltip content
     * @param {TooltipProps<number, string>} props - The tooltip properties
     * @returns {React.ReactNode} The tooltip content
     */
    const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-2 border border-gray-300 shadow-md">
                    <p className="font-bold">{`${label}`}</p>
                    <p>{`Value: ${payload[0].value}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full h-[400px]">
            <h3 className="text-xl font-semibold mb-4 text-center">
                Line Chart
            </h3>
            <ResponsiveContainer width="90%" height="90%">
                <RechartsLineChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                        dataKey="name" 
                        tick={{ fill: '#666', fontSize: 12 }}
                    />
                    <YAxis 
                        tick={{ fill: '#666', fontSize: 12 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#8884d8" 
                        strokeWidth={2}
                        dot={{ fill: '#8884d8', r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                </RechartsLineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default LineChart;