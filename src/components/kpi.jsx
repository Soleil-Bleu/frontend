export function Kpi() {
    return (
        <section className="grid grid-cols-3 px-8 py-16 gap-16 text-background bg-secondary-foreground -mt-2">
            <div className="border-t-[2px] border-background">
                <h3 className='text-5xl font-bold tracking-tight mt-8'>
                    144 bâtiments
                </h3>
                <span className="font-secondary">
                    étudiés en autoconsommation
                </span>
            </div>
            <div className="border-t-[2px] border-background">
                <h3 className='text-5xl font-bold tracking-tight mt-8'>
                    18 boucles
                </h3>
                <span className="font-secondary">
                    d'autoconsommation collectives créées
                </span>
            </div>
            <div className="border-t-[2px] border-background">
                <h3 className='text-5xl font-bold tracking-tight mt-8'>
                    3 ingénieurs
                </h3>
                <span className="font-secondary">
                    passionnés par leur travail
                </span>
            </div>
        </section >

    );
}