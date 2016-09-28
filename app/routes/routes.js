var OrderRouter = require('../models/oneClickOrder.js');
var employeeModel=require('../models/employeeModel.js');
var nightmare=require('../../nightmareRunner.js');
//var jsdom = require("jsdom");
//var app1=require("../../server.js");
module.exports = function(app) {

    console.log("in app routes.js")
    app.all('*', function (req, res, next) {
        console.log(req.url);
        next();
    });


    // getOrder
   /* app.get('/api/orders', function(req, res) {
        findHelper(req,res);

    });*/

    // create
    app.post('/api/orders', function(req, res) {
        console.log("called routes for create")

        OrderRouter.create({
            text : req.body.text,
            done : false
        }, function(err, order) {
            if (err)
                res.send(err);

            findHelper(req,res)
        });

    });

    app.delete('/api/orders/:order_id', function(req, res) {
        OrderRouter.remove({
            _id : req.params.order_id
        }, function(err, order) {
            if (err)
                res.send(err);

            // getOrder
            findHelper(req,res);
        });
    });

    app.get("/loaddata",function (req,res) {
          employeeModel(sequelize).findAll().then(function (result) {
           res.json(result);
        })
    });

    app.get("/searchvirtualbrowser/:query",function (req, res) {
        var searchquery=req.params.query;
        console.log("searchquery>>>>> ",searchquery);
        if( typeof searchquery !=undefined && searchquery!=null){
        nightmare.searchlistInXKom(searchquery).then(function (data) {
            console.log("data returned from nightmare browser", data);
            res.json({data:data});
            console.log("data returned from node server res", res);

        });
        }
    });
    app.get("/oneClickApp.com/:token",function (req, res) {
       employeeModel(selquelize).find({})
    });
    function findHelper (req, res){
        OrderRouter.find(function(err, orders) {

            if (err) {
                res.send(err);
            }
            res.json(orders);
        });
    }

};