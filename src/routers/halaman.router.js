const halamanRouter = require("express").Router()
const halamanController = require("../controllers/halaman.controllers")

halamanRouter.get("/", halamanController.getHalaman)
halamanRouter.get("/:name", halamanController.getOneHalaman)
halamanRouter.post("/", halamanController.createHalaman)
halamanRouter.patch("/:id", halamanController.updateHalaman)
halamanRouter.delete("/:id", halamanController.deleteHalaman)

module.exports = halamanRouter
