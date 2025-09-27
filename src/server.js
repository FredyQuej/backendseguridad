const express = require('express');
require('dotenv').config();
const cors = require('cors');
const authRoutes = require('./routes/authRoutes.js');
const productRoutes = require('./routes/productRoutes.js');
const categoryRoutes = require('./routes/categoryRoutes.js');
const { errorHandler } = require('./middleware/errorMiddleware.js');

const PORT = process.env.PORT || 3000;
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

