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

```javascript
import express form 'express';
```

Vecchia sintassi.

```javascript
const express = require("express");
```

### Configurazione

Per utilizzare la sistassi che importa express come modulo, nel file **package.json** implementiamo sotto `"main":"index.js"`

```json
"type":"module"
```

### Importare e dichiarare express

Nel file di **index.js** dichiriamo una constante e gli implementiamo la funzione `express()`

```javascript
const app = express();
```

Tutte le funzionalità di express le andremo ad agganciare alla constante a cui si farà riferimento.

### Porta server

dichiariamo una constante con la porta del server in ascolto che varia dal tipo di configurazione del server fatta.

```javascript
const PORT = 3000;
```

per mettere in ascolto express sulla porta del server e ascoltare le chiamate in arrivo, bisogna richiamare la funzionalità di express `listen` metterlo in ascolto nella porta del server online e richiamare una callback con le istruzioni.

```javascript
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
```

### endpoint

Per gestire il routing dell'app servirà uno dei metodi **HTTP** uno di questi è il metodo **GET**.

### `GET`

Uno degli utilizzi che si può fare utilizzando express con il metodo GET principalmente è indirizzare la root all'homepage " **/** ". Facendo la chiamata ad una root, esiste la richiesta **req** e la risposta **res**

la **req** può comprendere una richiesta di dati o altro.

la **res** può comprendere la risposta che sarà visualizzata al front-end. Per mandare una risposta al front end si utilizza la funzionalità di express **_send_**.

```javascript
app.get("/", (req, res) => res.send("Benvenuto nella homepage"));
```

#### Gestire le routers

Per sistemare le routes e solito ottimizzare la struttura organizzandole per argomento all'interno della cartella **routes**. Un argomento che si può trattare sono gli utenti, quindi i rout degli utenti saranno trattati all'interno del file **users.js**. nel file di **users.js** sarà necessario importare express utilizzando una delle due sintassi e dichiarare la costante implementando la funzionalità di express `Router()`.

```javascript
const router = express.Router();
```

Impostiamo la gestione del router con la funzionalità **GET**.

```javascript
router.get("/", (req, res) => res.send("Tutti gli utenti"));
```

In fine esportiamo la constante router

```javascript
export default router;
```

Nel file **index.js** importiamo la definizione data nel file di **user.js**.

```javascript
import usersRoutes from "./routes/users.js";
```

Per gestire il router del file **user.js** si utilizza la funzionalità di express `use()`.

```javascript
app.use("/users", usersRoutes);
```

> lavorando in locale, riavviando node semplicemente solo salvando un file o aggiornando il codice. i dati inseriti con postman o altri fonti non saranno più in memoria. Questo non vale per i dati inseriti o presi nel **database**.

#### GET by ID

per chiamare un dato con un id univoco usando il metodo **GET** si utilizza il parametro `:id`. I due punti **_":"_** sta ad indicare che stiamo chiamando un paramentro dinamico. Per richiamare il parametro all'interno della chiamata **GET** si utilizza `params`. dichiarando una costante con un destructuring del parametro `id`, possiamo implementare l'oggetto `req.params`. quindi `const { id } = req.params`, stessa dicitura di `const id = req.params.id`.

```javascript
router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.send(id);
});
```

> Per ricevere più parametri dall'oggetto JSON che arriva dalla richiesta possiamo >implementare i parametri dinamici nell'API e fare un destructuring dei parametri dal `req.>params`.
>
> ```javascript
> router.get("/:id/:nome", (req, res) => {
>   const { id, nome } = req.params;
>   res.send(`Received ID: ${id} and Name: ${nome}`);
> });
> ```

Per ricercare i dati dell'utente con l'id passato nei parametri possiamo implementera una funzionalità di javascript `find()` e cercare nell'oggetto **users** il corrispontende **id** che è **_==_** all'id che è passato nei parametri.

```javascript
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const userFinded = users.find((user) => user.id == id);
  res.send(userFinded);
});
```

### `POST`

