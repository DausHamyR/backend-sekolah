const user1Model = require("../models/users1.model")

exports.getAll = async (request, response) => {
    try {
        console.log("tes", request.query)
        const user = await user1Model.findAll(request.query)
        console.log("tes1")
        return response.json({
            success: true,
            message: "user",
            results: user
        })
    }catch(err) {
        console.log(err)
    }
}
