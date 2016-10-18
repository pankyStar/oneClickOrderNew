var Item = require('../models/Item.js');
var BasketModel = require('../models/basketModel.js');
var employeeModel = require('../models/employeeModel.js');
var nightmare = require('../../nightmareRunner.js');
var cheerio = require('cheerio')
var request = require('request')
var jwt = require('jsonwebtoken');
var fs = require('fs');
var secret = fs.readFileSync('./config/secret').toString();
var cloudscraper = require('cloudscraper');
ObjectID = require('mongodb').ObjectID;


module.exports = function (app) {

    console.log("in app routes.js")
    app.all('*', function (req, res, next) {
        console.log(req.url);
        next();
    });


    //getOrder
    app.get('/basket/item/', function (req, res) {
        findHelper(req, res);

    });

    app.get('/basket/items', function (req, res) {
        console.log(">>>>>>>>>>>>>>>>.. find all items for main basket")
        Item.find()
            .exec(function (err, result) {
            if (!err) {
                console.log("mongodb search result for items for the session", result)
                res.send(result)
            }
        });
        //findHelper(req,res); {dateCreated:{ "$regex": new Date().toDateString().slice(0,14)}
    });

    // create
    app.post('/basket/items', function (req, res) {
        console.log("called server for create item", req.body.itemToDb);

        var item = req.body.itemToDb;
        item.dateCreated = new Date().toDateString().slice(0,25);
        item._id= new ObjectID();
        Item.create(item, function (err, item) {
            if (err)
                console.log("Error ", err);

            // findHelper(req, res)
        });

    });
    app.get('/basket/:basketName/items',function (req, res) {
        console.log("req.params.basketName  >>>>>>>>>",req.params.basketName)
        BasketModel.find( {basketName:{ "$regex": req.params.basketName}} ).exec(function (err, result) {
            if (!err) {
                console.log("mongodb search result for items in the basket", result)
                res.send(result)
            }
        });
    });

    app.post('/basket/save', function (req, res) {

        var basket = req.body.basket;
        var basketmodel={};
        basketmodel.basketName=req.body.name;
        basketmodel.preDefined=req.body.preDefined;
        console.log("basket to create using server ", basketmodel);
        basketmodel.dateCreated = new Date();
        basketmodel.items=basket;
        // item.userSession=session;

        BasketModel.create(basketmodel, function (err) {
            if (err){
                console.log("Error ", err);
            } else{
                res.json({"saved":true})
            }

            // findHelper(req, res)
        })

    });

    app.get('/baskets/all',function (request, response) {
        console.log("in server to get all baskets");
        BasketModel.find().exec().then(function (result) {
            console.log("result all baskets ",result)
            response.json(result);
        })

    });
    app.get('/baskets/predef',function (request, response) {
        console.log("in server to get all predef baskets");
        BasketModel.find({preDefined:true}).exec().then(function (result) {
            console.log("result all predef baskets ",result)
            response.json(result);
        })

    });
    app.delete('/basket/main', function (req, res) {
        Item.remove({}).exec().then(function (result) {
            console.log("deleted all items")
            res.json(result)
        })
    });
    app.delete('/basket/main/:id', function (req, res) {
        console.log("delete item id", req.params.id)
        Item.remove({_id:req.params.id}).exec().then(function (result) {
            console.log("deleted  item")
            res.json(result)
        })
    });

    app.get("/:token/loaddata", function (req, res) {
        employeeModel.find().exec().then(function (result) {

            res.json(result);
        });


    });

    app.post("/product", function (req, res) {
        console.log("called server for product page", req.body);
        var productLink = req.body.link;
        console.log("product link>>", productLink);
        var data = {itemName: "", itemPrice: "", itemLink: "", content: "", currency: '', itemNumber: ''};
        if (typeof productLink !== undefined && productLink !== null && productLink != "") {

            console.log("request and cheerio the html for the product");
            request(productLink, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    $ = cheerio.load(body);
                    $('.breadcrumbs').remove()
                    $('div[class="box box-review"]').remove()
                    data.content = $('div[class="container"]').html();
                    let childPrice = $('span[class="pull-right price"]').children().get(1);
                    let childCurrency = $('span[class="pull-right price"]').children().get(0);

                    data.itemName = $('div[class="product-info"]').children().text();
                    data.itemLink = productLink;
                    data.itemPrice = childPrice.attribs.content;
                    data.itemCurrency = childCurrency.attribs.content;
                    data.itemNumber = $('span[itemprop="sku"]').text()
                    res.json(data)
                }
            })
        }
    });

    app.post("/buyfromXkom", function (req, res) {
        console.log("called private nightmare browser to buy");
        var items = req.body.items;
        console.log("items to save via nightmare   routes>>", items.length);
        if (typeof items !== undefined && items !== null && items.length>0) {

                nightmare.buyFromXKom(items).then(function (data) {
                    console.log("data returned from nightmare browser");
                    res.json({data: data});
                    console.log("data returned from node server");

                });


        }
        else {
            res.json({"error":"could not buy items"})
        }

    })


    app.get("/:token/searchxk/:query", function (req, res) {
        var searchquery = req.params.query;
        var tokenfromUser = req.params.token;
        console.log("searchquery>>>>> ", searchquery);
        console.log("token from user >>>>> ", tokenfromUser);
        var dataSet = new Set();
        if (typeof searchquery !== undefined && searchquery !== null && searchquery != "") {

            console.log("request and cheerio to search in XKOm");
            cloudscraper.get("https://www.x-kom.pl/szukaj?q=" + searchquery, function(error, response, body) {
                if (error) {
                    console.log('Error occurred', error,response,body);
                    res.json( {'error': error})
                } else {
                    console.log(body, response);
                }
            });
            request("https://www.x-kom.pl/szukaj?q=" + searchquery, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    $ = cheerio.load(body);
                    var links = $('.product-list-wrapper').find('a');
                    for (let i = 0; i < links.length; i++) {
                        var href = $(links[i]).attr('href');
                        if (href.indexOf("#reviews") == -1) {
                            dataSet.add("https://www.x-kom.pl" + $(links[i]).attr('href'))
                        }

                    }
                    console.log("data from cheerio >>>");
                    res.json({data: Array.from(dataSet)})
                }

            })
        }


    });

    /*
     function findEmpInDb(personalToken, callback) {
     employeeModel(sequelize).findAllItemsOfCurrentBasket({ where: {
     personalToken: personalToken
     }
     }).then(function (result) {
     console.log(" no of found emps with token******", result.length);
     callback(result);
     }).catch(err=>console.log("err", err));
     }
     */

    app.post("/:token/login", function (req, res) {

        var tokenfromUser = req.params.token;
        console.log("private link token", tokenfromUser)
        employeeModel.find({
            personalToken: tokenfromUser

        }).then(function (result) {
            console.log(" no of found emps with token******", result.length);
            console.log("res ", result[0]);
            if (result[0] !== undefined) {
                 global.session = {}
                var foundUser = result[0];
               /*  if (global.session!==undefined&&global.session.length>0) {
                    console.log("session already exists")
                    return res.json(global.session)
                }*/
                function User(userName, email, personalLink) {
                    this.name = userName;
                    this.email = email;
                    this.personalLink = personalLink
                }
                var user = new User(foundUser.name + " " + foundUser.surname, foundUser.email, foundUser.personalToken);
                var session = new Session(user);

                function Session(user) {
                    this.token = generateToken();
                    this.body = {};
                    this.body.userName = user.name;
                    this.body.userEmail = user.email;
                    this.body.personalLink = user.personalLink;
                    function generateToken() {
                        return jwt.sign(user, secret, {expiresIn: 14400});
                    }
                }
                //global.session = session;
                Session.prototype.createSession = function (session) {
                    if (!global.session[session.token]) {
                        console.log("here")
                        global.session[session.token] = session.body;
                    }

                };
                session.createSession(session);
                console.log(" session >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ", session.token)
                console.log("global session ", global.session[session.token])
                //res.json(session)
                return res.json(foundUser);
            } else {
                res.json("User was not found")
            }


        }).catch(err=>console.log("err", err));

    });

    function findHelper(req, res) {
        Item.find(function (err, items) {

            if (err) {
                res.send(err);
            }
            console.log("result items", items)
            res.json(items);
        });
    }

};