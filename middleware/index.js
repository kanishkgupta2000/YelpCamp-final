var Campground=require("../models/campgrounds.js");
var Comment=require("../models/comment.js");

var midObj={};
midObj.checkCommentOwnership=function(req,res,next){
if(req.isAuthenticated()){
Comment.findById(req.params.comment_id,function(err,foundComment){
	if(err)
		{
			
			res.redirect("back");
		}
	else{
		if(foundComment.author.id.equals(req.user._id)||req.user.isAdmin){
		next();
		}
		else{
				req.flash("error","You don't have permission to do that");

			res.redirect("back");
		}
	}
});	
}	
else{
		req.flash("error","You need to be logged in to do that");
	res.redirect("back");
}
};


midObj.isLoggedIn=function (req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","You need to be logged in first!");
	res.redirect("/login");
};

midObj.checkCampgroundOwnership=function (req,res,next){
if(req.isAuthenticated()){
Campground.findById(req.params.id,function(err,foundCampground){
	if(err)
		{
				req.flash("error","Campground not found");

			res.redirect("back");
		}
	else{
		if(foundCampground.author.id.equals(req.user._id)||req.user.isAdmin){
		next();
		}
		else{
				req.flash("error","You don't have permission to do that");

			res.redirect("back");
		}
	}
});	
}	
else{
	req.flash("error","You need to be logged in to do that");
	res.redirect("back");
}
};

module.exports=midObj;

