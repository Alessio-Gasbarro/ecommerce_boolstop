const express = require('express'); // Importo express per creare il router
const router = express.Router(); // Creo un router per gestire le rotte dei giochi
const gameController = require('../controllers/gameController'); // Importo il controller dei giochi

// Tutte le route sono prefissate con /api/games

// GET - Recuperare tutti i giochi (senza paginazione)
router.get('/all', gameController.getAll); // http://localhost:3000/api/games/

// GET - Ricerca giochi per fascia di prezzo crescente
router.get('/price-range', gameController.getByPriceRange); //http://localhost:3000/api/games/price-range  OPPURE SE VUOI AVERE UN RANGE DI PREZZO SPECIFICO PUOI USARE http://localhost:3000/api/games/price-range?min=10&max=50 DOVE I NUMERI SU MIN E MAX SONO I PREZZI MINIMO E MASSIMO CHE VUOI RICERCARE

// GET - Ricerca giochi in offerta
router.get('/discounted', gameController.getDiscounted); //http://localhost:3000/api/games/discounted

// GET - Recuperare un gioco specifico tramite genere
router.get('/genre/:genre', gameController.sortByGenre); //http://localhost:3000/api/games/genre/"Inserire il genere"

// Get - Ricerca unificata per offerta e genere
router.get('/search', gameController.searchGames); //http://localhost:3000/api/games/search?genre=RPG&discounted=true  SOSTITUISCI RPG CON IL GENERE CHE VUOI RICERCARE E TRUE CON FALSE SE NON VUOI I GIOCHI IN OFFERTA

// GET - Recuperare i nuovi arrivi
router.get('/new-releases', gameController.getNewReleases); //http://localhost:3000/api/games/new-releases?limit=4 Recupera i primi 4 giochi aggiunti di recente. Puoi cambiare il numero di giochi cambiando il valore di limit nell'URL.

// GET - Vecchie rotte prima di unificare la ricerca avanzata
// router.get('/order', gameController.orderGames);
// router.get('/order/:type', gameController.orderGames);
// router.get('/autocomplete', gameController.searchAutocomplete);

// GET - Rotta unificata per ricerca avanzata (include ordinamento e autocomplete)
router.get('/advanced-search', gameController.advancedSearch);

// Esempi di utilizzo:
// http://localhost:3000/api/games/advanced-search?term=M (autocomplete)
// http://localhost:3000/api/games/advanced-search?orderBy=title&direction=asc (A-Z)
// http://localhost:3000/api/games/advanced-search?orderBy=title&direction=desc (Z-A)
// http://localhost:3000/api/games/advanced-search?orderBy=price&direction=asc (prezzo crescente)
// http://localhost:3000/api/games/advanced-search?orderBy=release_date&direction=desc (più recenti)
// Puoi combinare i parametri:
// http://localhost:3000/api/games/advanced-search?term=M&orderBy=price&direction=asc

// GET - Recuperare tutti i giochi (paginazione)
router.get('/', gameController.index);
// http://localhost:3000/api/games?page=1&perPage=9
//Sostituisci il 9 con il numero di prodotti che vuoi visualizzare per pagina (valori consentiti: 9, 18, 27, 36). Se non specifichi il parametro perPage, verrà utilizzato il valore predefinito di 9.
// http://localhost:3000/api/games?perPage=27&page=2 perPage=27 e page=2 significa che vuoi visualizzare 27 prodotti per pagina e stai richiedendo la seconda pagina dei risultati.
// Parametri supportati:
//   - page: numero di pagina (default: 1)
//   - perPage: prodotti per pagina (valori consentiti: 9, 18, 27, 36, default: 9)


// GET - Recuperare un gioco specifico tramite ID (DEVE STARE DOPO TUTTE LE ROTTE SPECIFICHE)
// router.get('/:id', gameController.show); // http://localhost:3000/api/games/10
//Commentata la rotta sopra perché ora vogliamo usare gli slug invece degli id per recuperare i giochi.

//  GET - Modifica della rotta sopra per implementare gli slug
router.get('/:slug', gameController.show); // http://localhost:3000/api/games/10
//Se si vuole fare una ricerca più specifica, si può usare lo slug del gioco invece dell'id. Ad esempio, se il gioco ha uno slug come "the-legend-of-zelda", la rotta sarà http://localhost:3000/api/games/the-legend-of-zelda

// POST - Aggiungere nuovo ordine
router.post('/', gameController.store); //http://localhost:3000/api/games  NEL BODY DELLA RICHIESTA DEVI INSERIRE I DATI DEL GIOCO CHE VUOI AGGIUNGERE IN FORMATO JSON CON: TOTAL_PRICE,SHIPMENT_PRICE,STATUS,NAME,SURNAME,ADDRESS,EMAIL,PHONE,PRODUCTS (QUEST'ULTIMO È UN ARRAY DI OGGETTI CON ID E QUANTITY)

// Ecco un esempio  per fare un check su postman:
// {
//   "total_price": 159.99,
//   "shipment_price": 4.99,
//   "status": "pending",
//   "name": "Mario",
//   "surname": "Rossi",
//   "address": "Via Roma 123, Milano",
//   "email": "mario.rossi@example.com",
//   "phone": "3491234567",
//   "items": [
//     {
//       "id_product": 1,
//       "quantity": 1
//     },
//     {
//       "id_product": 2,
//       "quantity": 2
//     }
//   ]
// }
//}

module.exports = router;