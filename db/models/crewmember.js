const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CrewMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Crew, User }) {

    }
  }
  CrewMember.init({
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        foreignKey: 'id',
      },
    },
    crewId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Crews',
        foreignKey: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'CrewMember',
  });
  return CrewMember;
};
