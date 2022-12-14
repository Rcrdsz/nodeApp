const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/testBack');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

const productSchema = new mongoose.Schema({    
    _title: String,
    _desctiption: String,
    _price: Number,
    _category: String
});    
const Product = mongoose.model('product', productSchema);    

//define dois métodos estáticos para tratamento dos erros
const { check, validationResult } = require('express-validator');

//define uma função anônima que recebe a aplicação como parâmetro
module.exports = (app) => {

    let route = app.route('/products');//define um caminho para a rota

    //trata a requisição com método get
    route.get((req, res) => {
       Product.find({}).exec((err, products) => {
            if (err) {
                app.utils.errors.send(err, req, res);
            } else {
                res.status(200).setHeader('Content-Type', 'application/json').json({
                    products: products
                });
            }
        });
    });

    //trata a requisição com método post
    route.post(
        //validações de alguns campos recebidos na requisição
        [
            check('_title', 'Title required').notEmpty(),
            check('_description', 'Description required').notEmpty(),
            check('_price', 'Price required').notEmpty(),
            check('_category', 'A senha deve conter seis dígitos').notEmpty()
        ],
        (req, res) => {

            let errors = validationResult(req);//retorna os resultados das validações e armazena

            if (!errors.isEmpty()) {//se há erros encerra 
                app.utils.errors.send(errors.array(), req, res);
                return false;
            }
            //insere no banco
            db.collection('products').insertOne(req.body, (err, products) => {
                if (err) { //se não houver erros
                    app.utils.errors.send(err, req, res);
                } else {
                    res.status(200).json(products);//retorna uma resposta com o valor inserido
                }
            });
        });

    let routeID = app.route('/products/:id'); //define um caminho para rota products com endpoint id

    //trata a requisição com método get
    routeID.get((req, res) => {
        Product.findOne({ _id: req.params.id }).exec((err, user) => {
            if (err) {
                app.utils.errors.send(err, req, res);
            } else {
                res.status(200).json(user);
            }
        });
    });


    routeID.put((req, res) => {
        Product.findOneAndUpdate({ _id: req.params.id }, {$set:req.body}, (err) => { //procura uma _id com base na id recebida na requisição
            if (err) {
                app.utils.errors.send(err, req, res);
            } else {
                res.status(200).json(Object.assign(req.params, req.body));
                //db.persistence.compactDatafile();
            }
        });
    });

    routeID.delete((req, res) => {
        Product.deleteOne({ _id: req.params.id });             
    });
}
