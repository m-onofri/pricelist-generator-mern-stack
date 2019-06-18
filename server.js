const express = require('express');
const connectDB = require('./config/db');
const app = express();
connectDB();

//Init middleware
app.use(express.json({extended: false}));

app.use('/testAPI', require('./routes/testAPI'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));