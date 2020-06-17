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

    async getEvent(eventId){
        let query = `SELECT e.*, l.location_name from events e
                    INNER JOIN locations l ON e.location_id = l.id
                    WHERE e.id = ?`;
        let result = await this.dbo.query(query, [eventId]);
        return result;
    }

    async getTicketByEventId(eventId){
        let query = `SELECT * FROM tickets WHERE event_id= ?`;
        let result = await this.dbo.query(query, [eventId]);
        return result;
    }
    async createEvent(data){
        let query = `INSERT INTO ${this.table} SET ?`;
        let result = await this.dbo.query(query,data);
        return result;
    }

    async createTicket(data){
        let query = `INSERT INTO tickets SET ?`;
        let result = await this.dbo.query(query, data);
        return result;
    }
}

module.exports = EventModel;