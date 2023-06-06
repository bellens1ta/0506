const pedidos = require('../../data/pedidos.json')
const alumnos = require('../../data/alumnos.json')
const viandas = require('../../data/viandas.json');
const { getViandaByCode } = require('./vianda.controller');
const httpStatusCodes = require('http2').constants;
let id = 1;//para generar id

const getPedidos = (_, res) => {
    res.status(httpStatusCodes.HTTP_STATUS_OK).json(pedidos)
}

const getPedidoById = (req,res) => {
    const {id} = req.params
    const pedido = pedidos.find((p) => p.id == id)

    if (pedido) res.json(pedido)
    else{
        res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({ error: 'No se encontro el pedido' })
      }
    
    }


const addPedido = (req, res) =>  {
    const { dni, tipo } = req.body

const dniAlumno = alumnos.find((a) => a.dni == dni && a.habilitado)
const viandaCode = viandas.findIndex(v=>v.stock>0 && v.tipo==tipo&& v.aptoCeliaco)

const vianda = {...viandas[viandaCode]} 
delete vianda.stock

if (dniAlumno ==-1){
    res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({ error: 'No se encontro el dni', dniAlumno })
    return
}

let alumno ={...alumnos[dniAlumno]}
 delete alumno.habilitado
if (pedidos.length>0) {
    const ids = pedidos.map(p=> p.id==id) 
    id = Math.max(...ids)+1
}



if (viandaCode==-1) {
   res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({ error: 'La vianda ya se encuentra' })
   return
}

const pedido={
    id,
    fecha: new Date().toISOString().slice(0, 10),
    alumno,
    vianda
}
pedidos.push(pedido)
alumnos[dniAlumno].habilitado=false
viandas[viandaCode].stock--


res.status(httpStatusCodes.HTTP_STATUS_CREATED).json({mensaje :"El pedido se hizo correctamente",pedido})

}



module.exports = { getPedidos, getPedidoById, addPedido }