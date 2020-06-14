const DBConnection = require('../db/common.db');

class DBCommonService {
  constructor() {
    this.dbConnection = new DBConnection();
    this.db = process.env.NODE_ENV;
  }

  async query(query, data = []) {
    console.log(this.db)
    try {
      const connection = await this.dbConnection.createConnection(this.db);
      try {
        const result = await connection.query(query, data);

        await this.dbConnection.closeConnection(connection);

        return result;
      } catch (ex) {
        await this.dbConnection.closeConnection(connection);
        return { 
          error: ex 
        };
      }
    } catch (ex) {
      return { errorCode: ex.code };
    }
  }
}

module.exports = DBCommonService;