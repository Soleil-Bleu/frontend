import { Line, CartesianGrid, XAxis, YAxis, Tooltip, Area, Legend, ComposedChart, ResponsiveContainer, LabelList } from 'recharts';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Ring } from '@/components/ring';

const data = [
    { puissance: 50, amortissement: 26, ac: 37, ap: 8, },
    { puissance: 100, amortissement: 20, ac: 26, ap: 9, },
    { puissance: 150, amortissement: 14, ac: 16, ap: 10, },
    { puissance: 200, amortissement: 10, ac: 13, ap: 12, },
    { puissance: 250, amortissement: 8, ac: 12, ap: 15, },
    { puissance: 300, amortissement: 9, ac: 11, ap: 19, },
    { puissance: 350, amortissement: 13, ac: 10, ap: 24, },
    { puissance: 400, amortissement: 18, ac: 8, ap: 30, },
    { puissance: 450, amortissement: 26, ac: 7, ap: 38, },
];

const scenarios = [
    {
        name: 'Rendement',
        puissance: 200,
        percentage: 30,
        indicateurs: [
            {
                title: 'Auto-consommation',
                percentage: 56,
                value: 34,
                unit: 'kWh'
            },
            {
                title: 'Auto-production',
                percentage: 36,
                value: 24,
                unit: 'kWh'
            },
            {
                title: 'AMMO',
                percentage: 86,
                value: 94,
                unit: 'joules'
            },
            {
                title: 'TRI',
                percentage: 16,
                value: 4,
                unit: 'ans'
            },
            {
                title: 'Bénéfices totaux',
                percentage: 80,
                value: 45,
                unit: 'k€'
            },
            {
                title: 'Investissement',
                percentage: 26,
                value: 14,
                unit: 'k€'
            }
        ]
    },
    {
        name: 'Amortissement',
        puissance: 300,
        percentage: 60,
        indicateurs: [
            {
                title: 'Auto-consommation',
                percentage: 50,
                value: 49,
                unit: 'kWh'
            },
            {
                title: 'Auto-production',
                percentage: 60,
                value: 45,
                unit: 'kWh'
            },
            {
                title: 'AMMO',
                percentage: 68,
                value: 48,
                unit: 'joules'
            },
            {
                title: 'TRI',
                percentage: 61,
                value: 6,
                unit: 'ans'
            },
            {
                title: 'Bénéfices totaux',
                percentage: 89,
                value: 54,
                unit: 'k€'
            },
            {
                title: 'Investissement',
                percentage: 86,
                value: 1,
                unit: 'k€'
            }
        ]
    },
    {
        name: 'Indépendance',
        puissance: 400,
        percentage: 70,
        indicateurs: [
            {
                title: 'Auto-consommation',
                percentage: 56,
                value: 49,
                unit: 'kWh'
            },
            {
                title: 'Auto-production',
                percentage: 96,
                value: 4,
                unit: 'kWh'
            },
            {
                title: 'AMMO',
                percentage: 76,
                value: 4,
                unit: 'joules'
            },
            {
                title: 'TRI',
                percentage: 96,
                value: 4,
                unit: 'ans'
            },
            {
                title: 'Bénéfices totaux',
                percentage: 48,
                value: 45,
                unit: 'k€'
            },
            {
                title: 'Investissement',
                percentage: 63,
                value: 14,
                unit: 'k€'
            }
        ]
    }
]

