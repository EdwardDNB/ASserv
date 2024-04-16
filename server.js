const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');


const tasksRoutes = require("./routes/tasks-routes");
const toDoListsRoutes = require("./routes/toDoLists-routes");
const movieRoutes = require("./routes/movie-routes");
const articleRoutes = require("./routes/article-routes");
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
app.use(express.json())
app.use(movieRoutes)
app.use(tasksRoutes)
app.use(toDoListsRoutes)
app.use(articleRoutes)
app.use('/images', express.static(path.join(__dirname, 'images')));




mongoose
    .connect(URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(`DB connection error: ${err}`))


app.listen(PORT, (err) => {
    err ? console.log(err) : console.log(`Listening port ${PORT}`);
});


