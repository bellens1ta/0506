const alumnos = require('../../data/alumnos.json')
const httpStatusCodes = require('http2').constants;

const getAlumnos = (_, res) => {
    res.status(httpStatusCodes.HTTP_STATUS_OK).json(alumnos)
}

const getAlmunosByDni =  (req, res) => {
    const { dni } = req.params
    const alumnoDni = alumnos.find((a) => a.dni == dni)
  
    if (alumnoDni) {
        res.json(alumnoDni)
    } else {
      res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({ error: 'Dni no encontrado' })
    }
  }

  const updateAlumnos = ( req, res)=> { // 
    const { dni } = req.params
    const {habilitado, celiaco ,edad} = req.body

    const alumno = alumnos.find((a) => a.dni == dni)

    if (alumno){
            if (habilitado !== undefined) alumno.habilitado = habilitado
            if (celiaco !== undefined) alumno.celiaco = celiaco
            if (edad !== undefined) alumno.edad = edad 
            res.json({ mensaje: 'Alumno actualizado' , alumno});}
            else {
            res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({ error: 'Alumno no encontrado' });
            return
            }
           
        }
  


  const addAlumno = (req, res)=> {
    const { dni, nombre, edad, celiaco = false } = req.body
    const dniAlumno = alumnos.find((a) => a.dni == dni)

    if (dniAlumno){
        res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({ error: 'El dni ingresado ya existe' , dniAlumno});
    }

    if (dni.toString().length !== 8) {
         res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({ error: 'El DNI debe tener 8 numeros' });
         return
      }
      if (edad <= 18 || edad >= 99) {
        res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({ error: 'La edad del alumno tiene que ser mayor a 18 y menor a 99', edad });
        return
    }

    const nuevoAlumno = { 
        dni, 
        nombre, 
        habilitado: true,
         celiaco, 
         edad };
    alumnos.push(nuevoAlumno);
    res.status(httpStatusCodes.HTTP_STATUS_CREATED).json({mensaje :"Se agrego el alumno correctamente",alumno:nuevoAlumno});
  }
  
module.exports = {getAlumnos, getAlmunosByDni,updateAlumnos, addAlumno }