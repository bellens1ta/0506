const express = require('express')
const alumnosRouter = require('./routes/alumno.route')
const viandasRouter = require('./routes/vianda.route')
const PORT = process.env.PORT || 3001
const app = express()

app.use(express.json())
app.use('/api/alumnos', alumnosRouter)
app.use('/api/viandas', viandasRouter)

app.listen(PORT, () => {
    console.log(`Solución del parcial en el puerto ${PORT}`)
})






