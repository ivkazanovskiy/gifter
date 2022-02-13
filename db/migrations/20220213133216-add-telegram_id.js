module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'telegramId', {
      type: Sequelize.INTEGER,
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'telegramId');
  },
};
