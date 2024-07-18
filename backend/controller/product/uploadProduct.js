const uploadProuductPermission = require("../../helpers/permission")
const productModel = require("../../models/productModel")

async function uploadProuductController(req, res) {
    try {

        const sessionUserId=req.userId
        if(!uploadProuductPermission(sessionUserId)){
            throw new Error("Permission denied")
        }

        const uploadProduct = new productModel(req.body)
        const saveProduct = await uploadProduct.save()

        res.status(201).json({
            message: "Product upload successfully",
            error: false,
            success: true,
            data: saveProduct
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}
module.exports = uploadProuductController