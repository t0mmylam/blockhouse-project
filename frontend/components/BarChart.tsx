// frontend/components/BarChart.tsx

import React from "react";
import {
    BarChart as RechartsBarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

interface BarChartData {
    labels: string[];
    data: number[];
}

interface BarChartProps {
    data: BarChartData;
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
    const chartData = data.labels.map((label, index) => ({
        name: label,
        value: data.data[index],
    }));

    return (
        <div className="w-full h-[400px]">
            <h3 className="text-xl font-semibold mb-4 text-center">
                Bar Chart
            </h3>
            <ResponsiveContainer width="90%" height="90%">
                <RechartsBarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" />
                </RechartsBarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BarChart;
