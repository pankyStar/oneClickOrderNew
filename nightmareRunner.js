var Nightmare=require('nightmare');
console.log("in nightmare runner");
var nightmare=new Nightmare({show:true});
module.exports=nightmare;

function loginXKom(){
    nightmare.useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36")
        .goto("https://www.x-kom.pl/logowanie")//.type('form[action*="/szukaj"] [name=search-bar]','chleb')
        //.click('form[action*="/search"] [type=submit]')
        //  .wait("form[name='loginForm']")
        .insert('[name="login"]', "pankaj.pandey@xpro.biz")
        .insert('[name="password"]','Xproxkom')
        .wait(5000)
        .click('[type="submit"]')
        .wait(5000)
        .evaluate(function () {
            return  console.log(document)//document.querySelector('#container').firstChild
        })
        .end()
        .then(function (result) {
            console.log("result "+result)
        }).catch(function (error) {
        console.error("Error ",error)
    });
}
function loginPiotrPawel(){
    nightmare.useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36")
        .goto("https://www.x-kom.pl/logowanie")//.type('form[action*="/szukaj"] [name=search-bar]','chleb')
        //.click('form[action*="/search"] [type=submit]')
        //  .wait("form[name='loginForm']")
        .insert('[name="login"]', "pankaj.pandey@xpro.biz")
        .insert('[name="password"]','Xpropiotr')
        .wait(1000)
        .click('[type="submit"]')
        .wait(2000)
        .evaluate(function () {
            return  console.log(document);//document.querySelector('#container').firstChild
        })
        .end()
        .then(function (result) {
            console.log("result "+result)
        }).catch(function (error) {
        console.error("Error ",error)
    });
}
function searchlistFromXKom(query){
    nightmare.useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36")
        .goto("www.x-kom.pl/szukaj?q="+query)
        .wait(5000);

}
function searchlistFromPiotrPawel(query) {
    
}
