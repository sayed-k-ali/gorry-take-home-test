const config = require('../../../db/config/config');
const mysql = require('promise-mysql');

class DBConnection {
  constructor() {
    this.connection = null;
    this.createConnection = this.createConnection.bind(this);
    this.closeConnection = this.closeConnection.bind(this);
  }

  async createConnection(database = 'production') {
    const configuration = {
      host: config[database].host,
      user: config[database].username,
      password: config[database].password,
      database: config[database].database,
    };

    try {
      const pool = await mysql.createPool(configuration);
      return pool;
    } catch (ex) {
      throw ex;
    }
  }

  async closeConnection(connection) {
    try {
      await connection.end();
    } catch (ex) {
      throw ex;
    }
  }
}


module.exports = DBConnection;