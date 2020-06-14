'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addConstraint('events',['location_id'], {
        type:'FOREIGN KEY',
        name: 'FK_event_location',
        references:{
          table: 'locations',
          field: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }),
      queryInterface.addConstraint('tickets',['event_id'], {
        type:'FOREIGN KEY',
        name: 'FK_ticket_event',
        references:{
          table: 'events',
          field: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }),
      queryInterface.addConstraint('transactions',['customer_id'], {
        type:'FOREIGN KEY',
        name: 'FK_customer_transaction',
        references:{
          table: 'customers',
          field: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }),

    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeConstraint('events','FK_event_location'),
      queryInterface.removeConstraint('tickets','FK_ticket_event'),
      queryInterface.removeConstraint('transactions','FK_customer_transaction'),
    ])
  }
};
