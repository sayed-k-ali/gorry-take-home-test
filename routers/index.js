const EventsRouter = require('../modules/events/route');
const LocationsRouter = require('../modules/locations/route');
module.exports = app => {
    app.use('/events', EventsRouter)
    app.use('/locations', LocationsRouter)
}