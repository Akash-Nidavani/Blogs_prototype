const db = require("./../models");

const createPost = async (req, res) => {
    try {
        const { title, description, content, categoryId, authorId } = req.body;
        if(!req.file){
            return res.status(400).json({error:"Blog picture needs to be uploaded"})
        }
        const image = req.file ? req.file.path : null;
        const post = await db.post.create({
            title,
            description,
            content,
            categoryId,
            authorId,
            image
        });
        res.status(200).json(post);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Failed to create a post" });
    }
};

const getAllPosts = async (req, res) => {
    try {
        let fullinfo = {}
        const blog = await db.post.findAll({
            attributes:['id','title', ['createdAt' ,'Date']],
            include: [{
                model: db.author,
                as: 'authors',
                attributes: ['firstname', 'lastname'],
              },{
                model: db.category,
                as: 'categories',
                attributes: ['name'],
              }]  
        });
        // {include:['blogs_author']} --> for joining Respecting author data

       res.send(blog)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Failed to fetch blogs" });
    }
};

const deletePost = async (req, res) => {
    try {
        const blog = await db.post.findByPk(req.params.id);
        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }
        await blog.destroy();
        res.json({ message: "Blog deleted successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Failed to delete the blog" });
    }
};

module.exports = {
    createPost,
    deletePost,
    getAllPosts
}