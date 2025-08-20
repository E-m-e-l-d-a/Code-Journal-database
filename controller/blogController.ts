import { type Request, type Response } from 'express';
import Blog from '../model/blogModel';

export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, post } = req.body;

        if (!title || !post) {
            res.status(400).json({ error: "Title and post are required" });
            return;
        }
        const newBlog = new Blog({ title, post });
        res.status(201).json({ message: "Blog successfully published" });
        await newBlog.save();
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getAllBlogs = async (req: Request, res: Response) => {
    try {
        const blogpost = await Blog.find().sort({ createdAt: -1 });

        if (!blogpost || blogpost.length === 0) {
            return res.status(200).json({ message: "No blogs yet", blogs: [] });
        }

        res.status(200).json(blogpost);
    } catch (err) {
        console.error("Error fetching items:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getBlogsById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const blogexist = await Blog.findById(id);
        if (!blogexist) {
            return res.status(400).json({ error: "blog post not found" });
        }

        res.status(200).json(blogexist);

    } catch (err) {
        console.error("Error fetching blog:", err);
        res.status(500).json({ error: "Server error" });
    }
};

export const getBlog = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const blogexist = await Blog.findById(id);
        if (!blogexist) {
            return res.status(400).json({ error: "blog post not found" });
        }

        res.status(200).json(blogexist);

    } catch (err) {
        console.error("Error fetching blog:", err);
        res.status(500).json({ error: "Server error" });
    }
};

export const updateBlogsById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { title, post } = req.body;

        const blogexist = await Blog.findById(id);
        if (!blogexist) {
            return res.status(400).json({ error: "blog post not found" });
        }

        const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        res.json(updatedBlog);
    } catch (err) {
        console.error("Error updating blog:", err);
        res.status(500).json({ error: "Server error" });
    }
};

export const deleteBlog = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const deletedBlog = await Blog.findByIdAndDelete(id);
        if (!deletedBlog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        res.json({ message: "Blog deleted successfully" });
    } catch (err) {
        console.error("Error deleting blog:", err);
        res.status(500).json({ error: "Server error" });
    }
};