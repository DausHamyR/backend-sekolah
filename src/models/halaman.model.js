const db = require("../helpers/db.helper")

exports.findAll = async function (params) {
    params.page = parseInt(params.page) || 1
    params.limit = parseInt(params.limit) || 10
    params.search = params.search || ""
    params.sort = params.sort || "id"
    params.sortBy = params.sortBy || "ASC"

    const offset = (params.page - 1) * params.limit

    const query = `
SELECT * FROM "halaman" 
WHERE "judul" 
ILIKE $3 
ORDER BY ${params.sort} ${params.sortBy} 
LIMIT $1 OFFSET $2
`
    const values = [params.limit, offset, `%${params.search}%`]
    const {rows} = await db.query(query, values)
    return rows
}

exports.findOne = async function (judul) {
    const query = `
    SELECT * FROM "halaman" WHERE judul=$1
    `
    const values = [judul]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.insert = async function (data) {
    const query = `
    INSERT INTO "halaman" ("judul", "isi_halaman", "slug")
    VALUES ($1, $2, $3) RETURNING *
    `
    const values = [data.judul, data.isiHalaman, data.slug]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.update = async function (id, data) {
    const query = `
    UPDATE "halaman"
    SET 
      "judul"=COALESCE(NULLIF($2, ''), "judul"),
      "isi_halaman"=COALESCE(NULLIF($3, ''), "isi_halaman"),
      "slug"=COALESCE(NULLIF($4, ''), "slug")
    WHERE "id"=$1
    RETURNING *
  `
    const values = [id, data.judul, data.isiHalaman, data.slug]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.destroy = async function (id) {
    const query = `
    DELETE FROM "halaman" WHERE "id"=$1 RETURNING *
  `
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}
