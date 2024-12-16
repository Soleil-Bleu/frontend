import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, CircleCheck } from 'lucide-react';
import { useSearchParams } from "react-router-dom";

export function ConfirmationPage() {
    const [searchParams] = useSearchParams();
    const email = searchParams.get("email");

    const [spin, setSpin] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => setSpin(false), 1000);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <>
            <div className="z-[-1] fixed inset-0 h-full w-full bg-[radial-gradient(#808387_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_10%,transparent_100%)]" />
            <div className="flex justify-center flex-col p-16 items-center w-full">
                <Card className="bg-background p-6 w-5xl">
                    <CardHeader>
                        <CardTitle className="group flex flex-row">
                            C'est bien noté !
                            <span>{ spin ? (
                            <CircleCheck className={`absolute ml-2 h-6 w-6 text-primary group-hover:rotate-[360deg] duration-1000 ease-in-out animate-ping`} />):(<></>)}
                            <CircleCheck className={`relative ml-2 h-6 w-6 text-secondary-foreground group-hover:rotate-[360deg] duration-1000 ease-in-out`} />
                            </span>
                        </CardTitle>
                        <CardDescription>
                            Nous analysons vos données dès que possible.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4 max-w-lg">
                        <p className='pb-4'>
                            Une email de confirmation, avec les instructions de paiement, vous a été envoyé à : <b>{email}</b>.
                        </p>
                        <a
                            href='/'
                            className="col-span-2 font-semibold px-6 py-4 rounded-sm flex flex-row items-center justify-center group bg-secondary stroke-ring hover:bg-card"
                        >
                            <Zap className="mr-2 h-4 w-4 text-secondary-foreground group-hover:rotate-180 ease-in-out duration-500" />
                            <span className="text-secondary-foreground">Revenir à l'accueil</span>
                        </a>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}