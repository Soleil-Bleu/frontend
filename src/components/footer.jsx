import { ArrowUpRight } from "lucide-react";

export function Footer() {
    return (
        <div className="flex flex-col items-center justify-center p-8 pt-16">
            <div src="friends.jpg" className="p-20 w-full rounded-lg bg-cover bg-center backdrop-brightness-200 bg-[url('friends.jpg')] flex flex-col items-center justify-center gap-8">
                <h2 className="text-5xl font-bold tracking-tight text-primary">
                    {"L'Association Soleil Bleu"}
                </h2>
                <div className="grid grid-cols-2 px-8 pt-12 pb-8 gap-x-12 gap-y-6 rounded-lg font-secondary text-primary bg-background/50 backdrop-brightness-150 backdrop-blur-lg">
                <span className="font-secondary text-justify">
                    {`Soleil Bleu est une association (loi 1901), fondée suite au constat de 2 ingénieurs
                    en énergies : l'énergie solaire occupe une place centrale dans la transition écologique
                    grâce à sa facilité de mise en oeuvre. Pourtant, cette démocratisation se heurte à un paradoxe : 
                    les budgets sont serrés, et les analyse qui permettraient d'optimiser ces investissements sont hors
                    de prix.`}
                </span>
                <span className="font-secondary text-justify">
                    {`En mettant en oeuvre des outils mathématiques et informatiques, nous tentons de rendre
                    ces études accessibles aux structures modestes. Partout en France, nos bénévoles récoltent des
                    données d'ensoleillement et de performances énergétiques, afin d'améliorer nos simulations,
                    et rendre le solaire accessible au plus grand nombre.
                    `} <br />
                </span>
                <div className="font-secondary font-bold flex flex-row items-center justify-end underline underline-offset-2 col-span-2">
                    {"Devenir Bénévole "} <ArrowUpRight className="h-4 w-4 ml-1" />
                </div>
                </div>
                
            </div>
            <p className="font-secondary font-thin mt-16" >
                Soleil Bleu &copy; 2024
            </p>
        </div>
    )
}