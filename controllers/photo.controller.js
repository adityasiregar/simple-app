
const { Photo } = require('../models/index')

const create = async (req, res) => {
    const body = req.body;
    const userId = req.id
    const photoUrl = body.photoUrl;
    const caption = body.caption;

    return Photo.create({
        userId: userId,
        photoUrl: photoUrl,
        caption: caption
    }).then(photo => {
        res.status(200).send({
            status: "SUCCESS",
            message:"Photo Berhasil ditambahkan",
            data: photo
        })
    }).catch(e => {
        console.log(e)
        res.status(503).send({
            status:"FAIL",
            message: "Gagal menambahkan photo"
        })
    })
};


module.exports = {
    create
}
