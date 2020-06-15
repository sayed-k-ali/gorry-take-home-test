const EventService = require('../services');
class EventController{
    constructor(){
        this.eventServices = new EventService();
        this.getAllEvents = this.getAllEvents.bind(this);
        this.getEvent = this.getEvent.bind(this);
        this.createEvent = this.createEvent.bind(this);
    }

    async getAllEvents(req, res){
        let response = await this.eventServices.getAllEvents();
        return res.status(response.status).send(response.data);
    }

    async getEvent(req, res){
        let queryParams = {
            id: req.query.event_id
        }
        
        let response = await this.eventServices.getEvent(queryParams);
        return res.status(response.status).send(response.data);
    }

    async createEvent(req, res){
        let response = await this.eventServices.createEvent(req.body);
        return res.status(response.status).send(response.data || response.error);
    }


}

module.exports = new EventController();