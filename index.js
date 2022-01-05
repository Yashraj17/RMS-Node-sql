var express = require('express')
var data = express();
var url = require("./url")

data.use("/",url);

data.set('view engine','pug')
data.set('views','./views')


data.listen(8081)