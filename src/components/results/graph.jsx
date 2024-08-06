import React, { useState, useRef } from 'react';
import { VULGA, INDICATEURS } from '@/components/results/constants';
import ChartContainer from '@/components/results/chartContainer';
import Tabs from '@/components/results/tabs';
import { Ring } from '@/components/ring';
import { Button } from '@/components/ui/button';
import { Lightbulb, Landmark, Leaf, OctagonX } from 'lucide-react';
import exportToPDF from '@/components/results/pdfExport';

export function Graph({ data }) {
    console.log('Data received:', data);

    const maxPuissance = data.scenarios.puissance_max;
    const minPuissance = Math.min(...data.points_simu.map(point => point.puissance));
    const maxPercent = 96;

    const scenarios = [
        {
            name: 'Puissance max.',
            puissance: data.scenarios.puissance_max,
            percentage: maxPercent,
        },
        {
            name: 'Amortissement rapide',
            puissance: data.scenarios.amortissement_rapide,
            percentage: (data.scenarios.amortissement_rapide / maxPuissance) * maxPercent,
        },
        {
            name: 'Autoconsommation totale',
            puissance: data.scenarios.autoconso_100 || minPuissance,
            percentage: data.scenarios.autoconso_100 ? (data.scenarios.autoconso_100 / maxPuissance) * maxPercent : (minPuissance / maxPuissance) * maxPercent,
            warning: data.scenarios.autoconso_100 ? '' : 'Non atteignable dans cette configuration : consommation inadaptée.'
        },
        {
            name: 'BEPOS',
            puissance: data.scenarios.bepos || maxPuissance,
            percentage: data.scenarios.bepos ? (data.scenarios.bepos / maxPuissance) * maxPercent : maxPercent,
            warning: data.scenarios.bepos ? '' : 'Non atteignable dans cette configuration : surface insuffisante.'
        },
        {
            name: 'Bénéfices totaux',
            puissance: data.scenarios.benefices_max,
            percentage: (data.scenarios.benefices_max / maxPuissance) * maxPercent,
        },
        // Add other scenarios if needed
    ];

    const [highlightedPuissance, setHighlightedPuissance] = useState(scenarios[0].puissance);
    const [scenarioIndex, setScenarioIndex] = useState(0);
    const [coordScenario, setCoordScenario] = useState({ x: null, y: null });
    const contentRef = useRef(null);

    const highlightedData = data.points_simu.find(point => point.puissance === highlightedPuissance);

    const handleExportToPDF = () => {
        exportToPDF(data, scenarios, VULGA, INDICATEURS);
    };

    return (
        <div className='w-full bg-background flex flex-col items-center justify-center p-8 gap-4'>
            <Tabs scenarios={scenarios} scenarioIndex={scenarioIndex} setScenarioIndex={setScenarioIndex} setHighlightedPuissance={setHighlightedPuissance} />

            <div className='w-full h-full border grid grid-cols-3 justify-center rounded-b-lg' id='export-content'>
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
                                {Math.round(scenarios[scenarioIndex].puissance)}
                            </span>
                            <span className='font-secondary text-lg'>kW (crête)</span>
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
                                <span key={index} className="font-secondary font-medium">
                                    {`${label}`} {`: `}
                                    <span className='text-secondary-foreground font-normal'>
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
                        id={`chart-${scenarioIndex}`}
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
                    <ChartContainer data={data.points_simu} highlightedPuissance={highlightedPuissance} setCoordScenario={setCoordScenario} />
                </div>
                <div className={`m-8 flex flex-col col-span-1 ${scenarios[scenarioIndex].warning ? 'opacity-40' : ''} duration-1000`}>
                    <div className=' relative z-10 translate-y-1/2 left-4 text-primary text-lg bg-background px-2 w-fit'>
                        Surface à installer
                    </div>
                    <div className={`duration-300 ease-in-out h-full relative p-6 border rounded-lg flex flex-col items-center justify-center`}>
                        <Ring progress={(highlightedData.surface / Math.max(...data.points_simu.map(d => d.surface))) * 96} />
                        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center'>
                            <span className='text-secondary-foreground font-secondary text-5xl tracking-tight'>
                                {Math.round(highlightedData.surface)}
                            </span>
                            <span className='font-secondary text-lg'>m²</span>
                        </div>
                    </div>
                </div>
                <div className={`m-8 flex flex-col col-span-1 ${scenarios[scenarioIndex].warning ? 'opacity-40' : ''} duration-1000`}>
                    <div className=' relative z-10 translate-y-1/2 left-4 text-primary text-lg bg-background px-2 w-fit'>
                        Coût de l'installation
                    </div>
                    <div className={`duration-300 ease-in-out h-full relative p-6 border rounded-lg flex flex-col items-center justify-center`}>
                        <Ring progress={(highlightedData.cout_installation / Math.max(...data.points_simu.map(d => d.cout_installation))) * 96} />
                        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center'>
                            <span className='text-secondary-foreground font-secondary text-3xl tracking-tight'>
                                {Math.round(highlightedData.cout_installation)}
                            </span>
                            <span className='font-secondary text-lg'>€</span>
                        </div>
                    </div>
                </div>
                <div className={`m-8 flex flex-col col-span-1 ${scenarios[scenarioIndex].warning ? 'opacity-40' : ''} duration-1000`}>
                    <div className=' relative z-10 translate-y-1/2 left-4 text-primary text-lg bg-background px-2 w-fit'>
                        Baisse de vos factures ENEDIS
                    </div>
                    <div className={`duration-300 ease-in-out h-full relative p-6 border rounded-lg flex flex-col items-center justify-center`}>
                        <Ring progress={(highlightedData.baisse_facture / Math.max(...data.points_simu.map(d => d.baisse_facture))) * 96} />
                        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center'>
                            <span className='text-secondary-foreground font-secondary text-4xl tracking-tight'>
                                {Math.round(highlightedData.baisse_facture)}
                            </span>
                            <span className='font-secondary text-lg'>%</span>
                        </div>
                    </div>
                </div>
            </div >
            <Button onClick={handleExportToPDF} variant='outline' className='fixed bottom-4 right-8 z-10 font-normal'> Exporter le rapport</Button>
        </div >
    );
}
