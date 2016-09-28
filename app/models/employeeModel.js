
var Sequelize=require('sequelize');
module.exports=function(sequelize){
        console.log("in employeemodel ");
   return sequelize.define("employees", {
        id: {type:Sequelize.STRING(55),primaryKey:true,unique:true, allowNull: false},
        name: Sequelize.STRING(50),
        surname: Sequelize.STRING(50),
        email: Sequelize.STRING(50),
        personalLink: Sequelize.STRING(90)

    })
};