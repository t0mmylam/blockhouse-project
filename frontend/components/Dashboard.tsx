// components/Dashboard.tsx

'use client';

import React, { useState, useEffect } from 'react';
import PieChart from './PieChart';
import BarChart from './BarChart';
import LineChart from './LineChart';
import CandlestickChart from './CandlestickChart';

const Dashboard: React.FC = () => {
  const [chartData, setChartData] = useState({
    pie: null,
    bar: null,
    line: null,
    candlestick: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pieData, barData, lineData, candlestickData] = await Promise.all([
          fetch('http://localhost:8000/api/pie-chart-data/').then(res => res.json()),
          fetch('http://localhost:8000/api/bar-chart-data/').then(res => res.json()),
          fetch('http://localhost:8000/api/line-chart-data/').then(res => res.json()),
          fetch('http://localhost:8000/api/candlestick-data/').then(res => res.json()),
        ]);
        setChartData({
          pie: pieData,
          bar: barData,
          line: lineData,
          candlestick: candlestickData,
        });
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchData();
  }, []);

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
          <CandlestickChart data={chartData.candlestick.data} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;