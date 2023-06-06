const {Router} = require('express')
const controller = require('../controllers/alumno.controller')
const route = Router()

route.get("/", controller.getAlumnos)
route.get("/:dni",controller.getAlmunosByDni )
route.put("/:dni", controller.updateAlumnos)
route.post("/", controller.addAlumno)

module.exports = route