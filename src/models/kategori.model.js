const db = require("../helpers/db.helper")

exports.findAll = async function (params) {
    params.page = parseInt(params.page) || 1
    params.limit = parseInt(params.limit) || 5
    params.search = params.search || ""
    params.sort = params.sort || "id"
    params.sortBy = params.sortBy || "ASC"

    const offset = (params.page - 1) * params.limit

    const query = `
SELECT * FROM "kategori" 
WHERE "kategori" 
LIKE $3 
ORDER BY ${params.sort} ${params.sortBy} 
LIMIT $1 OFFSET $2
`
    const values = [params.limit, offset, `%${params.search}%`]
    const {rows} = await db.query(query, values)
    return rows
}

exports.findOne = async function (id) {
    const query = `
    SELECT * FROM "kategori" WHERE id=$1
    `
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.insert = async function (data) {
    const query = `
    INSERT INTO "kategori" ("kategori")
    VALUES ($1) RETURNING *
    `
    const values = [data.kategori]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.update = async function (id, data) {
    const query = `
    UPDATE "kategori"
    SET "kategori"=$2
    WHERE "id"=$1
    RETURNING *
  `
    const values = [id, data.kategori]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.destroy = async function (id) {
    const query = `
    DELETE FROM "kategori" WHERE "id"=$1 RETURNING *
  `
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}
