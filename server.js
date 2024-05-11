const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');


const tasksRoutes = require("./routes/tasks-routes");
const toDoListsRoutes = require("./routes/toDoLists-routes");
const articleRoutes = require("./routes/article-routes");
const phoneRoutes = require("./routes/phone-routes");
const authRoutes = require("./routes/auth-routes");
const path = require('path');
const PORT = 3001;
const URL = 'mongodb://127.0.0.1:27017/STO'
const app = express();
const corsOptions ={
    origin:'http://localhost:3000',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(tasksRoutes)
app.use(toDoListsRoutes)
app.use(articleRoutes)
app.use(phoneRoutes);
app.use(authRoutes);




mongoose
    .connect(URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(`DB connection error: ${err}`))


app.listen(PORT, (err) => {
    err ? console.log(err) : console.log(`Listening port ${PORT}`);
});


