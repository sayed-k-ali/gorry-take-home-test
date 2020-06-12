const EventsRouter = require('../modules/events/route')
module.exports = app => {
    app.use('/events', EventsRouter)
}