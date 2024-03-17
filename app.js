const express = require('express')
const app = express()
const port = 3000
const homeRouter = require('./routes/home')
const http = require("http");
const videoController = require('./controllers/error');
const path = require('path');
const bodyParser = require("body-parser");


app.set('view engine', 'ejs');
app.set('views', __dirname+'/views');

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname,'style')))

app.use(homeRouter.routes);
app.use(videoController.get404);

const server = http.createServer(app);

server.listen(port);