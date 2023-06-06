const alumnos = require('../../data/alumnos.json')
const httpStatusCodes = require('http2').constants;

const getAlumnos = (_, res) => {
    res.status(httpStatusCodes.HTTP_STATUS_OK).json(alumnos)
}

module.exports = {getAlumnos}