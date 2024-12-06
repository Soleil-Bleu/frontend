import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


const CARDS = [
    {
        'nom': 'V. ABITA',
        'job': 'Président du UQC',
        'avis': "Tout simplement top. C'est ma 4ème étude avec Soleil Bleu, ils sont toujours très efficaces."
    },
    {
        'nom': 'L. DUPONT',
        'job': 'Propriétaire à Paris',
        'avis': "L'analyse de mes habitudes de consommation m'a permis de faire les bons choix !"
    },
    {
        'nom': 'S. TOURVIEILLE',
        'job': 'Région Loire-Atlantique',
        'avis': "Très cool. Rentabilisé dès le 3ème mois, très facile d'utilisation."
    },
    {
        'nom': 'A. TONDU',
        'job': 'Consultant ENEDIS',
        'avis': "Au max ! Super pratique et une grande réactivité des équipes."
    },
];

export const Slider = () => {
    return (
        <section className="py-24 flex flex-col gap-8 bg-secondary">
            <div className="px-8 flex flex-col gap-4 text-secondary-foreground">
                <span className="px-8 text-5xl font-bold tracking-tight">
                    Ils nous font confiance
                </span>
                <span className="px-8 font-secondary max-w-xl">
                    Nous collaborons avec des communes, des associations et des entreprises.
                </span>
            </div>
            <div className="relative m-auto flex flex-col gap-[16px] w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent_2%,white_16%,white_84%,transparent_98%)]">
                <div className="flex gap-[16px] w-[calc((320px+16px)*8)] animate-infinite-slider"> {/* animate-infinite-slider */}
                    {(CARDS.concat(CARDS)).map((card, index) => (
                        <Card className="bg-secondary-foreground/15 w-[320px] border-secondary-foreground/80 border-2">
                            <CardHeader>
                                <CardTitle>{card.nom}</CardTitle>
                                <CardDescription className='font-secondary'>{card.job}</CardDescription>
                            </CardHeader>
                            <CardContent className='font-secondary'>
                                <p>{card.avis}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="flex gap-[16px] w-[calc((320px+16px)*8)] animate-reverse-slider"> {/* animate-infinite-slider */}
                    {(CARDS.concat(CARDS)).map((card, index) => (
                        <Card className="bg-secondary-foreground/15 w-[320px] border-secondary-foreground/80 border-2">
                            <CardHeader>
                                <CardTitle>{card.nom}</CardTitle>
                                <CardDescription className='font-secondary'>{card.job}</CardDescription>
                            </CardHeader>
                            <CardContent className='font-secondary'>
                                <p>{card.avis}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};
