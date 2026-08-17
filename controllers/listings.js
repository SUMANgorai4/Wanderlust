const Listing= require("../models/listing")

module.exports.index=async(req,res)=>{
    const allListing= await Listing.find({});
    res.render("listings/index.ejs",{allListing});  //imp line
}

module.exports.renderNewForm=(req,res)=>{    //isLoggedIn, is a middleware creted shaperatly to check to weater the user is loggedin or not 
    //console.log(req.user);
    
    res.render("listings/new.ejs")
}

module.exports.createListing=async(req,res)=>{
    let url=req.file.path;
    let filename=req.file.filename;
    let {title,description,price,country,location}=req.body;
   const newListing = new Listing(req.body.listing); 
    // const newListing = new Listing({
    //         title,
    //         description,
    //         price,
    //         country,
    //         location
    //     });
        newListing.owner=req.user._id;
        newListing.image={url,filename}; 
        await newListing.save();
        req.flash("success","New listing created ");
        //console.log( newListing);
        res.redirect("/listings");
}

module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
   const showAllInfo= await Listing.findById(id).populate({path:"reviews",populate:{path:"author"},}).populate("owner");
   if(!showAllInfo){
     req.flash("error","listing requested for dosenot exits ");
     res.redirect("/listings")
   }
   
   res.render("listings/show.ejs",{showAllInfo})

}

module.exports.renderEditForm=async(req,res)=>{
    let {id}=req.params;
    
   const showAllInfo= await Listing.findById(id);
   
    if(!showAllInfo){
     req.flash("error","listing requested for dosenot exits ");
     res.redirect("/listings")
   }

   let originalImageUrl=showAllInfo.image.url;
     originalImageUrl =originalImageUrl.replace("/upload","/upload/w_250")

    res.render("listings/edit.ejs",{showAllInfo,originalImageUrl})
}

module.exports.updateListing=async (req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.Listing});

    if ( typeof req.file !=="undefined"){
    let url=req.file.path;
    let filename=req.file.filename;
    listing.image={url,filename};
    await listing.save();
    }
    req.flash("success"," listing updated ");
    res.redirect(`/listings/${id}`);
   
}

module.exports.destroyListing=async(req,res)=>{
    let {id}=req.params;
    let deleteItem=await Listing.findByIdAndDelete(id);
    console.log(deleteItem);
    req.flash("success"," listing deleted ");
    res.redirect("/listings")
}