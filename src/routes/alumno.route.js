const {Router} = require('express')
const controller = require('../controllers/alumno.controller')
const route = Router()

route.get("/", controller.getAlumnos)

module.exports = route