const router = require('express').Router();
const EventController = require('../controllers');

router.post('/create', EventController.createEvent);
// router.post('ticket/create', EventController.createTicket);
router.get('/get_info', EventController.getEvent);
// router.get('/', EventController.getAllEvents);

module.exports = router;