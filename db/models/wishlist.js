const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      Wishlist.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  Wishlist.init({
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    wish: {
      DataTypes: false,
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'Wishlist',
  });
  return Wishlist;
};
