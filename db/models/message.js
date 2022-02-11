const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Crew }) {
      // Message.belongsTo(User, { foreignKey: 'userId' });
      // Message.belongsTo(Crew, { foreignKey: 'crewId' });
    }
  }
  Message.init({
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    crewId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Crews',
        key: 'id',
      },

    },
    gifterId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    text: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};
