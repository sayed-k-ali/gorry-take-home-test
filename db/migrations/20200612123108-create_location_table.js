'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('locations', 
      { 
        id: {
          primaryKey: true,
          type: Sequelize.UUID,
        },
        location_name: Sequelize.STRING(100),
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('locations');
  }
};