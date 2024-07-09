import { ArrowRight } from "lucide-react";

export function Second() {
    return (
        <section className="w-full flex flex-col px-8 py-24 bg-secondary">
            <div className="grid grid-cols-2 gap-8 items-center justify-center">
                <div className="flex flex-col gap-6 justify-around max-w-[500px] text-secondary-foreground">
                    <span className="text-5xl font-bold tracking-tight">
                        Optimisez les coûts de votre installation
                    </span>
                    <span className="font-secondary">
                        Grâce à notre analyse, déterminez précisément les paramètres de votre installation.
                        Trouvez le juste compromis qui répond à vos besoins énergétiques sans menacer votre budget.

                    </span>
                    <ul className="font-secondary font-semibold flex flex-col gap-2">
                        <li className="flex flex-row items-center">
                            <ArrowRight className="h-4 w-4 mr-2" />
                            Simulation complète de votre profil énergétique
                        </li>
                        <li className="flex flex-row items-center">
                            <ArrowRight className="h-4 w-4 mr-2" />
                            Projections financières (coûts, aides, tarifs, etc.)
                        </li>
                        <li className="flex flex-row items-center">
                            <ArrowRight className="h-4 w-4 mr-2" />
                            Comparatifs des scénarios de dimensionnement
                        </li>
                    </ul>
                </div>
                <div className="px-2 py-4 max-w-[45vw] max-h-screen">
                    <img
                        src="/installation-1.jpg"
                        alt="installation d'un panneau"
                        className="rounded-lg"
                    />
                    {/* <img
                        src="/graphs.svg"
                        alt="graphiques d'analyses d'un projet photovoltaïque"
                        className="-mt-40"
                    /> */}
                </div>
            </div>
        </section >
    );
}