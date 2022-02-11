const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Crew extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Message }) {
      // Crew.hasMany(Message, { foreignKey: 'crewId' });
      Crew.belongsToMany(User, { through: 'CrewMembers', foreignKey: 'crewId' });
    }
  }
  Crew.init({
    name: DataTypes.TEXT,
    owner: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Crew',
  });
  return Crew;
};
