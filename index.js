const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const jokeRoutes = require('./routes/jokeRoutes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

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
        url: 'http://localhost:3000/api', 
      },
    ],
  },
  apis: ['./routes/*.js'], 
};


const swaggerDocs = swaggerJsDoc(swaggerOptions);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use('/api', jokeRoutes);  


app.get('/', (req, res) => {
  res.send('Bienvenue sur l’API Carambar & Co !');
});


app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
