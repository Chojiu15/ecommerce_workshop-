const express = require('express')
const productRouter = express.Router()
const connection = require('../conf')
const bodyParser = require('body-parser')
productRouter.use(bodyParser.urlencoded({ extended: true }))


productRouter.get('/', (req, res ) => {
    connection.query(`Select * from products`, (err, results) => {
        if(err) throw err
        res.status(200).send(results)
    })
})

productRouter.get('/:id', (req, res) => {
    connection.query(`Select * from products where idproducts = ?`, [req.params.id], (err, results) => {
        res.status(200).send(results)
    })
})

productRouter.post('/', (req, res) => {
    connection.query(`Insert into products (name, category, price) values(?, ?, ?)`, [req.body.name, req.body.category, req.body.price],(err, results) => {
        if(err) console.error(err)
        res.send(results)
      }
    );
  });

productRouter.put('/:id', (req, res) => {
    connection.query(`Update products SET ? where idproducts = ?`, [req.body, req.params.id], (err, results) => {
        res.send(results)
    })
})

productRouter.delete('/:id', (req, res) => {
    connection.query('Delete from products where idproducts = ?', [req.params.id], (err, results) =>  {
        res.send('Product deleted')
    })
})

productRouter.get("/category/search?", (req, res) => {
    idCateg=req.query.category
    console.log(req.query.category)
    connection.query(
      "SELECT * from products where category=?", [idCateg],
      (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error retrieving data");
        } else {
          console.log(results)
          res.status(200).json(results);
        }
      }
    );
  });



module.exports = productRouter