const VULGA = {
    'Rendement':
    {
        objectif: `
        L'objectif de rendement optimal pour une étude de panneaux solaires vise à maximiser l'efficacité de la conversion 
        de l'énergie solaire en électricité. Il s'agit d'optimiser l'orientation et l'inclinaison des panneaux pour capter 
        le maximum de rayonnement solaire tout au long de l'année.`
    },
    'Amortissement':
    {
        objectif: `
        Pour l'amortissement, l'objectif est de réduire le temps nécessaire pour que l'investissement initial dans les 
        panneaux solaires soit compensé par les économies réalisées sur les factures d'électricité. Cela implique une 
        analyse détaillée des coûts, des subventions disponibles, et de l'efficacité énergétique pour assurer une 
        rentabilité maximale du projet à moyen et long terme.`
    },
    'Indépendance':
    {
        objectif: `Concernant l'indépendance énergétique, l'ambition est de minimiser la dépendance aux réseaux 
        énergétiques traditionnels en favorisant l'autoproduction et l'autoconsommation d'électricité solaire. 
        Cela passe par une conception systémique incluant le stockage de l'énergie et la gestion intelligente de la 
        production et de la consommation, visant une autonomie énergétique maximale et un impact environnemental réduit.`
    }

}

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-background p-4 rounded-lg border font-secondary text-primary">
                <p>{`Puissance : `}<b className='font-semibold'>{label}</b> {`kWh`}</p>
                <p>{`Amorti en : `}<b className='font-semibold'>{payload[0].value}</b> {`ans`}</p>
            </div>
        );
    }

    return null;
};


