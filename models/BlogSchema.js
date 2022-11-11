
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema(
    {
        title: { 
            type: String,
            required: false
        },
        body: { 
            type: String, 
            required: true 
        },
        author: { 
            type: String, 
            required: true 
        },
        likes: { 
            type: Number, 
            default: 0
         },
        public: { 
            type: Boolean, 
            default: false },
     },
    {
        timestamps: { 
            createdAt: 'created_at' }
    }
)
const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
