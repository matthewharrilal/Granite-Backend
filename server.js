const express = require('express');
const server = express();
const mongoose = require('mongoose');
const User = require("./models/User");
const bodyParser = require("body-parser");