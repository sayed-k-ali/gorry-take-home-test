'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('transaction_details', 
        { 
          transaction_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references:{
              model: 'transactions',
              key: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
          },
          ticket_id:{
            type: Sequelize.UUID,
            allowNull: false,
            references:{
              model: 'tickets',
              key: 'id'
            }
          },
          qty: Sequelize.DECIMAL,
          price: Sequelize.DECIMAL
        });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('transaction_details');
  }
};