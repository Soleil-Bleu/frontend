import { Line, CartesianGrid, XAxis, YAxis, Tooltip, Area, Legend, ComposedChart, ResponsiveContainer, LabelList } from 'recharts';
import React, { useState, useRef, useEffect } from 'react';
import { Ring } from '@/components/ring';
import { Cross, Landmark, Leaf, Lightbulb, OctagonX } from 'lucide-react';

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
    'Puissance max.': {
        description: `Ce scénario maximise la puissance installable sur votre surface disponible, garantissant ainsi une production d'électricité solaire optimale.`,
        financier: `En installant la puissance maximale, vous pouvez potentiellement produire une grande quantité d'électricité, ce qui peut significativement réduire vos factures énergétiques et augmenter vos revenus si vous revendez l'excédent.`,
        environnement: `Cela permet de maximiser la contribution à la réduction des émissions de CO2 en utilisant une énergie renouvelable.`
    },
    'Amortissement rapide': {
        description: `Ce scénario vous indique la puissance à installer pour obtenir le temps d'amortissement le plus court.`,
        financier: `Cela signifie que votre investissement initial sera récupéré plus rapidement grâce aux économies sur les factures d'électricité et aux gains de la revente de l'électricité produite. Par exemple, avec un amortissement rapide, vous pourriez récupérer votre investissement en seulement quelques années, ce qui minimise les risques financiers et maximise les bénéfices à long terme.`,
        environnement: `Une récupération rapide de l'investissement permet une transition plus rapide vers une énergie durable.`
    },
    'Autoconsommation totale': {
        description: `Ce scénario vous montre la puissance maximale que vous pouvez installer tout en consommant 100% de l'électricité produite.`,
        financier: `Cela assure une indépendance énergétique totale, réduisant votre dépendance aux fournisseurs d'électricité et stabilisant vos coûts énergétiques. Financièrement, cela signifie que vous ne payez plus pour l'électricité consommée, ce qui peut représenter des économies substantielles.`,
        environnement: `Consommer toute l'énergie que vous produisez réduit les pertes de transmission et utilise efficacement l'énergie solaire.`
    },
    'BEPOS': {
        description: `Ce scénario détermine la puissance minimale à installer pour que votre bâtiment soit à énergie positive (BEPOS).`,
        financier: `Un bâtiment à énergie positive produit plus d'énergie qu'il n'en consomme, ce qui peut non seulement réduire vos factures d'électricité à zéro, mais aussi vous permettre de revendre l'excédent d'énergie. Cela représente un avantage financier significatif à long terme.`,
        environnement: `Cela signifie que votre bâtiment contribue activement à la réduction des émissions de CO2 et peut servir d'exemple de durabilité énergétique.`
    },
    'Bénéfices totaux': {
        description: `Ce scénario vise à maximiser les bénéfices totaux sur une période de 20 ans, correspondant à la durée de votre contrat avec EDF Obligation d'Achat, qui achète l'électricité produite par vos panneaux.`,
        financier: `En maximisant les bénéfices, vous assurez un retour sur investissement élevé. Cela inclut les économies sur les factures d'électricité et les revenus de la revente d'électricité.`,
        environnement: `Cette approche encourage la production continue d'énergie renouvelable sur une longue période, réduisant ainsi l'empreinte carbone.`
    },
    'Sécurité': {
        description: `Ce scénario de sécurité financière, mesuré par le Taux de Rendement Interne (TRI), vous indique le taux d'inflation annuel que votre projet peut supporter sans compromettre l'amortissement de votre investissement.`,
        financier: `Par exemple, avec un TRI de 5%, votre projet reste rentable même avec une inflation de 5% chaque année pendant 20 ans. Cela offre une assurance financière contre les fluctuations économiques.`,
        environnement: `Assurer la viabilité financière de votre projet à long terme signifie une contribution soutenue à la réduction des émissions de gaz à effet de serre.`
    }
};



