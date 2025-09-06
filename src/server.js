const express = require('express');
require('dotenv').config();
const cors = require('cors');

// --- IMPORTACIONES ---
// El error se origina si ALGUNO de los siguientes 'require' devuelve 'undefined'.
const authRoutes = require('../routes/authRoutes');
const productRoutes = require('../routes/productRoutes');
const { errorHandler } = require('../middleware/errorMiddleware');

const PORT = process.env.PORT || 3000;
const app = express();

// --- MIDDLEWARES GLOBALES ---
// Estos se ejecutan en cada petición.
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// --- RUTAS DE LA API ---
// Aquí es donde la app se conecta con los archivos de rutas.
// Si 'authRoutes' o 'productRoutes' no es una función de router, la app se detendrá.
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// --- MANEJADOR DE ERRORES ---
// ¡Importante! Este debe ser el ÚLTIMO middleware que se registra con app.use().
// Captura cualquier error que ocurra en las rutas de arriba.
app.use(errorHandler);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

