'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('transactions', 
        { 
          id: {
            type: Sequelize.UUID,
            primaryKey: true,
          },
          customer_phone: {
            type: Sequelize.STRING(13),
            allowNull: false
          },
          customer_name: {
            type: Sequelize.STRING,
            allowNull: false,
          }
        });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('transactions');
  }
};
