'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.createTable('events', 
        { 
          id: {
            primaryKey: true,
            type: Sequelize.UUID,
          },
          event_name: Sequelize.STRING(100) ,
          location_id: {
            type: Sequelize.UUID,
            allowNull: false
          },
          schedule_start: Sequelize.DATE,
          schedule_end: Sequelize.DATE,

        })
      ]);
    
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.dropTable('events')]);
  }
};
