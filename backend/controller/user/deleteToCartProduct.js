const addToCartModel = require("../../models/cartProduct")


const deleteToCartProcduct = async(req,res)=>{
    try{
        const currentUser = req.userId
        const addToCartProductId = req.body._id

        const deleteProduct = await addToCartModel.deleteOne({_id:addToCartProductId})

        res.json({
            message:"Product Deleted from cart",
            success:true,
            error:false,
            data:deleteProduct
        })

    }catch(err){
        res.json({
            message : err.message ||err, 
            error :true,
            success : false
        })
    }
}
module.exports =deleteToCartProcduct