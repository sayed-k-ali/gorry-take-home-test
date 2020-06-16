'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tickets', 
      { 
        id: {
          primaryKey: true,
          type: Sequelize.UUID
        },
        ticket_type: Sequelize.STRING,
        price: Sequelize.DOUBLE,
        quota: Sequelize.INTEGER,
        event_id: {
          type: Sequelize.UUID,
          allowNull: false
        },
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tickets');
  }
};
