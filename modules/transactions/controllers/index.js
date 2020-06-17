const TransactionService = require('../services');
class TransactionController{
    constructor() {
        this.transactionService = new TransactionService();
        this.createTransaction = this.createTransaction.bind(this);
        this.getTransaction = this.getTransaction.bind(this);
    }

    async createTransaction(req,res){
        let result = await this.transactionService.createTransaction(req.body);
        return res.status(result.status).send(result.data || result.error);
    }

    async getTransaction(req, res){
        let result = await this.transactionService.getTransaction(req.query);
        return res.status(result.status).send(result.data || result.error);
    }
}

module.exports = new TransactionController();