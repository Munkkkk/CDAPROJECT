'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const jokes = [
      "Quelle est la femelle du hamster ? L'Amsterdam.",
      "Que dit un oignon quand il se cogne ? Aïe",
      "Quel est l'animal le plus heureux ? Le hibou, parce que sa femme est chouette.",
      "Pourquoi le football c'est rigolo ? Parce que Thierry en rit.",
      "Quel est le sport le plus fruité ? La boxe, parce que tu te prends des pêches dans la poire et tu tombes dans les pommes.",
      "Que se fait un Schtroumpf quand il tombe ? Un Bleu",
      "Quel est le comble pour un marin ? Avoir le nez qui coule",
      "Qu'est ce que les enfants usent le plus à l'école ? Le professeur",
      "Quel est le sport le plus silencieux ? Le para-chuuuut",
      "Quel est le comble pour un joueur de bowling ? C’est de perdre la boule"
    ];

    // Récupérer les blagues déjà existantes
    const existingJokes = await queryInterface.sequelize.query(
      'SELECT text FROM "Jokes";',
      { type: Sequelize.QueryTypes.SELECT }
    );

    const existingTexts = existingJokes.map(j => j.text);

    // Eviter les doublons en cas d'ajout de nouvelles blagues
    const newJokes = jokes
      .filter(joke => !existingTexts.includes(joke))
      .map(joke => ({
        text: joke,
        createdAt: new Date(),
        updatedAt: new Date()
      }));

    if (newJokes.length > 0) {
      await queryInterface.bulkInsert('Jokes', newJokes, {});
      console.log(`${newJokes.length} nouvelles blagues insérées.`);
    } else {
      console.log("Aucune nouvelle blague à insérer.");
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Jokes', null, {});
  }
};

//En remplacement de mon fichier ImportJokes.js 