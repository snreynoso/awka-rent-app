import { Router } from 'express';

const { stock } = require('../controllers/bikes');

const router = Router();

router.get('/stock', stock);

module.exports = router;