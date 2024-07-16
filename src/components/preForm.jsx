import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Zap } from 'lucide-react';

export function PreForm() {

    return (
        <>
            <div className="z-[-1] fixed inset-0 h-full w-full bg-[radial-gradient(#808387_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_10%,transparent_100%)]" />
            <div className="flex justify-center flex-col p-16 items-center w-full">
                <Card className="bg-background p-6">
                    <CardHeader>
                        <CardTitle>Nouvelle simulation</CardTitle>
                        <CardDescription>
                            Vous êtes sur le point de lancer une étude photovoltaïque.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4 max-w-lg text-justify">
                    <blockquote class="my-2 border-l-2 pl-6 italic leading-loose">
    <ul class="list-['-_'] list-inside">
        <li>Quel projets serait le plus rentable ?</li>
        <li>Quelle surface de panneaux installer ?</li>
        <li>Sera-t-il rentable ? Amorti rapidement ?</li>
        <li>Combien vais-je autoconsommer ? autoproduire ?</li>
        <li>L'autoconsommation est-elle faite pour moi ?</li>
    </ul>
</blockquote>

                        <p>
                            Si vous vous posez ces questions, nous allons y répondre ! 
                        </p>
                        <p>
                            Notre logiciel analyse votre courbe de consommation et les paramètres de votre installation
                            pour simuler son comportement selon différentes configurations.
                        </p>
                        <p>
                            Le rapport final vous indiquera les choix optimaux à privilégier selon vos objectifs financiers
                            et environnementaux, ainsi qu'une projection précise des coûts et bénéfices.
                        </p>
                        <a
                            href='/new/form'
                            className="col-span-2 font-semibold px-6 py-4 rounded-sm flex flex-row items-center justify-center group bg-primary stroke-ring hover:bg-accent-foreground"
                        >
                            <Zap className="mr-2 h-4 w-4 text-primary-foreground group-hover:rotate-180 ease-in-out duration-500" />
                            <span className="text-primary-foreground">Lancer ma Simulation</span>
                        </a>
                        <Dialog>
                            <div className='flex flex-row items-baseline w-full justify-center text-muted-foreground'>
                                <p className='text-sm'>En continuant, vous acceptez nos</p>
                                <DialogTrigger asChild>
                                    <Button variant='link' className='px-1 text-sm'>
                                        Conditions d'utilisation
                                    </Button>
                                </DialogTrigger>
                            </div>
                            <DialogContent className="max-w-xl py-8">
                                <DialogHeader>
                                    <DialogTitle>Conditions d'utilisation et Politique de Confidentialité</DialogTitle>
                                    <DialogDescription>
                                    Dernière mise à jour : 05/07/24
                                    </DialogDescription>
                                </DialogHeader>
                                <div className='flex flex-col gap-2 text-justify max-h-64 overflow-y-auto pr-2'>

                                    <p>Bienvenue sur Soleil Bleu, un service en ligne de simulation d'installation photovoltaïque. En utilisant notre service, vous acceptez les conditions d'utilisation et la politique de confidentialité suivantes.</p>

                                    <h2 className="font-semibold">1. Collecte et utilisation des données personnelles</h2>

                                    <h3 className="font-semibold">1.1 Données collectées</h3>
                                    <p>Nous collectons les données suivantes :</p>
                                    <ul className="list-disc list-inside">
                                        <li>Nom et prénom</li>
                                        <li>Adresse e-mail</li>
                                        <li>Code Postal (pour affiner au mieux les données d'ensolleillement)</li>
                                        <li>Données de consommation électriques (fichiers .csv fournis par Enedis)</li>
                                        <li>Paramètres du projet solaire (type, inclinaison, ...)</li>
                                    </ul>

                                    <h3 className="font-semibold">1.2 Finalité de la collecte</h3>
                                    <p>Les données sont utilisées pour :</p>
                                    <ul className="list-disc list-inside">
                                        <li>Effectuer des simulations personnalisées d'installations solaires</li>
                                        <li>Fournir des recommandations et des estimations</li>
                                        <li>Améliorer notre service</li>
                                        <li>Communiquer avec vous</li>
                                    </ul>

                                    <h2 className="font-semibold">2. Base légale de la collecte et du traitement des données</h2>
                                    <p>Nous traitons vos données sur les bases légales suivantes :</p>
                                    <ul className="list-disc list-inside">
                                        <li>Votre consentement</li>
                                        <li>Nécessité pour l'exécution d'un contrat</li>
                                        <li>Respect des obligations légales</li>
                                        <li>Intérêt légitime à améliorer nos services</li>
                                    </ul>

                                    <h2 className="font-semibold">3. Conservation des données</h2>
                                    <p>Vos données sont conservées aussi longtemps que nécessaire pour les finalités prévues ou conformément aux exigences légales.</p>

                                    <h2 className="font-semibold">4. Partage des données</h2>
                                    <p>Nous ne partageons pas vos données avec des tiers, sauf :</p>
                                    <ul className="list-disc list-inside">
                                        <li>Avec votre consentement</li>
                                        <li>Pour respecter une obligation légale</li>
                                        <li>Avec des prestataires de services respectant des normes strictes de protection des données</li>
                                    </ul>

                                    <h2 className="font-semibold">5. Vos droits</h2>
                                    <p>Vous disposez des droits suivants :</p>
                                    <ul className="list-disc list-inside">
                                        <li>Droit d'accès, de rectification, d'effacement, de limitation du traitement, de portabilité et d'opposition</li>
                                    </ul>
                                    <p>Pour exercer ces droits, contactez-nous à <a href="mailto:sam.tourvieille@gmail.com" class="text-blue-500 underline">sam.tourvieille@gmail.com</a>.</p>

                                    <h2 className="font-semibold">6. Sécurité des données</h2>
                                    <p>Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données personnelles.</p>

                                    <h2 className="font-semibold">7. Projections et limitations de responsabilité</h2>
                                    <p>Les projections fournies par Soleil Bleu sont des estimations basées sur les données fournies. Elles n'ont pas de valeur contractuelle et ne sauraient engager la responsabilité de Soleil Bleu. Les résultats peuvent varier en fonction de nombreux facteurs non pris en compte dans les simulations.</p>

                                    <h2 className="font-semibold">8. Modifications de la politique de confidentialité</h2>
                                    <p>Nous nous réservons le droit de modifier cette politique à tout moment. Les modifications seront publiées sur cette page avec une nouvelle date de mise à jour. Veuillez consulter cette page régulièrement.</p>

                                    <h2 className="font-semibold">9. Contact</h2>
                                    <p>Pour toute question ou préoccupation, veuillez nous contacter à : <a href="mailto:sam.tourvieille@gmail.com" class="text-blue-500 underline">sam.tourvieille@gmail.com</a></p>

                                    <p>En utilisant Soleil Bleu, vous reconnaissez avoir lu et compris ces conditions et vous acceptez d'être lié par ces termes.</p>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
