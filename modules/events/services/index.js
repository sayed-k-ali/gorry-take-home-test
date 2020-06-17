const EventModel = require('../models');
const LocationModel = require('../../locations/models');
const HttpStatus = require('http-status');
const Validator = require('fastest-validator');
const uuid = require('uuid');

class EventService{
    constructor() {
        this.eventModel = new EventModel();
        this.locationModel = new LocationModel();
        this.validator = new Validator();
        this.schema = {
            event: {
                location_id: {
                    type: 'uuid',
                },
                schedule_start: {
                    type: 'date'
                },
                schedule_end: {
                    type: 'date'
                },
            },

            ticket: {
                event_id: {
                    type: 'uuid',
                },
                price: {
                    type: 'number',
                },
                quota: {
                    type: 'number'
                }
            }
        }
    }

    async getEvent(queryParams){
        
        let eventData = await this.eventModel.getEvent(queryParams);

        if(eventData.length > 0){
            let ticketData = await this.eventModel.getTicketByEventId(eventData[0].id);
            return {
                status: HttpStatus.OK,
                data: { ...eventData[0], ticket: ticketData}
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
            schedule_start: new Date(Date.parse(data.schedule_start)),
            schedule_end: new Date(Date.parse(data.schedule_end))
        };

        let isValidForm = this.validator.validate(eventData, this.schema.event);
        if(isValidForm !== true){
            return{
                status: HttpStatus.BAD_REQUEST,
                error: {
                    error_code: "FORM_VALIDATION",
                    message: isValidForm
                }
            };
        }

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
            data: {
                message: 'Event created',
                url: '[GET] https://localhost:3000/event/get_info?id=' + eventData.id
            } 
        }
    }

    async createTicket(data){
        let ticketData = {
            id: data.id || uuid.v4(),
            ticket_type: data.ticket_type,
            price: data.price,
            quota: data.quota,
            event_id: data.event_id,
        };

        let isValidForm = this.validator.validate(ticketData, this.schema.ticket);
        if(isValidForm !== true){
            return{
                status: HttpStatus.BAD_REQUEST,
                error: {
                    error_code: "FORM_VALIDATION",
                    message: isValidForm
                }
            };
        }

        const addTicket = await this.eventModel.createTicket(ticketData);
        if(addTicket.affectedRows===0 || addTicket.error){
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: {
                    error_code: 'INTERNAL_SERVER_ERROR',
                    message: 'Error encountered when creating ticket data'
                }
            }
        }

        return {
            status: HttpStatus.CREATED,
            data: 'Ticket created'
        }
    }
}


module.exports = EventService;