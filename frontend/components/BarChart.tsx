import React from "react";
import {
    BarChart as RechartsBarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    TooltipProps,
} from "recharts";

// Define interfaces for data structures
export interface BarChartData {
    labels: string[];
    data: number[];
}

export interface BarChartProps {
    data: BarChartData;
}

interface ChartDataPoint {
    name: string;
    value: number;
}

/**
 * BarChart component for rendering a bar chart
 * @param {BarChartProps} props - The properties for the chart
 */
const BarChart: React.FC<BarChartProps> = ({ data }) => {
    /**
     * Prepares the data for the BarChart
     * @param {BarChartData} rawData - The raw bar chart data
     * @returns {ChartDataPoint[]} The prepared data for the chart
     */
    const prepareChartData = (rawData: BarChartData): ChartDataPoint[] => {
        return rawData.labels.map((label, index) => ({
            name: label,
            value: rawData.data[index],
        }));
    };

    const chartData = prepareChartData(data);

    /**
     * Custom tooltip content
     * @param {Object} props - The tooltip properties
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
                Bar Chart
            </h3>
            <ResponsiveContainer width="90%" height="90%">
                <RechartsBarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" fill="#8884d8" />
                </RechartsBarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BarChart;
