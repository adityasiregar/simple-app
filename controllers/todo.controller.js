const fs = require('fs')
const db = require("../config/db");

const DATA_FILE = __dirname + '/../models/data.json'

const getToDo = async (req, res) => {
    await db
    .query("select * from todos")
    .then((result) => {
        res.status(200).json({
        data: result.rows,
        });
    })
    .catch((e) => {
        console.log(e);
        res.status(500).json({
        message: "INTERNAL SERVER ERROR",
        });
    });
}

const postToDo = async (req, res) => {
    const body = req.body;

    await db
    .query(`insert into todos(name, done) values ('${body.name}', ${body.done})`)
    .then((result) => {
        res.status(200).json({
        message: 'Todo successfully created',
        });
    })
    .catch((e) => {
        console.log(e);
        res.status(500).json({
        message: "INTERNAL SERVER ERROR",
        });
    });
};

module.exports = {
    getToDo,
    postToDo
}