
const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema(
    {
        author: { 
            type: String, 
            required: true 
        },
        username: { 
            type: String, 
            required: true 
        },
        notebook: { 
            type: String, 
            required: true,
            default: 'Default Notebook'
        },
        title: { 
            type: String,
            required: false
        },
        body: { 
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
const Note = mongoose.model('Note', noteSchema)

module.exports = Note

