import { Router } from 'express';

const { register } = require('../controllers/auth');

const router = Router();

router.get('/register', register);

module.exports = router;
