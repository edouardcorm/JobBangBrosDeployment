require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const cors = require('cors');
 
// express app
const app = express();
 
// middleware
app.use(express.json());
const corsOptions = {
    origin: 'https://jobbangbrosdeployment-frontend.onrender.com', // Remplace par l'URL exacte de ton frontend
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use((req, res, next) => {
    console.log(req.path, req.method);
    console.log(req.body);
    next();
});
 
// routes
app.use('/api/users', userRoutes);
 
 
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connecté à la base de données MongoDB');
        app.listen(process.env.PORT, () => {
            console.log(`Serveur est connecté au port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.error(err);
        console.log('Erreur de connexion à la base de données MongoDB');
    });