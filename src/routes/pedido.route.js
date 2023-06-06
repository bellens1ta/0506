const {Router} = require('express')
const controller = require('../controllers/pedido.controller')
const route = Router()

route.get("/", controller.getPedidos)
route.get("/:id",controller.getPedidoById )
route.post("/", controller.addPedido)

module.exports = route