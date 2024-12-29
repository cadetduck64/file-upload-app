const database = require('../database/queries')

const indexControllerFunc = async (req, res) => {
    const all = await database.prismaFindAll()
    return all
}

module.exports = {indexControllerFunc};