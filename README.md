# NodeJs && Express

Express è incentrato sulla gestione del routing, il routing sono gli url che si vanno ad inserire nell'app, e ogni url e una strada dedicata ad una risorsa.

#### Inizializzare un progetto Node.js

Per iniziallizzare un progetto di **Node.js** si esegue il comando

```bash
npm init -y
```

dalla finestra del terminale nella cartella del progetto. Questo comando crea un file **package.json** con le impostazioni predefinite.

#### Installare Express e Nodemon:

Per installare Express e Nodemon, esegui i comandi da una finestra del terminale nella cartella del progetto:

```bash
- npm install express --save
```

```bash
- npm install nodemon --save-dev
```

`--save` salva i pacchetti nel file **_package.json_** come dipendenze **_`"dependecies": {}`_**.

`--save-dev` salva i pachetti nel file **_package.json_** come dipendenza di sviluppo nel file, **_`"devDependecies":{}`_** poiché è una utility utile durante lo sviluppo ma non è necessaria in produzione.

#### Creare un file JavaScript

Creare un file JavaScript per il server Express (ad esempio index.js) e iniziare a scrivere il codice del server.

##### Avviare il server:

Per avviare il server, eseguire il file creato e codificato di JavaScript (index.js). usando **NodeJs** o **Nodemon**

con NodeJs:

```bash
node index.js
```

Con Nodemon:

```bash
nodemon index.js
```

Nodemon monitorerà automaticamente le modifiche ai file e riavvierà il server ogni volta che viene apportata una modifica, semplificando lo sviluppo.

#### Configurazione package.json

Aggiornare all'interno di `"scripts":{}` l'avviamento dell'app, con due script necessari all'interno del file **package.json**. Uno script servirà per avviare l'applicazione con node quando l'app sarà deployed to:

`"start": "node index.js",`

L'altro script sarà utile durante lo sviluppo e si userà l'avviamento con nodemon.

`"dev": "nodemon index.js"`

Per avviare node, nel terminale della cartella inserire il comando

```bash
npm start
```

Per avviare nodemon, nel terminale della cartella inserire il comando

```bash
npm run dev
```

## Codifica e Configurazione

### Sintassi

nel file **index.js** importiamo express usando una sintassi. Per importare Express esistono due diversi tipi di sintassi.

Nuova sintassi.

```bash
import express form 'express';
```

Vecchia sintassi.

```bash
const express = require('express');
```

### Configurazione

Per utilizzare la sistassi che importa express come modulo, nel file **package.json** implementiamo sotto `"main":"index.js"`

```bash
"type":"module"
```

### Importare e dichiarare express

Nel file di **index.js** dichiriamo una constante e gli implementiamo la funzione `express()`

```bash
const app = express();
```

Tutte le funzionalità di express le andremo ad agganciare alla constante a cui si farà riferimento.

### Porta server

dichiariamo una constante con la porta del server in ascolto che varia dal tipo di configurazione del server fatta.

```bash
const PORT = 3000
```

per mettere in ascolto express sulla porta del server e ascoltare le chiamate in arrivo, bisogna richiamare la funzionalità di express `listen` metterlo in ascolto nella porta del server online e richiamare una callback con le istruzioni.

```bash
app.listen(PORT, ()=>{ console.log(`Server running on port: ${PORT}`); })
```

### endpoint

Per gestire il routing dell'app servirà uno dei metodi **HTTP** uno di questi è il metodo **GET**.

### `GET`

Uno degli utilizzi che si può fare utilizzando express con il metodo GET principalmente è indirizzare la root all'homepage " **/** ". Facendo la chiamata ad una root, esiste la richiesta **req** e la risposta **res**

la **req** può comprendere una richiesta di dati o altro.

la **res** può comprendere la risposta che sarà visualizzata al front-end. Per mandare una risposta al front end si utilizza la funzionalità di express **_send_**.

```bash
app.get('/',(req,res) =>  res.send("Benvenuto nella homepage"))
```

#### Gestire le routers

Per sistemare le routes e solito ottimizzare la struttura organizzandole per argomento all'interno della cartella **routes**. Un argomento che si può trattare sono gli utenti, quindi i rout degli utenti saranno trattati all'interno del file **users.js**. nel file di **users.js** sarà necessario importare express utilizzando una delle due sintassi e dichiarare la costante implementando la funzionalità di express `Router()`.

```bash
const router = express.Router()
```

Impostiamo la gestione del router con la funzionalità **GET**.

```bash
router.get('/', (req,res) => res.send("Tutti gli utenti"))
```

In fine esportiamo la constante router

```bash
export default router
```

Nel file **index.js** importiamo la definizione data nel file di **user.js**.

```bash
import usersRoutes from './routes/users.js';
```

Per gestire il router del file **user.js** si utilizza la funzionalità di express `use()`.

```bash
app.use('/users', usersRoutes);
```

> lavorando in locale, riavviando node semplicemente solo salvando un file o aggiornando il codice. i dati inseriti con postman o altri fonti non saranno più in memoria. Questo non vale per i dati inseriti o presi nel **database**.

