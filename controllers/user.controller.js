
const { User, Photo } = require('../models/index')
const bcrypt = require('bcrypt')
const { generateToken } = require('../middleware/authentication');
const { use } = require('../routers');
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

const signUp = async (req, res) => {
    const body = req.body;
    const firstName = body.firstName;
    const lastName = body.lastName;
    const email = body.email;
    const password = body.password;

    // Cek di Database apakah user ada atau enggk => User telah terdaftar 
    // Password => Encrypt

    User.findOne({
        where: {
            email: email
        }
    }).then( data => {
        if(data) {
            return res.status(400).send({
                message: "Email Already Exists"
            });
        }
        
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hash
        }).then(user => {
            
            let token = generateToken({
                id: user.id,
                email: user.email,
                firstName: firstName
            })

            res.status(200).send({
                status: "SUCCESS",
                message:"User berhasil dibuat",
                data: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    token: token
                }
            })
        }).catch(e => {
            console.log(e)
            res.status(503).send({
                status:"FAIL",
                message: "Gagal membuat user"
            })
        })

    })
};

const signIn = async (req, res) => {
    const body = req.body;
    const email = body.email;
    const password = body.password;

    User.findOne({
        where: {
            email: email
        }
    }).then( user => {
        if(user) {
            const passwordValid = bcrypt.compareSync(password, user.password);

            if(!passwordValid) {                        
                return res.status(401).send({
                    message: "Email and Password is not match"
                });
            }

            let data = {
                id: user.id,
                firstName: user.firstName,
                lastname: user.lastName,
                email: user.email
            }

            let token = generateToken(data);

            return res.status(200).send({
                status: "SUCCESS",
                message:"User Login Success",
                data: {
                   ...data,
                   token: token
                }
            })
        }
        
        return res.status(401).send({
            message: "Email Not Found"
        });

    })
};

module.exports = {
    create,
    findOne,
    findByEmail,
    findAll,
    signUp,
    signIn
}
