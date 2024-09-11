import React from "react";
import {
    ComposedChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface CandlestickData {
    x: string;
    high: number;
    low: number;
    open: number;
    close: number;
}

interface CandlestickChartProps {
    data: CandlestickData[];
}

// https://codesandbox.io/p/sandbox/recharts-candlesticks-8m6n8?file=%2Fsrc%2FChart.jsx%3A1%2C1-326%2C1
const Candlestick = (props: any) => {
    const {
        x,
        y,
        width,
        height,
        low,
        high,
        openClose: [open, close],
    } = props;
    const isGrowing = open < close;
    const color = isGrowing ? "green" : "red";
    const ratio = Math.abs(height / (open - close));

    return (
        <g stroke={color} fill="none" strokeWidth="2">
            <path
                d={`
          M ${x},${y}
          L ${x},${y + height}
          L ${x + width},${y + height}
          L ${x + width},${y}
          L ${x},${y}
        `}
            />
            {/* bottom line */}
            {isGrowing ? (
                <path
                    d={`
            M ${x + width / 2}, ${y + height}
            v ${(open - low) * ratio}
          `}
                />
            ) : (
                <path
                    d={`
            M ${x + width / 2}, ${y}
            v ${(close - low) * ratio}
          `}
                />
            )}
            {/* top line */}
            {isGrowing ? (
                <path
                    d={`
            M ${x + width / 2}, ${y}
            v ${(close - high) * ratio}
          `}
                />
            ) : (
                <path
                    d={`
            M ${x + width / 2}, ${y + height}
            v ${(open - high) * ratio}
          `}
                />
            )}
        </g>
    );
};

const prepareData = (data: CandlestickData[]) => {
    return data.map(({ open, close, x, ...other }) => ({
        ...other,
        x,
        openClose: [open, close],
    }));
};

const CandlestickChart: React.FC<CandlestickChartProps> = ({ data }) => {
    const preparedData = prepareData(data);

    const minValue = Math.min(
        ...data.map((item) => Math.min(item.low, item.open, item.close))
    );
    const maxValue = Math.max(
        ...data.map((item) => Math.max(item.high, item.open, item.close))
    );

    return (
        <div className="w-full h-[400px]">
            <h3 className="text-xl font-semibold mb-4 text-center">
                Candlestick Chart
            </h3>
            <ResponsiveContainer width="90%" height="90%">
                <ComposedChart
                    data={preparedData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="x"
                        tickFormatter={(dateStr) => {
                            const date = new Date(dateStr);
                            date.setDate(date.getDate() + 1);
                            return `${date.getFullYear()}-${String(
                                date.getMonth() + 1
                            ).padStart(2, "0")}-${String(
                                date.getDate()
                            ).padStart(2, "0")}`;
                        }}
                    />
                    <YAxis domain={[minValue, maxValue]} />
                    <Tooltip
                        content={({ payload, label }) => {
                            if (payload && payload.length) {
                                const data = payload[0].payload;
                                const date = new Date(data.x);
                                date.setDate(date.getDate() + 1);
                                return (
                                    <div className="bg-white p-2 border border-gray-300 shadow-md">
                                        <p className="font-bold">{`Date: ${date.toLocaleDateString()}`}</p>
                                        <p>{`Open: ${data.openClose[0]}`}</p>
                                        <p>{`High: ${data.high}`}</p>
                                        <p>{`Low: ${data.low}`}</p>
                                        <p>{`Close: ${data.openClose[1]}`}</p>
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    <Bar
                        dataKey="openClose"
                        fill="#8884d8"
                        shape={<Candlestick />}
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CandlestickChart;
