import { Zap } from "lucide-react";

export function Third() {
    return (
        <section id="valeurs" className="w-full flex flex-col p-8 py-24 items-center bg-background">
            <div className="grid grid-cols-2 gap-16 items-center">
                <img
                    src="/installation-1.jpg"
                    alt="installation de panneaux solaires"
                    className="bg-cover max-w-[45vw] max-h-screen rounded-lg"
                />
                <div className="flex flex-col gap-8 justify-around max-w-xl text-secondary-foreground">
                    <span className="text-5xl font-bold tracking-tight">
                        Viable et durable
                    </span>
                    <span className="font-secondary text-justify flex flex-col gap-4">
                        <span>
                            Aujourd'hui, l'autoconsommation est de plus en plus présente,
                            elle permet de répondre efficacement à l'augmentation des prix de l'électricité.
                            Mais difficile d'arbitrer entre une bonne autoconsommation et les économies d'échelle...
                            Nos études rendent cette choix extrêment simple !
                        </span>
                        <span>
                            En croisant votre consommation en temps réel avec nos données climatiques, nous déterminons
                            la puissance idéale à installer pour optimiser votre projet.
                        </span>

                    </span>
                    <button
                        onClick={() => {
                            Calendly.initPopupWidget({ url: 'https://calendly.com/antoinetondu/rdv-soleil-bleu?hide_gdpr_banner=1' });
                            return false;
                        }}
                        className="font-semibold px-6 py-4 w-fit rounded-sm flex flex-row items-center justify-center group bg-primary stroke-ring hover:bg-accent-foreground"
                    >
                        <Zap className="mr-2 h-4 w-4 text-primary-foreground  group-hover:rotate-180 ease-in-out duration-500" />
                        <span className="text-primary-foreground">Simuler mon Projet</span>
                    </button>
                </div>

            </div>
        </section >
    );
}