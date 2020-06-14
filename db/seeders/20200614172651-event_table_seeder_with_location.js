'use strict';
const uuid = require('uuid');

module.exports = {
  up: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.bulkInsert('locations', [
          {
            id: '26a657fb-10a7-46f8-a837-c0b43cd73f83',
            location_name: 'Cinere',
          },
          {
            id: '7db71f3a-1331-4452-95f9-1306054be2df',
            location_name: 'Depok Trading Center'
          }
        ],{}),

        queryInterface.bulkInsert('events', [
          {
            id: uuid.v4(),
            event_name: 'Jumanji',
            location_id: '26a657fb-10a7-46f8-a837-c0b43cd73f83',
            schedule_start: '2020-10-10 09:00',
            schedule_end: '2020-10-15 23:59',
          },
          {
            id: uuid.v4(),
            event_name: 'Spiderman Homecoming',
            location_id: '26a657fb-10a7-46f8-a837-c0b43cd73f83',
            schedule_start: '2020-10-10 09:00',
            schedule_end: '2020-10-15 23:59',
          }
        ],{}),
      ]) 
      
  },

  down: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.bulkDelete('locations', null, {})
      ])
        
  }
};
