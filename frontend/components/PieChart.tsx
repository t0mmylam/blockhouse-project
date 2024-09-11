import React from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PieChartData {
    labels: string[];
    data: number[];
}

interface PieChartProps {
    data: PieChartData;
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

const PieChart: React.FC<PieChartProps> = ({ data }) => {
    const chartData = data.labels.map((label, index) => ({
        name: label,
        value: data.data[index],
        color: COLOR_MAP[label] || DEFAULT_COLOR,
    }));

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
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.color}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                    </RechartsPieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PieChart;