const EventService = require('../services');
class EventController{
    constructor(){
        this.eventServices = new EventService();
        this.getAllEvents = this.getAllEvents.bind(this);
        this.getEvent = this.getEvent.bind(this);
        this.createEvent = this.createEvent.bind(this);
        this.createTicket = this.createTicket.bind(this);
    }

    async getAllEvents(req, res){
        let response = await this.eventServices.getAllEvents();
        return res.status(response.status).send(response.data);
    }

    async getEvent(req, res){
        let response = await this.eventServices.getEvent(req.query.event_id);
        return res.status(response.status).send(response.data || response.error);
    }

    async createEvent(req, res){
        let response = await this.eventServices.createEvent(req.body);
        return res.status(response.status).send(response.data || response.error);
    }

    async createTicket(req, res){
        let response = await this.eventServices.createTicket(req.body);
        return res.status(response.status).send(response.data || response.error);
    }

}

module.exports = new EventController();