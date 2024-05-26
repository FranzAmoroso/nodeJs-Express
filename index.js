import express from "express";


import usersRoutes from './routes/users.js';

const app = express();
const PORT = 3000;


app.use(express.json())
app.use('/users', usersRoutes)

app.get('/', (req,res) =>{
    console.log("Chiamata alla homepage");

    res.send("Benvenuto alla homepage");
})

app.listen(PORT, () => { console.log(`Server rinning on port: ${PORT}`); })