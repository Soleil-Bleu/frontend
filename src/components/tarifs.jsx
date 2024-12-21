import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { CircleCheck, Zap, Sun } from "lucide-react";

const IconStyle = "mr-2 h-4 w-4 text-secondary-foreground group-hover:rotate-180 ease-in-out duration-500"
const TARIFS = [
    {
        title: "Essentiel",
        description: "Pour les connaisseurs, remplissez un questionnaire en ligne",
        do: [
            "Analyse de votre profil de consommation",
            "Simulations selon différents scénarios",
            "Projections financières sur la durée de vie du projet",
            "Rapport de synthèse",
        ],
        price: "100 €",
        item: "l'étude",
        icon: <Zap className={IconStyle} />,
        cta: "Simuler mon projet"
    }, {
        title: "Alliance",
        description: "Pour un accompagnement aux petits oignons",
        do: [
            "Toutes les fonctionnalités Essentiel",
            "Un accompagnement humain tout le long de l'étude",
            "Étude d'orientation, d'inclinaison et d'ombrage",
            "Personnalisation de l'étude selon vos besoins",
            "Rédaction d'un cahier des charges pour installateurs"
        ],
        price: "500 €",
        item: "l'étude",
        icon: <Sun className={IconStyle} />,
        cta: "Prendre RDV"
    }, {
        title: "Communauté",
        description: "Pour un projet d'autoconsommation collective",
        do: [
            "Toutes les fonctionnalités Alliance",
            "Recherche de la combinaison producteurs/consommateurs la plus optimisée",
            "Optimisation de la boucle énergétique",
            "Vulgarisation auprès des futurs consommateurs (en option)",
        ],
        price: "500-2000 €",
        item: "l'étude, selon projet",
        icon: <Sun className={IconStyle} />,//<Sparkles className={IconStyle} />,
        cta: "Prendre RDV"
    }
]

export function Tarifs() {
    return (
        <section id="tarifs" className="py-16 flex flex-col items-center justify-center text-background bg-secondary-foreground -mt-2">
            <h2 className="text-5xl font-bold tracking-tight">
                Nos Tarifs
            </h2>
            <div className="grid grid-cols-3 px-8 py-16 gap-12 items-start">
                {TARIFS.map((tarif, index) => (
                    <Card key={index} className="bg-secondary-foreground border-[2px] rounded-lg border-background p-4 flex flex-col gap-4 items-center justify-between h-full">
                        <div>
                            <CardHeader>
                                <CardTitle className="text-4xl text-background font-bold tracking-tight text-center">
                                    {tarif.title}
                                </CardTitle>
                                <CardDescription className='font-secondary text-center'>
                                    {tarif.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className='font-secondary text-background w-full'>
                                <ul className="flex flex-col gap-2">
                                    {tarif.do.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <CircleCheck className="min-h-5 h-5 min-w-5 w-5 mt-[2px]" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </div>
                        <CardFooter>
                            <p className='text-center text-background flex flex-col gap-4'>
                                <div className="flex flex-col items-center justify-center">
                                    <span className="font-sans text-4xl font-bold tracking-tight">
                                        {tarif.price}
                                    </span>
                                    <span className='font-sans text-base font-thin italic tracking-normal text-background ml-2'>
                                        {tarif.item}
                                    </span>
                                </div>

                                <button
                                    onClick={() => {
                                        if (index === 0) {
                                            window.location.href = '/new';
                                        } else {
                                            Calendly.initPopupWidget({ url: 'https://calendly.com/samuel71999/30min?hide_gdpr_banner=1' });
                                        }
                                        return false;
                                    }}
                                    className="font-semibold px-6 py-4 w-fit rounded-sm flex flex-row items-center justify-center group bg-background text-secondary-foreground stroke-ring hover:bg-accent"
                                >
                                    {tarif.icon}
                                    <span className="text-primary">{tarif.cta}</span>
                                </button>
                            </p>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>
    );
}
