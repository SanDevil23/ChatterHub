const express = require('express');
const { registerUser, authUser, allUsers } = require('../controllers/userControllers');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');

router.route('/').post(registerUser).get(protect, allUsers);
router.post('/login', authUser);

module.exports = router;