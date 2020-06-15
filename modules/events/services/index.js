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

    async getEvent(queryParams){
        let result = await this.eventModel.getEvent(queryParams);
        if(result.length > 0){
            return {
                status: HttpStatus.OK,
                data: result[0]
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