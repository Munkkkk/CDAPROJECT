const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const jokeRoutes = require('./routes/jokeRoutes');
const cors = require('cors');
const { sequelize } = require('./models');
const { QueryTypes } = require('sequelize');
const jokeSeeder = require('./seeders/jokes-seeder'); 

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());


const baseUrl = process.env.BASE_URL || `http://localhost:${PORT}/api`;

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Blagues Carambar',
      version: '1.0.0',
      description: 'Générateur de blagues Carambar',
    },
    servers: [
      {
        url: baseUrl,
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api', jokeRoutes);

app.get('/', (req, res) => {
  res.send('Bienvenue sur l’API Carambar & Co !');
});


(async () => {
  try {
    await sequelize.sync();

    const [{ count }] = await sequelize.query(
      'SELECT COUNT(*) AS count FROM "Jokes";',
      { type: QueryTypes.SELECT }
    );

    if (parseInt(count) === 0) {
      console.log('Aucune blague détectée. Exécution du seeder...');
      await jokeSeeder.up(sequelize.getQueryInterface(), sequelize.Sequelize);
    } else {
      console.log(`${count} blague(s) déjà présente(s). Pas de seed nécessaire.`);
    }

    app.listen(PORT, () => {
      console.log(`✅ Serveur lancé sur ${baseUrl}`);
    });

  } catch (error) {
    console.error('❌ Erreur lors de l’initialisation du serveur :', error);
  }
})();
