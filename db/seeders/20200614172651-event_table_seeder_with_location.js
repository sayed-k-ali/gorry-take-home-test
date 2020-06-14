'use strict';
const uuid = require('uuid');

const location = [
  {
    id: uuid.v4(),
    location_name: 'Cinere',
  },
  {
    id: uuid.v4(),
    location_name: 'Depok Trading Center'
  }
]

module.exports = {
  up: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.bulkInsert('locations', location,{}),

        queryInterface.bulkInsert('events', [
          {
            id: uuid.v4(),
            event_name: 'Jumanji',
            location_id: location[0].id,
            schedule_start: '2020-10-10 09:00',
            schedule_end: '2020-10-15 23:59',
          },
          {
            id: uuid.v4(),
            event_name: 'Spiderman Homecoming',
            location_id: location[0].id,
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
