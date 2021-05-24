const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { setTokenCookie, requireAuth } = require('../utils/auth');
const { User, Album, Photo } = require('../db/models');
const { handleValidationErrors } = require('../utils/validation');
const { db } = require('../config');

const router = express.Router();

router.get('/:id', asyncHandler(async(req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = await User.findByPk(userId);
    return user;

}));

module.exports = router;