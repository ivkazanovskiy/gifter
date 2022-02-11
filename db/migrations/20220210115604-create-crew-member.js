module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CrewMembers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          foreignKey: 'id',
        },
      },
      crewId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Crews',
          foreignKey: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CrewMembers');
  },
};
