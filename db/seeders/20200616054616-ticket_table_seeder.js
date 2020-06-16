'use strict';
const uuid = require('uuid');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tickets', [
      {
        id: uuid.v4(),
        ticket_type: 'VVIP',
        event_id: '997bdddc-8758-4ae6-ba4a-d5ac8410cc86',
        price: 80000,
        quota: 15
      },

      {
        id: uuid.v4(),
        ticket_type: 'VIP',
        event_id: '997bdddc-8758-4ae6-ba4a-d5ac8410cc86',
        price: 60000,
        quota: 15
      },

      {
        id: uuid.v4(),
        ticket_type: 'REGULAR',
        event_id: '997bdddc-8758-4ae6-ba4a-d5ac8410cc86',
        price: 45000,
        quota: 15
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tickets', null, {});
  }
};
