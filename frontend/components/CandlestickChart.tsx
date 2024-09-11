import React from "react";
import {
    ComposedChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    TooltipProps,
} from "recharts";

// Define interfaces for data structures
export interface CandlestickChartData {
    x: string;
    high: number;
    low: number;
    open: number;
    close: number;
}

export interface CandlestickChartProps {
    data: CandlestickChartData[];
}

interface CandlestickProps {
    x: number;
    y: number;
    width: number;
    height: number;
    low: number;
    high: number;
    openClose: [number, number];
}

/**
 * Candlestick component for rendering individual candlesticks
 * @param {CandlestickProps} props - The properties for the candlestick
 */
const Candlestick: React.FC<CandlestickProps> = (props) => {
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
            <path
                d={`
                    M ${x + width / 2}, ${isGrowing ? y + height : y}
                    v ${((isGrowing ? open : close) - low) * ratio}
                `}
            />
            {/* top line */}
            <path
                d={`
                    M ${x + width / 2}, ${isGrowing ? y : y + height}
                    v ${((isGrowing ? close : open) - high) * ratio}
                `}
            />
        </g>
    );
};

/**
 * Prepares the data for the CandlestickChart
 * @param {CandlestickData[]} data - The raw candlestick data
 * @returns {Array} The prepared data for the chart
 */
const prepareData = (data: CandlestickChartData[]) => {
    return data.map(({ open, close, x, ...other }) => ({
        ...other,
        x,
        openClose: [open, close],
    }));
};

/**
 * CandlestickChart component for rendering a candlestick chart
 * @param {CandlestickChartProps} props - The properties for the chart
 */
const CandlestickChart: React.FC<CandlestickChartProps> = ({ data }) => {
    const preparedData = prepareData(data);

    const minValue = Math.min(
        ...data.map((item) => Math.min(item.low, item.open, item.close))
    );
    const maxValue = Math.max(
        ...data.map((item) => Math.max(item.high, item.open, item.close))
    );

    /**
     * Formats the date string for X-axis ticks
     * @param {string} dateStr - The date string to format
     * @returns {string} The formatted date string
     */
    const formatDateTick = (dateStr: string): string => {
        const date = new Date(dateStr);
        return date.toISOString().split("T")[0]; // Returns in YYYY-MM-DD format
    };

    /**
     * Renders the tooltip content
     * @param {TooltipProps<number, string>} props - The tooltip properties
     * @returns {React.ReactNode} The tooltip content
     */
    const renderTooltip = ({ payload }: TooltipProps<number, string>): React.ReactNode => {
        if (payload && payload.length) {
            const data = payload[0].payload as CandlestickProps;
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
    };

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
                    <XAxis dataKey="x" tickFormatter={formatDateTick} />
                    <YAxis domain={[minValue, maxValue]} />
                    <Tooltip content={renderTooltip} />
                    <Bar
                        dataKey="openClose"
                        fill="#8884d8"
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        shape={(props: any) => {
                            const { x, y, width, height, payload } = props;
                            return (
                                <Candlestick
                                    x={x}
                                    y={y}
                                    width={width}
                                    height={height}
                                    low={payload.low}
                                    high={payload.high}
                                    openClose={payload.openClose}
                                />
                            );
                        }}
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CandlestickChart;