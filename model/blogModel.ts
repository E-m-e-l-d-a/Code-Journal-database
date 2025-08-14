import mongoose, { Schema, Document } from 'mongoose';

interface Blog extends Document {
    title: string;
    post: string;
}

const blogSchema: Schema = new mongoose.Schema({
    title: { type: String, required: true },
    post: { type: String, required: true }
});

export default mongoose.model<Blog>("Blogs", blogSchema);