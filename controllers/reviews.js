const { model } = require("mongoose");
const Review= require("../models/review");
const Listing= require("../models/listing")

module.exports.createReview=async(req,res)=>{
    let listing=await Listing.findById(req.params.id); 
    let newReview= new Review(req.body.review);

    listing.reviews.push(newReview);
    newReview.author=req.user._id;
    // console.log(newReview);
    await newReview.save();
    await listing.save();
     req.flash("success","New review created ");
    res.redirect(`/listings/${listing._id}`);

    console.log("new review saved ");
  
}

module.exports.destroyReview=async(req,res)=>{
    let{id,reviewId}=req.params;
    console.log("Deleting review:", reviewId);

    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
     req.flash("success","review deleted ");
    res.redirect(`/listings/${id}`)
}