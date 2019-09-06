const express = require('express');
//const cors = require('cors');
const connectDB = require('./config/db');
const app = express();
connectDB();

//Init middleware
app.use(express.json({extended: false}));
//app.use(cors());

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/pricelist', require('./routes/api/pricelist'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));