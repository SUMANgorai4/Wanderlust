const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");    // one . use to get out form the folder currently i am and another . is to enter into another folder where the required file is present , 
                                                             // if therir  i am not inside any folder , just require a file from another folder the just use one .
                                                            // if both are in same foleder no . require
const { listingSchema , reviewSchema}=require("../schema.js"); //.. means we first going to parent directory from a file  then enter into a another foleder->file/folder 
const {isLoggedIn ,isOwner}=require("../middleware.js");

const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        throw  new ExpressError(400,error.message);
        
    }
    else{
        next();
    }
};

const listingController=require("../controllers/listings.js");
const multer=require("multer");
const {storage}=require('../cloudConfig.js')
const upload=multer({storage})

router
 .route("/")
 .get(wrapAsync(listingController.index))
 .post( 
    isLoggedIn,
    upload.single("Listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
    );



// new get req
router.get(
    "/new",
    isLoggedIn,
    listingController.renderNewForm
);

router
 .route("/:id")
 .get(wrapAsync(listingController.showListing))
 .put(
    isLoggedIn,
    isOwner,
    validateListing,
    upload.single("Listing[image]"),
    wrapAsync(listingController.updateListing)
    )
  .delete(
    isLoggedIn,
    isOwner, 
    wrapAsync(listingController.destroyListing)
    );  


// edit route
router.get(
    "/:id/edit",
    isLoggedIn,
    isOwner, 
    wrapAsync(listingController.renderEditForm)
);



// //index route
// router.get("/", wrapAsync(listingController.index));



// // create new route
// router.post("/", 
//     isLoggedIn,
//     validateListing,
//     wrapAsync(listingController.createListing)
// );



// //update 
// router.put(
//     "/:id",
//     isLoggedIn,
//     isOwner,
//     validateListing,
//     wrapAsync(listingController.updateListing)
// );

// // delete
// router.delete(
//     "/:id", 
//     isLoggedIn,
//     isOwner, 
//     wrapAsync(listingController.destroyListing)
// );

// //show route
// router.get(
//     "/:id",  
//     wrapAsync(listingController.showListing)
// );


module.exports=router;