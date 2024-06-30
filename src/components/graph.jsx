import { Line, CartesianGrid, XAxis, YAxis, Tooltip, Area, Legend, ComposedChart, ResponsiveContainer, LabelList } from 'recharts';
import React, { useState, useRef, useEffect } from 'react';
import { Ring } from '@/components/ring';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-background p-4 rounded-lg border font-secondary text-primary">
                <p>{`Puissance : `}<b className='font-semibold'>{label}</b> {`kWc`}</p>
                <p>{`Amorti en : `}<b className='font-semibold'>{payload[0].value}</b> {`ans`}</p>
            </div>
        );
    }
    return null;
};

const VULGA = {
    'Puissance max': {
        objectif: `La puissance maximale qui peut-être installé avec votre surface`
    },
    'Amortissement rapide': {
        objectif: `Voici la puissance qu'il faut que vous installiez pour un ammortissement le plus court, c'est à dire le temps nécessaire pour que l'investissement initial soit compensé par les économies réalisées sur les factures d'électricité et les gains éventuels de la revente d'éléctricité. Attention nous calculons un ammortissement brut, donc avec une inflation à 0%.`
    },
    'Autoconsommation totale': {
        objectif: `Voici la puissance maximale que vous pouvez installer en consommant 100% de l'électricité produite.`
    },
    'BEPOS': {
        objectif: `Voici la puissance minimale à installer pour que votre batiment soit BEPOS (bâtiment à énergie positive). Attention si vous consommez une autre énergie que de l'électricité (bois, gaz ...), cela ne fonctionne pas.  `
    },
    'Bénéfices totaux': {
        objectif: `Il s'agit de maximiser les bénéfices totaux sur une période de 20 ans. La durée de votre contrat avec EDF O.A qui vous achète l'éléctricité.`
    },
    'Sécurité': {
        objectif: `Le TRI permet de savoir quelle inflation votre projet peux supporter chaque année. Par exemple avec un TRI de 5%, s'il y a une inflattion de 5% chaque année pendant 20ans, vous aurez tout de même ammorti votre investissement.`
    }
};

export function Graph({ data }) {
    const maxPuissance = data.scenarios.puissance_max;
    const minPuissance = Math.min(...data.points_simu.map(point => point.puissance));
    const maxPercent = 96;

    const scenarios = [
        {
            name: 'Puissance max',
            puissance: data.scenarios.puissance_max,
            percentage: maxPercent,
            indicateurs: []
        },
        {
            name: 'Amortissement rapide',
            puissance: data.scenarios.amortissement_rapide,
            percentage: (data.scenarios.amortissement_rapide / maxPuissance) * maxPercent,
            indicateurs: []
        },
        {
            name: 'Autoconsommation totale',
            puissance: data.scenarios.autoconso_100 || minPuissance,
            percentage: data.scenarios.autoconso_100 ? (data.scenarios.autoconso_100 / maxPuissance) * maxPercent : (minPuissance / maxPuissance) * maxPercent,
            indicateurs: [],
            warning: data.scenarios.autoconso_100 ? '' : 'Non atteignable dans cette configuration : consommation inadaptée.'
        },
        {
            name: 'BEPOS',
            puissance: data.scenarios.bepos || maxPuissance,
            percentage: data.scenarios.bepos ? (data.scenarios.bepos / maxPuissance) * maxPercent : maxPercent,
            indicateurs: [],
            warning: data.scenarios.bepos ? '' : 'Non atteignable dans cette configuration : surface insuffisante.'
        },
        {
            name: 'Bénéfices totaux',
            puissance: data.scenarios.benefices_max,
            percentage: (data.scenarios.benefices_max / maxPuissance) * maxPercent,
            indicateurs: []
        },
        {
            name: 'Sécurité',
            puissance: data.scenarios.rentable,
            percentage: (data.scenarios.rentable / maxPuissance) * maxPercent,
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
        <div className='w-full bg-background flex flex-col items-center justify-center p-8'>
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
                            {scenarios[scenarioIndex].warning && (
                                <div className='text-red-500 font-bold py-2'>
                                    {scenarios[scenarioIndex].warning}
                                </div>
                            )}
                        </span>
                    </div>
                </div>
                <div className='m-8 flex flex-col col-span-1'>
                    <div className=' relative z-10 translate-y-1/2 left-4 text-primary text-lg bg-background px-2 w-fit'>
                        Puissance à installer
                    </div>
                    <div className={`duration-300 ease-in-out h-full relative p-6 border rounded-lg flex flex-col items-center justify-center ${scenarios[scenarioIndex].warning ? 'text-gray-400' : ''}`}>
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
                    <div className={`flex flex-col gap-4 p-8 pt-12 duration-300 ease-in-out relative border rounded-lg ${scenarios[scenarioIndex].warning ? 'text-gray-400' : ''}`}>
                        {highlightedData && Object.entries(highlightedData).map(([key, value], index) => {
                            if (key === 'puissance') return null;
                            const unit = key === 'bilan_20_ans' ? '€' : key === 'tri' ? '%' : key === 'autoconso' || key === 'autoprod' ? '%' : '';
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
                            <XAxis dataKey="puissance" label={{ value: 'Puissance (kWc)', position: 'bottom', offset: 8 }} allowDuplicatedCategory={false} />
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
                            <Area type="monotone" dataKey="autoconso" name="Auto-consommation" stroke="#8884d8" strokeOpacity={0.5} fillOpacity={0.8} fill="url(#colorAc)" activeDot={{ r: 0 }} />
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
