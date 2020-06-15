const LocationService = require('../services');
class LocationController{
    constructor(){
        this.locationService = new LocationService();
        this.createLocation = this.createLocation.bind(this);
    }

    async createLocation(req, res){
        let response = await this.locationService.createLocation(req.body);
        return res.status(response.status).send({ data: response.data});
    }
}

module.exports = new LocationController();