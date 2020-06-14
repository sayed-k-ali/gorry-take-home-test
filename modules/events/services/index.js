const EventModel = require('../models');
const HttpStatus = require('http-status');
const uuid = require('uuid');

class EventService{
    constructor() {
        this.eventModel = new EventModel();
    }

    async getAllEvents(){
        let result = await this.eventModel.getAllEvents();
        return {
            status: HttpStatus.OK,
            data: result
        }
    }

    async createEvent(data){
        let eventData = {
            id: data.id || uuid.v4(),
            event_name: data.event_name,
            location_id: data.location_id,
        };
        const addEvent = await this.eventModel.createEvent(eventData);
        if(addEvent.affectedRows===0 || addEvent.error){
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: {
                    error_code: 'INTERNAL_SERVER_ERROR',
                    message: 'Error encountered when creating event data'
                }
            }
        }

        return {
            status: HttpStatus.CREATED,
            data: 'event created'
        }
    }
}


module.exports = EventService;