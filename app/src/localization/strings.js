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
            startBtn: "Random deck!"
        },
        create: {
            missingCard: "Add a card!",
            chooseCards: "Choose cards:",
            finalizeBtn: "Finish!",
            averageCost: "Average cost"
        },
        FinishDeck: {
            header: "More informations!",
            close: "Finish",
            inputTitle: "Title",
            inputDesc: "Description",
            noTitleConfirm: "Insert a title!",
            noTitleConfirmSub: "Please."
        }
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
            startBtn: "Deck aléatoire!"
        },
        create: {
            missingCard: "Ajouter une carte!",
            chooseCards: "Choisissez des cartes:",
            finalizeBtn: "Terminer!",
            averageCost: "Coût moyen"
        },
        FinishDeck: {
            header: "Plus d'informations!",
            close: "Terminer",
            inputTitle: "Titre",
            inputDesc: "Description",
            noTitleConfirm: "Insérez un titre!",
            noTitleConfirmSub: "S'il vous plaît."
        }
    }
});

export default strings;
