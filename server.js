var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var mongoose = require('mongoose');
var customer = require('./customer');
var catalog = require('./catalog');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 9000;
var router = express.Router();

mongoose.connect('mongodb://localhost/SampleApi');

// Middle Route 
router.use(function (req, res, next) {
    next(); 
});


// ************************************************* Customer Section **********************************************//

/*
    Api to add customer
*/
router.route('/customer').post(function (req, res) {
    var cust = new customer();
    cust.id = req.body.id;
    cust.name = req.body.name;
    cust.place = req.body.place;
    cust.save(function (err) {
        if (err) res.send(err);
        res.send({ message: 'Customer Created !' })
    })
});

/*
   Api to get all customers
*/
router.route('/customer').get(function (req, res) {
    customer.find(function (err, customer) {
        if (err) res.send(err);
        res.send(customer);
    });
});

// *********************************************End of Customer Section **********************************************//



// ************************************************* Catalog Section **********************************************//

/*
    Api to add catalog
*/
router.route('/catalog').post(function (req, res) {
    var cata = new catalog();
    cata.id = req.body.id;
    cata.catalogName = req.body.catalogName;
    cust.customerInterest = req.body.customerInterest;
    cust.save(function (err) {
        if (err) res.send(err);
        res.send({ message: 'Catalog Created !' })
    })
});


/*
   Api to fetch all catalog  based on id and customerInterest
*/
router.route('/catalog').get(function (req, res) {
    customer.find({ $and: [{id: req.params.id },{customerInterest: req.params.customerInterest}]},function (err, catalog) {
        if (err) res.send(err);
        res.send(catalog);
    });
});


/*
   Api to update catalog
*/
router.route('/catalog/:id').put(function (req, res) {

    product.findById(req.params.id, function (err, cata) {
        if (err) res.send(err);
        cata.id = req.body.id;
        cata.catalogName = req.body.catalogName;
        cata.customerInterest = req.body.customerInterest;
        cata.save(function (err) {
            if (err) res.send(err);
            res.json({ message: 'Catalog updated!' });
        });

    });
});



/*
  Api to delete catalog
*/
router.route('/catalog/:id').delete(function (req, res) {

    product.remove({ id: id }, function (err, prod) {
        if (err) res.send(err);

        res.json({ message: 'catalog deleted' });
    })

});


/*
   Api to serach catalog 
*/
router.route('/catalog/:id').get(function (req, res) {
    product.findById(req.params.id, function (err, cata) {
        if (err)
            res.send(err);
        res.json(cata);
    });
});

// *********************************************End of Catalog Section **********************************************//

app.use(cors());
app.use('/api', router);
app.listen(port);
console.log('server runnning at ' + port);
