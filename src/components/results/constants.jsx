export const VULGA = {
    'Puissance max.': {
        description: `Ce scénario maximise la puissance installable sur votre surface disponible, garantissant ainsi une production d'électricité solaire maximale.`,
        financier: `En installant la puissance maximale, vous pouvez potentiellement produire une grande quantité d'électricité, ce qui peut significativement réduire vos factures énergétiques et augmenter vos revenus si vous revendez l'excédent.`,
        environnement: `Cela permet de maximiser la contribution à la réduction des émissions de CO2 en utilisant une énergie renouvelable.`
    },
    'Amortissement rapide': {
        description: `Ce scénario vous indique la puissance à installer pour obtenir le temps d'amortissement le plus court.`,
        financier: `Votre investissement initial sera récupéré plus rapidement grâce aux économies sur les factures d'électricité et aux gains de la revente de l'électricité produite. L'amortissement moyen se situe entre 10 et 12 ans chez les particuliers. Vous êtes en dessous ? Foncez ! Au dessus, réflechissez bien avant d'investir ! Gardez à l'esprit que les contrats de revente d'électricité sont de 20 ans.  `,
        environnement: `Une récupération rapide de l'investissement permet de réinvestir au plus vite dans d'autres projets d'énergies renouvelables .`
    },
    'Autoconsommation totale': {
        description: `Ce scénario vous montre la puissance maximale que vous pouvez installer tout en consommant 100% de l'électricité produite.`,
        financier: `Tout ce que vous produisez est consommé immédiatement, vous ne serez pas obligé de vous raccorder au réseau ENEDIS pour revendre l'éléctricité. Généralement cela permet de couvrir 10 à 15% des besoins (taux d'autoproduction) réduisant votre dépendance aux fournisseurs d'électricité. Si vous êtes à moins de 10% d'autoproduction avec ce scénario, ce n'est peut être pas la bonne option. Vous êtes à plus de 15% ? C'est sûrement une option intéressante en terme de rentabilité.`,
        environnement: `Consommer l'énergie que vous produisez réduit les pertes de transport et favorise l'indépendance énergétique.`
    },
    'BEPOS': {
        description: `Ce scénario détermine la puissance minimale à installer pour que votre bâtiment soit à énergie positive (BEPOS).`,
        financier: `Un bâtiment à énergie positive produit plus d'énergie qu'il n'en consomme en une année. Attention si vous utilisez une autre source d'énergie (bois, gaz etc.), cela ne fonctionne pas !`,
        environnement: `Votre bâtiment contribue activement à la réduction des émissions de CO2 et participe à l'indépendance énergétique.`
    },
    'Bénéfices totaux': {
        description: `Ce scénario vise à maximiser les bénéfices totaux sur une période de 20 ans, correspondant à la durée de votre contrat avec EDF Obligation d'Achat, qui achète l'électricité produite par vos panneaux.`,
        financier: `En maximisant les bénéfices, vous assurez un retour sur investissement élevé. Cela inclut les économies sur les factures d'électricité et les revenus de la revente d'électricité. Priviligiez cette option si vous avez une grosse capacité d'investissement.`,
        environnement: `Cette approche encourage la production continue d'énergie renouvelable sur une longue période, réduisant ainsi l'empreinte carbone.`
    },
    'Sécurité': {
        description: `Ce scénario de sécurité financière, mesuré par le Taux de Rendement Interne (TRI), vous indique le taux d'inflation annuel que votre projet peut supporter sans compromettre l'amortissement de votre investissement.`,
        financier: `Par exemple, avec un TRI de 5%, votre projet reste rentable même avec une inflation de 5% chaque année pendant 20 ans. Cela offre une assurance financière contre les fluctuations économiques.`,
        environnement: `Assurer la viabilité financière de votre projet à long terme signifie une contribution soutenue à la réduction des émissions de gaz à effet de serre.`
    }
};

export const INDICATEURS = [
    { key: 'amortissement', label: 'Amortissement', unit: 'ans' },
    { key: 'bilan_20_ans', label: 'Bilan sur 20 ans', unit: '€' },
    { key: 'autoconso', label: 'Auto-consommation', unit: '%' },
    { key: 'autoprod', label: 'Auto-production', unit: '%' },
    /* { key: 'tri', label: 'Taux de rendement interne (TRI)', unit: '%' }, */
];
