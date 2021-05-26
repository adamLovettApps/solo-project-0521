const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Photo } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3');
const router = express.Router();

// router.post('/:id', asyncHandler(async(req, res) => {
//     const userId = parseInt(req.params.id, 10);
//     try {
//         if (!req.file) { throw new Error('No image.'); }
    
//         return res.json({message: 'Image Succesfully uploaded.'});
//     } catch(e) {
//         return res.status(422).send({
//                 message: e.message
//             });
//     };
// }));


router.post(
    "/:id",
    singleMulterUpload("image"),
    asyncHandler(async (req, res) => {
        const userId = parseInt(req.params.id, 10);
        const profileImageUrl = await singlePublicFileUpload(req.file);
        const {caption} = req.body;
        console.log(caption);
        const photoBuild = Photo.build({
            userId,
            url: profileImageUrl,
            albumId: null,
            caption: caption
        })

        const newPhoto = await photoBuild.save();

        return res.json({
            newPhoto
        });
    })
);

router.get("/", asyncHandler(async(req, res) => {


    const photos = await Photo.findAll({
        order: [['createdAt', 'ASC']]
    })

    return res.json(photos);
}));

router.get("/:id", asyncHandler(async(req, res) => {
    const userId = parseInt(req.params.id, 10);

    const photos = await Photo.findAll({
        where: {
            userId
        },
        order: [['createdAt', 'ASC']]
    })

    return res.json(photos);
}));

router.delete("/:id", asyncHandler(async(req, res) => {
    const id = parseInt(req.params.id, 10);

    const photo = await Photo.destroy({
        where: {
            id: id
        }
    });

    await photo.destroy;

    return res.json();
}));


router.put('/updateCaption/:id', asyncHandler(async(req, res) => {
    const id = parseInt(req.params.id);
    const { caption } = req.body;
    const photo = await Photo.findByPk(id);
    const updated = await photo.update({caption: caption})
    return res.json(updated);
}));

module.exports = router;