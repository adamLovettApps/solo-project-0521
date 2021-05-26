const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Comment } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

router.post('/', asyncHandler(async(req, res) => {
    const { userId, photoId, body} = req.body;
    const commentBuild = Comment.build({
        userId: userId,
        photoId: photoId,
        body: body
    });

    const newComment = await commentBuild.save();

    return res.json(newComment);

}));

router.get('/:photoId', asyncHandler(async(req, res) => {

    const photoId = parseInt(req.params.photoId);
    const comments = await Comment.findAll({
        where: {
            photoId = photoId
        }
    })

    return res.json(comments);
}));

router.delete('/:id', asyncHandler(async(req, res) => {
    const id = parseInt(req.params.id, 10);

    const comment = await Comment.destroy({
        where: {
            id: id
        }
    })

    await comment.destroy;

    return res.json();

}))


router.put(':/id', asyncHandler(async(req, res) => {
    const id = parseInt(req.params.id);
    const { body } = req.body;

    const comment = await Comment.findByPk(id);

    const updatedComment = await comment.update({body: body});

    return res.json();

}));




module.exports = router;