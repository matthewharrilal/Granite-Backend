const express = require('express');
const server = express();
const mongoose = require('mongoose');
const UserModel = require("./models/User");
const bodyParser = require("body-parser");