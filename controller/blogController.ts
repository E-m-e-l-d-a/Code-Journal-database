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
        const savedBlog = await newBlog.save();

        res.status(200).json(savedBlog);
    } catch (err) { 
        res.status(500).json({ error: "Internal Server Error" });
    }
};
