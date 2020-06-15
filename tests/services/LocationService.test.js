const mocha = require('mocha')
const expect = require('chai').expect;
const LocationService = require('../../modules/locations/services');
const HttpStatus = require('http-status')
const staticLocationId = require('uuid').v4();
describe('LocationServiceTest', async ()=>{
    const locationService = new LocationService();
    const mockLocationData = {
        id: staticLocationId,
        location_name: 'Testing Location in Service'
    }
    it('testCreateLocationWithStatusCREATED', async ()=>{
        let result = await locationService.createLocation(mockLocationData);
        expect(result).to.be.a('object');
        expect(result).to.have.a.property('status',HttpStatus.CREATED);
        expect(result).to.have.a.property('data');
    })
})