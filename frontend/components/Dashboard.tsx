"use client";

import React, { useState, useEffect } from "react";
import PieChart, { PieChartData } from "./PieChart";
import BarChart, { BarChartData } from "./BarChart";
import LineChart, { LineChartData } from "./LineChart";
import CandlestickChart, { CandlestickChartData } from "./CandlestickChart";

// Define types for the chart data
interface ChartData {
    pie: PieChartData | null;
    bar: BarChartData | null;
    line: LineChartData | null;
    candlestick: CandlestickChartData[] | null;
}

/**
 * Dashboard component that fetches and displays various charts
 */
const Dashboard: React.FC = () => {
    // State to hold the chart data
    const [chartData, setChartData] = useState<ChartData>({
        pie: null,
        bar: null,
        line: null,
        candlestick: null,
    });

    // State to handle loading status
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // State to handle error messages
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const [pieData, barData, lineData, candlestickData] =
                    await Promise.all([
                        fetch("http://localhost:8000/api/pie-chart-data/").then(
                            (res) => res.json()
                        ),
                        fetch("http://localhost:8000/api/bar-chart-data/").then(
                            (res) => res.json()
                        ),
                        fetch(
                            "http://localhost:8000/api/line-chart-data/"
                        ).then((res) => res.json()),
                        fetch(
                            "http://localhost:8000/api/candlestick-data/"
                        ).then((res) => res.json()),
                    ]);

                setChartData({
                    pie: pieData,
                    bar: barData,
                    line: lineData,
                    candlestick: Array.isArray(candlestickData)
                        ? candlestickData
                        : candlestickData.data,
                });
            } catch (error) {
                console.error("Error fetching chart data:", error);
                setError("Failed to fetch chart data. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <div className="text-center py-10">Loading charts...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">{error}</div>;
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {chartData.pie && (
                <div className="bg-white shadow rounded-lg p-6">
                    <PieChart data={chartData.pie} />
                </div>
            )}
            {chartData.bar && (
                <div className="bg-white shadow rounded-lg p-6">
                    <BarChart data={chartData.bar} />
                </div>
            )}
            {chartData.line && (
                <div className="bg-white shadow rounded-lg p-6">
                    <LineChart data={chartData.line} />
                </div>
            )}
            {chartData.candlestick && (
                <div className="bg-white shadow rounded-lg p-6">
                    <CandlestickChart data={chartData.candlestick} />
                </div>
            )}
        </div>
    );
};

export default Dashboard;