Uno degli utilizzi che si può fare con express utilizzando il metodo **POST**,
è l'aggiunta di dati sensibili. Si può utilizzare un richiesta al body nel file **user.js** per pescare i dati sensibili che arrivano dalla richiesta e aggiungerli all'oggetto JSON, in questo caso è `users`, utilizzando il metodo `push()` di javascript.

> INFO
>
> per usare un identificatore univoco possiamo utilizzare uuid che è utilizzato per generare identificatori che sono unici. [Documentazione UUID](https://www.npmjs.com/package/uuid). Creare una constante e importare la funzionalità di uuid all'interno della richiesta post, `const id = uuidv4()` e associarlo ai dati che arrivano dalla richiesta tramite lo spread operator `const userWithID = { ...reqBody, id:id }`.

```javascript
router.post("/", (req, res) => {
  const reqBody = req.body;
  const id = uuidv4();
  const userWithID = { ...reqBody, id: id };
  users.push(userWithID);
  res.send(`L'utente con l'email ${reqBody.email} è stato aggiunto`);
});
```

Nel file **index.js** si dovrà usare il middleware per gestire la richiesta `router.post()` che si fa nel file **users.js**.

```javascript
app.use(express.json());
```

> Questo middleware consente di analizzare i dati JSON inviati tramite richieste HTTP e li converte in oggetti JavaScript, rendendoli disponibili nell'oggetto req.body.

### `DELETE`

Si può utilizzare il metodo **DELETE** con express quando si ha la necessita di eliminare un dato specifico, indicizzato dal parametro che passa tramite l'url API. Si può intervenire usando il metodo `filter` di javascript per creare un nuovo array di oggetti assegnando lo stesso nome dell'array di oggetti precedente, passando tutti i parametri, tranne quello indicizzato che arriva dalla richiesta.

```javascript
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  users = users.filter((user) => user.id != id);
  res.send(`Utente con id ${id} è stato eliminato con successo !`);
});
```

> Quando si effettuano modifiche con delete o update all'oggetto dentro l'array, se l'oggetto è dichiarato nel codice, è importante dichiararlo come una variabile `let` e non come una constante `const` perchè potrebbe portare problemi o errori.
>
> ```javascript
> let users = [
>   {
>     nome: "Luca",
>     cognome: "Rossi",
>     email: "luca.rossi@gmail.com",
>     id: "3637aed6-ea84-480c-b07e-faac4c4784d1",
>   },
>   {
>     nome: "Luca",
>     cognome: "Rossi",
>     email: "luca.rossi@gmail.com",
>     id: "3637aed6-ea84-480c-b07e-faac4c4784d1",
>   },
> ];
> ```

### `PATCH`

Il metodo **PATCH** con express permette di sovrascrivere il singolo dato. Viene comunemente utilizzato per modificare i dati presi dal locale o dal database. Si passa il parametro `id` dall'url API, ma in questo caso si mandano i dati da modificare prendendoli dalla decostruzione del `req.body`, facendo una verifica se questi esistono.

```javascript
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

```javascript
import mongoose from "mongoose";
import cors from "cors";
```

Importato **CORS** bisogna chiamarlo una sola volta nel file `index.js`

```javascript
app.use(cors());
```

Successivamente dichiariamo una constante per inserirgli **_URL del DB_** di mongoDB , in questo caso in locale. e dopo usiamo `mongoose` per connettere il progetto al db di mongo. Una volta connesso al DB, mandiamo il progetto in ascolto sulla porto dichiarata.

```javascript
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

```javascript
import mongoose from "mongoose";
```

Dichiariamo uno schema all'interno di una constante usando mongoose e lo tipiziamo. In questo caso lo creaiamo per l'utente. il require non è obbligatorio, se non va inserito, di default sarà false. Dopo lo schema si può decidere se gestire automaticamente il `timestamps`, se anche questo non va inserito di default sarà false. Tuttavia potrà servire in certe circostanze.

```javascript
const userSchema = mongoose.Schema(
  {
    nome: {
      type: String,
      require: true,
    },
    cognome: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
```

In fine chiameremo il model dal mongoose inserendo il nome del model e lo schema esportandolo

```javascript
export const User = mongoose.model("User", userSchema);
```

## insert data sul DB

Importiamo il model User nella directory `/controller/users.js`

```javascript
import { User } from "../model/users.js";
```

Successivamente nell controller dichiariamo una constante implementandola di un nuovo modello riempiendolo dei dati che arrivano dal body, che in questo caso sono i dati dell'user. Successicamente gestiamo con il blocco **_try{}catch(){}_** La creazione restituirà un codice di stato 201. **_Mongoose, al momento della creazione del nuovo documento, utilizzerà il nome del modello per inserirlo nella collection, che avrà come nome, secondo mongoose, il plurale del modello._** In caso di errore, sarà restituito un codice di stato 409. La funzione sarà dichiarata come asincrona.

```javascript
export const insertUser = async (req, res) => {
  const reqBody = req.body;
  const newUser = new User(reqBody);
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
```

Inserendo il nuovo utente nel database su mongoDB nell'oggetto dei dati appartenente all'utente ci sarà un `ObjectId()` che è rapresentato da `_id` univoco assegnato da mongoDB. Ci sarà pure `createdAt` che rappresenta quando il documento è stato creato che resterà invariato e `updatedAt` che si aggiornerà ogni volta che verranno effettuate delle modifiche al documento. Questa funzionalità c'è perchè il timestamps nello schema è abilitato.

## GetAll && GetByID

Per ritornare tutti i dati dal database implementiamo nel controller asyncrono il metodo `find()` nel model `User()`. e successivamente ritorniamo il tutto con uno status code 200 in json. Nel caso in cui ci sarà un errore allora ritorniamo un _Not found_ quindi un codice di stato 404.

```javascript
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

```javascript
export const readUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  try {
    res.status(200).json(user);
  } catch (error) {
    res.send(404).json({ message: error.message });
  }
};
```

Per inserire un controllo di conformità dell'id, si può implementare questa condizione.

```javascript
if (!mongoose.Types.ObjectId.isValid(id))
  return res.send(404).json({ message: "id non conforme" });
