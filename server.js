var express=require("express");
var app=express();


var mongoose=require("mongoose");
var Contact = require("./models/contact")

var bodyparser=require("body-parser");

mongoose.connect("mongodb://localhost/contactlist",function(){
console.log("succeessfully connected to mongodb")

});
var port=process.env.PORT || 3000;


app.use(express.static(__dirname + "/public"))
app.use(bodyparser.json());

app.get("/contactlist",function(req,res){
	Contact.getContacts(function(err,data){
		if (err) {
			throw err;
		}
		res.json(data);
	})
	
})

app.get("/employeelist",function(req,res){

})

app.post("/contactlist",function(req,res){
	var body=req.body; //will fetch body details
	//console.log(body); 

	Contact.addcontact(body,function(err,data){
		if (err) {
			throw err;
		}
		res.json(data);

		//res.send(filename);----if we have multiple html files we can use this 
	})
})

app.get("/contactlist/:id",function(req,res){
	var id=req.params.id;
	Contact.getContactById(id,function(err,data){
		console.log(data);
		if (err) {
			throw err;
		}
		res.json(data);
	})
})

app.put("/contactlist/:id",function(req,res){
	var id=req.params.id;
	var body=req.body;

	Contact.updateContact(id,body,function(err,data){
		if (err) {
			throw err;
		}
		res.json(data);
	})
})


app.delete("/contactlist/:id",function(req,res){
	var id=req.params.id;

	Contact.removeContact(id,function(err,data){
		if (err) {
			throw err;
		}
		res.json(data);
	})
})

app.listen(port,function(){
	console.log("server is listening at port"+port)
})