const LocationModel = require('../models');
const HttpStatus = require('http-status');
const uuid = require('uuid');
class LocationService{
    constructor(){
        this.locationModel = new LocationModel();
    }

    async createLocation(requestBody){
        let locationData = {
            id: requestBody.id || uuid.v4(),
            location_name: requestBody.location_name 
        };

        let addLocation = await this.locationModel.createLocation(locationData);
        if(addLocation.affectedRows===0 || addLocation.error){
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: {
                    error_code: 'INTERNAL_SERVER_ERROR',
                    message: 'Error encountered when creating location data'
                }
            };
        }

        return {
            status: HttpStatus.CREATED,
            data: 'Location created.'
        }

    }
}

module.exports = LocationService;