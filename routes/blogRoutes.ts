import express from 'express';
import {  create } from "../controller/blogController"

const route = express.Router();

route.post("/blog", create);

export default route;