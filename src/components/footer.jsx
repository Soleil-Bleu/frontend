import { Mail } from "lucide-react";

export function Footer() {
    return (
        <section id="association" className="flex flex-col items-center justify-center p-8 pt-16">
    <div className="p-20 w-full rounded-lg bg-cover bg-center backdrop-brightness-200 flex flex-col items-center justify-center gap-8" style={{ backgroundImage: "url('friends.jpg')" }}>
        <h2 className="text-5xl font-bold tracking-tight text-primary">
            {"L'Association Soleil Bleu"}
        </h2>
        <div className="grid grid-cols-2 px-8 max-w-6xl pt-12 pb-8 gap-x-12 gap-y-6 rounded-lg font-secondary text-primary bg-background/50 backdrop-brightness-150 backdrop-blur-lg">
            <span className="font-secondary text-justify">
                {`Soleil Bleu est une association (loi 1901), fondée suite au constat de 2 ingénieurs
                en énergies : l'énergie solaire occupe une place centrale dans la transition écologique
                grâce à sa facilité de mise en oeuvre. Pourtant, cette démocratisation se heurte à un paradoxe :
                tout le monde n'a pas les moyens d'investir 
                et les analyses qui permettent d'optimiser ces investissements sont hors de prix.
                `}
            </span>
            <span className="font-secondary text-justify">
                {`En utilisant des outils mathématiques et informatiques, 
                nous visons à rendre ces études accessibles aux structures modestes pour démocratiser l'accès à l'énergie solaire.`}
            </span>
            <a /* https://mailto.vercel.app/ */
                href="mailto:contact@soleil-bleu.pro?subject=Contact%20b%C3%A9n%C3%A9vole%20%7C%20Soleil%20Bleu&body=Hello%2C%20je%20souhaite%20int%C3%A9grer%20l'association%20Soleil%20Bleu%2C%20prenons%20contact%20!"
                className="font-secondary font-bold flex flex-row items-center justify-end underline underline-offset-2 col-span-2 group"> {/* underline underline-offset-2  */}
                <p>
                    {"contact@soleil-bleu.com"}
                </p>
                <Mail className="h-5 w-5 mx-2 group-hover:rotate-[360deg] ease-in-out duration-500" />
            </a>
        </div>
    </div>

    <p className="font-secondary font-thin mt-16">
        Soleil Bleu &copy; 2024
    </p>
</section>

    )
}