import { Plus, Zap, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export function Hero() {
    return (
        <section>
            <div id="accueil" className="px-4 pt-20 h-[624px] flex flex-col gap-6 text-center bg-[url('/solar-panel.svg')] md:px-12 md:pt-24 lg:pt-32 xl:pt-40]">
                <h1 className="text-3xl p-2 font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                    Simulez votre projet solaire
                    <br />
                    selon vos besoins
                </h1>
                <p className="mx-auto max-w-[800px] text-secondary-foreground font-secondary md:text-xl">
                    Parce qu'installer un maximum de panneaux solaires n'est pas forcément le meilleur choix !
                    Maîtrisez votre projet solaire grâce à une simulation énergétique et financière complète.
                </p>
                <div className="flex w-full mt-4 justify-center items-center gap-4">
                    {/* <a
                        href="/new"
                        className="text-base font-semibold px-6 py-4 flex flex-row items-center justify-center rounded-sm bg-secondary group"
                    >
                        <span>En savoir</span>
                        <Plus className="ml-2 h-4 w-4 group-hover:rotate-180 ease-in-out duration-500" />
                    </a> */}

                    {/* <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <a
                                    href="/new"
                                    className="font-semibold px-6 py-4 rounded-sm flex flex-row items-center justify-center group bg-popover text-muted-foreground stroke-ring hover:bg-muted cursor-not-allowed"
                                >
                                    <Network className="mr-2 h-4 w-4 group-hover:rotate-180 ease-in-out duration-500" />
                                    <span >Simuler mon projet d'autoconsommation collective</span>
                                </a>
                            </TooltipTrigger>
                            <TooltipContent className='bg-muted'>
                                <p>Bientôt disponible !</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider> */}

                    <button
                        onClick={() => {
                            document.getElementById("tarifs").scrollIntoView({ behavior: "smooth" });
                            //Calendly.initPopupWidget({ url: 'https://calendly.com/antoinetondu/rdv-soleil-bleu?hide_gdpr_banner=1' });
                            //return false;
                        }}
                        className="font-semibold px-6 py-4 rounded-sm flex flex-row items-center justify-center group bg-secondary text-secondary-foreground stroke-ring hover:bg-muted"
                    >
                        <Network className="mr-2 h-4 w-4 group-hover:rotate-180 ease-in-out duration-500" />
                        <span >Simuler mon projet d'autoconsommation collective</span>
                    </button>

                    <button
                        onClick={() => {
                            document.getElementById("tarifs").scrollIntoView({ behavior: "smooth" });
                            //Calendly.initPopupWidget({ url: 'https://calendly.com/antoinetondu/rdv-soleil-bleu?hide_gdpr_banner=1' });
                            //return false;
                        }}
                        className="font-semibold px-6 py-4 rounded-sm flex flex-row items-center justify-center group bg-primary stroke-ring hover:bg-accent-foreground"
                    >
                        <Zap className="mr-2 h-4 w-4 text-primary-foreground group-hover:rotate-180 ease-in-out duration-500" />
                        <span className="text-primary-foreground">Simuler mon projet d'autoconsommation individuelle</span>
                    </button>
                </div>
            </div>
        </section>
    );
}
