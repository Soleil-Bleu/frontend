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
                        <blockquote className="my-2 border-l-2 pl-6 italic">
                            Quelle est la surface de panneaux solaire optimale pour mon bâtiment ?
                        </blockquote>
                        <p>
                            Notre logiciel analyse votre courbe de consommation et les paramètres de votre installation,
                            pour simuler son comportement selon différentes configuration.
                        </p>
                        <p>
                            Le rapport final vous indiquera les choix optimaux à privilégier selon vos objectifs financiers 
                            et environnementaux, ainsi qu'une projection précise des coûts et bénéfice tout au long de la durée
                            de vie de vos panneaux.
                        </p>
                        <a
                            href='/new/form'
                            className="col-span-2 font-semibold px-6 py-4 rounded-sm flex flex-row items-center justify-center group bg-primary stroke-ring hover:bg-accent-foreground"
                        >
                            <Zap className="mr-2 h-4 w-4 text-primary-foreground group-hover:rotate-180 ease-in-out duration-500" />
                            <span className="text-primary-foreground">Paramétrer ma Simulation</span>
                        </a>
                        <Dialog>
                            <div className='flex flex-row items-baseline w-full justify-center text-muted-foreground'>
                                <p className='text-sm'>En continuant, vous acceptez nos</p>
                                <DialogTrigger asChild>
                                    <Button variant='link' className='px-1 text-sm'>
                                        Conditions d'utilisation.
                                    </Button>
                                </DialogTrigger>
                            </div>
                            <DialogContent className="max-w-xl py-8">
                                <DialogHeader>
                                    <DialogTitle>Trouver ma courbe de consommation</DialogTitle>
                                    <DialogDescription>
                                        Nous avons besoin de votre fichier .csv fourni par Enedis.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className='flex flex-col gap-2 text-justify max-h-64 overflow-y-auto pr-2'>
                                    <p className="font-normal">
                                        Si vous possédez un compteur Linky, rendez-vous sur votre compte client Enedis
                                        (ou créez-le si ce n'est pas déjà fait). Vous pouvez ensuite exporter vos relevé
                                        de consommation depuis l'onglet <code>Suivre mes mesures</code>.
                                    </p>
                                    <img src="/screen_enedis.png" alt="capture d'écran du site Enedis" />
                                    <p className='italic'>
                                        Veillez à bien sélectionner le Type de données <code>Consommation horaire</code> et
                                        une Période couvrant au moins une années complète afin de bénéficier d'une précision maximale.
                                    </p>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
