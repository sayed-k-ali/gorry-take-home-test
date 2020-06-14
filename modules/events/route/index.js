const router = require('express').Router();
const EventController = require('../controllers');

router.post('/create', (req, res)=>{
    res.status(201).send('NO_CONTENT')
})
router.get('/get_info', (req, res)=>{
    res.status(200).send({
        data: 'data'
    })
})
router.get('/', EventController.getAllEvents);

module.exports = router;