const router = require('express').Router();

router.post('/create', (req, res)=>{
    res.status(201).send('NO_CONTENT')
})

module.exports = router;