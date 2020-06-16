const mocha = require('mocha')
const expect = require('chai').expect;
const EventService = require('../../modules/events/services');
const HttpStatus = require('http-status')

describe('EventServiceTest', async ()=>{
    const eventService = new EventService();
    const staticLocationId = '26a657fb-10a7-46f8-a837-c0b43cd73f83';
    const mockEventData = {
        event_name: 'Testing Event from Services',
        schedule_start: '2020-10-10 09:00',
        schedule_end: '2020-10-15 23:59',
    }
    it('testCreateEventWithMissingLocation', async ()=>{
        let result = await eventService.createEvent(mockEventData);
        expect(result).to.be.a('object');
        expect(result).to.haveOwnProperty('error');
    })

    it('testCreateEventWithStatusCREATED', async ()=>{
        mockEventData.location_id = staticLocationId
        let result = await eventService.createEvent(mockEventData);
        expect(result).to.be.a('object');
        expect(result).to.haveOwnProperty('status',HttpStatus.CREATED);
        expect(result).to.haveOwnProperty('data');
    })
})