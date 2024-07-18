const express = require("express")
const { model } = require("mongoose")
const router = express.Router()
const userSignUpController = require("../controller/user/userSignUp")
const userSigInController = require("../controller/user/userSignIn")
const userDetailsController = require("../controller/user/userDetails")
const authToken = require("../middleware/authToken")
const userLogOutController = require("../controller/user/userLogOut")
const allUer = require("../controller/user/allUser")
const updateUser = require("../controller/user/updateUser")
const uploadProuductController = require("../controller/product/uploadProduct")
const getProductController = require("../controller/product/getProduct")
const updateProductController = require("../controller/product/updateProduct")
const getCategoryProductOne = require("../controller/product/getCategoryProductOne")
const getCategoryWiseProduct = require("../controller/product/getCategoryWiseProduct")
const getProductDetails = require("../controller/product/getProductDetails")
const addToCartController = require("../controller/user/addToCartController")
const countAddToCartProduct = require("../controller/user/countAddToCartProduct")
const addToCartViewProduct = require("../controller/user/addToCartViewProduct")
const updateToCartProduct = require("../controller/user/updateToCartProduct")
const deleteToCartProcduct = require("../controller/user/deleteToCartProduct")
const searchProduct = require("../controller/product/searchProduct")
const fillterProductController = require("../controller/product/fillterProduct")




router.post("/signup", userSignUpController)
router.post("/signin", userSigInController)
router.get("/user-details",authToken, userDetailsController)
router.get("/user-logout", userLogOutController)


//admin
router.get("/all-user",authToken, allUer)
router.post("/update-user",authToken, updateUser)

//product
router.post("/upload-product",authToken,uploadProuductController)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)
router.get("/get-categoryProduct",getCategoryProductOne)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetails)
router.get("/search-product",searchProduct)
router.post("/fillter-product",fillterProductController)


//user add to cart
router.post("/addtocart",authToken,addToCartController)
router.get("/countAddToCartProduct",authToken,countAddToCartProduct)
router.get("/viewCartProduct",authToken,addToCartViewProduct)
router.post("/updateQuantity",authToken,updateToCartProduct)
router.post("/deleteCartProduct",authToken,deleteToCartProcduct)


module.exports = router