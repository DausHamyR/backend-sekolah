const kategoriRouter = require("express").Router()
const kategoriController = require("../controllers/kategori.controllers")

kategoriRouter.get("/", kategoriController.getKategori)
kategoriRouter.get("/:name", kategoriController.getOneKategori)
kategoriRouter.post("/", kategoriController.createKategori)
kategoriRouter.patch("/:id", kategoriController.updateKategori)
kategoriRouter.delete("/:id", kategoriController.deleteKategori)

module.exports = kategoriRouter