export function Graph() {
    const [highlightedPuissance, setHighlightedPuissance] = useState(scenarios[0].puissance);
    const [scenarioIndex, setScenarioIndex] = useState(0);
    const [coordScenario, setCoordScenario] = useState({ x: null, y: null });
    const [coordsReady, setCoordsReady] = useState(false);
    const coordRef = useRef({ x: 0, y: 0 });
    const contentRef = useRef(null);
    const [contentHeight, setContentHeight] = useState('auto');

    const useAnimatedNumber = (targetNumber, duration = 600) => {
        const [displayNumber, setDisplayNumber] = useState(targetNumber);

        useEffect(() => {
            const diff = targetNumber - displayNumber;
            const step = 10 * Math.round((targetNumber - displayNumber) / Math.abs(targetNumber - displayNumber));
            const totalFrames = Math.abs(Math.round(diff / step));
            const frameDuration = Math.round(duration / totalFrames);

            if (diff === 0) return;

            const interval = setInterval(() => {
                setDisplayNumber((prevNumber) => {
                    const updatedNumber = prevNumber + step;
                    if ((step > 0 && updatedNumber >= targetNumber) || (step < 0 && updatedNumber <= targetNumber)) {
                        clearInterval(interval);
                        return targetNumber;
                    }
                    return updatedNumber;
                });
            }, frameDuration);

            return () => clearInterval(interval);
        }, [targetNumber, duration]);

        return displayNumber;
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setCoordScenario({ ...coordRef.current });
            setCoordsReady(true);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [highlightedPuissance]);

    useEffect(() => {
        if (contentRef.current) {
            const currentHeight = contentRef.current.getBoundingClientRect().height;
            setContentHeight(`${currentHeight}px`);
        }
    }, [scenarioIndex]);

    const CustomizedLabel = (props) => {
        const { x, y, value } = props;
        if (value === highlightedPuissance) {

            console.log(x, y);

            coordRef.current = { x, y };
        }
        return null;
    };


    return (
        <div className='w-screen flex flex-col items-center justify-center p-8'>
            <div className='flex justify-between w-full'>
                {scenarios.map((scenario, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setHighlightedPuissance(scenario.puissance);
                            setScenarioIndex(index);
                        }}
                        className={`flex-grow font-secondary p-4 rounded-t-lg ${scenarioIndex === index ? 'border-t border-l border-r text-primary font-semibold bg-background' : 'border text-primary/80 bg-secondary/20'}`}>
                        {scenario.name}
                    </button>
                ))}
            </div>


            <div className='w-full h-full border border-t-transparent grid grid-cols-3 justify-center rounded-b-lg'>
                <div className='m-8 flex flex-col col-span-2'>
                    <div className=' relative z-10 translate-y-1/2 left-4 text-primary text-lg bg-background px-2 w-fit'>
                        Objectif : {scenarios[scenarioIndex].name}
                    </div>
                    <div className='duration-300 ease-in-out overflow-hidden relative p-4 pt-[1rem] border rounded-lg h-full'> {/* style={{ height: `calc(${contentHeight} + 2rem)` }}> */}

                        <span className='text-secondary-foreground font-secondary' ref={contentRef}>
                            {VULGA[scenarios[scenarioIndex].name].objectif}
                        </span>
                    </div>
                </div>
                <div className='m-8 flex flex-col col-span-1'>
                    <div className=' relative z-10 translate-y-1/2 left-4 text-primary text-lg bg-background px-2 w-fit'>
                        Puissance à installer
                    </div>
                    <div className='duration-300 ease-in-out h-full relative p-6 border rounded-lg flex flex-col items-center justify-center'>
                        <Ring progress={scenarios[scenarioIndex].percentage} />
                        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center'>
                            <span className='text-secondary-foreground font-secondary text-5xl tracking-tight'>
                                {Math.round(useAnimatedNumber(scenarios[scenarioIndex].puissance))}
                            </span>
                            <span className='text-secondary font-secondary text-lg'>kW (crête)</span>
                        </div>
                    </div>
                </div>
                <div className='m-8 flex flex-col col-span-1'>
                    <div className=' relative z-10 translate-y-1/2 left-4 text-primary text-lg bg-background px-2 w-fit'>
                        Indicateurs
                    </div>
                    <div className='flex flex-col gap-4 p-8 pt-12 duration-300 ease-in-out relative border rounded-lg'>

                        {scenarios[scenarioIndex].indicateurs.map((indicateur, index) => (
                            <span
                                key={index}
                                className="font-secondary">
                                {indicateur.title} {`: `}
                                <span className='text-secondary'>
                                    {indicateur.value} {indicateur.unit}
                                </span>
                                <div className="w-full h-[16px] bg-secondary my-2 rounded-full overflow-hidden">
                                    <div style={{ width: `${indicateur.percentage}%` }} className="relative h-full bg-primary duration-700 ease-in-out" />
                                </div>
                            </span>
                        ))}
                    </div>
                </div>
                <div className='relative w-full h-full col-span-2'>
                    <div
                        style={{
                            left: `${coordScenario.x}px`,
                            top: `${coordScenario.y}px`,
                            width: `180px`,
                            transform: 'translate(-50%, -150%)'
                        }}
                        className="absolute z-10 transition-all duration-300 ease-in-out font-secondary text-xl text-center p-2 px-4 border border-secondary rounded-lg bg-background shadow-lg"
                    >
                        {scenarios[scenarioIndex].name}
                        <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/4 bottom-0 mb-[-10px] w-3 h-3 bg-background rotate-45 border border-background"></div>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart
                            width={960}
                            height={350}
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
                            <XAxis dataKey="puissance" label={{ value: 'Puissance (kWh)', position: 'bottom', offset: 8 }} allowDuplicatedCategory={false} />
                            <YAxis label={{ value: `Temps d'amort. (années)`, position: 'insideLeft', angle: -90, style: { textAnchor: "middle" } }} />
                            <CartesianGrid strokeArray="3 3" strokeOpacity={0.3} />
                            <Line
                                type="monotone"
                                dataKey="amortissement"
                                data={data}
                                name="Temps d'amortissement"
                                stroke="#1b0138"
                                strokeWidth={3}
                                isAnimationActive={false}>

                                <LabelList dataKey="puissance" content={<CustomizedLabel />} />
                            </Line>
                            <Area type="bump" dataKey="ac" data={data} name="Auto-consommation" stroke="#8884d8" strokeOpacity={0.5} fillOpacity={0.8} fill="url(#colorAc)" activeDot={{ r: 0 }} />
                            <Area type="monotone" dataKey="ap" data={data} name="Auto-production" stroke="#82ca9d" strokeOpacity={0.5} fillOpacity={0.8} fill="url(#colorAp)" activeDot={{ r: 0 }} />
                            <Legend align="center" verticalAlign='top' layout='horizontal' wrapperStyle={{ paddingLeft: "12px", }} />
                            <Tooltip content={<CustomTooltip />} cursor={false} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div >
        </div >
    );
};