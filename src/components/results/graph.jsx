import React, { useState, useRef } from 'react';
import { VULGA, INDICATEURS } from '@/components/results/constants';
import ChartContainer from '@/components/results/chartContainer';
import Tabs from '@/components/results/tabs';
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
        description: `Ce scénario maximise la puissance installable sur votre surface disponible, garantissant ainsi une production d'électricité solaire maximale.`,
        financier: `En installant la puissance maximale, vous pouvez potentiellement produire une grande quantité d'électricité, ce qui peut significativement réduire vos factures énergétiques et augmenter vos revenus si vous revendez l'excédent.`,
        environnement: `Cela permet de maximiser la contribution à la réduction des émissions de CO2 en utilisant une énergie renouvelable.`
    },
    'Amortissement rapide': {
        description: `Ce scénario vous indique la puissance à installer pour obtenir le temps d'amortissement le plus court.`,
        financier: `Votre investissement initial sera récupéré plus rapidement grâce aux économies sur les factures d'électricité et aux gains de la revente de l'électricité produite. L'ammortissement moyen se situe entre 10 et 12ans chez les particuliers. Vous êtes en dessous ? Foncez ! Au dessus, réflechissez bien avant d'investir ! Gardez à l'esprit que les contrats de revente d'électricité sont de 20 ans.  `,
        environnement: `Une récupération rapide de l'investissement permet de réinvestir au plus vite dans d'autres projets d'énergies renouvelables .`
    },
    'Autoconsommation totale': {
        description: `Ce scénario vous montre la puissance maximale que vous pouvez installer tout en consommant 100% de l'électricité produite.`,
        financier: `Tout ce que vous produisez est consommé immédiatement, vous ne serez pas obligé de vous raccorder au réseau ENEDIS pour revendre l'éléctricité. Généralement cela permet de couvrir 10 à 15% des besoins (taux d'autoproduction) réduisant votre dépendance aux fournisseurs d'électricité. Vous êtes à moins de 10% d'autoproduction avec ce scénario, ce n'est peut être pas la bonne option. Vous êtes à plus de 15% ? C'est sûrement une option intéressante en terme de rentabilité.`,
        environnement: `Consommer l'énergie que vous produisez réduit les pertes de transport et favorise l'indépendance énergétique.`
    },
    'BEPOS': {
        description: `Ce scénario détermine la puissance minimale à installer pour que votre bâtiment soit à énergie positive (BEPOS).`,
        financier: `Un bâtiment à énergie positive produit plus d'énergie qu'il n'en consomme en une année. Attention si vous utilisez une autre source d'énergie (bois, gaz etc.), cela ne fonctionne pas !`,
        environnement: `Votre bâtiment contribue activement à la réduction des émissions de CO2 et participe à l'indépendance énergétique.`
    },
    'Bénéfices totaux': {
        description: `Ce scénario vise à maximiser les bénéfices totaux sur une période de 20 ans, correspondant à la durée de votre contrat avec EDF Obligation d'Achat, qui achète l'électricité produite par vos panneaux.`,
        financier: `En maximisant les bénéfices, vous assurez un retour sur investissement élevé. Cela inclut les économies sur les factures d'électricité et les revenus de la revente d'électricité. Priviligiez cette option si vous souhaitez investir`,
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
                        Baisse de vos factures d'éléctricité
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
