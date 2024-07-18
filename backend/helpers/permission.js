const userModel = require("../models/userModel")

const uploadProuductPermission = async (userId)=>{
    const user =await userModel.findById(userId)
    if(user.role !== 'ADMIN'){
        return false
    }
    return true
}
module.exports = uploadProuductPermission