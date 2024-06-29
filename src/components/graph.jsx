import { Line, CartesianGrid, XAxis, YAxis, Tooltip, Area, Legend, ComposedChart, ResponsiveContainer, LabelList } from 'recharts';
import React, { useState, useRef, useEffect } from 'react';
import { Ring } from '@/components/ring';

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

const VULGA = {
    'Puissance maximale': {
        objectif: `L'objectif de rendement optimal pour une étude de panneaux solaires vise à maximiser l'efficacité de la conversion 
        de l'énergie solaire en électricité. Il s'agit d'optimiser l'orientation et l'inclinaison des panneaux pour capter 
        le maximum de rayonnement solaire tout au long de l'année.`
    },
    'Amortissement le plus rapide': {
        objectif: `Pour l'amortissement, l'objectif est de réduire le temps nécessaire pour que l'investissement initial dans les 
        panneaux solaires soit compensé par les économies réalisées sur les factures d'électricité. Cela implique une 
        analyse détaillée des coûts, des subventions disponibles, et de l'efficacité énergétique pour assurer une 
        rentabilité maximale du projet à moyen et long terme.`
    },
    '100% autoconsommation': {
        objectif: `C’est quand tu consomme tout ce que tes panneaux produisent. Du coup faut chercher la puissance maximale qui te permet d’avoir 100% d’AC (il faut la puissance max pour taux_AC > 99%).`
    },
    'BEPOS': {
        objectif: `Concernant l'indépendance énergétique, l'ambition est de minimiser la dépendance aux réseaux 
        énergétiques traditionnels en favorisant l'autoproduction et l'autoconsommation d'électricité solaire. 
        Cela passe par une conception systémique incluant le stockage de l'énergie et la gestion intelligente de la 
        production et de la consommation, visant une autonomie énergétique maximale et un impact environnemental réduit.`
    },
    'Bénéfices les plus importants': {
        objectif: `Il s'agit de maximiser les bénéfices totaux sur une période de 20 ans.`
    },
    'Le plus rentable': {
        objectif: `Le TRI va te dire quelle inflation tu peux supporter chaque année pour que ça soit rentable, donc il faut maximiser le TRI.`
    }
};

export function Graph({ data }) {
    const scenarios = [
        {
            name: 'Puissance maximale',
            puissance: data.scenarios.puissance_max,
            percentage: 100, // Assuming it's always 100% for the max puissance
            indicateurs: []
        },
        {
            name: 'Amortissement le plus rapide',
            puissance: data.scenarios.amortissement_rapide,
            percentage: 100, // Example percentage
            indicateurs: []
        },
        {
            name: '100% autoconsommation',
            puissance: data.scenarios.autoconso_100 || 0, // Handle undefined
            percentage: 100, // Example percentage
            indicateurs: []
        },
        {
            name: 'BEPOS',
            puissance: data.scenarios.bepos || 0, // Handle undefined
            percentage: 100, // Example percentage
            indicateurs: []
        },
        {
            name: 'Bénéfices les plus importants',
            puissance: data.scenarios.benefices_max,
            percentage: 100, // Example percentage
            indicateurs: []
        },
        {
            name: 'Le plus rentable',
            puissance: data.scenarios.rentable,
            percentage: 100, // Example percentage
            indicateurs: []
        }
    ];

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
            coordRef.current = { x, y };
        }
        return null;
    };

    const highlightedData = data.points_simu.find(point => point.puissance === highlightedPuissance);

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
                    <div className='duration-300 ease-in-out overflow-hidden relative p-4 pt-[1rem] border rounded-lg h-full'>
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
                        {highlightedData && Object.entries(highlightedData).map(([key, value], index) => {
                            if (key === 'puissance') return null;
                            const unit = key === 'bilan_20_ans' ? 'k€' : key === 'tri' ? 'ans' : key === 'autoconso' || key === 'autoprod' ? 'kWh' : '';
                            const percentage = (value / Math.max(...data.points_simu.map(d => d[key]))) * 100;
                            return (
                                <span key={index} className="font-secondary">
                                    {`${key.charAt(0).toUpperCase() + key.slice(1)}`} {`: `}
                                    <span className='text-secondary'>
                                        {value} {unit}
                                    </span>
                                    <div className="w-full h-[16px] bg-secondary my-2 rounded-full overflow-hidden">
                                        <div style={{ width: `${percentage}%` }} className="relative h-full bg-primary duration-700 ease-in-out" />
                                    </div>
                                </span>
                            );
                        })}
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
                            data={data.points_simu}
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
                                name="Temps d'amortissement"
                                stroke="#1b0138"
                                strokeWidth={3}
                                isAnimationActive={false}>
                                <LabelList dataKey="puissance" content={<CustomizedLabel />} />
                            </Line>
                            <Area type="bump" dataKey="autoconso" name="Auto-consommation" stroke="#8884d8" strokeOpacity={0.5} fillOpacity={0.8} fill="url(#colorAc)" activeDot={{ r: 0 }} />
                            <Area type="monotone" dataKey="autoprod" name="Auto-production" stroke="#82ca9d" strokeOpacity={0.5} fillOpacity={0.8} fill="url(#colorAp)" activeDot={{ r: 0 }} />
                            <Legend align="center" verticalAlign='top' layout='horizontal' wrapperStyle={{ paddingLeft: "12px", }} />
                            <Tooltip content={<CustomTooltip />} cursor={false} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div >
        </div >
    );
};
