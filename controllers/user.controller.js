
const { User, Photo } = require('../models/index')

const create = async (req, res) => {
    const body = req.body;
    const firstName = body.firstName;
    const lastName = body.lastName;
    const email = body.email;

    return User.create({
        firstName: firstName,
        lastName: lastName,
        email: email
    }).then(user => {
        res.status(200).send({
            status: "SUCCESS",
            message:"User berhasil dibuat",
            data: user
        })
    }).catch(e => {
        console.log(e)
        res.status(503).send({
            status:"FAIL",
            message: "Gagal membuat user"
        })
    })
};

const findOne = async (req, res) => {
    return User.findOne({
        where: {
            id: req.params.id
        },
        include: {
            model: Photo,
            as: "photos"
        }
    }).then(user => {
        res.status(200).send({
            status: "SUCCESS",
            message:"User",
            data: user
        })
    }).catch(e => {
        console.log(e)
        res.status(503).send({
            status:"FAIL",
            message: "Gagal membuat user"
        })
    })
};

const findAll = async (req, res) => {

    return User.findAll({}).then(user => {
        res.status(200).send({
            status: "SUCCESS",
            message:"User",
            data: user
        })
    }).catch(e => {
        console.log(e)
        res.status(503).send({
            status:"FAIL",
            message: "Gagal membuat user"
        })
    })
};

const findByEmail = async (req, res) => {
    const email = req.body.email;

    return User.findOne({
        where: {
            email : email
        }
    }).then(user => {
        res.status(200).send({
            status: "SUCCESS",
            message:"User berhasil dibuat",
            data: user
        })
    }).catch(e => {
        console.log(e)
        res.status(503).send({
            status:"FAIL",
            message: "Gagal membuat user"
        })
    })
}

module.exports = {
    create,
    findOne,
    findByEmail,
    findAll
}
