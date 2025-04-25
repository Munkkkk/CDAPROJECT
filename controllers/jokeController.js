const { Joke, Sequelize } = require('../models');


const addJoke = async (req, res) => {
  try {
    const { text } = req.body;
    const newJoke = await Joke.create({ text });
    res.status(201).json(newJoke);
    if (!text || text.trim() === '') {
      return res.status(400).json({ error: "Le texte de la blague est requis." }); // Evite d'ajouter une blague vide
    }
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue' });
  }
};


const getAllJokes = async (req, res) => {
  try {
    const jokes = await Joke.findAll();
    res.json(jokes);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des blagues' });
  }
};

const getJokeById = async (req, res) => {
  try{
    const { id } = req.params;
    const joke = await Joke.findByPk(id);
    if (joke) {
      res.json(joke);
    } else {
      res.status(404).json( { error: 'Blague non trouvée' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de la blague' });
  }
}

const getRandomJoke = async (req, res) => {
  try {
    const count = await Joke.count();

    if (count === 0) {
      return res.status(404).json({ message: "Aucune blague en base de données" });
    }

    const randomIndex = Math.floor(Math.random() * count);

    const joke = await Joke.findOne({ order : Sequelize.fn('RANDOM')  }); // Evite les problèmes d'indices d'enregistrement

    if (!joke) {
      return res.status(404).json({ message: "Blague non trouvée" });
    }

    res.status(200).json(joke);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};




module.exports = {
  addJoke,
  getAllJokes,
  getJokeById,
  getRandomJoke,
};