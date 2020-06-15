const DBO = require('../../common/services/db.common.service');
class LocationModel{
    constructor(){
        this.table = 'locations';
        this.dbo = new DBO();
    }

    async getLocation(where){
        let query = `SELECT * FROM ${this.table} WHERE ?`;
        let result = await this.dbo.query(query, where);
        return result;
    }
    async createLocation(data){
        let query = `INSERT INTO ${this.table} SET ?`;
        let result = await this.dbo.query(query,data);
        return result;
    }
}

module.exports = LocationModel;