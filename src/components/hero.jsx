import { Plus, Zap } from "lucide-react";

export function Hero() {
    return (
        <section>
            <div className="px-4 pt-20 h-[624px] flex flex-col gap-6 text-center bg-[url('/solar-panel.svg')] md:px-12 md:pt-24 lg:pt-32 xl:pt-40]">
                <h1 className="text-3xl p-2 font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                    Votre projet solaire
                    <br />
                    enfin abordable.
                </h1>
                <p className="mx-auto max-w-[800px] text-secondary-foreground font-secondary md:text-xl">
                    Maîtrisez votre projet solaire grâce à une simulation complète,
                    financière et environnementale. Laissez-vous guider vers un avenir
                    plus lumineux !
                </p>
                <div className="flex w-full mt-4 justify-center items-center gap-4">
                    <a
                        href="/new"
                        className="text-base font-semibold px-6 py-4 flex flex-row items-center justify-center rounded-sm bg-secondary group"
                    >
                        <span>En savoir</span>
                        <Plus className="ml-2 h-4 w-4 group-hover:rotate-180 ease-in-out duration-500" />
                    </a>
                    <a
                        href="/new"
                        className="font-semibold px-6 py-4 rounded-sm flex flex-row items-center justify-center group bg-primary stroke-ring hover:bg-accent-foreground"
                    >
                        <Zap className="mr-2 h-4 w-4 text-primary-foreground  group-hover:rotate-180 ease-in-out duration-500" />
                        <span className="text-primary-foreground">Analyser mon Projet</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
