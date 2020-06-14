'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('customers', 
      { 
        id: {
          type: Sequelize.UUID,
          primaryKey: true
        },
        name: Sequelize.STRING(50),
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('customers');
  }
};
