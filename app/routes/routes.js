var Item = require('../models/Item.js');
var employeeModel = require('../models/employeeModel.js');
var nightmare = require('../nightmareRunner.js');
var cheerio=require('cheerio')
var request =require('request')


module.exports = function (app) {

    console.log("in app routes.js")
    app.all('*', function (req, res, next) {
        console.log(req.url);
        next();
    });


     //getOrder
    app.get('/oneClickApp/items', function(req, res) {
     findHelper(req,res);

     })

    // create
    app.post('/oneClickApp/items', function (req, res) {
        console.log("called routes for create");

        Item.create({
             itemName: String,
                itemPrice : Float,
                itemLink: String
        }, function (err, item) {
            if (err)
                res.send(err);

            findHelper(req, res)
        });

    });

    app.delete('/oneClickApp/items/:item_id', function (req, res) {
        Item.remove({
            _id: req.params.item_id
        }, function (err, item) {
            if (err)
                res.send(err);

            // getItem
            findHelper(req, res);
        });
    });

    app.get("/oneClickApp/:token/loaddata", function (req, res) {
        employeeModel(sequelize).findAll().then(function (result) {
            res.json(result);
        })
    });

    app.post("/oneClickApp/callServerForProduct/", function (req, res) {
        console.log("called server for product page",req.body);
        var productLink=req.body.link;
        console.log("product link>>",productLink);
        var data=null;
                if (typeof productLink !== undefined && productLink !== null && productLink != "") {

                        console.log("request and cheerio the html for the product");
                        request(productLink,function (error, response, body) {
                        if(!error && response.statusCode==200 ){
                            $=cheerio.load(body);
                            $('.breadcrumbs').remove()
                            $('div[class="box box-review"]').remove()
                            data= $('div[class="container"]').html();
                            res.json(data)
                        }
                    })
                }
                });

    app.post("/buyfromXkom",function (req,res) {
        console.log("called private nightmare browser to buy");
        var productLink=req.body.link;
        console.log("product link>>",productLink);
        if (typeof productLink !== undefined && productLink !== null && productLink != "") {
            nightmare.buyFromXKom(productLink).then(function (data) {
                console.log("data returned from nightmare browser", data);
                res.json({data: data});
                console.log("data returned from node server");

            });
        }

    })


    app.get("/oneClickApp/:token/searchvirtualbrowser/:query", function (req, res) {
        var searchquery = req.params.query;
        var tokenfromUser = req.params.token;
        console.log("searchquery>>>>> ", searchquery);
        console.log("token from user >>>>> ", tokenfromUser);
        var dataSet=new Set();
        if (typeof searchquery !== undefined && searchquery !== null && searchquery != "") {

            console.log("request and cheerio to search in XKOm");
            request("https://www.x-kom.pl/szukaj?q="+searchquery,function (error, response, body) {
                if(!error && response.statusCode==200 ){
                    $=cheerio.load(body);
                    var links=$('.product-list-wrapper').find('a');
                   for(let i=0;i<links.length;i++){
                       var href=$(links[i]).attr('href');
                       if(href.indexOf("#reviews")==-1){
                           dataSet.add( "https://www.x-kom.pl"+$(links[i]).attr('href'))
                       }

                   }
                    console.log("data from cheerio >>>",dataSet);
                    res.json({data:Array.from(dataSet)})
                }
            })
        }


    });

    function findEmpInDb(personalToken, callback) {
        employeeModel(sequelize).findAll({ where: {
                personalToken: personalToken
            }
        }).then(function (result) {
            console.log(" no of found emps with token******", result.length);
            callback(result);
        }).catch(err=>console.log("err", err));
    }

    app.get("/oneClickApp/:token/login", function (req, res) {
        var tokenfromUser = req.params.token;
        findEmpInDb(tokenfromUser);

    });

    function findHelper(req, res) {
        Item.find(function (err, items) {

            if (err) {
                res.send(err);
            }
            res.json(items);
        });
    }

};