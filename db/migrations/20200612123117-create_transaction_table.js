'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('transactions', 
        { 
          id: {
            type: Sequelize.UUID,
            primaryKey: true,
          },
          customer_id: Sequelize.UUID,
          purchase_date: Sequelize.DATE,
          total_qty: Sequelize.DECIMAL,
          total_price: Sequelize.DECIMAL,
        });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('transactions');
  }
};
