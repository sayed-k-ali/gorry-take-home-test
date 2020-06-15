const DBO = require('../../common/services/db.common.service');
class EventModel{
    constructor(){
        this.table = 'events';
        this.dbo = new DBO();
    }

    async getAllEvents(){
        let query = `SELECT * FROM ${this.table}`;
        let result = await this.dbo.query(query);
        return result;
    }

    async getEvent(where){
        let query = `SELECT * FROM ${this.table} WHERE ?`;
        let result = await this.dbo.query(query, where);
        return result;
    }
    async createEvent(data){
        let query = `INSERT INTO ${this.table} SET ?`;
        let result = await this.dbo.query(query,data);
        return result;
    }
}

module.exports = EventModel;