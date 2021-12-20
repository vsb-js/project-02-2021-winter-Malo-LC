'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Music extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Artist)
    }
  };
  Music.init({
    name: DataTypes.STRING,
    album: DataTypes.STRING,
    runTime: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Music',
  });
  return Music;
};