import { v4 as uuidv4 } from "uuid";

let users = [
  {
    nome: "Luca",
    cognome: "Rossi",
    email: "luca.rossi@gmail.com",
    id: "15db1050-5d24-461f-9b94-39d43ed8c391",
  },
  {
    nome: "Mario",
    cognome: "Gialli",
    email: "mario.gialli@gmail.com",
    id: "856a9a53-1594-4e59-99a6-bbee9ba379f6",
  },
  {
    nome: "Anna",
    cognome: "Neri",
    email: "anna.neri@gmail.com",
    id: "58c573ad-e2bf-405f-b994-1f4eda7ada0d",
  },
];

export const readAllUser = (req, res) => res.send(users);

export const createUser = (req, res) => {
  const reqBody = req.body;
  users.push({ ...reqBody, id: uuidv4() });
  res.send(`Utente con email ${reqBody.email} è stato aggiunto con successo`);
};

export const readUserByID = (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id == id);
  res.send(user);
};

export const updateUser = (req, res) => {
  const { id } = req.params;
  const { nome, cognome, email } = req.body;

  const user = users.find((user) => user.id == id);

  if (nome) user.nome = nome;
  if (cognome) user.cognome = cognome;
  if (email) user.email = email;

  res.send(`Utente con id ${id} è tato modificato con successo`);
};

export const deleteUser = (req, res) => {
  const { id } = req.params;
  users = users.filter((user) => user.id != id);
  res.send(`Utente con id ${id} è stato eliminato con successo !`);
};
