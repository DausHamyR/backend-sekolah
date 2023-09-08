const halamanModel = require("../models/halaman.model")

exports.getHalaman = async (request, response) => {
    try {
        const halaman = await halamanModel.findAll(request.query)
        return response.json({
            success: true,
            message: "halaman",
            results: halaman
        })
    }catch(err) {
        console.log(err)
    }
}

exports.getOneHalaman = async (request, response) => {
    try {
        const {name} = request.params
        const halaman = await halamanModel.findOne(name)
        if(!halaman) {
            throw Error("kategori_not_found")
        }
        return response.json({
            success: true,
            message: "halaman",
            results: halaman
        })
    }catch(err) {
        console.log(err)
    }
}

exports.createHalaman = async (request, response) => {
    try {
        let data = {
            ...request.body
        }
        const halaman = await halamanModel.insert(data)
        const gantiSpace = halaman.judul.toLowerCase().replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "").replace(/-+/g, "-").trim()
        const results = {
            halaman,
            slug: `https://sekolahppdb.rinookta.com/page/${gantiSpace}`
        }
        await halamanModel.update(halaman.id, {slug: results.slug})
        return response.json({
            success: true,
            message: "Create halaman successfully",
            results: halaman
        })
    }catch(err) {
        console.log(err)
    }
}

exports.updateHalaman = async (request, response) => {
    try {
        const id = request.params.id
        let data = {
            ...request.body
        }
        const updateHalaman = await halamanModel.update(id, data)
        const gantiSpace = updateHalaman.judul.toLowerCase().replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "").replace(/-+/g, "-").trim()
        const slug = `https://sekolahppdb.rinookta.com/page/${gantiSpace}`
        const updateSlug = await halamanModel.update(updateHalaman.id, {slug})
        return response.json({
            success: true,
            message: "Halaman updated",
            results: updateSlug
        })
    }catch(err) {
        console.log(err)
    }
}

exports.deleteHalaman = async (request, response) => {
    try {
        const halamanId = request.params.id
        const data = await halamanModel.destroy(halamanId)
        return response.json({
            success: true,
            message: "Delete Halaman successfully",
            data
        })
    }catch(err) {
        console.log(err)
    }
}
