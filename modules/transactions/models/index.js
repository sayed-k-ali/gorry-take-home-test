const DBO = require('../../common/services/db.common.service');
class TransactionModel{
    constructor(){
        this.dbo = new DBO();
    }

    async createTransaction(data){
        let query = `INSERT INTO transactions SET ?`;
        let result = await this.dbo.query(query, data);
        return result;
    }

    async createTransactionDetail(data){
        let query = `INSERT INTO transaction_details (transaction_id, ticket_id, qty, price) VALUES ?`;
        let result = this.dbo.query(query, [data]);
        return result;
    }

    async getEventByTicketId(ticketId){
        let query = `SELECT event_id FROM tickets WHERE id IN(?) GROUP BY event_id`;
        let result = await this.dbo.query(query,[ticketId]);
        return result;
    }

    async getTicketQuota(ticketId){
        let query = `SELECT * FROM tickets WHERE id IN(?) AND quota > 0`;
        let result = await this.dbo.query(query,[ticketId]);
        return result;
    }

    async updateTicketQuota(transactionId){
        let query = `UPDATE tickets t, transaction_details dt
                     SET t.quota = t.quota - dt.qty
                     WHERE t.id = dt.ticket_id
                     AND dt.transaction_id = ?`;

        let result = await this.dbo.query(query, [transactionId]);
        return result;
    }

    async getTransaction(transactionId){
        let query = `SELECT hd.customer_phone, hd.customer_name, 
                     sum(dt.price * dt.qty) as total_price, sum(dt.qty) as total_qty
                     FROM transactions hd
                     JOIN transaction_details dt on hd.id = dt.transaction_id
                     WHERE hd.id = ?`;
        let result = await this.dbo.query(query, [transactionId]);
        return result;
    }
    
    async getTransactionDetail(transactionId){
        let query = `SELECT e.event_name,t.ticket_type, dt.qty, dt.price
                     FROM transaction_details dt
                     JOIN tickets t on t.id = dt.ticket_id
                     JOIN events e on t.event_id = e.id
                     WHERE dt.transaction_id = ?`;
        let result = await this.dbo.query(query, [transactionId]);
        return result;
    }
}

module.exports = TransactionModel;