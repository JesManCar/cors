const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());

app.get("/character/:name", async (req, res) => {
    const name = req.params.name;
    const url = `https://rickandmortyapi.com/api/character/?name=${name}`;
    
    try{
        const response = await axios.get(url);

        /*const { name, status, species, gender, origin, image } = response.data.results[0];
        res.json({ name, status, species, gender, origin, image });*/
        const list = [];
        response.data.results.forEach((character) => {
            const Char = {
                name: character.name,
                status: character.status,
                species: character.species,
                gender: character.gender,
                origin: character.origin.name,
                image: character.image
            }
        list.push(Char);
    });
    res.json(list);

    } catch (error) {
        console.error(error);
        res.status(404).json({ error: "Error en la conexión" });
    }
});

app.listen(PORT, () => {
    console.log(`Express escuchando en el puerto ${PORT}`);
});
  