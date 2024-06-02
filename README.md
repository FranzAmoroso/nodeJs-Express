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

> INFO
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

> ### I controller
>
> Per ottimizzare il codice viene creata una cartella **controller**, al suo interno vengono creati dei file che indicizzano le operazioni da fare nelle varie rout implementandole a delle constanti da esporto per poi importarli nel file all'interno di **routes** che gli appartiene. **_Esempio nel codice._**

# MongoDB

Per installare mongoDB nell'ultima versione, bisogna avere il supporto nel processore di AVX .
La versione compatibile senza il supporto AVX è prima la 5.0, quindi mongoDB 4.4

> **ATTENZIONE**
>
> Prima di procedere assicurarsi di avere il supporto _AVX_ nel processore, tuttavia si può procedere senza il supporto _AVX_ installando mongo 4.4 , **quindi cambiare la versione data dalla 7.0.11 alla versione 4.4 nella documentazione e negli script.**

## windows

1. Installazione di MongoDB

   - Scaricare l'installer di MongoDB sul sito ufficiale di [MongoDB](https://www.mongodb.com/try/download/community)

   - Accetta i termini e condizioni.
   - Seleziona la configurazione completa (Complete).
   - Spunta l'opzione "Install MongoDB as a Service" se vuoi che MongoDB venga eseguito come un servizio di Windows.
   - Prosegui con l'installazione fino al completamento.
   - Trova la directory di installazione di MongoDB (tipicamente **_C:\Program Files\MongoDB\Server\<version>\bin_**).

   > Creare la cartella mongo-data per proseguire su **_linux_** e **_macOS_**
   >
   > ```bash
   >   mkdir -p ~/mongo-data
   > ```
   >
   > Per proseguire su **_windows_**
   >
   > ```bash
   >  mkdir C:\Users\YourUsername\mongo-data
   > ```

2. Creazione di una cartella per i dati del database

   - Aprire il prompt dei comandi o powerShell
   - Creare una cartella per i dati del database MongoDB

   ```bash
   mkdir C:\data\db
   ```

3. Dopo l'installazione, assicurarsi di avere la directory di MongoDB al **_PATH di sistema_** per poter eseguire i comandi di MongoDB da qualsiasi posizione nel prompt dei comandi.

   - Premi Win + X e seleziona "Sistema".
   - Clicca su "Impostazioni avanzate di sistema".
   - Nella finestra di dialogo "Proprietà del sistema", clicca su "Variabili d'ambiente".
   - Nella sezione "Variabili di sistema", trova e seleziona la variabile Path, quindi clicca su "Modifica".
   - Clicca su "Nuovo" e incolla il percorso della directory bin di MongoDB.
   - Clicca su "OK" per chiudere tutte le finestre di dialogo.

## Linux

1. Aggiungere la repository di MOngoDB all lista di repository usando il comando

   ```bash
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -sc)/mongodb-org/7.0.11 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.11.list
   ```

2. Importare la chiave del repository di MongoDB

   ```bash
   wget -qO - https://www.mongodb.org/static/pgp/server-7.0.11.asc | sudo apt-key add -
   ```

3. Aggiornare l'elenco dei pachetti e installazione di MongoDB

   ```bash
    sudo apt.get update
    sudo apt-get install -y mongodb-org
   ```

## Mac

1. Installare MongoDB utilizzzando Homebrew con il comando

   ```bash
   brew tap mongodb/brew
   brew install mongodb-community@7.0.11
   ```

## Docker

Il comando fornito scarica l'immagine MongoDB ultima versione da Docker Hub se non è già presente localmente.
Crea un container chiamato "my-mongodb".
Mappa la porta 27017 del container alla porta 27017 del tuo host.
Monta la directory ~/mongo-data sulla directory /data/db del container per persistere i dati.

### Linux e MacOS

```bash
docker run -d -p 27017:27017 --name my-mongodb -v ~/mongo-data:/data/db mongo:latest
```

#### Connettersi a MongoDB nel Container Docker

```bash
docker exec -it my-mongodb mongo
```

#### Creare Database

```bash
use myDatabase
```

#### Creare collezioni

```bash
db.createCollectio("myCollection")
```

### Windows

```bash
docker run -d -p 27017:27017 --name my-mongodb -v C:\path\to\mongo-data:/data/db mongo:latest
```

## Mongoose e CORS

Per proseguire ad utilizzare mongoDB nel progetto bisogna installare nella route del progetto `mongoose` e `cors`.
Mongoose è il pacchetto che ci permette di lavorare direttamente con mongoDB. Mongoose ci da una serie di funzionalità aggiuntive e di base ci fa da interfaccia, ci fa da livello tra mongodb e node.
CORS ci permette di gestire le chiamate cross-origin.

```bash
npm install mongoose cors
```

Eseguita l'installazione dei pachetti bisgona importarli nel file `index.js`.

```bash
import mongoose from "mongoose";
import cors from "cors";
```

Importato **CORS** bisogna chiamarlo una sola volta nel file `index.js`

```bash
app.use(cors());
```

Successivamente dichiariamo una constante per inserirgli **_URL del DB_** di mongoDB , in questo caso in locale. e dopo usiamo `mongoose` per connettere il progetto al db di mongo. Una volta connesso al DB, mandiamo il progetto in ascolto sulla porto dichiarata.

```bash
const CONNECT_URL = 'mognodb:localhost:27017/nameDB';
mongoose.connect(CONNECT_URL);
.then(() =>{
    app.listen(PORT, () =>{
        console.log(`server running on port ${PORT}`);
    })
})
.catch(error => console.error(error));
```

