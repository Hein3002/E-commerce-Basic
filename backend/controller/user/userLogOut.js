async function userLogOutController(req, res) {
    try {
        res.clearCookie("token")

        res.json({
            error: false,
            success: true,
            data: [],
            message: "Logout Successfully"
        })
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

module.exports = userLogOutController