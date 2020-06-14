const EventService = require('../services');
class EventController{
    constructor(){
        this.eventServices = new EventService();
        this.getAllEvents = this.getAllEvents.bind(this);
    }

    async getAllEvents(req, res){
        let response = await this.eventServices.getAllEvents();
        return res.status(response.status).send(response.data);
    }

    async createEvent(req, res){
        let response = await this.eventServices.createEvent(req.body);
        return res.status(response.status).send(response.data);
    }


}

module.exports = new EventController();