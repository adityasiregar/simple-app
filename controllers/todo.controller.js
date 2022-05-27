const fs = require('fs')

const DATA_FILE = __dirname + '/../models/data.json'
const getToDo = (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return res.send({
              message: "Error"
          })        
        }
        res.json(JSON.parse(data))
    });
}

const postToDo = (req, res) => {
    const body = req.body;

    let data = fs.readFileSync(DATA_FILE, {})
    data = JSON.parse(data)
    data.push(body)    

    fs.writeFile(DATA_FILE, JSON.stringify(data), err => {
        if(err) {
            return res.send({
                message: "Error Write File"
            })    
        }

        res.json({
            message: "Data successfuly created",
            data: data
        })
    })
};

module.exports = {
    getToDo,
    postToDo
}