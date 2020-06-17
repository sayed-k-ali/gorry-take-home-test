const router = require('express').Router();
const TransactionController = require('../controllers');

router.post('/purchase', TransactionController.createTransaction);
router.get('/get_info', TransactionController.getTransaction);

module.exports = router;