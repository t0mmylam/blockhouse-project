// frontend/components/LineChart.tsx

import React from "react";
import {
    LineChart as RechartsLineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

interface LineChartData {
    labels: string[];
    data: number[];
}

interface LineChartProps {
    data: LineChartData;
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
    const chartData = data.labels.map((label, index) => ({
        name: label,
        value: data.data[index],
    }));

    return (
        <div className="w-full h-[400px]">
            <h3 className="text-xl font-semibold mb-4 text-center">
                Line Chart
            </h3>
            <ResponsiveContainer width="90%" height="90%">
                <RechartsLineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </RechartsLineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default LineChart;
