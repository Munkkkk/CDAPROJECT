'use strict';
module.exports = (sequelize, DataTypes) => {
  const Joke = sequelize.define('Joke', {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      unique : true //Evite les doublons
    }
  }, {});
  Joke.associate = function(models) {
    
  };
  return Joke;
};