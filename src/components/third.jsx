import { Zap } from "lucide-react";

export function Third() {
    return (
        <section className="w-full flex flex-col p-8 py-24 items-center bg-background">
            <div className="grid grid-cols-2 gap-16 items-center">
                <img
                    src="/solar-panel-installation.jpg"
                    alt="installation de panneaux solaires"
                    className="bg-cover max-w-[45vw] max-h-screen rounded-lg"
                />
                <div className="flex flex-col gap-8 justify-around max-w-[500px] text-secondary-foreground">
                    <span className="text-5xl font-bold tracking-tight">
                        Viable et durable
                    </span>
                    <span className="font-secondary flex flex-col gap-4">
                        <span>
                            Aujourd'hui, le plus rentable est de consommer directement sa production solaire.
                            Pourtant, les panneaux les plus puissants (et coûteux) sont rarement adaptés à vos besoins,
                            car ils vous obligent à revendre le surplus d'électricité à un tarif peu avantageux.
                        </span>
                        <span>
                            En croisant votre consommation en temps réelle avec nos données climatiques, nous déterminons
                            les paramètres idéaux qui optimisent votre projet.
                        </span>

                    </span>
                    <a
                        href="/new"
                        className="font-semibold px-6 py-4 w-fit rounded-sm flex flex-row items-center justify-center group bg-primary stroke-ring hover:bg-accent-foreground"
                    >
                        <Zap className="mr-2 h-4 w-4 text-primary-foreground  group-hover:rotate-180 ease-in-out duration-500" />
                        <span className="text-primary-foreground">Analyser mon Projet</span>
                    </a>
                </div>

            </div>
        </section >
    );
}