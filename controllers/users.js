const User=require("../models/user");

module.exports.renderSignupForm=(req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signup= async(req,res)=>{
    try{
        let{username,email,password}=req.body;
        const newUser= new User({email,username});
        const registeredUser= await User.register(newUser,password);;
        console.log(registeredUser);
        req.login(registeredUser,(err)=>{   //if user in signingup then automatically logged in for first time
            if(err){
                return next(err);
            }
            req.flash("success","welcome to wanderlust");
            res.redirect("/listings");
        })
        
        
    } catch(e){
         req.flash("error",e.message);
         res.redirect("/signup");
    }
   


}

module.exports.renderLonginForm=(req,res)=>{
    res.render("users/login.ejs")
}


module.exports.login=async(req,res)=>{
    req.flash("success","welcome back to your accout!");
    let redirectUrl=res.locals.redirectUrl || "/listings"  /// phase 2 part e video 5
    res.redirect(redirectUrl);
}

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you are logged out");
        res.redirect("/listings");
    })
}