const express = require('express');
const app = express();
const dbSetup = require('./database/setup');
const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes')
//setup database
dbSetup();
//setting up express to pick req.body
app.use(express.json());
//require routes
app.use(bookRoutes);
app.use("/auth", authRoutes);
//setting up port
app.listen(3000, () => console.log('Server running on Port 3000'));