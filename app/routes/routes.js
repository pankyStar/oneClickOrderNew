var Item = require('../models/Item.js');
var employeeModel = require('../models/employeeModel.js');
var nightmare = require('../../nightmareRunner.js');
var cheerio=require('cheerio')
var request =require('request')
var jwt = require('jsonwebtoken');
var fs = require('fs');
var secret = fs.readFileSync('./config/secret').toString();



module.exports = function (app) {

    console.log("in app routes.js")
    app.all('*', function (req, res, next) {
        console.log(req.url);
        next();
    });


     //getOrder
    app.get('/oneClickApp/basket/item/', function(req, res) {
     findHelper(req,res);

     });

    app.get('/oneClickApp/basket/items', function(req, res) {
        Item.find().where({'userSession.token':session.token}).exec(function (err, result) {
            if(!err){
                console.log("mongodb search result for items for the session",result)
                res.send(result)
            }
        })
        //findHelper(req,res);
    });

    // create
    app.post('/oneClickApp/basket/items', function (req, res) {
        console.log("called routes for create item", req.body.itemToDb);

        var item=req.body.itemToDb;
        console.log("item to create using server", item);
        item.userSession=session;
       // item.userName=session.userName;
        Item.create(item, function (err, item) {
            if (err)
               console.log("Error ",err);

           // findHelper(req, res)
        });

    });

    app.delete('/oneClickApp/item/:item_id', function (req, res) {
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

    app.post("/oneClickApp/product", function (req, res) {
        console.log("called server for product page",req.body);
        var productLink=req.body.link;
        console.log("product link>>",productLink);
        var data={itemName:"", itemPrice:"", itemLink:"", content:"", currency:''};
        if (typeof productLink !== undefined && productLink !== null && productLink != "") {

                console.log("request and cheerio the html for the product");
                request(productLink,function (error, response, body) {
                if(!error && response.statusCode==200 ){
                    $=cheerio.load(body);
                    $('.breadcrumbs').remove()
                    $('div[class="box box-review"]').remove()
                    data.content= $('div[class="container"]').html();
                    let childPrice=$('span[class="pull-right price"]').children().get(1);
                    let childCurrency=$('span[class="pull-right price"]').children().get(0);

                    data.itemName=$('div[class="product-info"]').children().text();
                    data.itemLink=productLink;
                    data.itemPrice=childPrice.attribs.content;
                    data.itemCurrency=childCurrency.attribs.content;
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
                console.log("data returned from nightmare browser");
                res.json({data: data});
                console.log("data returned from node server");

            });
        }

    })


    app.get("/oneClickApp/:token/searchxk/:query", function (req, res) {
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
                    console.log("data from cheerio >>>");
                    res.json({data:Array.from(dataSet)})
                }
            })
        }


    });

/*
    function findEmpInDb(personalToken, callback) {
        employeeModel(sequelize).findAll({ where: {
                personalToken: personalToken
            }
        }).then(function (result) {
            console.log(" no of found emps with token******", result.length);
            callback(result);
        }).catch(err=>console.log("err", err));
    }
*/

    app.get("/oneClickApp/:token/login", function (req, res) {

        var tokenfromUser = req.params.token;
        console.log("private link token",tokenfromUser)
        employeeModel(sequelize).findAll({ where: {
            personalToken: tokenfromUser
        }
        }).then(function (result) {
            console.log(" no of found emps with token******", result.length);
            console.log("res ",result[0].name)
            var foundUser=result[0];
            function User(userName, email, personalLink){
                this.name=userName;
                this.email=email;
                this.personalLink=personalLink
            }
            var user=new User(foundUser.name+" "+foundUser.surname,foundUser.email, foundUser.personalToken);
            var session=new Session(user);
            function Session (user) {

                this.token = generateToken();
                this.body = {};
                this.body.userName = user.name;
                this.body.userEmail = user.email;
                this.body.personalLink=user.personalLink;
                function generateToken () {
                    return jwt.sign(user,secret,{expiresIn:14400});
                }

            }
            global.session = session;

            Session.prototype.createSession = function (session) {
                if (global.session[session.token]) {
                    global.session[session.token] = session.body;
                }
            };



            session.createSession(session);

            console.log(" session >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ",session)
            console.log("global session ",session[session.token])
            res.json(session)

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