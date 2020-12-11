const express = require('express')
const userRouter = express.Router()
const connection = require('../conf')
userRouter.use(express.json())



userRouter.get('/', (req, res ) => {
    connection.query(`Select * from users`, (err, results) => {
        if(err) throw err
        res.status(200).send(results)
    })
})

userRouter.get('/:id', (req, res) => {
    connection.query(`Select * from users where idtable1 = ?`, [req.params.id], (err, results) => {
        res.status(200).send(results)
    })
})

userRouter.post('/', (req, res) => {
    const {firstname, lastname, email} = req.body
    connection.query(`Insert into users (firstname, lastname, email) values(?, ?, ?)`, [firstname, lastname, email],(err, results) => {
        if(err) throw err
        console.log(req.body)
        res.send(results)
      }
    );
  });

userRouter.put('/:id', (req, res) => {
    connection.query(`Update users SET ? where idtable1 = ?`, [req.body, req.params.id], (err, results) => {
        res.send(results)
    })
})

userRouter.delete('/:id', (req, res) => {
    connection.query('Delete from users where idtable1 = ?', [req.params.id], (err, results) =>  {
        res.send('User deleted')
    })
})




module.exports = userRouter