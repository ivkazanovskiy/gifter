const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Crew, Message, Wishlist }) {
      User.hasMany(Wishlist, { foreignKey: 'userId' });
      // User.hasMany(Message, { foreignKey: 'userId' });
      User.belongsToMany(Crew, { through: 'CrewMembers', foreignKey: 'userId' });
    }
  }
  User.init({
    name: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    email: {
      allowNull: false,
      type: DataTypes.TEXT,
      unique: true,
    },
    password: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    telegramId: {
      type: DataTypes.INTEGER,
      unique: true,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