## Creare un modello dati

mongoDB acetta qualsiasi document, dati non strutturati, in confronto a MySQL che accetta dato strutturati.
se non si sta attenti si potrebbero mandare dei dati che non sono consistenti in cui mongo non darebbe problemi, ma potrebbe essere un problema sopratutto per la parte del front-end, quindi `mongoose` tra le varie cose, da la possibilità di dare un minimo di consistenza ai dati.

Per creare un model si crea una cartella per _best pratice_ chiamata models in cui all'interno ci saranno i vari model. Nel nostro caso all'interno della directory models creiamo un file `user.js` in cui all'interno importiamo `mongoose`

```bash
import mongoose from 'mongoose';
```

Dichiariamo uno schema all'interno di una constante usando mongoose e lo tipiziamo. In questo caso lo creaiamo per l'utente. il require non è obbligatorio, se non va inserito, di default sarà false. Dopo lo schema si può decidere se gestire automaticamente il `timestamps`, se anche questo non va inserito di default sarà false. Tuttavia potrà servire in certe circostanze.

```bash
const userSchema = mongoose.Schema({
    nome:{
        type: String,
        require:true,
    },
    cognome:{
        type: String,
        require: true,
    },
    email:{
        type : String,
        require: true,
    }
}, {timestamps:true})
```

In fine chiameremo il model dal mongoose inserendo il nome del model e lo schema esportandolo

```bash
export const User = mongoose.model('User', userSchema)
```

## insert data sul DB

Importiamo il model User nella directory `/controller/users.js`

```bash
import { User } from '../model/users.js';
```

Successivamente nell controller dichiariamo una constante implementandola di un nuovo modello riempiendolo dei dati che arrivano dal body, che in questo caso sono i dati dell'user. Successicamente gestiamo con il blocco **_try{}catch(){}_** La creazione restituirà un codice di stato 201. **_Mongoose, al momento della creazione del nuovo documento, utilizzerà il nome del modello per inserirlo nella collection, che avrà come nome, secondo mongoose, il plurale del modello._** In caso di errore, sarà restituito un codice di stato 409. La funzione sarà dichiarata come asincrona.

```bash
export const insertUser = async (req, res) => {
  const reqBody = req.body;
  const newUser = new User(reqBody)
  try{
     await newUser.save();
     res.status(201).json(newUser)
  }catch(error){
    res.status(409).json({message:error.message})
  }
};
```

Inserendo il nuovo utente nel database su mongoDB nell'oggetto dei dati appartenente all'utente ci sarà un `ObjectId()` che è rapresentato da `_id` univoco assegnato da mongoDB. Ci sarà pure `createdAt` che rappresenta quando il documento è stato creato che resterà invariato e `updatedAt` che si aggiornerà ogni volta che verranno effettuate delle modifiche al documento. Questa funzionalità c'è perchè il timestamps nello schema è abilitato.

## GetAll && GetByID

Per ritornare tutti i dati dal database implementiamo nel controller asyncrono il metodo `find()` nel model `User()`. e successivamente ritorniamo il tutto con uno status code 200 in json. Nel caso in cui ci sarà un errore allora ritorniamo un _Not found_ quindi un codice di stato 404.

```bash
export const readAllUser = async (req.res) => {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (error) {
        res.send(404).json({message: error.message})
    }
}
```

Per ritornare un semplice utente il passaggio è analogo, cambia che il metodo find questa volta utilizza `id` ritornato dal `req.params` e lo implementa nel metodo `findById()`.

```bash
export const readUserById = async (req, res) =>{
    const { id } = req.params;
    const user = await User.findById(id);
    try {
        res.status(200).json(user);
    } catch(error){
        res.send(404).json({message:error.message})
    }
}
```

Per inserire un controllo di conformità dell'id, si può implementare questa condizione.

```bash
if(!mongoose.Types.ObjectId.isValid(id)) return res.send(404).json({message:'id non conforme'});
```

> se vogliamo usare la nomenclatura dell'id di mongoDB cioè \_id, bisogna passare all'id, la nomenclatura dell'id di mongo quando lo dichiariamo.
>
> ```bash
> const { id: _id } = req.params
> ```
>
> Successivamente possiamo usare la nuova nomenclatura data per l'id.

## Delete

Per eliminare uno specifico dato, in questo caso un utene, bisogna utilizzare il metodo di moongoose `findByIdAndDelete()`.

```bash
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message: 'id non conforme'});

    try{
        await User.findByIdAndDelete(id);
        res.status(200).json({message: "Utente eliminato con successo !"})
    } catch(error){
        res.status(404).json({mesage:error.message})
    }
}
```

## Update

Per fare update dei data nel db dobbiamo utilizzare la funzionalità di mongoose `findByIdAndUpdate()`, passando due parametri, il primo è **id** e il secondo sono i data che andremo a modificare che arriveranno dal body `data`. Per fare in modo che rimandi sempre l'ogetto aggiornato ogni volta dopo un aggiornamento, possiamo implementare sulla funzionalità `finByIdAndUpdate()` l'oggetto **_`{new: true}`_**. 

```bash
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const data = { ...req.body }

    if(!mongoose.Types.ObjectId.isValid(id)) return res.satuts(404).json({message: 'id non valido'});

    try{
        const user = await User.findByIdAndUpdate(id, data, {new:true});
        res.status(200).json(user)
    }catch(error){
        res.send(404).json({message:error.message})
    }
}
```