```

> se vogliamo usare la nomenclatura dell'id di mongoDB cioè \_id, bisogna passare all'id, la nomenclatura dell'id di mongo quando lo dichiariamo.
>
> ```javascript
> const { id: _id } = req.params;
> ```
>
> Successivamente possiamo usare la nuova nomenclatura data per l'id.

## Delete

Per eliminare uno specifico dato, in questo caso un utene, bisogna utilizzare il metodo di moongoose `findByIdAndDelete()`.

```javascript
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "id non conforme" });

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "Utente eliminato con successo !" });
  } catch (error) {
    res.status(404).json({ mesage: error.message });
  }
};
```

## Update

Per fare update dei data nel db dobbiamo utilizzare la funzionalità di mongoose `findByIdAndUpdate()`, passando due parametri, il primo è **id** e il secondo sono i data che andremo a modificare che arriveranno dal body `data`. Per fare in modo che rimandi sempre l'ogetto aggiornato ogni volta dopo un aggiornamento, possiamo implementare sulla funzionalità `finByIdAndUpdate()` l'oggetto **_`{new: true}`_**.

```javascript
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const data = { ...req.body };

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.satuts(404).json({ message: "id non valido" });

  try {
    const user = await User.findByIdAndUpdate(id, data, { new: true });
    res.status(200).json(user);
  } catch (error) {
    res.send(404).json({ message: error.message });
  }
};
```

# Autenticazione

## Registraazione

nel file all'interno del modulo definiamo o aggiorniamo lo schema di mongoose aggiungendo o modificando il modul

```javascript
import mongoose from "mongoose";

