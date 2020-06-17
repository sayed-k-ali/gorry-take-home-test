const TransactionModel = require('../models');
const HttpStatus = require('http-status');
const Validator = require('fastest-validator');
const uuid = require('uuid');
class TransactionService{
    constructor(){
        this.transactionModel = new TransactionModel();
        this.validator = new Validator();
        this.schema = {
            customer_phone: { type: 'number', empty: false },
            customer_name: { type: 'string', empty: false },
            tickets: {
                type: 'array',
                items: {
                    type: 'object', 
                    props: {
                        ticket_id: { type: 'uuid' },
                        qty: { type: 'number', positive: true },
                        price: { type: 'number', positive: true }
                    }
                }
            }
        }
    }

    async createTransaction(data){
        let transaction_id = uuid.v4();
        let transaction = {   
            id: transaction_id,
            customer_phone: data.customer_phone,
            customer_name: data.customer_name,
        }

        let isValidForm = this.validator.validate(data, this.schema)
        
        if(isValidForm !== true){
            return {
                status: HttpStatus.BAD_REQUEST,
                error: {
                    error_code: 'FORM_VALIDATION',
                    message: isValidForm
                }
            }
        }

        let ticketData = data.tickets.map(v=> { return [v.ticket_id] });
        
        let isAvailableQuota = await this.transactionModel.getTicketQuota(ticketData);

        if(isAvailableQuota.length < ticketData.length){
            return {
                status: HttpStatus.BAD_REQUEST,
                error: {
                    error_code: 'DATA_VALIDATION',
                    message: 'One type of ticket runs out of quota'
                }
            }
        }

        let isSameEvent = await this.transactionModel.getEventByTicketId(ticketData);

        if(isSameEvent.length > 1){
            return {
                status: HttpStatus.BAD_REQUEST,
                error: {
                    error_code: 'DATA_VALIDATION',
                    message: 'Cannot purchase ticket with different event in the same transaction'
                }
            }
        }

        let transactionDetails = data.tickets.map(v=>{
            return [
                transaction_id,
                v.ticket_id,
                v.qty || 1,
                v.price
            ];
        });

        await this.transactionModel.createTransaction(transaction); 
        await this.transactionModel.createTransactionDetail(transactionDetails);

        let addTicket = await this.transactionModel.updateTicketQuota(transaction_id);
        console.log(addTicket)
        if(addTicket.affectedRows === 0 || addTicket.error){
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: {
                    error_code: 'INTERNAL_SERVER_ERROR',
                    message: 'Error encountered when creating location data'
                }
            }
        }

        return {
            status: HttpStatus.CREATED,
            data: {
                message: 'Ticket has been purchased',
                url: 'http://localhost:3000/transaction/get_info?id=' + transaction_id
            }
        }
    }

    async getTransaction(data){
        let transaction = await this.transactionModel.getTransaction(data.id);

        if(transaction.length > 0){
            let details = await this.transactionModel.getTransactionDetail(data.id);
            return {
                status: HttpStatus.OK,
                data: {...transaction[0], details}
            }
        }

        return {
            status: HttpStatus.NOT_FOUND,
            error: {
                error_code: 'NOT_FOUND',
                message: 'Data you are looking is not found'
            }
        }

    }
}

module.exports = TransactionService;