const INDICATEURS = [
    { key: 'amortissement', label: 'Amortissement', unit: 'ans' },
    { key: 'bilan_20_ans', label: 'Bilan sur 20 ans', unit: '€' },
    { key: 'tri', label: 'Taux de rendement interne (TRI)', unit: '%' },
    { key: 'autoconso', label: 'Auto-consommation', unit: '%' },
    { key: 'autoprod', label: 'Auto-production', unit: '%' }
];

export function Graph({ data }) {
    const maxPuissance = data.scenarios.puissance_max;
    const minPuissance = Math.min(...data.points_simu.map(point => point.puissance));
    const maxPercent = 96;

    const scenarios = [
        {
            name: 'Puissance max.',
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
                    <div className='relative z-10 translate-y-1/2 left-4 text-primary text-lg bg-background px-2 w-fit'>
                        Objectif : {scenarios[scenarioIndex].name}
                    </div>
                    <div className='duration-300 ease-in-out overflow-hidden relative p-4 pt-6 border rounded-lg h-full'>
                        <span className='text-secondary-foreground font-secondary flex flex-col gap-2' ref={contentRef}>
                            <p>
                                <Lightbulb className='inline-block mr-2 h-4 w-4' />
                                {VULGA[scenarios[scenarioIndex].name].description}</p>
                            <p>
                                <Landmark className='inline-block mr-2 h-4 w-4' />
                                {VULGA[scenarios[scenarioIndex].name].financier}
                            </p>
                            <p>
                                <Leaf className='inline-block mr-2 h-4 w-4' />
                                {VULGA[scenarios[scenarioIndex].name].environnement}
                            </p>
                            {scenarios[scenarioIndex].warning && (
                                <div className='text-red-500 font-bold'>
                                    <OctagonX className='inline-block mr-2 h-4 w-4' />
                                    {scenarios[scenarioIndex].warning}
                                </div>
                            )}
                        </span>

                    </div>
                </div>
                <div className={`m-8 flex flex-col col-span-1 ${scenarios[scenarioIndex].warning ? 'opacity-40' : ''} duration-1000`}>
                    <div className=' relative z-10 translate-y-1/2 left-4 text-primary text-lg bg-background px-2 w-fit'>
                        Puissance à installer
                    </div>
                    <div className={`duration-300 ease-in-out h-full relative p-6 border rounded-lg flex flex-col items-center justify-center`}>
                        <Ring progress={scenarios[scenarioIndex].percentage} />
                        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center'>
                            <span className='text-secondary-foreground font-secondary text-5xl tracking-tight'>
                                {Math.round(useAnimatedNumber(scenarios[scenarioIndex].puissance))}
                            </span>
                            <span className='text-secondary font-secondary text-lg'>kW (crête)</span>
                        </div>
                    </div>
                </div>
                <div className={`m-8 flex flex-col col-span-1 ${scenarios[scenarioIndex].warning ? 'opacity-40' : ''} duration-1000`}>
                    <div className={`relative z-10 translate-y-1/2 left-4 text-primary text-lg bg-background px-2 w-fit`}>
                        Indicateurs
                    </div>
                    <div className={`flex flex-col gap-4 p-8 pt-12 duration-300 ease-in-out relative border rounded-lg ${scenarios[scenarioIndex].warning ? 'text-gray-400' : ''}`}>
                        {highlightedData && INDICATEURS.map(({ key, label, unit }, index) => {
                            const value = highlightedData[key];
                            if (value === undefined) return null;
                            const percentage = (value / Math.max(...data.points_simu.map(d => d[key]))) * 100;
                            return (
                                <span key={index} className="font-secondary">
                                    {`${label}`} {`: `}
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
                <div className={`relative w-full h-full col-span-2 ${scenarios[scenarioIndex].warning ? 'opacity-40' : ''} duration-1000`}>
                    <div
                        style={{
                            left: `${coordScenario.x}px`,
                            top: `${coordScenario.y}px`,
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
                </div>
            </div >
        </div >
    );
};