export const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.modul("User", userSchema);
```

la definizione `unique:true` sta per rendere univoco il dato.

Creiamo il file **auth.js** (authorization) all'interno di controller e routes, in questo file si gestirà la registrazione utente, login ed eventuali altre situazioni come JWT.
all'interno del file **auth.js** dentro la cartella router, si gestiranno i route , quindi si dovrà importare express, definire una constante e implementarla del metodo `express.Route()` e successivamente richiamare i metodi all'interno delle route dal file **auth.js** all'interno di controller

```javascript
import express from "express";
import { register } from "../controller/auth.js";

const router = express.Router();

router.get("/register", register);

export default router;
```

Aggiungiamo la definizione di register con la richiesta e la risposta all'interno del file **auth.js** nella cartella dei controller facendo in modo di fare le verifiche necessarie ma soprattuto se è presente una password bisogna criptarla anche se successivamente la inseriamo dentro il databse. Installando il pkg **bycriptjs** con il comando `npm i bcriptjs`. per criptare un dato con la libreria **bcryptjs** bisogna richiamare la funzionalità `hash()` con all'interno il dato da criptare e il parametro che può essere una parola da mischiare con il dato da criptare o un numero che è il numero d iterazione per criptare il dato. Consigliato inserire un numero da 10 a 15.

```javascript
const passwordHashed = await bcrypt.hash(password, 10);
```

questo genererà una stringa incomprensibile, è possibile decriptarla ma è altamente improbabile.

successivamente creiamo un nuovo model User, e gli inseriamo i parametri presi dal body, definiamo il parametro password con la password criptata e successivamente salviamo il nuovo utente

```javascript
export const register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || typeof username != "string") {
    return res.json({ status: "error", message: "Username non valido" });
  }

  if (!password || typeof password != "string") {
    return res.json({ status: "error", message: "Password non valida" });
  }

  if (password.length < 8) {
    return res.json({
      status: "error",
      message: "Password minimo di 8 caratteri",
    });
  }

  const passwordHashed = await bcrypt.hash(password, 10);
  const user = new User({ username: username, password: passwordHashed });

  try {
    await user.save();
    res.status(201).json({ status: "ok" });
  } catch (error) {
    res.status(409).json({ status: "error", message: error.message });
  }
};
```

## Login

Nel file di `auth.js` all'interno della cartella **routes** si dovrà importare il callback login e creare una nuova route.

```javascript
import express from "express";
import { register, login } from "../controllers/auth.js";

const router = express.Route();

router.post("/register", register);
router.post("/login", login);

export default router;
```

Nel file `auth.js` all'interno della cartella **controller** definiamo login esportandola implementandogli una richiesta e una risposta, al quale prenderà i parametri _username_ e _password_ dal body con una richiesta. Con la funzionalità `findOne()` cercheremo il parametro _username_ arrivato dal body nel modul, in questo caso _User_.

```javascript
const user = await User.findOne(username);
```

Implementiamo un controllo se il dato arrivato che stiamo cercando esiste nel modul.

```javascript
if (!username)
  return res
    .status(404)
    .json({ status: "error", message: "Utente o password errata" });
```

Se il dato esiste allora si decripta la password con la funzionalità di _bcrypt_ `compare()` inserendo come primo parametro la password presa dal req.body e la password da decriptare.

```javascript
await bcrypt.compare(passsword, user.password);
```

Una volta decriptata servirà generare un token, si potrà utilizzare il pkg **[JWT](https://jwt.io/libraries)**. Si drovà importare ed utilizzare la funzionalità `sign()`, all'interno verrà inserito il payload, dove non si dovranno inserire i dati sensibili poichè facilmente decriptabile. il secret che è una chiave per arrivare al payload del token che si dovrà dichiarare, di default si definisce all'interno del file **.env**, tuttavia si può definire dentro il file **controller/auth.js**.

```javascript
import jwt from "jsonwebtoken";

const JWT_SECRET = "wirut983hrgHJDHIUY894hjseyFGJd89";

