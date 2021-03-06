// backend/routes/api/users.js
const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3');

const router = express.Router();

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors,
];

// Sign up
router.post(
    '/',
    validateSignup,
    asyncHandler(async (req, res) => {
        const { email, password, username } = req.body;
        const user = await User.signup({ email, username, password });

        await setTokenCookie(res, user);

        return res.json({
            user,
        });
    }),
);

router.get('/:id', asyncHandler(async(req, res) => {
    const id = parseInt(req.params.id);
    const userview = await User.findByPk(id);


    return res.json(userview);
}))


router.put('/updateProfilePhoto/:id', singleMulterUpload("image"), asyncHandler(async(req, res) => {
    const id = parseInt(req.params.id);
    const user = await User.findByPk(id);
    const profilePhotoUrl = await singlePublicFileUpload(req.file);
    const updated = await user.update({profilePhotoUrl: profilePhotoUrl})
    return res.json(updated);
}));

router.put('/updateCoverPhoto/:id', singleMulterUpload("image"), asyncHandler(async(req, res) => {
    const id = parseInt(req.params.id);
    const user = await User.findByPk(id);
    const coverPhotoUrl = await singlePublicFileUpload(req.file);
    const updated = await user.update({coverPhotoUrl: coverPhotoUrl})
    return res.json(updated);
}));

module.exports = router;