import React, { useRef } from 'react';
import { Line, CartesianGrid, XAxis, YAxis, Tooltip, Area, Legend, ComposedChart, ResponsiveContainer, LabelList } from 'recharts';
import CustomTooltip from '@/components/results/customTooltip';

const ChartContainer = ({ data, highlightedPuissance, setCoordScenario }) => {
    const coordRef = useRef({ x: 0, y: 0 });

    const CustomizedLabel = (props) => {
        const { x, y, value } = props;
        if (value === highlightedPuissance) {
            coordRef.current = { x, y };
            setTimeout(() => setCoordScenario({ ...coordRef.current }), 300);
        }
        return null;
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
                width={960}
                height={350}
                data={data}
                margin={{ top: 20, right: 24, left: 20, bottom: 48 }}
            >
                <defs>
                    <linearGradient id="colorAc" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.6} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorAp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.6} />
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="puissance" label={{ value: 'Puissance (kWc)', position: 'bottom', offset: 8 }} />
                <YAxis yAxisId="left" label={{ value: `Temps d'amort. (années)`, position: 'insideLeft', angle: -90, style: { textAnchor: "middle" } }} />
                <YAxis yAxisId="right" orientation="right" label={{ value: 'Taux (%)', position: 'insideRight', angle: -90, style: { textAnchor: "middle" } }} domain={[0, 100]} />
                <CartesianGrid strokeArray="3 3" strokeOpacity={0.3} />
                <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="amortissement"
                    name="Temps d'amortissement"
                    stroke="#1b0138"
                    strokeWidth={4}
                    isAnimationActive={true}>
                    <LabelList dataKey="puissance" content={<CustomizedLabel />} />
                </Line>
                <Area yAxisId="right" type="monotone" dataKey="autoconso" name="Auto-consommation" stroke="#8884d8" strokeOpacity={0.5} fillOpacity={0.8} fill="url(#colorAc)" activeDot={{ r: 0 }} />
                <Area yAxisId="right" type="monotone" dataKey="autoprod" name="Auto-production" stroke="#82ca9d" strokeOpacity={0.5} fillOpacity={0.8} fill="url(#colorAp)" activeDot={{ r: 0 }} />
                <Legend align="center" verticalAlign='top' layout='horizontal' wrapperStyle={{ paddingLeft: "12px", }} />
                <Tooltip content={<CustomTooltip />} cursor={true} />
            </ComposedChart>
        </ResponsiveContainer>
    );
};

export default ChartContainer;
