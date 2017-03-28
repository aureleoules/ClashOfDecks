import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    en: {
        app: {
            name: "Clash Of Decks",
            desc: "The best Clash Royale deck builder!",
            author: "Aurèle Oulès"
        },
        nav: {
            home: "Home",
            submit: "Create",
            top: "Best"
        },
        home: {
            startBtn: "Generate a deck!"
        },
        create: {
            missingCard: "Add a card!",
            chooseCards: "Choose cards:",
            finalizeBtn: "Finish!"
        },
    },
    fr: {
        app: {
            name: "Clash Of Decks",
            desc: "Le meilleur générateur de deck Clash Royale!",
            author: "Aurèle Oulès"
        },
        nav: {
            home: "Accueil",
            submit: "Ajouter",
            top: "Meilleurs"
        },
        home: {
            startBtn: "Générer un deck!"
        },
        create: {
            missingCard: "Ajouter une carte!",
            chooseCards: "Choisissez des cartes:",
            finalizeBtn: "Terminer!"
        }
    }
});

export default strings;
