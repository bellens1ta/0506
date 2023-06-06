const {Router} = require('express')
const controller = require('../controllers/vianda.controller')
const route = Router()

route.get("/", controller.getViandas)

module.exports = route