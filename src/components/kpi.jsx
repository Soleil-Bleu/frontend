export function Kpi() {
    return (
        <section className="grid grid-cols-3 px-8 py-16 gap-16 text-background bg-secondary-foreground -mt-2">
            <div className="border-t-[2px] border-background">
                <h3 className='text-5xl font-bold tracking-tight mt-8'>
                    78 études
                </h3>
                <span className="font-secondary">
                    réalisées en 2024, dont 6 projets d'écoquartier
                </span>
            </div>
            <div className="border-t-[2px] border-background">
                <h3 className='text-5xl font-bold tracking-tight mt-8'>
                    248 000€
                </h3>
                <span className="font-secondary">
                    économisés grâce à un meilleur dimensionnement
                </span>
            </div>
            <div className="border-t-[2px] border-background">
                <h3 className='text-5xl font-bold tracking-tight mt-8'>
                    42T de CO2
                </h3>
                <span className="font-secondary">
                    compensées par les projets que nous avons soutenus
                </span>
            </div>
        </section >

    );
}