#### GET by ID

per chiamare un dato con un id univoco usando il metodo **GET** si utilizza il parametro `:id`. I due punti **_":"_** sta ad indicare che stiamo chiamando un paramentro dinamico. Per richiamare il parametro all'interno della chiamata **GET** si utilizza `params`. dichiarando una costante con un destructuring del parametro `id`, possiamo implementare l'oggetto `req.params`. quindi `const { id } = req.params`, stessa dicitura di `const id = req.params.id`.

```bash
router.get('/:id', (req, res) => {
    const { id } = req.params
    res.send(id);
})
```

> Per ricevere più parametri dall'oggetto JSON che arriva dalla richiesta possiamo >implementare i parametri dinamici nell'API e fare un destructuring dei parametri dal `req.>params`.
>
> ```bash
> router.get('/:id/:nome', (req, res) => {
>    const { id, nome } = req.params
>    res.send(`Received ID: ${id} and Name: ${nome}`);
> })
> ```

Per ricercare i dati dell'utente con l'id passato nei parametri possiamo implementera una funzionalità di javascript `find()` e cercare nell'oggetto **users** il corrispontende **id** che è **_==_** all'id che è passato nei parametri.

```bash
router.get('/:id', (req, res) =>{
    const { id } = req.params;
    const userFinded = users.find((user) => user.id == id);
    res.send(userFinded)
})
```

### `POST`

Uno degli utilizzi che si può fare con express utilizzando il metodo **POST**,
è l'aggiunta di dati sensibili. Si può utilizzare un richiesta al body nel file **user.js** per pescare i dati sensibili che arrivano dalla richiesta e aggiungerli all'oggetto JSON, in questo caso è `users`, utilizzando il metodo `push()` di javascript.

> [!INFO]
>
> per usare un identificatore univoco possiamo utilizzare uuid che è utilizzato per generare identificatori che sono unici. [Documentazione UUID](https://www.npmjs.com/package/uuid). Creare una constante e importare la funzionalità di uuid all'interno della richiesta post, `const id = uuidv4()` e associarlo ai dati che arrivano dalla richiesta tramite lo spread operator `const userWithID = { ...reqBody, id:id }`.

```bash
router.post('/',(req,res) => {
    const reqBody = req.body
    const id = uuidv4();
    const userWithID = { ...reqBody,id:id }
    users.push(userWithID)
    res.send(`L'utente con l'email ${reqBody.email} è stato aggiunto`)
    })
```

Nel file **index.js** si dovrà usare il middleware per gestire la richiesta `router.post()` che si fa nel file **users.js**.

```bash
app.use(express.json())
```

> Questo middleware consente di analizzare i dati JSON inviati tramite richieste HTTP e li converte in oggetti JavaScript, rendendoli disponibili nell'oggetto req.body.

### `DELETE`

Si può utilizzare il metodo **DELETE** con express quando si ha la necessita di eliminare un dato specifico, indicizzato dal parametro che passa tramite l'url API. Si può intervenire usando il metodo `filter` di javascript per creare un nuovo array di oggetti assegnando lo stesso nome dell'array di oggetti precedente, passando tutti i parametri, tranne quello indicizzato che arriva dalla richiesta.

```bash
router.delete('/:id', (req, res) =>{
    const { id } = req.params;
    users = users.filter((user) => user.id != id);
    res.send(`Utente con id ${id} è stato eliminato con successo !`)
})
```

> Quando si effettuano modifiche con delete o update all'oggetto dentro l'array, se l'oggetto è dichiarato nel codice, è importante dichiararlo come una variabile `let` e non come una constante `const` perchè potrebbe portare problemi o errori.
>
> ```bash
> let users = [
>   {
>        "nome": "Luca",
>        "cognome": "Rossi",
>        "email": "luca.rossi@gmail.com",
>        "id": "3637aed6-ea84-480c-b07e-faac4c4784d1"
>    },
>    {
>        "nome": "Luca",
>        "cognome": "Rossi",
>        "email": "luca.rossi@gmail.com",
>        "id": "3637aed6-ea84-480c-b07e-faac4c4784d1"
>    }
> ];
> ```

### `PATCH`

Il metodo **PATCH** con express permette di sovrascrivere il singolo dato. Viene comunemente utilizzato per modificare i dati presi dal locale o dal database. Si passa il parametro `id` dall'url API, ma in questo caso si mandano i dati da modificare prendendoli dalla decostruzione del `req.body`, facendo una verifica se questi esistono.

```bash
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { nome, cognome, email } = req.body;

  const user = users.find((user) => user.id == id);

  if (nome) user.nome = nome;
  if (cognome) user.cognome = cognome;
  if (email) user.email = email;

  res.send(`Utente con id ${id} è tato modificato con successo`);
});
```

>### [!I controller]
>
>Per ottimizzare il codice viene creata una cartella **controller**, al suo interno vengono creati dei file che indicizzano le operazioni da fare nelle varie rout implementandole a delle constanti da esporto per poi importarli nel file all'interno di **routes** che gli appartiene. **_Esempio nel codice._**


