var Nightmare=require('nightmare');
console.log("in nightmare runner");
var nightmare=new Nightmare({show:true});

function loginXKom(){

    return nightmare.useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36")
        .goto("https://www.x-kom.pl/logowanie")
       // .cookies.clearAll()//.type('form[action*="/szukaj"] [name=search-bar]','chleb')
        //.click('form[action*="/search"] [type=submit]')
        //  .wait("form[name='loginForm']")
        .insert('[name="login"]', "pankaj.pandey@xpro.biz")
        .insert('[name="password"]','Xproxkom')
        .wait(500)
        .click('[type="submit"]')
        .wait(5000)
      //  .goto("www.x-kom.pl/szukaj?q="+"cd")
      //  .wait(5000)
        .evaluate(function () {
            return  console.log(document)//document.querySelector('#container').firstChild
        });
       // .end();
}
function loginPiotrPawel(){

      return nightmare.useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36")
        .goto("https://www.e-piotripawel.pl/klient/logowanie")//.type('form[action*="/szukaj"] [name=search-bar]','chleb')
        //.click('form[action*="/search"] [type=submit]')
          //.wait("form[name='login-form']")
          .wait(2000)
        .insert('StoreLoginForm[username]', "pankaj.pandey@xpro.biz")//not working
        .insert('StoreLoginForm[password]','Xpropiotr')
        .wait(5000)
        .click('[type="submit"]')
        .wait(10000)
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
   
    return nightmare.useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36")
        .goto("https://www.x-kom.pl").cookies.clearAll()
        .wait(1500)
        .goto("https://www.x-kom.pl/logowanie")
        .insert('[name="login"]', "pankaj.pandey@xpro.biz")
        .insert('[name="password"]','Xproxkom')
        .wait(100)
        .click('[type="submit"]')
        .wait(2000)
     //   .goto("https://www.x-kom.pl")
       // .wait(1000)//.cookies.clearAll()
        .goto("https://www.x-kom.pl/szukaj?q="+query)
        .wait(2000).evaluate(function () {
            var result=[];
            var links=document.getElementsByTagName('a');
            for(var i=0;i<links.length;i++){
                var href=links[i].href;
                if(href){
                result.push(href);
                }
            }
            return result;
            }
            
        ).end();

}
function searchlistFromPiotrPawel(query) {
    
}

module.exports = {
    loginToXCom:  loginXKom,
    searchlistInXKom: searchlistFromXKom,
    loginToPiotrPawel:loginPiotrPawel
};