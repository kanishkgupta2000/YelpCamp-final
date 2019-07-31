require("dotenv").config();
var express        =require('express'),
	app            =express(),
	mongoose       =require('mongoose'),
	passport       =require("passport"),
	LocalStrategy  =require("passport-local"),
	flash          =require("connect-flash"),
	methodOverride =require("method-override"),
	Campground     =require("./models/campgrounds.js"),
	Comment        =require("./models/comment.js"),
	User           =require("./models/user"),
	seedDB         =require("./seeds");

var campgroundRoutes =require("./routes/campgrounds"),
	commentRoutes    =require("./routes/comments"),
	indexRoutes       =require("./routes/index");

//seedDB();
mongoose.connect('mongodb+srv://kanishkgupta2000:process.env.PW@cluster0-a31xe.mongodb.net/test?retryWrites=true&w=majority', 
				 {
	useNewUrlParser: true,
	useCreateIndex:true																					
				 }).then(()=>{
	console.log("mongo is connected!");
}).catch(err=>{
	console.log('ERROR:',err.message);
});
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
console.log(__dirname);
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));

app.use(flash());

app.locals.moment = require('moment');

app.use(require("express-session")({
	secret:"Once again Rusty is the best dog!",
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	res.locals.error=req.flash("error");
	res.locals.success=req.flash("success");

	next();
});

app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use(indexRoutes);



app.listen(3000, () => {
	console.log('server is listening');
});