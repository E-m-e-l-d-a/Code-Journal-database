import express from 'express';
import {  create, getAllBlogs, getBlogsById, updateBlogsById, deleteBlog } from "../controller/blogController"

const route = express.Router();

route.post("/blog", create);
route.get("/blogs", getAllBlogs);
route.get("/blog/:id", getBlogsById)
route.put("/update/blog/:id", updateBlogsById)
route.delete("/delete/blog/:id", deleteBlog)

export default route;