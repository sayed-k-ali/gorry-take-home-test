const EventsRouter = require('../modules/events/route');
const LocationsRouter = require('../modules/locations/route');
const TransactionRouter = require('../modules/transactions/route');
module.exports = app => {
    app.use('/event', EventsRouter)
    app.use('/location', LocationsRouter)
    app.use('/transaction', TransactionRouter)
}