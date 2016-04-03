#!/usr/bin/env node

var express = require('express');
var path = require('path')
var app = express();

app.use(express.static(path.join(__dirname, '../dist')));

app.listen(process.env.PORT || 3000);
