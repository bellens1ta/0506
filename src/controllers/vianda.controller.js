const viandas = require('../../data/viandas.json')
const httpStatusCodes = require('http2').constants;

const getViandas = (_, res) => {
    res.status(httpStatusCodes.HTTP_STATUS_OK).json(viandas)
}

const getViandaByCode =(req, res)=>{
    const { codigo } = req.params
    const viandaCode = viandas.find((v) => v.codigo == codigo)
  
    if (viandaCode) {
        res.json(viandaCode)
    } else {
      res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({ error: 'No se encontro la vianda' })
    }

}
const updateVianda =(req, res)=>{
    const { codigo } = req.params
    const {aptoCeliaco, stock ,descripcion} = req.body

    const viandaCode = viandas.find((v) => v.codigo == codigo)

    if (viandaCode){
            if (aptoCeliaco !== undefined) viandaCode.aptoCeliaco = aptoCeliaco
            if (stock !== undefined) viandaCode.stock = stock
            if (descripcion !== undefined) viandaCode.descripcion = descripcion 
            res.json({ mensaje: 'Vianda actualizada' , viandaCode});}
            else {
            res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({ error: 'Vianda no encontrada' });
            return
            }

}
const addVianda =(req, res)=>{
    const { codigo, tipo, aptoCeliaco = false, stock, descripcion } = req.body
    const viandaCode = viandas.find((v) => v.codigo ==codigo)

    if (!codigo || (codigo.length !== 5 && codigo[0] !== 'V')) {
       res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({ error: 'El código de vianda debe tener 5 caracteres y comenzar con la letra "V"' })
       return
    }
    
    if (viandaCode) {
       res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({ error: 'La vianda ya se encuentra' })
       return
    }
  
    const tipoVianda = ['TARTA', 'POLLO', 'PASTA', 'PIZZA', 'EMPANADAS']
    let tipoValido = false;
     for (let i = 0; i < tipoVianda.length; i++) {
        if (tipoVianda[i] ==tipo) {
            tipoValido = true;
            break;
    }}

    if (!tipoValido) {
        return res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({ error: 'Tipo de vianda incorrecta. Los tipos de viandas son: TARTA, POLLO, PASTA, PIZZA, EMPANADAS' });
      }
    if (stock < 0) {
       res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({ error: 'El stock de la vianda debe ser mayor o igual a 0' })
       return
    }
  
    const nuevaVianda = { 
        codigo,
         tipo, 
         aptoCeliaco, 
         stock, 
         descripcion }
    viandas.push(nuevaVianda);
    res.status(httpStatusCodes.HTTP_STATUS_CREATED).json({mensaje :"Se agrego la vianda correctamente",nuevaVianda})
    
}

module.exports = {getViandas, getViandaByCode, updateVianda, addVianda }