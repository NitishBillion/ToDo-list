const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

// const getDate  = require("./date");

const app = express();

const items = [];

const workItems =[];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended : true}));

app.use(express.static("public"));

app.get("/", function(req, res){

    const day = date.getDate();

    res.render("list", {listTitle : day, newListItems : items, route :"/"});

});

app.post("/", function (req, res){
    const item = req.body.newItem;

        if(req.body.list === "Work"){
            workItems.push(item);
            res.redirect("/work");
        }else{
            items.push(item);
            res.redirect("/");
        }
 
});

// WORK ROUTE BEGINS HERE

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newListItems: workItems, route: "/work" });
});

app.post("/work", function(req, res){
    const item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work")
});

app.get("/about", function(req, res){
    res.render("about");
})




app.listen(3000, function(){
    console.log("Server satrted on port 3000")
});
