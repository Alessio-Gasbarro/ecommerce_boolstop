export const Data = {
    mostWanted: Array.from({ length: 8 }, (_, i) => ({
        title: `Gioco ${i + 1}`,
        image: `https://picsum.photos/seed/most${i + 1}/300/200`,
    })),
    newArrivals: Array.from({ length: 4 }, (_, i) => ({
        title: `New ${i + 1}`,
        image: `https://picsum.photos/seed/new${i + 1}/300/200`,
    })),
    highlights: [
        {
            title: 'Scopri le nostre offerte',
            text: 'Offerte esclusive solo per veri gamer!',
            image: 'https://picsum.photos/seed/offerte/400/250',
        },
        {
            title: 'Merch ufficiale',
            text: 'Solo prodotti originali e con licenza.',
            image: 'https://picsum.photos/seed/merch2/400/250',
        },
        {
            title: 'Nuove uscite ogni settimana',
            text: 'Tieniti aggiornato con le novità.',
            image: 'https://picsum.photos/seed/novita/400/250',
        },
    ],
};

export const mostWanted = [
    { title: 'ELDEN RING NIGHTREIGN', price: 30.99, originalPrice: 39.99, discount: 23, image: 'https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg?t=1654259241' },
    { title: 'Dead by Daylight', price: 7.88, originalPrice: 19.99, discount: 61, image: 'https://cdn.akamai.steamstatic.com/steam/apps/381210/header.jpg?t=1665524494' },
    { title: 'Claire Obscur: Expedition 33', price: 53.55, originalPrice: 69.99, discount: 23, image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1903340/be3305b02d4db0dffa3458537118423bf2792d7e/header.jpg?t=1749620180' },
    { title: 'Dark Souls 3', price: 20.05, originalPrice: 24.99, discount: 20, image: 'https://cdn.akamai.steamstatic.com/steam/apps/374320/header.jpg?t=1661484182' },
    { title: 'The Last of Us Part I', price: 24.20, originalPrice: 59.99, discount: 60, image: 'https://cdn.akamai.steamstatic.com/steam/apps/1888930/header.jpg?t=1680282721' },
    { title: 'The Elder Scrolls: Online', price: 10.75, originalPrice: 26.99, discount: 60, image: 'https://cdn.akamai.steamstatic.com/steam/apps/306130/header.jpg?t=1664476840' },
    { title: 'Baldurs Gate 3', price: 69.99, originalPrice: 89.99, discount: 22, image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/48a2fcbda8565bb45025e98fd8ebde8a7203f6a0/header.jpg?t=1748346026' },
    { title: 'Helldivers 2', price: 12.09, originalPrice: 34.99, discount: 65, image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/553850/6a629d747768128d768a7e05a042adeb558d1f85/header.jpg?t=1748015354' },
];

export const newArrivals = [
    { title: 'Dune Awakening', price: 49.99, image: 'https://cdn.akamai.steamstatic.com/steam/apps/1172710/header.jpg?t=1661520931' },
    { title: 'Stellar Blade', price: 49.99, image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3489700/header.jpg?t=1749683596' },
    { title: 'Avowed', price: 24.99, image: 'https://cdn.akamai.steamstatic.com/steam/apps/2457220/header.jpg?t=1705610416' },
    { title: 'Civilization VII', price: 42.99, image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1295660/header.jpg?t=1717795076' }
]

export const discoverMore = [
    { title: 'Offerte a tempo', text: 'Approfitta degli sconti esclusivi prima che finiscano.' },
    { title: 'Nuove Uscite', text: 'Scopri i titoli più attesi appena pubblicati.' },
    { title: 'Collezionabili', text: 'Espandi la tua collezione con prodotti unici.' },
];