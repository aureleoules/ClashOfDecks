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
            top: "Best",
            searchPlaceHolder: "Search..."
        },
        home: {
            startBtn: "Random deck!"
        },
        create: {
            missingCard: "Add a card!",
            chooseCards: "Choose cards:",
            finalizeBtn: "Finish!",
            averageCost: "Average cost",
            orderBy: {
                elixirCost: "Order by Elixir cost",
                rarity: "Order by Rarity",
                arena: "Order by Arena",
                type: "Order by Type",
                name: "Order by Name"
            }
        },
        FinishDeck: {
            header: "More informations!",
            close: "Finish",
            inputTitle: "Title",
            inputDesc: "Description",
            noTitleConfirm: "Insert a title!",
            noTitleConfirmSub: "Please.",
            TypeOptions: {
                placeholder: "Type of deck",
                offensive: "Offensive",
                defensive: "Defensive",
                rush: "Rush",
                tank: "Tank",
                spawner: "Spawner",
                buildings: "Buildings",
                none: "None"
            }
        },
        search: {
            infos: {
                averageCost: "Average cost",
                arena: "Arena",
                title: "Title",
                description: "Description",
                type: "Type"
            },
            moreInfos: "More infos",
            noDeck: "There is no deck..."
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
            top: "Meilleurs",
            searchPlaceHolder: "Rechercher..."
        },
        home: {
            startBtn: "Deck aléatoire!"
        },
        create: {
            missingCard: "Ajouter une carte!",
            chooseCards: "Choisissez des cartes:",
            finalizeBtn: "Terminer!",
            averageCost: "Coût moyen",
            orderBy: {
                elixirCost: "Trier par coût d'Elixir",
                rarity: "Trier par rareté",
                arena: "Trier par arène",
                type: "Trier par type",
                name: "Trier par nom"
            }
        },
        FinishDeck: {
            header: "Plus d'informations!",
            close: "Terminer",
            inputTitle: "Titre",
            inputDesc: "Description",
            noTitleConfirm: "Insérez un titre!",
            noTitleConfirmSub: "S'il vous plaît.",
            TypeOptions: {
                placeholder: "Type de deck",
                offensive: "Offensif",
                defensive: "Defensif",
                rush: "Rush",
                tank: "Tank",
                spawner: "Spawner",
                buildings: "Bâtiments",
                none: "Aucun"
            }
        },
        search: {
            infos: {
                averageCost: "Coût moyen",
                arena: "Arène",
                title: "Titre",
                description: "Description",
                type: "Type"
            },
            moreInfos: "Plus d'infos",
            noDeck: "Il n'y a aucun deck..."
        }
    }
});

export default strings;