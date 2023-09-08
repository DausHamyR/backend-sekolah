const kategoriModel = require("../models/kategori.model")

exports.getKategori = async (request, response) => {
    try {
        const kategori = await kategoriModel.findAll(request.query)
        return response.json({
            success: true,
            message: "kategori",
            results: kategori
        })
    }catch(err) {
        console.log(err)
    }
}

exports.getOneKategori = async (request, response) => {
    try {
        const {name} = request.params
        const kategori = await kategoriModel.findOne(name)
        if(!kategori) {
            throw Error("kategori_not_found")
        }
        return response.json({
            success: true,
            message: "kategori",
            results: kategori
        })
    }catch(err) {
        console.log(err)
    }
}

exports.createKategori = async (request, response) => {
    try {
        let data = {
            ...request.body
        }
        const kategori = await kategoriModel.insert(data)
        const gantiSpace = kategori.kategori.toLowerCase().replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "").replace(/-+/g, "-").trim()
        const results = {
            kategori,
            slug: `https://sekolahppdb.rinookta.com/kategori/${gantiSpace}`
        }
        await kategoriModel.update(kategori.id, {slug: results.slug})
        return response.json({
            success: true,
            message: "Create kategori successfully",
            results
        })
    }catch(err) {
        console.log(err)
    }
}

exports.updateKategori = async (request, response) => {
    try {
        const id = request.params.id
        let data = {
            ...request.body
        }
        const updateKategori = await kategoriModel.update(id, data)
        const gantiSpace = updateKategori.kategori.toLowerCase().replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "").replace(/-+/g, "-").trim()
        const slug = `https://sekolahppdb.rinookta.com/kategori/${gantiSpace}`
        const updateSlug = await kategoriModel.update(updateKategori.id, {slug})
        return response.json({
            success: true,
            message: "Kategori updated",
            results: updateSlug
        })
    }catch(err) {
        console.log(err)
    }
}

exports.deleteKategori = async (request, response) => {
    try {
        const kategoriId = request.params.id
        const data = await kategoriModel.destroy(kategoriId)
        return response.json({
            success: true,
            message: "Delete Kategori successfully",
            data
        })
    }catch(err) {
        console.log(err)
    }
}