const jwt = jwt.sign(
  {
    id: user._id,
    username: user.username,
  },
  JWT_SECRET
);
```

> Se il toket sarà dichiarato nel file **.env** si dovrà inserire `parse.env.` in testa al SECRET del token.
>
> ```javascript
> parse.env.JWT_SECRET;
> ```

````
```javascript
export cont login = (req,res) => {
    const {username, password} = req.body;

    const user = User.findOne(username);

    if(!username) return res.status(404).json({status: 'error', message: 'Utente o password errata'})

    if(await bcrypt.compare(password, user.password)){

    }
}
````

## JWT token middleware

Il JWT token middleware è intesa come una verifica che si fa in mezzo ad una richiesta ed una risposta, come in questo caso possiamo andare a implementare nelle route del file **routes/users.js**

```javascript
router.get("/", authenticateToken, readAllUsers);
```

in questo caso `verificatoken` è un JWT token middleware.

Per implementare il middleware, si crea una cartella **middlewares** dove possiamo gestire più JWT token middlewares. In questo caso creaimao la cartella **auth.js**. importiamo il JWT è il token secret, ed esportiamo il callback **authenticateToken** con tre parametri, `req`, `res` e `next`. Usiamo il terzo parametro `next`, perchè **authenticateToken** è un middleware, quindi per potergli dire di che la verifica è passata e quindi può continuare la lettura. all'interno del callback prendiamo delle informazioni aggiuntive dallla riciesta dall'headers

```javascript
const authHeader = req.headers["authorization"];
```

Successivamente prenderemo il token che è uguale a `authHeader` e `authHeader.split(' ')[1]`, andiamo dividere il token dal bearer perchè sarà utile passarlo al parametro `    Authorization: Bearer <token>` quando li dividiamo di conseguenza si crea un array dove bearer sara 0 e il token 1. successivamente si farà un controllo per vedere se il token è nullo p se è corretto. Se il token sarà corretto si usera la funzionalità `next()` per passare al prossimo comando.

```javascript
import jwt from "jsonwebtoken";

const JWT_SECRET = "wirut983hrgHJDHIUY894hjseyFGJd89";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (error, user) => {
    console.log(error);
    if (error) return res.sendStatus(403);

    req.user = user;

    next();
  });
};
```

Se vogliamo aggiungere la verifica del token a tutte le sottoroute di user, basta andare nella route principale ed inserirla è questo sara verificato ogni volta che l'utente navigherà nelle sottoroute.

```javascript
app.use("/users", authenticateToken, usersRoutes);
```

## Mettere online gli API

Per implementare sicurezza oltre ad altri metodi e librerie possiamo implementare il pkg **sanitize**, utilizzando mongo, andremo a prendere [mongo-sanitize](https://www.npmjs.com/package/mongo-sanitize). Per express dedicato, si potra usare [express-mongo-sanitize](https://www.npmjs.com/package/express-mongo-sanitize).

Implementeremo il [dotenv](https://www.npmjs.com/package/dotenv). cioè un file dove inseriremo le variabili d'ambiente per rendere le variabili più sicure qual'ora nel caso in cui vogliamo inserire l'applicazione online o aplicazioni di versioning come github, il file **.env** non sarà visualizzato. Creiamo il file **.env**, gli inseriamo le variabili d'ambiante.

```bash
JWT_SECRET = 'wirut983hrgHJDHIUY894hjseyFGJd89'
MONGODB = "nodeJSTestAPI"
CONNECTION_URL = "mongodb://localhost:27017/nodeJSTestAPI"
PORT = 3000
```

nel file di **index.js** si importa `dotnet` si dichiara `dotnet.config()` e si utilizza la variabile di sistema per richiamare le variabili d'ambiente `process.env.`

```javascript
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server rinning on port: ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
```

Come il file **index.js**, faremo anche nel file di **controller/auth.js** e nel file **middleware/auth.js** con _JWT_SECRET_.

# deploy

Per distribuire l'app nel server online bisogna inserire l'url del database online all'interno della variabile d'ambiente `CONNECT_URL`, successivamente

> Se si distribuisce sul server heroku
>
> creare un file **Procfile** ed inserire
>
> ```bash
> web: npm start
> ```
